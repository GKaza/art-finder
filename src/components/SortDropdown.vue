<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="
          inline-flex
          justify-center
          w-28
          p-2
          bg-white
          text-sm
          font-medium
          rounded-full
          text-gray-400
          hover:bg-gray-50
          focus:outline-none
        "
      >
        Sort by
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 -mr-1 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
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
        <div class="py-1">
          <MenuItem
            v-for="(option, key) in options"
            :key="key"
            v-slot="{ active }"
          >
            <button
              @click.prevent="this.$emit('setSort', option.value)"
              :class="[
                active ? 'bg-gray-50 text-gray-700' : 'text-gray-400',
                'px-4 py-2 text-sm w-full flex items-center justify-between',
              ]"
            >
              {{ option.text
              }}<svg
                v-if="option.value === this.currentSort"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
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
    currentSort: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      options: [
        { text: 'Relevance', value: 'relevance' },
        { text: 'Type', value: 'objecttype' },
        { text: 'Date (oldest first)', value: 'chronologic' },
        { text: 'Date (newest first)', value: 'achronologic' },
        { text: 'Artist (a-z)', value: 'artist' },
        { text: 'Artist (z-a)', value: 'artistdesc' },
      ],
    };
  },
  methods: {},
});
</script>
