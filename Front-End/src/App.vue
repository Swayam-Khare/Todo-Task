<template>
  <main>
    <header>
      <img src="../assets/pinia-logo.svg" alt="pinia-logo" />
      <h1>pinia-tasks</h1>
    </header>
    <div class="new-task-form">
      <NewTask />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Favorite Tasks</button>
      <button @click="filter = 'completed'">Completed Tasks</button>
      <button @click="filter = 'incomplete'">Incomplete Tasks</button>
      <!-- loading -->
      <div class="loading" v-if="taskStore.loading">Loading tasks ...</div>
      <!-- <button @click="taskStore.getData()" >data</button> -->
    </nav>

    <div class="task-list" v-if="filter === 'all'">
      <div v-for="task in taskStore.tasks" :key="task.id">
        <!-- <p>{{task.title }}</p> -->
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favTaskCount }} favs left to do</p>
      <div v-for="task in taskStore.favTasks" :key="task.id">
        <!-- <p>{{task.title }}</p> -->
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'completed'">
      <p>You have completed {{ taskStore.completedTaskCount }} tasks</p>
      <div v-for="task in taskStore.completedTasks" :key="task.id">
        <!-- <p>{{task.title }}</p> -->
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'incomplete'">
      <p>You have {{ taskStore.incompleteTaskCount }} tasks left to do</p>
      <div v-for="task in taskStore.incompleteTasks" :key="task.id">
        <!-- <p>{{task.title }}</p> -->
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
  <!-- <router-link to="/">TaskDetails<router-link/>
<router-link to="/add-task">NewTask<router-link/>
<router-view/> -->
</template>

<script>
import TaskDetails from "../components/TaskDetails.vue";
import NewTask from "../components/NewTask.vue";
import { useTaskStore } from "../store/taskStore";
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
   