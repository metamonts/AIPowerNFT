

<template>
<!-- <Home/> -->
<router-view v-slot="{ Component }">
    <keep-alive :include="keepAliveRoutes" :max="10">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script setup>

import { useCacheStore } from "@/store/cache";
const keepAliveRoutes = useCacheStore().getViews;
</script>
<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.title-top{
    text-align: center;
    padding:30px;
}
</style>
