<template>
  <form
    @submit.prevent="onSubmit"
    class="bg-white mb-6 flex items-center gap-2 rounded-2xl shadow-lg"
  >
    <input
      v-model="this.search"
      @keydown.enter.prevent="onSubmit"
      class="
        rounded-l-2xl
        w-full
        py-2
        px-4
        text-gray-700
        placeholder-gray-300
        text-lg
        font-medium
        focus:outline-none
      "
      id="search"
      type="text"
      placeholder="Search"
    />
    <button
      v-if="this.search"
      @click.prevent="clearSearch"
      class="text-gray-300 hover:text-gray-400 p-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <ColorDropdown
      :currentColor="decodeURIComponent(this.color)"
      @setColor="setColor"
    />
    <SortDropdown :currentSort="this.sort" @setSort="setSort" />
    <div class="p-2">
      <button
        class="
          text-gray-400
          bg-white
          hover:bg-blue-200 hover:text-white
          rounded-2xl
          p-2
          focus:outline-none
          w-12
          h-12
          flex
          items-center
          justify-center
        "
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  </form>
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
  <div v-else-if="this.results.length">
    <div
      class="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      <div
        v-for="item in this.results"
        :key="item.id"
        class="
          bg-white
          rounded-xl
          grid grid-cols-1
          art-grid
          sm:gap-x-8
          hover:shadow-lg
        "
      >
        <div
          class="
            relative
            z-10
            col-start-1
            row-start-1
            px-4
            pt-40
            pb-3
            text-shadow
          "
        >
          <p class="text-sm font-medium text-white sm:mb-1">
            {{ item.principalOrFirstMaker }}
          </p>
          <h2
            class="
              text-xl
              font-semibold
              text-white
              sm:text-2xl sm:leading-7
              md:text-3xl
            "
          >
            {{ item.title }}
          </h2>
        </div>
        <div class="col-start-1 row-start-2 flex justify-center p-4">
          <router-link
            :to="{ name: 'Details', params: { id: item.objectNumber } }"
            class="
              bg-blue-100
              hover:bg-blue-200
              text-blue-700 text-base
              font-semibold
              px-6
              py-2
              rounded-lg
            "
            >More Information</router-link
          >
        </div>
        <div class="col-start-1 row-start-1 flex">
          <div class="w-full grid">
            <div class="relative">
              <img
                :src="item.webImage.url"
                alt="Art picture."
                class="
                  absolute
                  inset-0
                  w-full
                  h-full
                  rounded-t-xl
                  object-cover
                  bg-gray-100
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.totalPages > 1" class="flex justify-center mt-6">
      <button
        v-if="this.page > 1"
        @click="this.page--"
        class="
          bg-blue-100
          hover:bg-blue-200
          text-blue-700 text-base
          font-semibold
          p-4
          mx-4
          rounded-full
        "
      >
        <svg
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
          />
        </svg>
      </button>
      <div
        class="
          bg-blue-100
          text-gray-600 text-base
          font-semibold
          p-4
          mx-4
          rounded-full
          h-14
          w-14
          flex
          items-center
          justify-center
        "
      >
        {{ this.page }}
      </div>
      <button
        v-if="this.page < this.totalPages"
        @click="this.page++"
        class="
          bg-blue-100
          hover:bg-blue-200
          text-blue-700 text-base
          font-semibold
          p-4
          mx-4
          rounded-full
        "
      >
        <svg
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
  <div v-else class="flex justify-center p-40">
    <h1 class="text-white text-xl">No results.</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import requestOptions from '../api/api';
import fetchImages from '../api/fetch-images';
import SortDropdown from '@/components/SortDropdown.vue';
import ColorDropdown from '@/components/ColorDropdown.vue';

export default defineComponent({
  name: 'Images',
  components: {
    SortDropdown,
    ColorDropdown,
  },
  data() {
    return {
      isLoading: true,
      page: 1,
      totalPages: 1,
      search: '',
      color: '',
      sort: '',
      results: [],
    };
  },
  watch: {
    page() {
      this.fetchItems();
    },
    sort() {
      this.fetchItems();
    },
    color() {
      this.fetchItems();
    },
  },
  methods: {
    async fetchItems() {
      this.isLoading = true;
      let data = await fetchImages(
        this.search,
        this.page,
        this.sort,
        this.color
      );
      this.results = data.artObjects;
      this.totalPages = Math.ceil(data.count / requestOptions.resultsPerPage);
      this.isLoading = false;
    },
    onSubmit() {
      this.page = 1;
      sessionStorage.setItem('search', this.search);
      this.fetchItems();
    },
    setSort(value: string) {
      this.sort = value;
    },
    setColor(value: string) {
      this.color = encodeURIComponent(value);
    },
    clearSearch() {
      this.search = '';
    },
  },
  mounted() {
    let data = sessionStorage.getItem('search');
    if (data) {
      this.search = data;
    }
    this.fetchItems();
  },
});
</script>
