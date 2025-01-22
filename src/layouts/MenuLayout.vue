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
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
