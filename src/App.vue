<template>
  <el-config-provider namespace="ep">
    <el-header class="header fixed top-0 z-12 w-screen px-0">
      <base-header />
    </el-header>
    <div class="content h-screen w-screen flex">
      <el-aside width="auto" class="sticky shrink-0">
        <base-side />
      </el-aside>
      <div class="grow-1">
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
.header {
  background-image: radial-gradient(transparent 1px, var(--ep-bg-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}

.content {
  margin-top: 60px;
  height: calc(100vh - 60px);
}
</style>
