<template>
  <el-config-provider namespace="ep">
    <base-header />
    <div style="display: flex">
      <base-side />
      <div>
        <img
          alt="Vue logo"
          class="element-plus-logo"
          src="./assets/element-plus.svg"
        />
        <hello-world msg="Hello Vue 3.1 + Element Plus + Vite" />
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}
.element-plus-logo {
  width: 50%;
}
</style>
