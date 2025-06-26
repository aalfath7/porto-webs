<template>
  <div class="bg-gray-900 pt-20">
    <div class="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <div
        class="bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-700"
      >
        <h2 class="text-2xl font-bold text-gray-100 mb-6">
          Create New Project
        </h2>
        <form
          @submit.prevent="submitForm"
          enctype="multipart/form-data"
          class="space-y-6"
        >
          <div>
            <label
              for="title"
              class="block text-sm font-medium text-gray-300 mb-1"
              >Title</label
            >
            <input
              type="text"
              id="title"
              v-model="form.title"
              placeholder="Enter title"
              required
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-100 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              for="link"
              class="block text-sm font-medium text-gray-300 mb-1"
              >Link</label
            >
            <input
              type="url"
              id="link"
              v-model="form.link"
              placeholder="https://example.com"
              required
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-100 placeholder-gray-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1"
              >Image</label
            >
            <div class="flex items-center">
              <label
                class="flex flex-col items-center px-4 py-2 bg-gray-700 rounded-md border border-gray-600 cursor-pointer hover:bg-gray-600 transition"
              >
                <span class="text-sm text-gray-300">Choose file</span>
                <input type="file" ref="fileInput" class="hidden" />
              </label>
              <span
                class="ml-2 text-sm text-gray-400"
                v-if="!fileInput?.files?.length"
                >No file chosen</span
              >
              <span class="ml-2 text-sm text-gray-300" v-else>{{
                fileInput.files[0].name
              }}</span>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out transform hover:scale-105"
          >
            Create Item
          </button>
        </form>
      </div>

      <h2 class="text-2xl font-bold text-gray-100 mb-6">Your Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in items"
          :key="item._id"
          class="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-gray-700"
        >
          <div class="h-48 overflow-hidden">
            <img :src="item.image" class="w-full h-full object-cover" />
          </div>
          <div class="p-4">
            <h3 class="font-bold text-lg text-gray-100 mb-2">
              {{ item.title }}
            </h3>
            <a
              :href="item.link"
              target="_blank"
              class="text-blue-400 hover:text-blue-300 text-sm truncate block mb-4"
            >
              {{ item.link }}
            </a>
            <div class="flex justify-end">
              <button
                @click="deleteItem(item._id)"
                class="text-red-400 hover:text-red-300 font-medium text-sm flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "page",
});

interface Item {
  _id: string;
  title: string;
  link: string;
  image: string;
}

const form = reactive({
  title: "",
  link: "",
});

const fileInput = ref<HTMLInputElement | null>(null);
const items = ref<any[]>([]);

const fetchItems = async () => {
  items.value = await $fetch<Item[]>("/api/items");
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("link", form.link);
  if (fileInput.value?.files?.[0]) {
    formData.append("image", fileInput.value.files[0]);
  }

  await $fetch("/api/items", {
    method: "POST",
    body: formData,
  });

  form.title = "";
  form.link = "";
  if (fileInput.value) fileInput.value.value = "";

  fetchItems();
};

const deleteItem = async (id: string) => {
  await $fetch(`/api/items/${id}`, { method: "DELETE" });
  fetchItems();
};

onMounted(fetchItems);
</script>
