<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { ElMessage } from 'element-plus';

defineProps({
  msg: {
    type: String,
    default: 'Somne Message',
  },
});

const count: Ref<number> = ref(0);
const input: Ref<string> = ref('element-plus');
const curDate: Ref<string> = ref('');

const toast = () => {
  ElMessage.success('Hello');
};
</script>

<template>
  <div class="text-center">
    <h1>{{ msg }}</h1>

    <p>
      See
      <a href="https://element-plus.org" target="_blank">element-plus</a>
      for more information.
    </p>

    <!-- example components -->
    <div class="mb-4">
      <el-button size="large" @click="toast">El Message</el-button>
    </div>

    <div class="my-2 flex flex-wrap items-center justify-center">
      <el-button @click="count++">count is: {{ count }}</el-button>
      <el-button type="primary" @click="count++">
        count is: {{ count }}
      </el-button>
      <el-button type="success" @click="count++">
        count is: {{ count }}
      </el-button>
      <el-button type="warning" @click="count++">
        count is: {{ count }}
      </el-button>
      <el-button type="danger" @click="count++">
        count is: {{ count }}
      </el-button>
      <el-button type="info" @click="count++">count is: {{ count }}</el-button>
    </div>

    <div>
      <el-tag type="success" class="m-1">Tag 1</el-tag>
      <el-tag type="warning" class="m-1">Tag 1</el-tag>
      <el-tag type="danger" class="m-1">Tag 1</el-tag>
      <el-tag type="info" class="m-1">Tag 1</el-tag>
    </div>

    <div class="my-2">
      <el-input v-model="input" class="m-2" style="width: 200px" />
      <el-date-picker
        v-model="curDate"
        class="m-2"
        placeholder="Pick a day"
        type="date"
      />
    </div>

    <p>For example, we can custom primary color to 'green'.</p>

    <p>
      Edit
      <code>components/HelloWorld.vue</code>
      to test components.
    </p>
    <p>
      Edit
      <code>styles/element/var.scss</code>
      to test scss variables.
    </p>

    <p>
      Template using
      <a
        href="https://github.com/logue/vite-element-plus-ts-starter"
        target="_blank"
      >
        vite-element-plus-ts-starter
      </a>
      .
    </p>
  </div>
</template>

<style>
.ep-button {
  margin: 4px;
}
.ep-button + .ep-button {
  margin: 4px;
  margin-left: 0;
}
</style>
