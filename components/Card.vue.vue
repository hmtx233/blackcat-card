<script setup lang="ts">
defineProps({
  title: String,
  content: String,
  imageUrl: String,
});
</script>

<template>
  <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
    <img v-if="imageUrl" :src="imageUrl" alt="Card image" class="w-full" />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ title }}</div>
      <p class="text-gray-700 text-base">{{ content }}</p>
    </div>
  </div>
</template>
