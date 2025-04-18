// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MealList from '../components/MealList.vue'
import FoodSearch from '../components/FoodSearch.vue'
import FoodGramInput from '../components/FoodGramInput.vue'
import AddNewFood from '../components/AddNewFood.vue'

const routes = [
  { path: '/', name: 'MealList', component: MealList },
  { path: '/food-search/:mealType', name: 'FoodSearch', component: FoodSearch, props: true },
  { path: '/food-gram-input/:mealType', name: 'FoodGramInput', component: FoodGramInput, props: true },
  { path: '/add-new-food/:mealType', name: 'AddNewFood', component: AddNewFood, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
