<template>
    <div class="calendar-wrapper">
      <div class="calendar">
        <div class="header">
          <button @click="prevMonth">◀</button>
          <h2>{{ year }}년 {{ month + 1 }}월</h2>
          <button @click="nextMonth">▶</button>
        </div>
        <div class="days">
          <div v-for="day in weekDays" :key="day" class="day-name">{{ day }}</div>
          <div
            v-for="(date, index) in calendarDays"
            :key="index"
            class="day"
            :class="{ empty: !date, today: isToday(date) }"
          >
            <span>{{ date }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const today = new Date()
  const currentDate = today.getDate()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  
  const year = ref(currentYear)
  const month = ref(currentMonth)
  
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']
  
  const calendarDays = computed(() => {
    const firstDay = new Date(year.value, month.value, 1)
    const lastDate = new Date(year.value, month.value + 1, 0).getDate()
    const startDay = firstDay.getDay()
    const days = []
  
    for (let i = 0; i < startDay; i++) {
      days.push('')
    }
  
    for (let i = 1; i <= lastDate; i++) {
      days.push(i)
    }
  
    return days
  })
  
  function isToday(date) {
    return (
      date &&
      date === currentDate &&
      month.value === currentMonth &&
      year.value === currentYear
    )
  }
  
  function prevMonth() {
    if (month.value === 0) {
      month.value = 11
      year.value -= 1
    } else {
      month.value -= 1
    }
  }
  
  function nextMonth() {
    if (month.value === 11) {
      month.value = 0
      year.value += 1
    } else {
      month.value += 1
    }
  }
  </script>
  
  <style scoped>
  /* 배경 및 중앙 정렬 */
  .calendar-wrapper {
    width: 100vw;
    height: 100vh;
    background-color: #1e1e1e;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Segoe UI', sans-serif;
    color: #ddd;
  }
  
  .calendar {
    width: 90vw;
    max-width: 900px;
    background-color: #2e2e2e;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  }
  
  /* 상단 월/이동 */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    color: #fff;
  }
  
  .header h2 {
    font-weight: 500;
  }
  
  /* 요일 + 날짜 */
  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
  }
  
  .day-name {
    text-align: center;
    font-weight: 600;
    padding: 0.5rem 0;
    color: #aaa;
    font-size: 0.9rem;
  }
  
  /* 날짜 셀 */
  .day {
    aspect-ratio: 1 / 1;
    text-align: center;
    font-size: 1rem;
    border-radius: 6px;
    padding: 0.5rem 0;
    background-color: #3a3a3a;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #eee;
  }
  
  /* 비어있는 칸 */
  .empty {
    background-color: transparent;
    border: none;
  }
  
  /* 오늘 날짜 스타일 */
  .today {
    background-color: #2e2e2e;
  }
  
  .today span {
    background-color: #e74c3c;
    color: white;
    padding: 6px 10px;
    border-radius: 999px;
    font-weight: bold;
  }
  </style>
  