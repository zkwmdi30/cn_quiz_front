<template>
  <div class="app-container">
    <ASCIIArt />
    <router-view />
  </div>
</template>

<script setup>
import ASCIIArt from "./ASCIIArt.vue";
import { onMounted, onBeforeUnmount } from "vue";

// 뷰포트 높이 설정
const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

onMounted(() => {
  // 페이지가 로드되면 바로 실행
  setViewportHeight();

  // resize 이벤트 리스너 추가
  window.addEventListener("resize", setViewportHeight);
});

onBeforeUnmount(() => {
  // 컴포넌트가 언마운트되면 이벤트 리스너 제거
  window.removeEventListener("resize", setViewportHeight);
});
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(var(--vh) * 100);
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow-x: hidden; /* 가로 스크롤 방지 */
  overflow-y: hidden; /* 가로 스크롤 방지 */
}
</style>
