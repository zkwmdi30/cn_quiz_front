<template>
  <div class="quiz-container">
    <!-- 뷰포트 크기 표시 추가 -->
    <div class="viewport-size">{{ viewportSize }}</div>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="quiz-grid">
      <div
        v-for="quiz in quizList"
        :key="quiz"
        class="quiz-item"
        @click="handleQuizSelect(quiz)"
      >
        {{ formatQuizName(quiz) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuizStore } from "@/stores/quizStore";
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const quizStore = useQuizStore();
const loading = ref(true);

const quizList = computed(() => quizStore.quizList);

const handleQuizSelect = (quiz) => {
  const formattedQuiz = formatQuizName(quiz);
  quizStore.selectQuiz(formattedQuiz);
  router.push({
    path: "/word",
    query: { quiz: formattedQuiz },
  });
};

// 퀴즈 이름 포맷팅 (.json 제거)
const formatQuizName = (fileName) => {
  return fileName.replace(".json", "");
};

// 뷰포트 크기 상태 추가
const viewportSize = ref(`${window.innerWidth}px × ${window.innerHeight}px`);

// 리사이즈 이벤트 핸들러
const updateViewportSize = () => {
  viewportSize.value = `${window.innerWidth}px × ${window.innerHeight}px`;
};

onMounted(async () => {
  await quizStore.fetchQuizList();
  loading.value = false;
  window.addEventListener("resize", updateViewportSize);
});

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener("resize", updateViewportSize);
});
</script>

<style scoped>
.quiz-container {
  padding: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  max-width: 600px;
  margin: 0 auto;
}

/* body와 #app에 overflow-x: hidden 추가 */
:global(body),
:global(#app) {
  background-color: #f5f6fa;
  overflow-x: hidden;
  overflow-y: hidden;

  margin: 0;
  padding: 0;
}

.quiz-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 100%;
  padding-bottom: 60px;
}

.quiz-item {
  background-color: white;
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  font-size: min(15px, 6vw);
  cursor: pointer;
  height: calc(
    (100vh - 200px) / 2.3
  ); /* 2.3으로 나누어 아래 항목이 살짝 보이게 */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: #2c3e50;
}

.quiz-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1000;
}

.viewport-size {
  position: fixed;
  top: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1001;
}
</style>
