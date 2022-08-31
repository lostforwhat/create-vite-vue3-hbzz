const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const Inquirer = require("inquirer");
const spawn = require('cross-spawn');
const loading = require("./loading");

const getTemplates = () => {
  // 获取模板
}

const executeCommand = ({ cwd, args }, data, source) => {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [...args, '-e', source, '--', JSON.stringify(data)],
      { cwd, stdio: 'inherit' }
    );

    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `node ${args.join(' ')}`,
        });
        return;
      }
      resolve();
    });
  });
}

module.exports = async function (projectName, options) {
  // 获取当前工作目录
  const cwd = process.cwd();
//   console.log(projectName, options)
  // 拼接得到项目目录
  const targetDirectory = path.join(cwd, projectName);
  // 判断目录是否存在
  if (fse.existsSync(targetDirectory)) {
    // 判断是否使用 --force 参数
    if (options.force) {
      // 删除重名目录(remove是个异步方法)
      await fse.remove(targetDirectory);
    } else {
      const { isOverwrite } = await new Inquirer.prompt([
        // 返回值为promise
        {
          name: "isOverwrite", // 与返回值对应
          type: "list", // list 类型
          message: "目录已经存在，请选择处理方式:",
          choices: [
            { name: "Overwrite", value: true },
            { name: "Cancel", value: false },
          ],
        },
      ]);
      // 选择 Cancel
      if (!isOverwrite) {
        console.log("Cancel");
        return;
      } else {
        // 选择 Overwirte ，先删除掉原有重名目录
        await loading('删除目录...\n', fse.remove, targetDirectory);
      }
    }
  }
  // 创建目录
  await loading('正在创建目录...\n', fse.ensureDir, targetDirectory);
  // 选择创建模板
//   const templates = getTemplates();

  // 包管理器选择
  const { pkgManager } = await new Inquirer.prompt([
        // 返回值为promise
        {
          name: "pkgManager", // 与返回值对应
          type: "list", // list 类型
          message: "选择包管理器:",
          choices: [
            { name: "pnpm", value: 'pnpm' },
            { name: "yarn", value: 'yarn' },
            { name: "npm", value: 'npm' },
          ],
        },
      ]);

  // UI选择
  const { UI } = await new Inquirer.prompt([
        // 返回值为promise
        {
          name: "UI", // 与返回值对应
          type: "list", // list 类型
          message: "选择UI库:",
          choices: [
            { name: "Vant", value: 'vant' },
            { name: "AntDesignVue", value: 'antdv' },
            { name: "none", value: '' },
          ],
        },
      ]);

  // 选择插件
//   const { plugins } = await new Inquirer.prompt([
//     {
//       name: "plugins",
//       // 多选交互功能
//       // 单选将这里修改为 list 即可
//       type: "checkbox",
//       message: "选择要安装的依赖:",
//       choices: [
//         {
//           name: "commitlint",
//           value: "commitlint",
//         },
//         {
//           name: "eslint",
//           value: "eslint",
//         },
//         {
//           name: "stylelint",
//           value: "stylelint",
//         },
//         {
//           name: "prettier",
//           value: "prettier",
//         },
//         {
//           name: "windicss",
//           value: "windicss",
//         },
//       ],
//     },
//   ]);
//   console.log(plugins);

};
