// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import DietPage from '../pages/DietPage.vue'
import FoodSearchPage from '../pages/FoodSearchPage.vue'
import FoodAddPage from '../pages/FoodAddPage.vue'
import FoodNutritionInput from '../pages/FoodNutritionInput.vue'

const routes = [
  { path: '/', name: 'Diet', component: DietPage },
  { path: '/search', name: 'Search', component: FoodSearchPage },
  { path: '/add-food', name: 'AddFood', component: FoodAddPage },
  { path: '/nutrition', name: 'NutritionInput', component: FoodNutritionInput },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
