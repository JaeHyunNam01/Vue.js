<template>
    <div>
      <h1>식단 기록</h1>
      <input type="date" v-model="selectedDate" />
      
      <div v-for="meal in meals" :key="meal">
        <h2>{{ meal }}</h2>
        <ul>
          <li v-for="item in getMealItems(meal)" :key="item.id">
            {{ item.name }} ({{ item.calories }}kcal)
          </li>
        </ul>
        <button @click="goToSearch(meal)">음식 추가</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const selectedDate = ref('2024-04-01')
  
  const meals = ['아침', '점심', '저녁', '간식']
  const dietData = ref({
    '2024-04-01': {
      '아침': [{ id: 1, name: '계란', calories: 78 }],
      '점심': [],
      '저녁': [],
      '간식': []
    }
  })
  
  const getMealItems = (meal) => {
    return dietData.value[selectedDate.value]?.[meal] || []
  }
  
  const goToSearch = (meal) => {
    router.push({ name: 'Search', query: { date: selectedDate.value, meal } })
  }
  </script>
  