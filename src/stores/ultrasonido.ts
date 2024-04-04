import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { UltrasonidoConMedia, Media } from '@/services';

export const useUltrasonidoStore = defineStore('ultrasonido', () => {
  const ultrasonido = ref<UltrasonidoConMedia>();
  const mediaVideos = ref<Media[]>([]);
  const mediaImages = ref<Media[]>([]);

  watch(
    ultrasonido,
    (newValue) => {
      mediaVideos.value = [];
      mediaImages.value = [];

      newValue?.media.forEach((item) => {
        if (item.tipo === 'VIDEO') {
          mediaVideos.value.push({ ...item });
        } else if (item.tipo === 'IMAGE') {
          mediaImages.value.push({ ...item });
        }
      });

      console.log('Videos:', mediaVideos.value);
      console.log('Images:', mediaImages.value);
    },
    { deep: true }
  );

  return {
    ultrasonido,
    mediaVideos,
    mediaImages,
  };
});