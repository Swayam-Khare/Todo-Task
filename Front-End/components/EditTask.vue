<template>
  <div v-if="isShow">
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="I need to ..." v-model="newTaskTitle" />
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../store/taskStore";

export default {
  name: "NewTask",
  props: {
    task: Object,
    showComponent: Boolean,
  },
  setup(props) {
    const taskstore = useTaskStore();
    const newTaskTitle = ref(props.task.title);
    const isShow = ref(true);

    const handleSubmit = () => {
      // e.preventDefault();
      // console.log(newTask.value);
      if (newTaskTitle.value.length > 0) {
        taskstore.EditTask(props.task.id, {
          title: newTaskTitle.value,
          isFav: false,
          isCompleted: false,
          // id: Math.floor(Math.random() * 1000000),
        });
        newTaskTitle.value = "";
        isShow.value = false;
      }
    };

    return {
      newTaskTitle,
      handleSubmit,
      isShow,
    };
  },
};
</script>
