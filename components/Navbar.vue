<script setup>
const isOpen = ref(false);
const scrollY = ref(0);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    scrollY.value = window.scrollY;
  });
});

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = -80; // jika ada navbar fixed tinggi 80px
    const y = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
  closeMenu();
};
</script>

<template>
  <nav
    class="fixed w-full z-50 transition-all duration-500"
    :class="{ 'backdrop-blur-md bg-black/30 shadow-lg': scrollY > 10 }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo dengan efek khusus -->
        <NuxtLink
          to="/"
          class="flex items-center space-x-2 group cursor-pointer"
          @click="closeMenu"
        >
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300"
          >
            <span class="text-white font-bold text-xl">P</span>
          </div>
          <span
            class="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-sky-400"
          >
            Portfolio
          </span>
        </NuxtLink>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-1">
          <button
            @click="scrollTo('home')"
            class="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
            active-class="text-white bg-white/20"
          >
            Home
          </button>
          <button
            @click="scrollTo('about')"
            class="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
            active-class="text-white bg-white/20"
          >
            About
          </button>
          <button
            @click="scrollTo('projects')"
            class="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
            active-class="text-white bg-white/20"
          >
            Projects
          </button>

          <!-- Tombol CTA khusus -->
          <button
            @click="scrollTo('hire-me')"
            class="ml-4 px-6 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
          >
            Hire Me
          </button>
        </div>

        <!-- Tombol Menu Mobile -->
        <div class="md:hidden flex items-center">
          <button
            @click="toggleMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-all duration-300 cursor-pointer"
            aria-label="Main menu"
          >
            <svg
              class="h-6 w-6"
              :class="{ hidden: isOpen, block: !isOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ hidden: !isOpen, block: isOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Mobile -->
    <div
      class="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
      :class="{ 'max-h-0': !isOpen, 'max-h-screen': isOpen }"
    >
      <div
        class="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-black/90 backdrop-blur-lg"
      >
        <button
          @click="scrollTo('home')"
          class="block px-3 py-3 rounded-md text-base font-medium text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
          active-class="bg-white/20"
        >
          Home
        </button>
        <button
          @click="scrollTo('about')"
          class="block px-3 py-3 rounded-md text-base font-medium text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
          active-class="bg-white/20"
        >
          About
        </button>
        <button
          @click="scrollTo('projects')"
          class="block px-3 py-3 rounded-md text-base font-medium text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
          active-class="bg-white/20"
        >
          Projects
        </button>
        <button
          @click="scrollTo('hire-me')"
          class="block mt-2 mx-3 px-4 py-3 rounded-md text-center text-base font-bold text-white bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 transition-all duration-300"
        >
          Hire Me
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Efek hover halus untuk link */
.nuxt-link-exact-active {
  color: white;
}

/* Animasi untuk menu mobile */
.menu-enter-active,
.menu-leave-active {
  transition: max-height 0.5s ease;
}
.menu-enter-from,
.menu-leave-to {
  max-height: 0;
}
.menu-enter-to,
.menu-leave-from {
  max-height: 100vh;
}
</style>
