// Load Element Plus Core
import ElementPlus from 'element-plus';

// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss';

// UnoCSS
// https://unocss.dev/
import '@unocss/reset/normalize.css';
// eslint-disable-next-line import/no-unresolved
import 'virtual:uno.css';
// eslint-disable-next-line import/no-unresolved
import 'virtual:unocss-devtools';

// Configure
import '@/styles/index.scss';

export default ElementPlus;
