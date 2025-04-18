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
          @click="date && openModal(date)"
        >
          <span>{{ date }}</span>
          <div class="event-preview" v-if="getEvent(date)?.title">
            {{ getEvent(date).title }}
          </div>
        </div>
      </div>
    </div>

    <!-- 일정 등록/보기 모달 -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h3>{{ modalDate }} 일정</h3>
        <input v-model="eventTitle" placeholder="제목" />
        <textarea v-model="eventContent" placeholder="상세 내용"></textarea>
        <div class="modal-buttons">
          <button @click="saveEvent">저장</button>
          <button @click="deleteEvent">삭제</button>
          <button @click="goToDietPage">식단 관리</button>
          <button @click="closeModal">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

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

// 일정 관련
const schedules = ref({})
const showModal = ref(false)
const modalDate = ref('')
const eventTitle = ref('')
const eventContent = ref('')

const openModal = (day) => {
  const dateKey = formatDateKey(year.value, month.value, day)
  modalDate.value = dateKey

  const event = schedules.value[dateKey]
  eventTitle.value = event?.title || ''
  eventContent.value = event?.content || ''

  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveEvent = () => {
  schedules.value[modalDate.value] = {
    title: eventTitle.value,
    content: eventContent.value
  }
  closeModal()
}

const deleteEvent = () => {
  delete schedules.value[modalDate.value]
  closeModal()
}

const getEvent = (day) => {
  const key = formatDateKey(year.value, month.value, day)
  return schedules.value[key]
}

const formatDateKey = (y, m, d) => {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

// localStorage 연동
const loadSchedules = () => {
  const saved = localStorage.getItem('schedules')
  if (saved) {
    schedules.value = JSON.parse(saved)
  }
}

const saveSchedules = () => {
  localStorage.setItem('schedules', JSON.stringify(schedules.value))
}

loadSchedules()
watch(schedules, saveSchedules, { deep: true })

// Vue Router 사용
const router = useRouter()

const goToDietPage = () => {
  router.push({ name: 'DietTracker', params: { date: modalDate.value } })
}
</script>

<style scoped>
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: #fff;
}

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

.day {
  aspect-ratio: 1 / 1;
  text-align: center;
  font-size: 1rem;
  border-radius: 6px;
  padding: 0.5rem 0;
  background-color: #3a3a3a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #eee;
  cursor: pointer;
}

.empty {
  background-color: transparent;
  border: none;
}

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

.event-preview {
  margin-top: 4px;
  font-size: 0.8rem;
  background-color: #444;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* 모달 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #2e2e2e;
  padding: 1.5rem;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
}

.modal-content input,
.modal-content textarea {
  padding: 8px;
  border: none;
  border-radius: 4px;
  resize: none;
  background: #444;
  color: white;
}

.modal-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
}

.modal-buttons button {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #e67e22;
  color: white;
  cursor: pointer;
}

.modal-buttons button:nth-child(2) {
  background-color: #c0392b;
}

.modal-buttons button:nth-child(3) {
  background-color: #3498db;
}

.modal-buttons button:nth-child(4) {
  background-color: #7f8c8d;
}
</style>
