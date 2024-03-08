<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia-logo" />
      <h1>pinia-tasks</h1>
    </header>
    <div class="new-task-form">
      <NewTask />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All</button>
      <button @click="filter = 'favs'">favorite</button>
      <!-- loading -->
      <div class="loading" v-if="taskStore.loading">Loading tasks ...</div>
      <!-- <button @click="taskStore.getData()" >data</button> -->
    </nav>
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <!-- <p>{{task.title }}</p> -->
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} favs left to do</p>
      <div v-for="task in taskStore.favs" :key="task.id">
        <!-- <p>{{task.title }}</p> -->
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import TaskDetails from "./components/TaskDetails.vue";
import NewTask from "./components/NewTask.vue";
import { useTaskStore } from "./stores/TaskStore";
import { ref } from "vue";

export default {
  components: {
    TaskDetails,
    NewTask,
  },
  setup() {
    const taskStore = useTaskStore();
    taskStore.getTasks();
    const filter = ref("all");

    return {
      taskStore,
      filter,
    };
  },
};
</script>