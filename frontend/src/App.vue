<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <div class="loading" v-if="taskStore.loading">Loading tasks...</div>

    <!-- taks list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks" >
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} fav tasks left to do</p>
      <div v-for="task in taskStore.favs" >
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue';
import TaskDetails from './components/TaskDetails.vue'
import { useTaskStore } from './stores/TaskStore';
import TaskForm from './components/TaskForm.vue';

export default {
  components: {
    TaskDetails,
    TaskForm
  },
  setup() {
    const taskStore = useTaskStore();

    // fetch task
    taskStore.getTasks();

    const filter = ref('all')

    return { taskStore, filter }
  }
}
</script>