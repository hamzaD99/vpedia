<template>
  <SeriesComponent :slug="slug" />
</template>

<script>

import SeriesComponent from '@/components/SeriesComponent.vue'
export default {
  name: 'SeriesPage',
  data() {
    return {
      slug: this.$route.params.slug
    }
  },
  components:{
    SeriesComponent
  }
}
</script>
