// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Calendar from '@/components/Calendar.vue'
import DietTracker from '@/components/DietTracker.vue'

const routes = [
  {
    path: '/',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/diet/:date',
    name: 'DietTracker',
    component: DietTracker,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
