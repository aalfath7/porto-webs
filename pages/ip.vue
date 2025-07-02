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
            <label
              for="desc"
              class="block text-sm font-medium text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="desc"
              v-model="form.desc"
              placeholder="Enter description"
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-100 placeholder-gray-400"
            ></textarea>
          </div>

          <div>
            <label
              for="tags"
              class="block text-sm font-medium text-gray-300 mb-1"
            >
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              v-model="form.tags"
              placeholder="design, nuxt, vue"
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-100 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              for="color"
              class="block text-sm font-medium text-gray-300 mb-1"
            >
              Background Color (Tailwind class)
            </label>
            <input
              type="text"
              id="color"
              v-model="form.color"
              placeholder="bg-blue-600"
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
                <input
                  type="file"
                  ref="fileInput"
                  class="hidden"
                  @change="handleFileChange"
                />
              </label>
              <span class="ml-2 text-sm text-gray-400" v-if="!selectedFileName">
                No file chosen
              </span>
              <span class="ml-2 text-sm text-gray-300" v-else>
                {{ selectedFileName }}
              </span>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            Create Project
          </button>
        </form>
      </div>

      <h2 class="text-2xl font-bold text-gray-100 mb-6">Your Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in items"
          :key="item._id"
          :class="[
            'rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600 transform hover:-translate-y-1',
            item.color || 'bg-gray-800/80 backdrop-blur-sm',
          ]"
        >
          <div class="h-52 overflow-hidden relative group">
            <img
              :src="item.image"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt="Item image"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-80"
            ></div>
          </div>

          <div class="p-5">
            <div class="flex justify-between items-start mb-2">
              <h3
                class="capitalize font-bold text-xl text-gray-100 line-clamp-2"
              >
                {{ item.title }}
              </h3>
              <button
                @click="deleteItem(item._id)"
                class="text-gray-400 hover:text-red-400 transition-colors p-1 rounded-full hover:bg-gray-700/50"
                aria-label="Delete item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
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
              </button>
            </div>

            <p
              class="text-sm text-gray-300/90 mb-3 line-clamp-2 leading-relaxed"
            >
              {{ item.desc }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="bg-gray-700/60 text-gray-200 text-xs px-3 py-1 rounded-full hover:bg-gray-600 transition-colors"
              >
                #{{ tag }}
              </span>
            </div>

            <a
              :href="item.link"
              target="_blank"
              class="text-blue-400 hover:text-blue-300 text-sm truncate mb-1 transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <span class="truncate">{{ item.link }}</span>
            </a>

            <div
              class="mt-4 pt-3 border-t border-gray-700/50 flex justify-between items-center"
            >
              <button
                class="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center"
              >
                View details
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";

definePageMeta({
  layout: "page",
});

interface Item {
  _id: string;
  title: string;
  link: string;
  desc: string;
  tags: string[];
  image: string;
  color: string;
  createdAt: string;
}

const form = reactive({
  title: "",
  link: "",
  desc: "",
  tags: "",
  color: "",
});

const selectedFileName = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const items = ref<Item[]>([]);
const isSubmitting = ref(false);

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "MMM d, yyyy");
};

const handleFileChange = () => {
  const files = fileInput.value?.files;
  selectedFileName.value = files?.[0]?.name || null;
};

const fetchItems = async () => {
  try {
    items.value = await $fetch<Item[]>("/api/items");
  } catch (error) {
    console.error("Failed to fetch items:", error);
  }
};

const resetForm = () => {
  form.title = "";
  form.link = "";
  form.desc = "";
  form.tags = "";
  form.color = "";
  if (fileInput.value) fileInput.value.value = "";
  selectedFileName.value = null;
};

const submitForm = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("link", form.link);
    formData.append("desc", form.desc);
    formData.append("tags", form.tags);
    formData.append("color", form.color);

    if (fileInput.value?.files?.[0]) {
      formData.append("image", fileInput.value.files[0]);
    }

    await $fetch("/api/items", {
      method: "POST",
      body: formData,
    });

    resetForm();
    await fetchItems();
  } catch (error) {
    console.error("Failed to create project:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const deleteItem = async (id: string) => {
  if (confirm("Are you sure you want to delete this project?")) {
    try {
      await $fetch(`/api/items/${id}`, { method: "DELETE" });
      await fetchItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  }
};

onMounted(fetchItems);
</script>
