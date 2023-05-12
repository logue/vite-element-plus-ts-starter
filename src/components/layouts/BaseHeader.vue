<script lang="ts" setup>
import { toggleDark } from '@/helpers/dark';
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" router>
    <el-menu-item index="1" :route="{ name: 'home' }">
      Element Plus
    </el-menu-item>
    <el-menu-item index="2" :route="{ name: 'about' }">About</el-menu-item>
    <el-sub-menu index="3">
      <template #title>Workspace</template>
      <el-menu-item index="3-1">item one</el-menu-item>
      <el-menu-item index="3-2">item two</el-menu-item>
      <el-menu-item index="3-3">item three</el-menu-item>
      <el-sub-menu index="3-4">
        <template #title>item four</template>
        <el-menu-item index="3-4-1">item one</el-menu-item>
        <el-menu-item index="3-4-2">item two</el-menu-item>
        <el-menu-item index="3-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="4" disabled>Info</el-menu-item>
    <el-menu-item index="5">Orders</el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button
        class="w-full cursor-pointer border-none bg-transparent"
        style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
  </el-menu>
</template>
