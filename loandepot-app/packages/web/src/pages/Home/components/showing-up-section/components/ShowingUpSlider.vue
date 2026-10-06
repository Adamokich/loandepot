<script setup lang="ts">
import { useReviewsStore } from '@/shared';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperCore } from 'swiper';
import { computed, onMounted } from 'vue';
import ShowingUpSlide from './ShowingUpSlide.vue';

const reviewsStore = useReviewsStore();
const { activeIndex } = defineProps<{ activeIndex: number }>();
const activeSlide = computed(() => {
  if (reviewsStore.reviews) {
    return reviewsStore.reviews[activeIndex].name;
  }
});

const emit = defineEmits<{
  (e: 'init', swiper: SwiperCore): void;
  (e: 'change', swiper: SwiperCore): void;
}>();

onMounted(async () => {
  await reviewsStore.getReviews();
});
</script>

<template>
  <div v-if="reviewsStore.reviews?.length" class="showing-up-slider">
    <Swiper
      @swiper="(swiper) => emit('init', swiper)"
      @slide-change="(swiper) => emit('change', swiper)"
      class="swiper-container"
      :slides-per-view="'auto'"
      :space-between="32"
      :centered-slides="false"
      :slides-offset-after="80"
      :simulate-touch="false"
      :loop="false"
    >
      <SwiperSlide v-for="review in reviewsStore.reviews" :key="review._id">
        <ShowingUpSlide
          :name="review.name"
          :descr="review.descr"
          :img-url="review.imgUrl"
          :video-url="review.videoUrl"
          :profession="review.profession"
          :preview-text="review.previewText"
          :is-active="review.name === activeSlide"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.showing-up-slider {
  width: 100%;
  position: absolute;
  bottom: 170px;
  left: 32px;
  overflow: visible;
}

:deep(.swiper-container),
:deep(.swiper) {
  width: 100%;
  max-width: 555px;
  overflow: visible;
  margin-left: 64px;
  transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1) !important;
}

:deep(.swiper-wrapper) {
  align-items: flex-end;
}

.swiper-slide {
  width: 100%;
  max-width: 241px;
  transition: max-width 1.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.swiper-slide-active {
  width: 100%;
  max-width: 555px;
}

@media (max-width: 1200px) {
  .showing-up-slider {
    max-width: 700px;
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 767px) {
  .showing-up-slider {
    left: auto;
    transform: none;
  }

  .swiper-container {
    margin-left: 20px;
  }

  .swiper-slide {
    max-width: 435px;
  }
}

@media (max-width: 480px) {
  .swiper-container {
    margin-left: 0;
  }

  .swiper-slide {
    max-width: 350px;
  }
}
</style>
