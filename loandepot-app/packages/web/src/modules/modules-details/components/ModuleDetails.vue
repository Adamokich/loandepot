<script setup lang="ts">
import { ScheduleButton } from '@/shared';
import ArrowDownIcon from '@/shared/components/icons/ArrowDownIcon.vue';
import MoreLink from '@/shared/components/MoreLink.vue';
import type { IModule } from '@loandepot/types';

const { moduleId, tags, moduleName, moduleDescr, descr, name, fileUrl, imgUrl } =
  defineProps<Omit<IModule, 'videoUrl' | 'lockVideoUrl'>>();
</script>

<template>
  <div class="module-details">
    <header class="module-details-header">
      <ScheduleButton />
    </header>
    <div class="module-details-body">
      <h2 class="module-details-title">{{ moduleId }}. {{ moduleName }}</h2>
      <div class="module-details-main">
        <div class="module-details-tags">
          <div v-for="tag in tags" class="module-details-tag">{{ tag }}</div>
        </div>
        <p class="module-details-descr">{{ moduleDescr }}</p>
        <button class="module-details-btn">
          How are you showing up?
          <MoreLink />
        </button>
      </div>
      <div class="module-details-additionally">
        <div class="module-details-additionally-details">
          <img :src="imgUrl" :alt="name" />
          <div class="module-details-additionally-descr">
            <h3>{{ name }}</h3>
            <p>{{ descr }}</p>
          </div>
        </div>
        <a class="module-details-additionally-download" :href="fileUrl">
          <span>Download PDF</span>
          <ArrowDownIcon color="#9ec73d" :width="11" :height="13" />
        </a>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.module-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  z-index: 2;
}

.module-details-header {
  display: flex;
  justify-content: end;
}

.module-details-body {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.module-details-main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-block: 19px 24px;
  border-top: 1px solid var(--color-border-opacity);
  border-bottom: 1px solid var(--color-border-opacity);
}

.module-details-tags {
  display: flex;
  align-items: center;
  gap: 16px;
}

.module-details-tag {
  width: 100%;
  padding-block: 10px;
  max-width: 114px;
  max-height: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg-accent);
  color: var(--color-accent-bold);
  border-radius: 15px;
  border: 1px solid var(--color-border-accent);
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
}

.module-details-descr {
  font-weight: 900;
}

.module-details-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 260px;
  max-height: 56px;
  padding: 20px 26px;
  border: 1px solid var(--color-border-opacity);
  border-radius: var(--border-radius);
  font-size: 13px;
  font-weight: 700;
  cursor: auto;
}

.module-details-additionally {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: start;
}

.module-details-additionally-details {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 361px;

  img {
    width: 81px;
    height: 81px;
    object-fit: cover;
    object-position: center;
  }
}

.module-details-additionally-descr {
  display: flex;
  flex-direction: column;
  gap: 5px;

  h3 {
    font-family: var(--font-mark);
    font-size: 15px;
  }

  p {
    font-size: 12px;
    font-weight: 900;
    color: var(--color-light-opacity);
  }
}

.module-details-additionally-download {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  border: 1px solid var(--color-border-opacity);
  width: 100%;
  max-width: 159px;
  max-height: 48px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
}

@media (max-width: 1440px) {
  .module-details-title {
    font-size: 50px;
  }
}

@media (max-width: 1340px) {
  .module-details-title {
    font-size: 45px;
  }
  .module-details-additionally {
    flex-direction: column;
    gap: 25px;
  }

  .module-details-additionally-details {
    align-items: center;
  }
}

@media (max-width: 1200px) {
  .module-details-title {
    font-size: 38px;
  }
}

@media (max-width: 991px) {
  .module-details-additionally {
    flex-direction: row;
  }
}

@media (max-width: 767px) {
  .module-details-additionally {
    flex-direction: column;
    gap: 20px;
  }

  .module-details-header {
    justify-content: start;
  }
}

@media (max-width: 480px) {
  .module-details-title {
    font-size: 27px;
  }
}
</style>
