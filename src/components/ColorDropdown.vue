<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="
          inline-flex
          items-center
          justify-center
          p-2
          bg-white
          text-sm
          font-medium
          rounded-full
          text-gray-400
          hover:bg-gray-50
          focus:outline-none
          flex-shrink-0
          w-32
        "
      >
        <div class="mx-2">
          {{ this.currentColor ? this.currentColor : 'Filter by color' }}
        </div>
        <div
          v-if="this.currentColor"
          class="h-5 w-5 rounded-full flex-shrink-0"
          :style="`background:${this.currentColor};`"
        ></div>
        <button
          v-if="this.currentColor"
          @click.prevent="this.$emit('setColor', '')"
          class="text-gray-300 hover:text-gray-400 mx-2"
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
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="
          origin-top-right
          z-50
          absolute
          right-0
          mt-2
          w-56
          rounded-md
          shadow-lg
          bg-white
          ring-1 ring-black ring-opacity-5
          focus:outline-none
        "
      >
        <div class="grid grid-cols-4">
          <MenuItem
            v-for="(color, key) in colors"
            :key="key"
            v-slot="{ active }"
          >
            <button
              @click.prevent="this.$emit('setColor', color)"
              :style="`background:${color};`"
              :class="[
                active ? 'transform scale-105' : '',
                'text-sm w-full h-12 flex items-center justify-between',
              ]"
            ></button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

export default defineComponent({
  name: 'Images',
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  },
  props: {
    currentColor: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      colors: [
        '#737C84',
        '#FBF6E1',
        '#2F4F4F',
        '#E0CC91',
        '#FBF6E1',
        '#000000',
        '#B5BFCC',
        '#737C84',
        '#B35A1F',
        '#E0CC91',
        '#F6ECF3',
        '#000000',
        '#B5BFCC',
        '#F6ECF3',
        '#981313',
        '#F49B7A',
        '#2F4F4F',
        '#DDA5AA',
        '#E09714',
        '#B35A1F',
        '#367614',
        '#4019B1',
        '#4279DB',
        '#DE4153',
        '#62AD77',
        '#8268DC',
        '#850085',
        '#981313',
        '#DDA5AA',
        '#DF4C93',
        '#FFEB00',
        '#4279DB',
      ],
    };
  },
  methods: {},
});
</script>
