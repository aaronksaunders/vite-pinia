<script setup lang="ts">
import { ref } from "vue";
import { useMainStore, Student } from "../store";

// get the store
const mainStore = useMainStore();


// ref for holding form values
const item = ref({ name: "", section: "" });

/**
 * - gets values from form
 * - calls method on store to add student
 * - clears form values
 */
const addStudent = () => {
  const { name, section } = item.value;
  mainStore.addStudent(item.value);
  item.value = { name: "", section: "" };
};

/**
 * - sets store property selectedStudent
 * - updates input form fields with values
 */
const setSelectedStudent = (student: Student) => {
  mainStore.selectedStudent = student;
  item.value = { ...mainStore.selectedStudent };
};

/**
 * - gets form values
 * - gets id from selectedStudent
 * - calls updateStudent method on store
 */
const updateStudent = () => {
  const { name, section } = item.value;
  const id = mainStore.selectedStudent?.id || "";
  mainStore.updateStudent({ ...item.value, id });
  item.value = { name: "", section: "" };
};
</script>

<template>
  <div v-if="mainStore.selectedStudent === null">
    <input type="text" v-model="item.name" placeholder="name" />
    <input type="text" v-model="item.section" placeholder="section" />
    <div><button @click="addStudent">ADD STUDENT</button>&nbsp;</div>
  </div>
  <div v-else>
    <input type="text" v-model="item.name" placeholder="name" />
    <input type="text" v-model="item.section" placeholder="section" />
    <div>
      <button @click="updateStudent()">UPDATE STUDENT</button>
      <button @click="mainStore.selectedStudent = null">CANCEL</button>
    </div>
  </div>
  <div>Count {{ mainStore.students.length }}</div>
  <ul>
    <li v-for="(item, index) in mainStore.students" :key="index">
      <pre>{{ JSON.stringify(item, null, 2) }}</pre>
      <div>
        <button @click="setSelectedStudent(item)">EDIT</button>&nbsp;
        <button @click="mainStore.removeStudent(item.id)">DELETE</button>
      </div>
    </li>
  </ul>
</template>

<style scoped></style>
