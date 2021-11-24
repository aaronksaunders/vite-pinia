<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '../store';

const mainStore = useMainStore();
const newValue = ref("");
const onChangeTo = () => {
  mainStore.changeTo({ value: +newValue.value });
};

</script>

<template>
  <div>
    Count {{ mainStore.count }}
    <button @click="mainStore.up()">ADD</button>
    <button @click="mainStore.down()">SUBTRACT</button>
  </div>
  <div>
    <input type="number" v-model="newValue" />
    <button @click="onChangeTo">Change To</button>
  </div>
</template>

<style scoped>
</style>
