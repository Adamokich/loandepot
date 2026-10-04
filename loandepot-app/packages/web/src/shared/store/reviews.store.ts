import type { IReview } from '@loandepot/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { client } from '../api';
import { API_ROUTES } from '../api/api';

export const useReviewsStore = defineStore('reviews', () => {
  const reviews = ref<IReview[]>();

  async function getReviews(): Promise<void> {
    const res = await client.get<IReview[]>('http://localhost:8000/api/reviews');
    reviews.value = res.data;
  }

  return { reviews, getReviews };
});
