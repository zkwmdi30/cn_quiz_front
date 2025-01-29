<template>
  <router-view />
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow-x: hidden; /* 가로 스크롤 방지 */
  overflow-y: hidden; /* 가로 스크롤 방지 */
}
</style>
