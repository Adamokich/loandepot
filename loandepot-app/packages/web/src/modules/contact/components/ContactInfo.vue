<script setup lang="ts">
import { PlayVideoButton, useModalVideoStore } from '@/shared';
import FacebookIcon from '@/shared/components/icons/FacebookIcon.vue';
import PlayIcon from '@/shared/components/icons/PlayIcon.vue';
import TwitterIcon from '@/shared/components/icons/TwitterIcon.vue';

const modalVideoStore = useModalVideoStore();
</script>

<template>
  <div class="contact-info">
    <div class="contact-info-top">
      <h2 class="contact-info-title">Schedule an appointment with Alec</h2>
      <p>Meet each other at any convenient time.</p>
    </div>
    <div class="contact-info-bottom">
      <address class="contact-info-links">
        <div class="contact-info-main">
          <a class="contact-info-mail" href="mailto:ahanson@loanDepot.com">ahanson@loanDepot.com</a>
          <a class="contact-info-phone" href="tel:+14489814984">+1 448 9814984</a>
        </div>
        <ul class="contact-info-socials">
          <li class="contact-info-social">
            <a href="#">
              <FacebookIcon />
            </a>
          </li>
          <li class="contact-info-social">
            <a href="#">
              <TwitterIcon />
            </a>
          </li>
        </ul>
      </address>
      <div class="play-video">
        <div
          class="play-video-controller"
          @click="modalVideoStore.openVideoModal('https://youtube.com/embed/uyAMGPoE1dU')"
        >
          <PlayVideoButton>
            <PlayIcon class="play-icon" :width="14" :height="16" />
          </PlayVideoButton>
          <span>play video</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-info-top {
  background: url('../../../app/assets/img/Appointment.jpg') center center / cover no-repeat;
  min-height: 515px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-left: 63px;
  padding-top: 86px;

  h2 {
    color: var(--color-light);
    width: 100%;
    max-width: 426px;
    line-height: 64px;
  }

  p {
    font-weight: 900;
    color: var(--color-light-opacity);
  }
}

.contact-info-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-light);
  background-color: var(--color-accent);
  padding: 24px 24px 56px 24px;
  font-size: 15px;
  padding-left: 63px;
}

.contact-info-links {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.contact-info-main {
  display: flex;
  flex-direction: column;
  gap: 18px;

  a {
    transition: all 0.2s;
    font-style: normal;
  }
}

.contact-info-socials {
  display: flex;
  align-items: center;
  gap: 24px;
}

.play-video {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 361px;
  padding-block: 45px;
  background-color: var(--color-bg-input);
  border-radius: var(--border-radius-l);

  span {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
  }
}

.play-video-controller {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 24px;
}

.play-icon {
  margin-left: 5px;
}

@media (hover: hover) {
  .contact-info-main > a:hover {
    opacity: 0.5;
  }
}
</style>
