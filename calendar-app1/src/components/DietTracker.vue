<template>
    <div class="diet-tracker">
      <h2>{{ date }} 식단 관리</h2>
      <textarea v-model="dietNote" placeholder="식단 내용을 입력하세요..."></textarea>
      <button @click="saveDiet">저장</button>
      <button @click="goBack">뒤로가기</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  
  const date = route.params.date
  const dietNote = ref('')
  
  const saveDiet = () => {
    localStorage.setItem(`diet-${date}`, dietNote.value)
    alert('식단이 저장되었습니다!')
  }
  
  const goBack = () => {
    router.push('/')
  }
  
  onMounted(() => {
    const saved = localStorage.getItem(`diet-${date}`)
    if (saved) {
      dietNote.value = saved
    }
  })
  </script>
  
  <style scoped>
  .diet-tracker {
    padding: 2rem;
    background-color: #1e1e1e;
    color: white;
    min-height: 100vh;
  }
  
  textarea {
    width: 100%;
    height: 200px;
    background: #2e2e2e;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
  }
  
  button {
    margin-top: 1rem;
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    background-color: #e67e22;
    color: white;
    cursor: pointer;
  }
  </style>
  