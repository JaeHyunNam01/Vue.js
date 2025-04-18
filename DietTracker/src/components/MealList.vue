<!-- components/MealList.vue -->
<template>
  <div>
    <h1>식단 기록 페이지</h1>
    <input type="date" v-model="selectedDate" @change="fetchMealRecords" />
    <div v-if="selectedDate">
      <div v-for="meal in meals" :key="meal.type" class="meal-section">
        <h2>
          {{ meal.label }} 
          (총 칼로리: {{ calculateTotal(meal.records, 'calories') }}kcal)
        </h2>
        <ul>
          <li v-for="(record, index) in meal.records" :key="index">
            {{ record.foodName }} - {{ record.gram }}g : {{ record.calories }}kcal
          </li>
        </ul>
        <!-- "추가" 버튼 -->
        <button @click="goToFoodSearch(meal.type)">
          + {{ meal.label }} 식단 추가
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MealList",
  data() {
    return {
      selectedDate: "",
      // 더미 데이터를 사용 (실제 개발에서는 API 호출로 교체)
      meals: [
        { type: "breakfast", label: "아침 식사", records: [] },
        { type: "lunch", label: "점심 식사", records: [] },
        { type: "dinner", label: "저녁 식사", records: [] },
        { type: "snack", label: "간식", records: [] },
      ],
    };
  },
  methods: {
    fetchMealRecords() {
      // TODO: 선택된 날짜에 대한 식단 기록을 API에서 가져온 후 meals 배열 업데이트
      // 데모로 각 식사의 기록을 초기화
      this.meals.forEach((meal) => {
        meal.records = []; // 실제 데이터로 대체
      });
    },
    calculateTotal(records, field) {
      // 각 식사 기록의 영양 정보 합산 (문자열일 경우 parseFloat로 변환)
      return records.reduce((total, rec) => total + parseFloat(rec[field] || 0), 0);
    },
    goToFoodSearch(mealType) {
      // 선택한 식사 타입을 파라미터로 FoodSearch 페이지로 이동
      this.$router.push({ name: "FoodSearch", params: { mealType } });
    },
  },
};
</script>

<style scoped>
.meal-section {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
}
</style>
