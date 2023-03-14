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

const clearInput = () => {
  item.value = { name: "", section: "" };
  mainStore.selectedStudent = null;
};
</script>

<template>
  <div
    class="border-solid border-blue-200 border-[1px] rounded p-3 m-2 shadow-lg drop-shadow-md"
  >
    <div v-if="mainStore.selectedStudent === null">
      <div class="mb-1 font-medium text-lg">Enter New Student Information</div>
      <input
        type="text"
        v-model="item.name"
        placeholder="name"
        class="bg-blue-100 my-1 p-1 mr-2 w-60 xs:w-1/2"
      />
      <input
        type="text"
        v-model="item.section"
        placeholder="section"
        class="bg-blue-100 my-1 p-1  w-60"
      />
      <div class="my-2">
        <button
          class="rounded-md  hover:text-white border-blue-600 hover:bg-blue-500 border-solid bg-blue-400 px-2 py-1 w-36 font-medium text-sm mr-2"
          @click="addStudent"
        >
          ADD STUDENT
        </button>

        <button
          class="rounded-md  hover:text-white border-blue-600 hover:bg-blue-500 border-solid bg-blue-400 px-2 py-1 w-20 font-medium text-sm"
          @click="clearInput"
        >
          CANCEL
        </button>
      </div>
    </div>
    <div v-else>
      <div class="mb-1 font-medium text-lg">Update Student Information</div>
      <input
        type="text"
        v-model="item.name"
        placeholder="name"
        class="bg-blue-100 my-1 p-1 mr-2  w-60"
      />
      <input
        type="text"
        v-model="item.section"
        placeholder="section"
        class="bg-blue-100 my-1 p-1  w-60"
      />
      <div class="my-2">
        <button
          class="rounded-md  hover:text-white border-blue-600 hover:bg-blue-500 border-solid bg-blue-400 px-2 py-1 w-40 font-medium text-sm mr-3"
          @click="updateStudent()"
        >
          UPDATE STUDENT
        </button>
        <button
          class="rounded-md  hover:text-white border-blue-600 hover:bg-blue-500 border-solid bg-blue-400 px-2 py-1 w-20 font-medium text-sm"
          @click="clearInput"
        >
          CANCEL
        </button>
      </div>
    </div>
  </div>
  <div class="my-3 ml-2 font-medium text-lg">Number Of Students {{ mainStore.students.length }}</div>
  <ul class="mx-2 h-80 overflow-auto">
    <li v-for="(item, index) in mainStore.students" :key="index" class="mb-4">
      <div>
        <div>
          <span class="mr-1 font-semibold">Name:</span><span>{{ item.name }}</span>
        </div>
        <div>
          <span class="mr-1 font-semibold">Section:</span><span>{{ item.section }}</span>
        </div>
        <div>
          <span class="mr-1 font-semibold">ID:</span><span>{{ item.id }}</span>
        </div>
      </div>
      <div class="mt-2 size">
        <button
          class="rounded-md hover:text-white border-blue-600 hover:bg-blue-500 border-solid bg-blue-400 px-1 py-1 w-20 font-medium mr-3 text-xs"
          @click="setSelectedStudent(item)"
        >
          EDIT
        </button>
        <button
          class="rounded-md  hover:text-white border-blue-600 hover:bg-blue-500 border-solid bg-blue-400 px-1 py-1 w-20 font-medium text-xs"
          @click="mainStore.removeStudent(item.id)"
        >
          DELETE
        </button>
      </div>
      <div class="border-b border-blue-200 pt-3"></div>
    </li>
  </ul>
</template>

<style scoped></style>
