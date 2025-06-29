<template>
  <div class="max-w-2xl mx-auto p-6">
    <div v-if="item">
      <h1 class="text-3xl font-bold mb-4">{{ item.title }}</h1>
      <img :src="item.image" alt="Item image" class="w-full mb-4 rounded" />
      <p class="text-gray-700 mb-2 whitespace-pre-line">{{ item.desc }}</p>
      <p class="text-sm text-blue-600 mb-2">
        <a :href="item.link" target="_blank" rel="noopener noreferrer">
          {{ item.link }}
        </a>
      </p>
      <div class="flex flex-wrap gap-2 mt-4">
        <span
          v-for="tag in item.tags"
          :key="tag"
          class="px-2 py-1 bg-gray-200 rounded text-sm"
        >
          #{{ tag }}
        </span>
      </div>
      <div class="mt-4">
        <span class="text-sm">Warna: </span>
        <span
          class="inline-block w-4 h-4 rounded-full"
          :class="item.color"
        ></span>
      </div>
    </div>
    <div v-else-if="error">
      <p class="text-red-500 text-center">Gagal memuat item.</p>
    </div>
    <div v-else>
      <p class="text-gray-500 text-center">Loading item...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "#imports";

interface Item {
  _id: string;
  title: string;
  link: string;
  desc: string;
  tags: string[];
  image: string;
  color: string;
}

const route = useRoute();
const item = ref<Item | null>(null);
const error = ref<Error | null>(null);

onMounted(async () => {
  try {
    const res = await $fetch<{ message: string; item: Item }>(
      `/api/items/${route.params.id}`
    );
    item.value = res.item;
  } catch (err) {
    error.value = err as Error;
    console.error(err);
  }
});
</script>
