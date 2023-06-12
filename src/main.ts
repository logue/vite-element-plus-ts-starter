/**
 * Vue3 Main script
 */
import store from '@/store';
import { createApp } from 'vue';

import App from '@/App.vue';
import ElementPlus from '@/plugins/element-plus';
import router from '@/router';

/** Register Vue */
const vue = createApp(App);
vue.use(router);
vue.use(store);
vue.use(ElementPlus);

// Run!
router
  .isReady()
  .then(() => vue.mount('#app'))
  .catch(e => console.error(e));
