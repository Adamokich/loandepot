<script setup lang="ts">
import { useModalVideoStore } from '@/shared';
import PlayIcon from '@/shared/components/icons/PlayIcon.vue';
import type { IReview } from '@loandepot/types';

const { name, videoUrl, imgUrl, profession, descr, previewText } = defineProps<
  IReview & { isActive: boolean }
>();
const modalVideoStore = useModalVideoStore();
</script>

<template>
  <div class="showing-up-slide" :class="{ 'is-active': isActive }">
    <Transition name="fade" mode="out-in">
      <div v-if="isActive" class="slide-active">
        <div class="slide-active-top">
          <div class="slide-active-review-details">
            <img :src="imgUrl" alt="avatar" />
            <figure class="slide-active-author-info">
              <figcaption>
                <span class="author-name">{{ name }}</span>
                <cite class="author-profession">{{ profession }}</cite>
              </figcaption>
              <p>posted from <RouterLink to="#">instagram</RouterLink></p>
            </figure>
          </div>
          <div class="slide-active-video" @click="modalVideoStore.openVideoModal(videoUrl)">
            <button class="play-video-btn">
              <PlayIcon :width="6" :height="8" />
            </button>
            <div class="play-video-duration">
              <span>play video</span>
              <span>(3:20)</span>
            </div>
          </div>
        </div>
        <div class="slide-active-bottom">
          <p class="slide-active-descr">{{ descr }}</p>
        </div>
      </div>
      <div v-else class="slide-inactive">
        <img :src="imgUrl" alt="avatar" />
        <div class="slide-inactive-details">
          <span>{{ name }}</span>
          <p>{{ previewText }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.showing-up-slide {
  position: relative;
  width: 100%;
  min-height: 325px;
  background-color: var(--color-light);
  border-radius: var(--border-radius-l);

  img {
    width: 116px;
    height: 116px;
    border-radius: 50%;
  }
}

.showing-up-slide.is-active {
  max-width: 555px;
  min-height: 428px;
  margin-right: 0;
}

.slide-active {
  width: 100%;
  height: 428px;
  padding: 32px 38px 52px 40px;
  display: flex;
  flex-direction: column;
  gap: 27px;
}

.slide-active-top {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.slide-active-video {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: 16px;
  border-top: 1px solid var(--color-border-opacity);
  border-bottom: 1px solid var(--color-border-opacity);
  gap: 15px;
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 500;
}

.play-video-btn {
  width: 26px;
  height: 26px;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-video-duration {
  display: flex;
  gap: 8px;
  text-transform: uppercase;
}

.slide-active-review-details {
  display: flex;
  align-items: center;
  gap: 33px;
}

.slide-active-author-info {
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin: 0;

  figcaption {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  p {
    font-size: 13px;
    font-weight: 900;

    a:hover {
      text-decoration: underline;
    }
  }
}

.slide-active-descr {
  font-weight: 900;
}

.slide-inactive {
  width: 100%;
  height: 325px;
  padding-top: 34px;
  padding-bottom: 25px;
  padding-inline: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.slide-inactive-details {
  display: flex;
  flex-direction: column;
  gap: 12px;

  span {
    font-family: var(--font-mark);
    font-weight: 900;
    font-size: 20px;
  }

  p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 900;
  }
}

.author-name {
  font-family: var(--font-mark);
  font-size: 24px;
  font-weight: 900;
}

.author-profession {
  text-transform: uppercase;
  font-style: normal;
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 767px) {
  .slide-active-descr {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 480px) {
  .showing-up-slide {
    img {
      height: 85px;
      width: 85px;
    }
  }

  .author-name {
    font-size: 20px;
  }
}
</style>
