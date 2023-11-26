<template>
  <span>{{slug}}</span>
</template>

<script>

export default {
  name: 'SeriesComponent',
  data() {
    
  },
  mounted() {
    document.title = 'New Tab Title';
  },
  props:{
    slug: {
      type: String,
      required: true
    }
  }
}
</script>
