<template>
  <el-config-provider namespace="ep">
    <el-header class="fixed top-0 z-12 w-screen px-0">
      <base-header />
    </el-header>
    <div class="content h-screen w-screen flex">
      <el-aside width="auto" class="sticky shrink-0">
        <base-side />
      </el-aside>
      <div class="grow-1">
        <el-scrollbar>
          <el-main>
            <router-view v-slot="{ Component, route }">
              <transition name="el-fade-in-linear">
                <component :is="Component" :key="route.path" />
              </transition>
            </router-view>
          </el-main>
        </el-scrollbar>
      </div>
    </div>
  </el-config-provider>
</template>

<style scoped>
.ep-header {
  --ep-header-padding: 0;
  background-image: radial-gradient(transparent 1px, var(--ep-bg-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}

.content {
  --ep-header-height: 60px;
  margin-top: var(--ep-header-height);
  height: calc(100vh - var(--ep-header-height));
}
</style>
