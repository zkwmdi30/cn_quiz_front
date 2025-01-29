<template>
  <div class="quiz-container">
    <template v-if="loading">
      <div class="loading-spinner">Loading...</div>
    </template>
    <template v-else>
      <div class="chinese-word">
        <h1>{{ currentWord.chinese }}</h1>
        <p class="pinyin">{{ currentWord.pinyin }}</p>
      </div>
      <div class="korean-options">
        <button
          v-for="option in currentOptions"
          :key="option"
          @click="checkAnswer(option)"
          class="option-btn"
          :class="{
            correct: selectedAnswer === option && isCorrect,
            wrong: selectedAnswer === option && !isCorrect,
          }"
          :disabled="isCorrect"
        >
          {{ option }}
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useWordStore } from "@/stores/wordStore";
import { useQuizStore } from "@/stores/quizStore";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useWordStore();
const quizStore = useQuizStore();
const selectedAnswer = ref("");
const isCorrect = ref(false);
const loading = ref(true);

const currentWord = computed(() => store.currentWord);
const currentOptions = computed(() => {
  if (!currentWord.value || !store.wordList.length) return [];

  // API에서 받은 options 배열을 직접 사용
  return currentWord.value.options;
});

const checkAnswer = (selected) => {
  selectedAnswer.value = selected;
  isCorrect.value = selected === currentWord.value.korean;

  if (isCorrect.value) {
    setTimeout(() => {
      store.currentIndex = (store.currentIndex + 1) % store.wordList.length;
      selectedAnswer.value = "";
      isCorrect.value = false;
    }, 200);
  }
};

// 라우터 가드 대신 onMounted에서 체크
onMounted(async () => {
  const quizParam = router.currentRoute.value.query.quiz;
  if (!quizParam) {
    router.push("/"); // 쿼리 파라미터가 없으면 메인으로 리다이렉트
    return;
  }

  quizStore.selectQuiz(quizParam);
  await store.fetchWords(quizParam);
  loading.value = false;
});

onBeforeUnmount(() => {
  store.resetStore();
});
</script>

<style scoped>
.quiz-container {
  width: 100%;
  height: 100vh; /* 전체 높이로 수정 */
  max-width: 600px;
  margin: 0 auto; /* 중앙 정렬 */
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  gap: 20px;
}

.loading-spinner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute; /* 절대 위치로 변경 */
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9); /* 배경 약간 투명하게 */
  z-index: 1000; /* 다른 요소들 위에 표시 */
}

.chinese-word {
  flex: 0 0 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
}

.chinese-word h1 {
  font-size: min(64px, 15vw);
  margin-block-end: 0em;
  color: #2c3e50;
}

.pinyin {
  margin-block-start: 0em;
  font-size: min(32px, 8vw);
  color: #7f8c8d;
  text-align: center;
}

.korean-options {
  flex: 1;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  padding: 0;
  min-height: 0;
}

.option-btn {
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: min(20px, 4.5vw);
  border: none;
  border-radius: 15px;
  background-color: white;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.option-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.option-btn.correct {
  background-color: #4caf50;
  color: white;
}

.option-btn.wrong {
  background-color: #f44336;
  color: white;
  animation: shake 0.5s;
}

/* Shake 애니메이션 추가 */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-5px);
  }
  40%,
  80% {
    transform: translateX(5px);
  }
}

/* Transition 효과 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

.option-btn:disabled {
  cursor: not-allowed;
}

.option-btn:disabled:not(.correct):not(.wrong) {
  opacity: 0.7;
}

/* 선택된 상태의 파란색 효과 제거 */
.option-btn:focus {
  outline: none; /* 포커스 시 파란색 테두리 제거 */
}

/* 최상위 레이아웃에 배경색 적용 */
:global(body),
:global(#app) {
  background-color: #f5f6fa;
}
</style>
