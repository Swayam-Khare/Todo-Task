import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),

  getters: {
    favTasks() {
      return this.tasks.filter((t) => t.isFav);
    },
    favTaskCount() {
      const sum = this.tasks.reduce((accumulator, currentValue) => {
        return currentValue.isFav ? accumulator + 1 : accumulator;
      }, 0); //initilize accumulator to 0;
      return sum;
    },
    completedTasks() {
      return this.tasks.filter((t) => t.isCompleted);
    },
    completedTaskCount() {
      const sum = this.tasks.reduce((accumulator, currentValue) => {
        return currentValue.isCompleted ? accumulator + 1 : accumulator;
      }, 0); //initilize accumulator to 0;
      return sum;
    },
    incompleteTasks() {
      return this.tasks.filter((t) => !t.isCompleted);
    },
    incompleteTaskCount() {
      return this.tasks.length - this.completedTaskCount;
    },
  },

  actions: {
    async getTasks() {
      this.loading = true;

      const res = await axios.get("http://localhost:3000/api/v1/all-tasks");
      this.tasks = await res.data.tasks;
      this.loading = false;
    },

    async addTask(task) {
      const config = { headers: { "content-type": "application/json" } };
      const res = await axios.post(
        "http://localhost:3000/api/v1/add-task",
        task,
        config
      );
      if (res.error) {
        console.log(error);
      }

      this.getTasks();
    },

    async deleteTask(id) {
      const res = await axios.delete(
        "http://localhost:3000/api/v1/tasks/" + id
      );
      if (res.error) {
        console.log(error);
      }

      this.getTasks();
    },

    async addToFav(id) {
      const result = await axios.get(
        "http://localhost:3000/api/v1/tasks/" + id
      );
      let isFav = result.data.task.isFav;

      const config = { headers: { "content-type": "application/json" } };
      const res = await axios.patch(
        "http://localhost:3000/api/v1/tasks/" + id,
        { isFav: !isFav },
        config
      );
      if (res.error) {
        console.log(error);
      }

      this.getTasks();
    },

    async completeTask(id) {
      const result = await axios.get(
        "http://localhost:3000/api/v1/tasks/" + id
      );
      let isCompleted = result.data.task.isCompleted;

      const config = { headers: { "content-type": "application/json" } };
      const res = await axios.patch(
        "http://localhost:3000/api/v1/tasks/" + id,
        { isCompleted: !isCompleted },
        config
      );
      if (res.error) {
        console.log(error);
      }

      this.getTasks();
    },

    async EditTask(id, task) {
      const config = { headers: { "content-type": "application/json" } };
      const res = await axios.patch(
        "http://localhost:3000/api/v1/tasks/" + id,
        task,
        config
      );
      if (res.error) {
        console.log(error);
      }

      this.getTasks();
    },
  },
});
