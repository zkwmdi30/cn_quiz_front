<!-- src/components/ProgressBar.vue -->
<template>
  <div class="progress-bar">
    <div class="progress-fill" :style="{ width: progressWidth }"></div>
  </div>
</template>

<script setup>
import { useWordStore } from "../stores/wordStore";
import { computed } from "vue";

const store = useWordStore();
const progressWidth = computed(() => {
  const { wordList, currentIndex } = store;
  return wordList.length > 0
    ? `${((currentIndex + 1) / wordList.length) * 100}%`
    : "0%";
});
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}
</style>
