declare module 'vue3-picture-swipe' {
  import { DefineComponent } from 'vue';

  export interface Item {
    src: string;
    thumbnail: string;
    w: number;
    h: number;
    alt?: string;
    class?: string;
    [key: string]: any;
    htmlAfterThumbnail?: string;
  }

  export interface Props {
    items: Item[];
    [key: string]: any;
  }

  const VuePictureSwipe: DefineComponent<Props>;

  export default VuePictureSwipe;
}