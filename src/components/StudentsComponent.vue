<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore, Student } from '../store';

// get the store
const mainStore = useMainStore();

// ref for holding form values
const item = ref({ name: "", section: "" });

/**
 * 
 */
const addStudent = () => {
  const { name, section } = item.value;
  mainStore.addStudent(item.value);
  item.value = { name: "", section: "" }
};

/**
 * 
 */
const setSelectedStudent = (student: Student) => {
  mainStore.selectedStudent = student;
  item.value.name = student.name;
  item.value.section = student.section;
}

/**
 * 
 */
const updateStudent = () => {
  const { name, section } = item.value;
  const id = mainStore.selectedStudent?.id || ""
  mainStore.updateStudent({ ...item.value, id });
  item.value = { name: "", section: "" }
};

</script>

<template>
  <div v-if="mainStore.selectedStudent === null">
    <input type="text" v-model="item.name" placeholder="name" />
    <input type="text" v-model="item.section" placeholder="section" />
    <button @click="addStudent">ADD STUDENT</button>
  </div>
  <div v-else>
    <input type="text" v-model="item.name" placeholder="name" />
    <input type="text" v-model="item.section" placeholder="section" />
    <button @click="updateStudent()">UPDATE STUDENT</button>
  </div>
  <div>Count {{ mainStore.students.length }}</div>
  <ul>
    <li v-for="(item, index) in mainStore.students" :key="index">
      <div>{{ JSON.stringify(item) }}</div>
      <div>
        <button @click="setSelectedStudent(item)">EDIT</button>&nbsp;
        <button @click="mainStore.removeStudent(item.id)">DELETE</button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
</style>
