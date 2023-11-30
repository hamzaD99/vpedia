<template>
  <FilmComponent :slug="slug" />
</template>

<script>

import FilmComponent from '@/components/FilmComponent.vue'
export default {
  name: 'FilmPage',
  data() {
    return {
      slug: this.$route.params.slug
    }
  },
  components:{
    FilmComponent
  }
}
</script>
