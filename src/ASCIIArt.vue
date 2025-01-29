<script setup>
import { ref, onMounted } from "vue";

const asciiArt = ref(`
  ,ad8888ba,    88        88  88  888888888888
 d8"'    \`"8b   88        88  88           ,88
d8'        \`8b  88        88  88         ,88"
88          88  88        88  88       ,88"
88          88  88        88  88     ,88"
Y8,    "88,,8P  88        88  88   ,88"
 Y8a.    Y88P   Y8a.    .a8P  88  88"
  \`"Y8888Y"Y8a   \`"Y8888Y"'   88  888888888888
  
`);

onMounted(() => {
  console.log(asciiArt.value);
});
</script>

<style scoped>
.ascii-container {
  font-family: "Courier New", Courier, monospace;
  white-space: pre;
  text-align: center;
  padding: 20px;
  line-height: 1;
  font-size: 24px; /* 폰트 크기를 더 키웠습니다 */
  display: block;
  letter-spacing: 0;
}

pre {
  margin: 0;
  padding: 0;
}
</style>
