<template>
  <Swiper
    :direction="'vertical'"
    :slides-per-view="1"
    :space-between="30"
    :mousewheel="true"
    :pagination="{ clickable: true }"
    :modules="modules"
    class="mySwiper h-screen"
  >
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide>
    <SwiperSlide>Slide 4</SwiperSlide>
    <SwiperSlide>Slide 5</SwiperSlide>
    <SwiperSlide>Slide 6</SwiperSlide>
    <SwiperSlide>Slide 7</SwiperSlide>
    <SwiperSlide>Slide 8</SwiperSlide>
    <SwiperSlide>Slide 9</SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel, Pagination } from "swiper/modules";

// import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const modules = [Mousewheel, Pagination];
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 100vh;
}
.swiper-slide {
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
}
</style>
