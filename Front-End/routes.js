import { createWebHistory, createRouter } from "vue-router";
import TaskDetails from "./components/TaskDetails.vue";
import NewTask from "./components/NewTask.vue";
// import NotFound from "./components/NotFound.vue";

const routes = {
  "/": TaskDetails,
//   "/add-task": NewTask,
//   "/*": NotFound,
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
