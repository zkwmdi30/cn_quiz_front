<template>
  <div class="menu-layout">
    <router-view />
  </div>
</template>

<script setup></script>

<style scoped>
.menu-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow-y: auto; /* 스크롤 허용 */
  overflow-x: hidden;
}
</style>
