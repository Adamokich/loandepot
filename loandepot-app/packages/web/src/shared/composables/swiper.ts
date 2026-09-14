import { ref } from 'vue';
import { Swiper as SwiperCore } from 'swiper';

export const useSwiper = () => {
  const swiperInstance = ref<SwiperCore | undefined>(undefined);
  const activeIndex = ref<number>(0);

  function onSwiperInit(swiper: SwiperCore): void {
    swiperInstance.value = swiper;
  }

  function onSlideChange(swiper: SwiperCore): void {
    activeIndex.value = swiper.realIndex;
  }

  function onSlideNext(): void {
    swiperInstance.value?.slideNext();
  }

  function onSlidePrev(): void {
    swiperInstance.value?.slidePrev();
  }

  return { swiperInstance, activeIndex, onSwiperInit, onSlideChange, onSlideNext, onSlidePrev };
};
