<template>
<div v-if="isShow">
    <form @submit="handleSubmit">
        <input type="text" placeholder="I need to ..." v-model="newTask" />
        <input type="text" placeholder="Description.." v-model="description" />
        <button type="submit">update</button>
       
    </form>
</div>
</template>

<script>
import {
    ref,
    computed
} from 'vue';
import {
    useTaskStore
} from '../../store/taskStore';

export default {
    name: 'NewTask',
    props: {
        task: Object,
        showComponent: Boolean,
    },
    setup(props) {

        const taskstore = useTaskStore();
        const newTask = ref(props.task.title);
        const description = ref(props.task.description);
        const isShow = ref(true);

        const handleSubmit = (e) => {
            e.preventDefault();

            if (newTask.value.length > 0 && description.value.length > 0) {
                taskstore.updateTask(props.task.id, {
                    title: newTask.value,
                    description: description.value,
                })
                newTask.value = '';
                description.value = '';
                isShow.value = false;

            }

        }

        return {
            newTask,
            description,
            handleSubmit,
            isShow
        }
    }
}
</script>
