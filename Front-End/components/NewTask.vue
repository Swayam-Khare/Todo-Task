<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to ..." v-model="newTaskTitle" />
    <button type="submit">Add</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../store/taskStore";

export default {
  name: "NewTask",
  setup() {
    const taskstore = useTaskStore();
    const newTaskTitle = ref("");

    const handleSubmit = () => {
      // e.preventDefault();
      // console.log(newTask.value);
      if (newTaskTitle.value.length > 0) {
        taskstore.addTask({
          title: newTaskTitle.value,
          isFav: false,
          isCompleted: false,
          // id: Math.floor(Math.random() * 1000000),
        });
        newTaskTitle.value = "";
      }
    };

    return {
      newTaskTitle,
      handleSubmit,
    };
  },
};
</script>
