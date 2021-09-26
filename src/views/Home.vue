<template>
  <div class="p-6">
    <Images />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Images from '@/components/Images.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Images,
  },
});
</script>
