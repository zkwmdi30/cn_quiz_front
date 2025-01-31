<template>
  <div class="quiz-layout">
    <ProgressBar />
    <router-view />
  </div>
</template>

<script setup>
import ProgressBar from "@/components/ProgressBar.vue";
</script>

<style scoped>
.quiz-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(var(--vh) * 100);
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  /* Add any additional quiz layout styles here */
}
</style>
