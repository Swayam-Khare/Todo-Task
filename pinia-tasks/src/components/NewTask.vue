<template>
<form @submit="handleSubmit">
    <input type="text" placeholder="I need to ..." v-model="newTask" />
    <input type="text" placeholder="Description.." v-model="description" />
    <button type="submit">Add</button>
</form>
</template>

<script>
import {
    ref
} from 'vue';
import {
    useTaskStore
} from '../../store/taskStore';

export default {
    name: 'NewTask',
    setup() {

        const taskstore = useTaskStore();
        const newTask = ref('');
        const description = ref('');
        const handleSubmit = (e) => {
            e.preventDefault();
            // console.log(newTask.value);
            if (newTask.value.length > 0 && description.value.length > 0) {
                taskstore.addTask({
                    title: newTask.value,
                    description: description.value,
                    isFav: false,
                    // id: JSON.stringify(Math.floor(Math.random() * 1000000)),
                })
                newTask.value = '';
                description.value = '';
            }
        }

        return {
            newTask,
            description,
            handleSubmit
        }
    }
}
</script>
