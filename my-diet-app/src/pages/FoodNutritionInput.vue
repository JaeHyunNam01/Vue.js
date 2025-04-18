<template>
    <div>
      <h1>영양 정보 입력</h1>
      <p>{{ food.brand }} - {{ food.name }}</p>
  
      <label>칼로리 (kcal)</label>
      <input v-model.number="food.calories" type="number" />
  
      <label>탄수화물 (g)</label>
      <input v-model.number="food.carbs" type="number" />
  
      <label>단백질 (g)</label>
      <input v-model.number="food.protein" type="number" />
  
      <label>지방 (g)</label>
      <input v-model.number="food.fat" type="number" />
  
      <label>섭취량 (g)</label>
      <input v-model.number="gram" type="number" />
  
      <button @click="save">저장</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  
  const food = ref({
    name: route.query.foodName || '',
    brand: route.query.brand || '',
    calories: route.query.calories || 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  })
  
  const gram = ref(100)
  
  const save = () => {
    // TODO: DB에 저장
  
    console.log('저장됨:', {
      ...food.value,
      gram: gram.value
    })
  
    // 저장 후 식단 페이지로 돌아가기
    router.push({
      name: 'Diet',
      query: {
        date: route.query.date,
        meal: route.query.meal
      }
    })
  }
  </script>
  