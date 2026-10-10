<script setup lang="ts">
import ContactForm from './ContactForm.vue';
import ContactInfo from './ContactInfo.vue';
</script>

<template>
  <div class="contact">
    <ContactInfo />
    <ContactForm />
  </div>
</template>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: 796px 559px;
  gap: 65px;
}
</style>
