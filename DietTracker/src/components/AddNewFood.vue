<!-- components/AddNewFood.vue -->
<template>
    <div>
      <h1>새 음식 추가 ({{ mealType }})</h1>
      <div v-if="step === 1">
        <h2>음식 기본 정보 입력</h2>
        <input type="text" v-model="newFood.brand" placeholder="브랜드" />
        <input type="text" v-model="newFood.foodName" placeholder="음식 이름" />
        <button @click="nextStep">다음</button>
      </div>
      <div v-else-if="step === 2">
        <h2>영양 정보 입력</h2>
        <input
          type="number"
          v-model.number="newFood.calories"
          placeholder="칼로리 (kcal/100g)"
        />
        <input
          type="number"
          v-model.number="newFood.carbohydrates"
          placeholder="탄수화물 (g/100g)"
        />
        <input
          type="number"
          v-model.number="newFood.protein"
          placeholder="단백질 (g/100g)"
        />
        <input
          type="number"
          v-model.number="newFood.fat"
          placeholder="지방 (g/100g)"
        />
        <button @click="saveNewFood">저장</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AddNewFood",
    props: ["mealType"],
    data() {
      return {
        step: 1,
        newFood: {
          brand: "",
          foodName: "",
          calories: 0,
          carbohydrates: 0,
          protein: 0,
          fat: 0,
        },
      };
    },
    methods: {
      nextStep() {
        if (!this.newFood.brand || !this.newFood.foodName) {
          alert("브랜드와 음식 이름을 입력해주세요.");
          return;
        }
        this.step = 2;
      },
      saveNewFood() {
        if (this.newFood.calories <= 0) {
          alert("유효한 칼로리를 입력하세요.");
          return;
        }
        // 실제 개발 시 API 호출을 통해 Food 테이블에 새 음식을 등록
        // 데모에서는 현재 시간을 ID로 사용
        this.newFood.id = new Date().getTime();
        alert("새 음식이 등록되었습니다: " + JSON.stringify(this.newFood));
        
        // 등록 후 FoodGramInput 페이지로 이동하여 gram 입력 화면으로 전환
        this.$router.push({
          name: "FoodGramInput",
          params: { mealType: this.mealType },
          query: { selectedFood: JSON.stringify(this.newFood) },
        });
      },
    },
  };
  </script>
  