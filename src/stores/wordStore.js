import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useWordStore = defineStore("word", () => {
  const wordList = ref([
    { chinese: "你好", korean: "안녕하세요", pinyin: "nǐ hǎo" },
    { chinese: "谢谢", korean: "감사합니다", pinyin: "xiè xie" },
    { chinese: "再见", korean: "안녕히 가세요", pinyin: "zài jiàn" },
    { chinese: "对不起", korean: "죄송합니다", pinyin: "duì bù qǐ" },
    { chinese: "没关系", korean: "괜찮습니다", pinyin: "méi guān xi" },
    { chinese: "我爱你", korean: "사랑해요", pinyin: "wǒ ài nǐ" },
    { chinese: "好的", korean: "좋아요", pinyin: "hǎo de" },
    { chinese: "请问", korean: "실례합니다", pinyin: "qǐng wèn" },
  ]);

  const currentIndex = ref(0);
  const currentWord = computed(() => wordList.value[currentIndex.value]);

  return { wordList, currentIndex, currentWord };
});
