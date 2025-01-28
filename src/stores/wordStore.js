import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useWordStore = defineStore("word", () => {
  const wordList = ref([]);
  const currentIndex = ref(0);
  const currentWord = computed(() => wordList.value[currentIndex.value]);

  const fetchWords = async (fileId) => {
    wordList.value = [];
    try {
      const response = await axios.get(
        `https://inappropriate-bobbie-developtogether-38ecbb17.koyeb.app/api/v1/file/${fileId}`
      );
      wordList.value = response.data.map((item) => ({
        chinese: item.question,
        korean: item.answer,
        pinyin: item.pinyin,
        options: item.options,
      }));
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const resetStore = () => {
    wordList.value = [];
    currentIndex.value = 0;
  };

  // Fetch words when the store is initialized
  // fetchWords();

  return { wordList, currentIndex, currentWord, fetchWords, resetStore };
});
