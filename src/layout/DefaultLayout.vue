<template>
  <div>
    <Topbar />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Topbar from '../components/Topbar.vue';
</script>

<style scoped>
.container {
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
