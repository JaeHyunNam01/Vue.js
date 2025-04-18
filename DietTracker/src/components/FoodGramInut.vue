<!-- components/FoodGramInput.vue -->
<template>
    <div>
      <h1>섭취량 입력 ({{ mealType }})</h1>
      <div v-if="food">
        <p>음식: {{ food.foodName }}</p>
        <p>브랜드: {{ food.brand }}</p>
        <p>기본 열량: {{ food.calories }}kcal/100g</p>
        <p>기본 탄수화물: {{ food.carbohydrates }}g/100g</p>
        <p>기본 단백질: {{ food.protein }}g/100g</p>
        <p>기본 지방: {{ food.fat }}g/100g</p>
        <input
          type="number"
          v-model.number="gram"
          placeholder="섭취 gram 입력"
        />
        <button @click="saveRecord">저장</button>
      </div>
      <div v-else>
        <p>선택된 음식 정보가 없습니다.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FoodGramInput",
    props: ["mealType"],
    data() {
      return {
        food: null,
        gram: 0,
      };
    },
    mounted() {
      // FoodSearch 또는 AddNewFood에서 선택된 음식 정보 전달
      if (this.$route.query.selectedFood) {
        this.food = JSON.parse(this.$route.query.selectedFood);
      }
    },
    methods: {
      saveRecord() {
        // 100g당 영양 정보를 기준으로 실제 섭취량 계산
        const ratio = this.gram / 100;
        const record = {
          foodId: this.food.id,
          foodName: this.food.foodName,
          brand: this.food.brand,
          gram: this.gram,
          calories: (this.food.calories * ratio).toFixed(1),
          carbohydrates: (this.food.carbohydrates * ratio).toFixed(1),
          protein: (this.food.protein * ratio).toFixed(1),
          fat: (this.food.fat * ratio).toFixed(1),
        };
  
        // 실제 개발 시, 이 record를 API를 통해 DB(MealRecord 테이블)에 저장합니다.
        alert("저장됨: " + JSON.stringify(record));
  
        // 저장 후 식단 리스트 페이지(MealList)로 이동
        this.$router.push({ name: "MealList" });
      },
    },
  };
  </script>
  