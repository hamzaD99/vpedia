<template>
  <CategoriesComponent :slug="slug" />
</template>

<script>

import CategoriesComponent from '@/components/CategoriesComponent.vue'
export default {
  name: 'CategoriesPage',
  data() {
    return {
      slug: this.$route.query
    }
  },
  components:{
    CategoriesComponent
  }
}
</script>
