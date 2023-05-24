<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';

import logo from '@/assets/element-plus.svg';
</script>

<template>
  <el-container direction="vertical">
    <img alt="Element Plus logo" class="element-plus-logo mx-a" :src="logo" />
    <hello-world msg="Hello Vue 3.3 + Element Plus + Vite" />
  </el-container>
</template>

<style>
.element-plus-logo {
  width: 50%;
}
</style>
