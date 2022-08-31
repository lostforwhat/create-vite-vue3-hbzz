import type { UserConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';

const CWD = process.cwd();

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_BASE_URL, VITE_MOCK_ENABLED } = loadEnv(mode, CWD);
  const isBuild = command === 'build';
  const mockEnabled = Object.is(VITE_MOCK_ENABLED, 'true');

  return {
    plugins: [
      vue(),
      vueJsx(),
      WindiCSS(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less'
          })
        ]
      }),
      viteMockServe({
        ignore: /^_/,
        mockPath: 'mock',
        localEnabled: mockEnabled,
        prodEnabled: isBuild && mockEnabled,
        logger: true,
        injectCode: `
          import { setupProdMockServer } from '../mock/_mockProdServer';
          setupProdMockServer();
        `
      }),
      Pages({
        dirs: 'src/views',
        exclude: ['**/components/**/*.vue']
      }),
      Layouts({
        layoutsDirs: 'src/layouts',
        defaultLayout: 'Index'
      })
    ],
    resolve: {
      // alias: {
      //   // '@components': join(root, '/components'),
      //   '@': path.resolve(__dirname, 'src') //在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。
      // }
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src')
        }
      ]
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {},
          additionalData: `@import "@/style/global.less";`
        }
      }
    },
    base: VITE_BASE_URL,
    build: {
      outDir: 'dist',
      // 服务端渲染
      ssr: false
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // 是否自动在浏览器打开
      open: true,
      // 是否开启 https
      https: false,
      proxy: {
        // string shorthand
        // '/api': 'http://localhost:8888',
        // with options
        '/api': {
          target: 'http://demo.com/api',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  };
};
