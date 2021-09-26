<template>
  <div class="flex justify-center pb-6">
    <router-link
      :to="{ name: 'Home' }"
      class="
        bg-blue-100
        hover:bg-blue-200
        text-blue-700 text-base
        font-semibold
        p-4
        rounded-full
        flex
        items-center
        justify-center
      "
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        /></svg
      ><span class="mx-2">Back to homepage</span></router-link
    >
  </div>
  <div v-if="this.isLoading" class="flex justify-center p-40">
    <h1 class="text-white text-xl flex items-center">
      <svg
        class="animate-spin mr-2"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style="fill: rgb(255, 255, 255)"
      >
        <circle cx="12" cy="20" r="2"></circle>
        <circle cx="12" cy="4" r="2"></circle>
        <circle cx="6.343" cy="17.657" r="2"></circle>
        <circle cx="17.657" cy="6.343" r="2"></circle>
        <circle cx="4" cy="12" r="2.001"></circle>
        <circle cx="20" cy="12" r="2"></circle>
        <circle cx="6.343" cy="6.344" r="2"></circle>
        <circle cx="17.657" cy="17.658" r="2"></circle></svg
      >Loading...
    </h1>
  </div>
  <div
    v-else
    class="
      bg-white
      rounded-xl
      grid grid-cols-1
      lg:grid-cols-2 lg:p-6 lg:gap-x-8
    "
  >
    <div class="relative z-10 col-start-1 row-start-2 p-4">
      <p class="text-sm font-medium sm:mb-1 text-gray-500">
        {{ this.item.principalMaker }}
      </p>
      <h2 class="text-xl font-semibold sm:leading-7 text-black sm:text-3xl">
        {{ this.item.title }}
      </h2>
    </div>
    <div class="col-start-1 row-start-3 px-4 pb-6 lg:pb-16">
      <div class="flex items-center text-sm font-medium my-5 lg:mt-2 lg:mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div class="ml-1">
          <span>{{ this.item.dating.presentingDate }}</span>
        </div>
        <div class="text-base font-normal mx-2">·</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
        <div v-if="this.item.dimensions.length" class="ml-1">
          <span
            >{{ this.item.dimensions[1].value + this.item.dimensions[1].unit }}
            x
            {{
              this.item.dimensions[0].value + this.item.dimensions[0].unit
            }}</span
          >
        </div>
        <div
          v-if="this.item.productionPlaces.length"
          class="flex items-center justify-center"
        >
          <span class="text-base font-normal mx-2">·</span>
          <span>{{ this.item.productionPlaces.join(', ') }}</span>
        </div>
      </div>
      <hr class="w-16 border-gray-300 block" />
    </div>
    <div class="col-start-1 row-start-4 px-4 pb-4 lg:pb-0">
      <p class="items-center text-gray-900 text-sm font-medium">
        {{ this.item.label.description }}
      </p>
    </div>
    <div
      class="
        col-start-1
        row-start-1
        h-96
        mt-4
        lg:m-0
        flex
        lg:col-start-2 lg:row-span-4
      "
    >
      <div class="w-full grid">
        <div class="relative">
          <img
            :src="this.item.webImage.url"
            alt="Art picture."
            class="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import fetchImage from '../api/fetch-image';

export default defineComponent({
  name: 'DetailsView',
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  data() {
    return { isLoading: true, item: null };
  },
  async mounted() {
    this.item = await fetchImage(this.id);
    this.isLoading = false;
  },
});
</script>
