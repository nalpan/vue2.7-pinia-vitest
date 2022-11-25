import { defineStore } from 'pinia'
import { ref } from 'vue'
import { task, fetchTasks } from "../repositories/todo.repo";

export const TodoStore = defineStore('TodoStore', () => {
  let tasks = ref<task[]>([])
  async function loadTasks() {
    const response = await fetchTasks();
    tasks.value = response;
  }
  return { tasks, loadTasks };
})
