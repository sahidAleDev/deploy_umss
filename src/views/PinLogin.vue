<script setup lang="ts">

import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { AxiosError } from 'axios';
import { computed, defineAsyncComponent, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useService } from '@/services';
import { useUltrasonidoStore } from "@/stores/ultrasonido";
import VueBottomSheet from '@webzlodimir/vue-bottom-sheet'

type errorType = 'date-incorrect' | '';
 

const ArrowRightIcon = defineAsyncComponent(() => import('@/components/icons/ArrowRightIcon.vue'))


/**
 * -----------------------------------------
 *	Helpers
 * -----------------------------------------
 */
const $route = useRoute();
const $router = useRouter();
const $service = useService();
const $store = useUltrasonidoStore();

/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const errorOptions: Record<errorType, { title: string; description: string;}> =  {
  "date-incorrect": {
    title: "Fecha de nacimiento incorrecta",
    description: "El fecha que ingresaste no coincide con la registrada en tu expediente. Por favor, intenta de nuevo."
  },
  "": {
    title: "No error selected",
    description: "Please select an error to display the details."
  }
};

const currentDate = new Date();
const currentYear = new Date().getFullYear();
const errorBottomSheet = ref<errorType>("");
const formattedDate = computed(() => {
  if (selectedYear.value && selectedMonth.value && selectedDay.value) {
    return `${selectedYear.value}-${selectedMonth.value}-${selectedDay.value}`;
  }
  return '';
});
const hidenButton = ref<boolean>(true);
const idUltra = ref<number>();
const myBottomSheet = ref<InstanceType<typeof VueBottomSheet>>()
const selectedDay = ref(currentDate.getDate().toString().padStart(2, '0'));
const selectedMonth = ref((currentDate.getMonth() + 1).toString().padStart(2, '0'));
const selectedYear = ref(currentDate.getFullYear().toString());
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = [
  { value: '01', label: 'Enero' },
  { value: '02', label: 'Febrero' },
  { value: '03', label: 'Marzo' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Mayo' },
  { value: '06', label: 'Junio' },
  { value: '07', label: 'Julio' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' }
];

const days = computed(() => {
  const year = parseInt(selectedYear.value, 10);
  const month = parseInt(selectedMonth.value, 10);

  if (isNaN(year) || isNaN(month)) {
    return [];
  }

  // Verificar si es un año bisiesto
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  // Obtener el último día del mes considerando años bisiestos
  const lastDay = month === 2 && isLeapYear ? 29 : new Date(year, month, 0).getDate();

  return Array.from({ length: lastDay }, (_, i) => (i + 1).toString().padStart(2, '0'));
});


/**
 * ------------------------------------------
 *	Methods
 * ------------------------------------------
 */

 /**
 * open
 */
const open = () => {
  myBottomSheet.value.open()
}

/**
 * close
 */
const close = () => {
  myBottomSheet.value.close()
}

/**
 * handleOnChange
 */
const handleOnChange = () => {
  if(hidenButton.value === false) hidenButton.value = true;
};
/**
 * handleOnComplete
 */
const handleOnComplete = () => hidenButton.value = false;

/**
 * login
 */
const login = async () => {
  try {
    console.log(formattedDate.value);
    const { data } = await $service.ultrasonido.show(Number(idUltra.value), formattedDate.value);
    console.log(idUltra.value);
    $store.ultrasonido = data;
    $router.push({ name: "ultrasonido" });
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data.message === 'El código es incorrecto') {
      errorBottomSheet.value = 'date-incorrect'
      open();
    } else {
      console.error('An error occurred:', error);
    }
  }
};

/**
 * ------------------------------------------
 *	Lifecycle
 * ------------------------------------------
 */
onBeforeMount(async () => {
  idUltra.value = Number($route.params.idUltra);
});

</script>

<template>

  <div class="p-2 h-screen max-w-sm mx-auto">
    <header class="mt-10">
      <figure>
        <img src="/LogoSaludDigna.svg" class="max-w-[15rem]" alt="">
      </figure>
  
      <div class="mt-10">
        <h1 class="text-2xl font-semibold text-gray-800">
          Hola Abril
        </h1>
  
        <p class="mt-5 text-sm text-gray-500 dark:text-gray-400">
          Para acceder a tus ultrasonidos, por favor ingresa tu fecha de nacimiento a continuación.
        </p>  
      </div>
  
  
    </header>

    <div class="mt-10 flex justify-center gap-4">
      <div class="wrapper">
        <select name=""  v-model="selectedDay" id="" class="bg-green-200/95 border-green-700 text-green-700 text-xs px-2 py-4  rounded-md border-2">
          <option value="" class="bg-white">DÍA</option>
          <option v-for="day in days" :key="day" :value="day" class="bg-white">{{ day }}</option>
        </select>
      </div>
      
      <div class="wrapper">
        <select name=""  v-model="selectedMonth" id="" class="bg-green-200/95 border-green-700 text-green-700 text-xs px-2 py-4 rounded-md border-2">
          <option value="" class="bg-white">MES</option>
          <option v-for="month in months" :key="month.value" :value="month.value" class="bg-white">{{ month.label }}</option>
        </select>
      </div>
      
      <div class="wrapper">
        <select name="" v-model="selectedYear" id="" class="bg-green-200/95 border-green-700 text-green-700 text-xs px-2 py-4 rounded-md border-2">
          <option value="" class="bg-white">AÑO</option>
          <option v-for="year in years" :key="year" :value="year" class="bg-white">{{ year }}</option>
        </select>
      </div>
    </div>

    <div 
      :class="!formattedDate ? 'opacity-80 pointer-events-none' : 'opacity-100'"
      @click="login"
      class="mt-10 w-full text-center text-white bg-orange-sl hover:bg-[#E8751A] focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none flex justify-center items-center gap-2"
      type="button" 
    >
      Ver Ultrasonidos

      <ArrowRightIcon class=" w-4 h-4" />
    </div>
    
    
  </div>

  <vue-bottom-sheet ref="myBottomSheet" :max-width="1000" :max-height="1500">
    <div class="p-5 space-y-3">
      <p class="text-xl font-semibold">{{ errorOptions[errorBottomSheet].title }}</p>
      <p class="text-sm font-thin"> {{ errorOptions[errorBottomSheet].description }}</p>
    </div>
  </vue-bottom-sheet>
</template>

<style>
.otp-input {
  width: 50px;
  height: 50px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}

/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}

select {
  -webkit-appearance: none;
  appearance: none;
  min-width: 110px;
}

.wrapper {
  position: relative;
}

.wrapper::after {
  content: "▼";
  color: green;
  font-size: 0.8rem;
  top: 16px;
  right: 13px;
  position: absolute;
}
</style>
