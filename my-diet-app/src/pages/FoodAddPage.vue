<template>
    <div>
      <h1>새 음식 등록</h1>
      <label>브랜드</label>
      <input v-model="brand" />
  
      <label>음식 이름</label>
      <input v-model="name" />
  
      <button @click="goToNutritionInput">다음 (영양정보 입력)</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  
  const brand = ref('')
  const name = ref('')
  
  const router = useRouter()
  const route = useRoute()
  
  const goToNutritionInput = () => {
    router.push({
      name: 'NutritionInput',
      query: {
        ...route.query,
        foodName: name.value,
        brand: brand.value,
        isCustom: true
      }
    })
  }
  </script>
  