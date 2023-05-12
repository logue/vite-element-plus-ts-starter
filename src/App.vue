<template>
  <el-config-provider namespace="ep">
    <el-header class="header fixed top-0 z-12 w-screen px-0">
      <base-header />
    </el-header>
    <div class="h-screen flex container">
      <el-aside width="auto" class="sticky">
        <base-side />
      </el-aside>
      <div>
        <el-scrollbar>
          <el-main>
            <transition name="el-fade-in-linear">
              <router-view />
            </transition>
          </el-main>
        </el-scrollbar>
      </div>
    </div>
  </el-config-provider>
</template>

<style scoped>
.container {
  margin-top: 60px;
  height: calc(100vh - 60px);
}

.header {
  background-image: radial-gradient(transparent 1px, var(--ep-bg-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}
</style>
