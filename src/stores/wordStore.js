import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useWordStore = defineStore("word", () => {
  const wordList = ref([]);
  const currentIndex = ref(0);
  const currentWord = computed(() => wordList.value[currentIndex.value]);

  const fetchWords = async () => {
    try {
      const response = await axios.get(
        "http://192.168.68.129:8080/api/v1/getChineseWord"
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

  // Fetch words when the store is initialized
  // fetchWords();

  return { wordList, currentIndex, currentWord, fetchWords };
});
