/**
 * Vue3 Main script
 */
import { createApp } from 'vue';

import App from '@/App.vue';
import ElementPlus from '@/plugins/element-plus';
import router from '@/router';
import stores from '@/stores';

/** Register Vue */
const vue = createApp(App);
vue.use(router);
vue.use(stores);
vue.use(ElementPlus);

// Run!
router
  .isReady()
  .then(() => {
    vue.mount('#app');
  })
  .catch(e => {
    console.error(e);
  });
