import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'virtual:windi.css';
import 'virtual:windi-devtools';
import 'ant-design-vue/es/message/style/index';
import 'ant-design-vue/es/modal/style/index';

const app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');
