<template>
  <div>
    <section
      id="home"
      class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32"
    >
      <!-- Background gradient dan efek khusus -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- Gradient utama -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-sky-900"
        ></div>

        <!-- Grid pattern dengan CSS pure -->
        <div
          class="absolute inset-0 opacity-10"
          style="
            background-image: linear-gradient(
                to right,
                rgba(255, 255, 255, 0.3) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.3) 1px,
                transparent 1px
              );
            background-size: 24px 24px;
          "
        ></div>

        <!-- Blob efek dengan gradient -->
        <div
          class="absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-20"
          style="
            background: radial-gradient(
              circle,
              rgba(168, 85, 247, 0.8) 0%,
              rgba(236, 72, 153, 0) 70%
            );
            filter: blur(100px);
          "
        ></div>

        <div
          class="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-20"
          style="
            background: radial-gradient(
              circle,
              rgba(236, 72, 153, 0.8) 0%,
              rgba(168, 85, 247, 0) 70%
            );
            filter: blur(100px);
          "
        ></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Kolom teks -->
          <div class="text-center lg:text-left">
            <h1
              class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
            >
              <span
                class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400"
              >
                {{ profile.name }}
              </span>
              <span class="block text-gray-300 mt-2 text-2xl sm:text-3xl">{{
                profile.role
              }}</span>
            </h1>

            <p class="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 mb-8">
              {{ profile.description }}
            </p>

            <div
              class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                @click="scrollTo('projects')"
                class="px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 cursor-pointer"
              >
                Lihat Proyek Saya
              </button>
              <NuxtLink
                to="mailto:abdillahalfath7@gmail.com"
                class="px-8 py-3 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                Hubungi Saya
              </NuxtLink>
            </div>

            <!-- Statistik -->
            <div class="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div
                v-for="(stat, index) in profile.stats"
                :key="index"
                class="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
              >
                <p
                  class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-300"
                >
                  {{ stat.value }}
                </p>
                <p class="text-xs text-gray-400">{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <!-- Kolom gambar -->
          <div class="relative flex justify-center">
            <div class="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <!-- Foto profil dengan efek khusus -->
              <div
                class="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl"
              >
                <img :src="profile.image" alt="Profile Photo" />
              </div>

              <!-- Efek dekoratif -->
              <div
                class="absolute -top-6 -left-6 w-full h-full rounded-2xl border-4 border-blue-500/30 z-[-1]"
              ></div>
              <div
                class="absolute -bottom-6 -right-6 w-full h-full rounded-2xl border-4 border-sky-500/30 z-[-1]"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <button
        @click="scrollTo('about')"
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer bg-white/10 backdrop-blur-md rounded-full p-3 hover:bg-white/20 transition-all duration-300"
      >
        <div class="animate-bounce">
          <svg
            class="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </button>
    </section>

    <!-- about -->
    <section
      id="about"
      class="relative bg-gray-900 min-h-screen overflow-hidden"
    >
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 w-full h-full opacity-10">
        <div
          class="absolute top-20 left-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl animate-float"
        ></div>
        <div
          class="absolute bottom-10 right-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl animate-float-delay"
        ></div>
      </div>

      <div
        class="container mx-auto px-6 flex flex-col h-screen justify-center items-center relative z-10"
      >
        <!-- Animated title -->
        <div class="overflow-hidden mb-8">
          <h2
            class="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 mb-4 animate-slide-up"
          >
            Tentang Saya
          </h2>
          <div
            class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full animate-scale-x"
          ></div>
        </div>

        <!-- Content box with glass morphism effect -->
        <div
          class="backdrop-blur-sm bg-gray-800/50 border border-gray-700/50 rounded-2xl p-8 max-w-2xl mx-auto transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10"
        >
          <p
            class="text-lg md:text-xl text-gray-300 leading-relaxed text-center"
          >
            Saya adalah seorang
            <span class="text-purple-400 font-medium">Web Developer</span>
            dengan pengalaman lebih dari 2 tahun dalam menciptakan aplikasi web
            yang <span class="text-blue-400 font-medium">responsif</span> dan
            <span class="text-pink-400 font-medium">interaktif</span>. Saya
            berkomitmen untuk memberikan solusi digital yang inovatif dan
            berkualitas tinggi.
          </p>

          <!-- Skills chips -->
          <div class="flex flex-wrap justify-center gap-3 mt-8">
            <span
              class="px-4 py-2 bg-gray-800/80 text-blue-400 rounded-full text-sm font-medium border border-blue-400/20"
              >Frontend</span
            >
            <span
              class="px-4 py-2 bg-gray-800/80 text-purple-400 rounded-full text-sm font-medium border border-purple-400/20"
              >UI/UX</span
            >
            <span
              class="px-4 py-2 bg-gray-800/80 text-pink-400 rounded-full text-sm font-medium border border-pink-400/20"
              >Responsive</span
            >
            <span
              class="px-4 py-2 bg-gray-800/80 text-green-400 rounded-full text-sm font-medium border border-green-400/20"
              >Innovation</span
            >
          </div>
        </div>

        <!-- Animated scroll indicator -->
        <div class="absolute bottom-10 animate-bounce">
          <div
            class="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <div class="w-1 h-2 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- projects -->
    <section id="projects" class="bg-gray-900 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">
            My <span class="text-blue-400">Projects</span>
          </h2>
          <div class="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

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
                <h3 class="font-bold text-xl text-gray-100 line-clamp-2">
                  {{ item.title }}
                </h3>
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
                <span class="text-xs text-gray-400">{{
                  new Date().toLocaleDateString()
                }}</span>
                <NuxtLink
                  :to="`/project/${item._id}`"
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
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "page",
});

const profile = {
  name: "Farhan Abdillah Alfath",
  role: "Web Developer",
  description:
    "Saya menciptakan pengalaman digital yang indah, fungsional, dan bermakna. Dengan fokus pada desain yang berpusat pada pengguna dan kode yang bersih.",
  image: "/images/farhan.png",
  stats: [
    { value: "2+", label: "Tahun Pengalaman" },
    { value: "3+", label: "Proyek Selesai" },
    { value: "80%", label: "Kepuasan Klien" },
  ],
};

interface Item {
  _id: string;
  title: string;
  link: string;
  desc: string;
  tags: string[];
  image: string;
  color: string;
}

const items = ref<Item[]>([]);

const fetchItems = async () => {
  items.value = await $fetch<Item[]>("/api/items");
};

const isOpen = ref(false);

const closeMenu = () => {
  isOpen.value = false;
};

const scrollY = ref(0);

onMounted(() => {
  window.addEventListener("scroll", () => {
    scrollY.value = window.scrollY;
  });
  fetchItems();
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "i") {
      navigateTo("/ip");
    }
  });
});

const scrollTo = (id: any) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = -80; // jika ada navbar fixed tinggi 80px
    const y = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
  closeMenu();
};
</script>

<style scoped>
/* Animasi untuk background gradient */
@keyframes gradient-move {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Efek hover untuk card statistik */
.bg-white:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(192, 132, 252, 0.2);
  transition: all 0.3s ease;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
@keyframes float-delay {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(15px);
  }
}
@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes scale-x {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
.animate-float {
  animation: float 8s ease-in-out infinite;
}
.animate-float-delay {
  animation: float-delay 10s ease-in-out infinite;
}
.animate-slide-up {
  animation: slide-up 1s ease-out forwards;
}
.animate-scale-x {
  animation: scale-x 1s ease-out forwards;
  animation-delay: 0.5s;
}
.animate-bounce {
  animation: bounce 2s infinite;
}
</style>
