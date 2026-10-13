import type { IReview } from '@loandepot/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { client } from '../api';

export const useReviewsStore = defineStore('reviews', () => {
  const reviews = ref<IReview[]>();

  async function getReviews(): Promise<void> {
    const res = await client.get<IReview[]>('https://loandepot.onrender.com/api/reviews');
    reviews.value = res.data;
  }

  return { reviews, getReviews };
});
