<template>
  <div v-if="showComponent">
  <AllDetails :task="task" :showComponent="showComponent" />
</div>
<div class="task">
<h4>{{ task.title }}</h4>
<p>{{ task.description }}</p>
<div class="icons">
    <i class="material-icons" @click="toggleComponent">edit</i>
    <i class="material-icons" @click="taskStore.deleteTask(task.id)">delete</i>
    <i class="material-icons" :class="{ active: task.isFav }" @click="taskStore.toggleFav(task.id)">favorite</i>
    <!-- <span class="material-symbols-outlined">
        edit
    </span> -->
</div>

</div>
</template>

<script>
import AllDetails from "./AllDetails.vue";
import { ref } from "vue";
import {
useTaskStore
} from "../stores/TaskStore";
export default {
name: "TaskDetails",
props: {
    task: Object,
},
components: {
    AllDetails
},
methods: {
    // clickHandler() {
      
    //     showComponent.value = !showComponent.value;
    //     console.log("i got clicked",showComponent.vlaue);
    //     // <AllDetails/>
    //     // <router-link to='/details'></router-link>
    // }
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
        toggleComponent
    };
},
};
</script>