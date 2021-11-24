import { defineStore } from "pinia";

interface State {
  count: number;
}

export const useMainStore = defineStore("mainstore", {
  // convert to a function
  state: (): State => ({
    count: 0,
  }),

  actions: {
    up() {
      this.count = this.count + 1;
    },
    down() {
      this.count = this.count - 1;
    },
    changeTo(payload: { value: number }) {
      this.count = payload.value;
    },
  },
});
