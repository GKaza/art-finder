<template>
  <div class="p-6">
    <details-view :id="this.id" />
  </div>
</template>

<script>
import DetailsView from '../components/DetailsView.vue';

export default {
  name: 'Details',
  components: { DetailsView },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
};
</script>
