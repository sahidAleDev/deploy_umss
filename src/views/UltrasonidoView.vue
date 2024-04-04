<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeMount, ref } from 'vue';
import { useUltrasonidoStore } from "@/stores/ultrasonido";
import VuePictureSwipe from 'vue3-picture-swipe';
import type { Media } from '@/services';
import { useRouter } from "vue-router";
import { getDateTime } from '@/helpers';

interface Item {
  src: string;
  thumbnail: string;
  w: number;
  h: number;
  alt: string;
}

/**
 * ------------------------------------------
 *	Components
 * ------------------------------------------
 */

const CalendarIcon = defineAsyncComponent(() => import('@/components/icons/CalendarIcon.vue'))
const ImageIcon = defineAsyncComponent(() => import('@/components/icons/ImageIcon.vue'))
const FileVideoIcon = defineAsyncComponent(() => import('@/components/icons/FileVideoIcon.vue'))

/**
 * -----------------------------------------
 *	Helpers
 * -----------------------------------------
 */
const $store = useUltrasonidoStore();
const $router = useRouter();

/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const itemsImages = ref<Item[]>([]);
const itemsVideos = computed(() => $store.mediaVideos as Media[] );
const options = {
  shareEl: true,
  children: 'img',
};

$store.mediaImages.forEach((image) => {
  itemsImages.value.push({
    src: image.url,
    thumbnail: image.url,
    w: 600,
    h: 400,
    alt: `${image.descripcion}`
  });
});

console.log(itemsImages.value);

/**
 * ------------------------------------------
 *	Lifecycle
 * ------------------------------------------
 */
onBeforeMount(() => {
  if(!$store.ultrasonido){
    $router.go(-1);
  }
});

getDateTime();

</script>

<template>


  <div class="h-screen bg-green-50 p-2">
    <h1 class="mt-10 text-2xl font-semibold text-gray-800">
      {{ $store.ultrasonido?.paciente.nombre }}, Aquí tienes tus ultrasonidos.
    </h1>

    <h2 class="mt-5 text-sm text-gray-500 dark:text-gray-400">
      ¡Estamos muy emocionados de compartir este momento especial contigo! 🎉    
    </h2>
    

    <!--
      <section class="flex max-w-sm items-center gap-2 bg-white p-2 rounded-full mt-5">
        <figure class="rounded-full p-2 bg-green-50">
          <CalendarIcon class="text-green-700" />
        </figure>
        <p>
          <span class="font-semibold text-green-700">{{getDateTime()}}</span>
        </p>
      </section>
    -->

    <section class="mt-5 space-y-6 max-w-sm">
      <div class="flex w-full items-center gap-2 p-2 rounded-full">
        <figure class="rounded-full p-2 bg-green-100">
          <ImageIcon />
        </figure>

        <p>
          Imagenes:
          <span class="font-semibold">{{ itemsImages.length }}</span>
        </p>
      </div>


      <vue-picture-swipe :items="itemsImages" :options="options"></vue-picture-swipe>
      <!--
        <figure class="relative ">
          <img class="object-cover rounded-3xl w-full max-w-sm" src="/Image_1.jpg" alt="">
          <caption class="absolute flex items-center gap-2 py-2 px-4 text-center z-10 bottom-0 right-0 left-0 rounded-3xl max-w-sm backdrop-blur-sm bg-white/30">
            <CameraIcon class="size-12 p-1 bg-white rounded-full text-[#D98200]" />
            <p class="text-white">Estudio X para X cosa</p>
          </caption>
        </figure>
  
        <figure class="relative ">
          <img class="object-cover rounded-3xl w-full max-w-sm" src="/Image_4.jpg" alt="">
          <caption class="absolute flex items-center gap-2 py-2 px-4 text-center z-10 bottom-0 right-0 left-0 rounded-3xl max-w-sm backdrop-blur-sm bg-white/30">
            <CameraIcon class="size-12 p-1 bg-white rounded-full text-[#D98200]" />
            <p class="text-white">Estudio X para X cosa</p>
          </caption>
        </figure>
      -->
    </section>

    <section class="mt-5 space-y-6 max-w-sm">
      <div class="flex w-full items-center gap-2 p-2 rounded-full">
        <figure class="rounded-full p-2 bg-green-100">
          <FileVideoIcon />
        </figure>

        <p>
          Videos:
          <span class="font-semibold">{{ itemsVideos.length }}</span>
        </p>
      </div>

      <video v-for="item in itemsVideos" :key="item.id" class="max-w-xs m-auto rounded-xl" controls>
        <source :src="item.url" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </section>


    <!-- Prueba de card
      <section class="mt-10">
        <div class="h-10 bg-pink-200 rounded-t-3xl"></div>
        <div class="h-18 bg-white rounded-b-3xl px-3 relative space-y-3 flex justify-between items-center">
          <span class="absolute -top-3 left-5 bg-white pt-1 px-1 rounded-t-3xl ">siiu</span>
          <div class="tracking-widest">
            <p class="font-light text-[1rem]">Peso</p>
            <p class="font-thin text-sm">
              <span class="text-lg text-pink-700 font-semibold">10</span>
              kg on 12 Dec
            </p>
          </div>
  
          <div class="rounded-full bg-pink-50 p-2 cursor-pointer">
            <img src="/favicon.ico" class="aspect-square size-5" alt="">
          </div>
        </div>
      </section>
    -->
  </div>
</template>

<style>
.my-gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  justify-items: center;
  padding: 0;
}

.my-videos {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  justify-items: center;
  gap: 0.6rem;
}

.gallery-thumbnail img {
  border-radius: 0.5rem;
}

.pswp__img {
  border-radius: 1.5rem;
}
</style>