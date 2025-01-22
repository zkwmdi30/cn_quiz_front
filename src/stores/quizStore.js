import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useQuizStore = defineStore("quiz", () => {
  const quizList = ref([]);
  const selectedQuizFile = ref("");
  const fileCount = ref(0);

  const fetchQuizList = async () => {
    try {
      const response = await axios.get(
        "https://inappropriate-bobbie-developtogether-38ecbb17.koyeb.app/api/v1/getChineseQuizList"
      );
      quizList.value = response.data.fileNames;
      fileCount.value = response.data.fileCount;
    } catch (error) {
      console.error("Error fetching quiz list:", error);
    }
  };

  const selectQuiz = (quizFileName) => {
    selectedQuizFile.value = quizFileName;
  };

  return {
    quizList,
    selectedQuizFile,
    fileCount,
    fetchQuizList,
    selectQuiz,
  };
});
