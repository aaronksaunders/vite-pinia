import { defineStore } from "pinia";
import {ref} from 'vue';

export interface Student {
  name: string;
  id: string;
  section: string;
}

export const useMainStore = defineStore("mainstore", () => {
  const students = ref<Student[] | []>([]);
  const selectedStudent = ref<Student | null>(null);

  /**
   *
   * @param data
   */
  const updateStudent = (data: Student) => {
    students.value = students?.value?.map((item: Student) => {
      if (item.id === data.id) {
        return {
          ...item,
          name: data.name,
          section: data.section,
        };
      } else {
        return item;
      }
    });

    //after updating remove selected student
    selectedStudent.value = null;
  };

  /**
   *
   * @param id
   */
  const removeStudent = (id: String) => {
    students.value = students.value.filter(
      (student: Student) => student.id !== id
    );
  };

  /**
   *
   * @param student
   */
  const addStudent = (student: { name: string; section: string }) => {
    students.value = [
      {
        name: student.name,
        id: Math.random() * 100 + "",
        section: student.section,
      },
      ...students.value,
    ];
  };

  // export
  return { addStudent, removeStudent, updateStudent, students, selectedStudent}
});
