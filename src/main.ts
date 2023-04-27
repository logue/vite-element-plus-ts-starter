/**
 * Vue3 Main script
 */

// Load vue core
import { createApp } from 'vue';
import router from '@/router';
import stores from '@/stores';

// Load Element Plus
import ElementPlus from '@/plugins/element-plus';

// Load Layout vue.
import App from '@/App.vue';

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
  .catch(e => console.error(e));
