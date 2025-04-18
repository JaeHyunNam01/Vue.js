<!-- components/FoodSearch.vue -->
<template>
  <div>
    <h1>음식 검색 ({{ mealType }})</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="음식 이름 입력"
      @keyup.enter="searchFood"
    />
    <button @click="searchFood">검색</button>
    <div v-if="foods.length">
      <ul>
        <li v-for="food in foods" :key="food.id">
          {{ food.foodName }} ({{ food.brand }}) - {{ food.calories }}kcal/100g
          <button @click="selectFood(food)">선택</button>
        </li>
      </ul>
    </div>
    <p v-else>검색 결과가 없습니다.</p>
    <button @click="goToAddNewFood">음식이 없으신가요? 새 음식 추가</button>
  </div>
</template>

<script>
export default {
  name: "FoodSearch",
  props: ["mealType"],
  data() {
    return {
      searchQuery: "",
      foods: [], // 검색 결과 리스트
    };
  },
  methods: {
    searchFood() {
      // 실제로는 API 호출을 통해 DB Food 테이블에서 검색
      // 데모용 더미 데이터 생성
      if (this.searchQuery.trim() !== "") {
        this.foods = [
          {
            id: 1,
            brand: "브랜드A",
            foodName: this.searchQuery + " 음식1",
            calories: 200,
            carbohydrates: 20,
            protein: 10,
            fat: 5,
          },
          {
            id: 2,
            brand: "브랜드B",
            foodName: this.searchQuery + " 음식2",
            calories: 250,
            carbohydrates: 25,
            protein: 12,
            fat: 8,
          },
        ];
      } else {
        this.foods = [];
      }
    },
    selectFood(food) {
      // 선택된 음식 정보를 query에 담아 FoodGramInput 페이지로 전달
      this.$router.push({
        name: "FoodGramInput",
        params: { mealType: this.mealType },
        query: { selectedFood: JSON.stringify(food) },
      });
    },
    goToAddNewFood() {
      this.$router.push({
        name: "AddNewFood",
        params: { mealType: this.mealType },
      });
    },
  },
};
</script>
