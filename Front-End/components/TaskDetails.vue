<template>
  <div>
  <div v-if="showComponent">
      <EditTask :task="task" :showComponent="showComponent" />
    </div>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i class="material-symbols-outlined" @click="toggleComponent">edit</i>
      <i
        class="material-icons"
        :class="{ active: task.isFav }"
        @click="taskStore.addToFav(task.id)"
        >favorite</i
      >
      <i
        class="material-symbols-outlined"
        :class="{ active: task.isCompleted }"
        @click="taskStore.completeTask(task.id)"
        >task_alt</i
      >
      <i class="material-icons" @click="taskStore.deleteTask(task.id)">delete</i>
    </div>
  </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../store/taskStore";
import EditTask from "./EditTask.vue";

export default {
  name: "TaskDetails",
  props: {
    task: Object,
  },
  components: {
    EditTask,
  },
  setup() {
    const taskStore = useTaskStore();
    const showComponent = ref(false);
    const toggleComponent = () => {
      showComponent.value = !showComponent.value;
    };

    return {
      taskStore,
      showComponent,
      toggleComponent,
    };
  },
};
</script>
