<template>
    <div>
      <h1>음식 검색</h1>
      <input v-model="query" @input="searchFood" placeholder="음식 이름을 입력하세요" />
      
      <div v-if="searchResults.length">
        <ul>
          <li v-for="food in searchResults" :key="food.id">
            {{ food.name }} ({{ food.brand }}) - {{ food.calories }}kcal
            <button @click="selectFood(food)">추가</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>검색 결과가 없습니다.</p>
        <button @click="goToAddFood">음식을 직접 추가</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  
  const query = ref('')
  const searchResults = ref([])
  
  const router = useRouter()
  const route = useRoute()
  
  const searchFood = () => {
    // TODO: DB에서 음식 검색하기 (지금은 목데이터)
    const allFoods = [
      { id: 1, name: '치킨', brand: 'BHC', calories: 250 },
      { id: 2, name: '치킨', brand: '교촌', calories: 270 },
    ]
    searchResults.value = allFoods.filter(f => f.name.includes(query.value))
  }
  
  const selectFood = (food) => {
    // 선택된 음식 정보와 함께 영양 입력 페이지로 이동
    router.push({
      name: 'NutritionInput',
      query: {
        ...route.query, // date, meal
        foodId: food.id,
        foodName: food.name,
        brand: food.brand,
        calories: food.calories
      }
    })
  }
  
  const goToAddFood = () => {
    router.push({
      name: 'AddFood',
      query: route.query
    })
  }
  </script>
  