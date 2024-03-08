import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    count: 0,
    loading: false,
  }),

  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      const sum = this.tasks.reduce((accumulator, currentValue) => {
        return currentValue.isFav ? accumulator + 1 : accumulator;
      }, 0); //initilize accumulator to 0;
      return sum;
    },
    totalCount() {
      // return this.tasks.length;
      return this.count;
    },
  },
  actions: {
    async getTasks() {
      this.loading = true;
      const results = await axios.get("http://localhost:3200/api/v1/tasks");
      console.log(results.data.tasks.tasks);
      console.log(results.data.count);
      this.tasks = await results.data.tasks.tasks;
      this.count = results.data.count;
      this.loading = false;
    },
    async addTask(task) {
      console.log(task);
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post(
        "http://localhost:3200/api/v1/tasks/create",
        task,
        config
      );
      console.log(res.data.tasks);
      // this.tasks.push(res.data.tasks);
      this.getTasks();
      if (res.error) {
        console.log(error);
      }
    },
    async deleteTask(id) {
      console.log(id);
      // this.tasks = this.tasks.filter((t) => {
      //   return t.id !== id;
      // });
      const res = await axios.delete(
        "http://localhost:3200/api/v1/tasks/" + id
      );
      if (res.error) {
        console.log(error);
      }
      this.getTasks();
    },
    async toggleFav(id) {
      const task = await axios.get("http://localhost:3200/api/v1/tasks/" + id);
      let toUpdate = task.data.tasks.task;

      // const body  = JSON.stringify({isFav = !toUpdate.isFav}),
      console.log(toUpdate.isFav);
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.patch(
        "http://localhost:3200/api/v1/tasks/" + id,
        { isFav: !toUpdate.isFav },
        config
      );
      if (res.error) {
        console.log(error);
      }
      this.getTasks();
    },

    async updateTask(id,task){
      const config = { headers: { "Content-Type": "application/json" } };
      console.log('id is ',id)
      const updateAtask = await axios.patch( "http://localhost:3200/api/v1/tasks/" + id,task,config);
      if (updateAtask.error) {
        console.log(error);
      }
      this.getTasks();
    }
  },
});