<template>
  <div class="bg-gray-900">
    <div class="max-w-2xl mx-auto p-6 min-h-screen text-gray-100">
      <NuxtLink
        to="/"
        class="inline-flex items-center mb-6 text-gray-400 hover:text-gray-300 transition-colors group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Back to Home</span>
      </NuxtLink>
      <div v-if="item" class="space-y-6">
        <!-- Header Section -->
        <div class="space-y-2">
          <h1
            class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            {{ item.title }}
          </h1>
          <div
            class="w-full h-px bg-gradient-to-r from-purple-500/30 to-pink-500/30"
          ></div>
        </div>

        <!-- Image Section -->
        <div class="relative group">
          <img
            :src="item.image"
            alt="Item image"
            class="w-full rounded-xl shadow-2xl transition-all duration-300 transform group-hover:scale-[1.01] border border-gray-700/50"
          />
          <div
            class="absolute inset-0 rounded-xl bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
        </div>

        <!-- Description Section -->
        <div class="space-y-4">
          <p class="text-gray-300 whitespace-pre-line leading-relaxed">
            {{ item.desc }}
          </p>

          <!-- Link Section -->
          <a
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span class="truncate max-w-xs md:max-w-md">{{ item.link }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        <!-- Tags Section -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in item.tags"
            :key="tag"
            class="px-3 py-1 bg-gray-800 rounded-full text-sm text-purple-300 border border-gray-700 hover:bg-gray-700/50 transition-colors"
          >
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- Loading and Error States -->
      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center h-64"
      >
        <div class="text-red-400 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Gagal memuat item</span>
        </div>
      </div>

      <div v-else class="flex items-center justify-center h-64">
        <div class="flex items-center space-x-2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Memuat item...</span>
        </div>
      </div>
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
