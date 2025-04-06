<template>
  <div class="app-wrapper">
    <Calendar />
  </div>
</template>

<script setup>
import Calendar from './components/Calendar.vue'
</script>

<style>
/* 전체 화면 꽉 채우고 정중앙 정렬 */
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

.app-wrapper {
  display: flex;
  justify-content: center; /* 가로 중앙 */
  align-items: center;     /* 세로 중앙 */
  width: 100vw;
  height: 100vh;
  background-color: #f4f4f4;
}
</style>
