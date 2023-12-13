<template>
  <span>AdminPage</span>
</template>

<script>


export default {
  name: 'AdminPage',
  data() {
    return {
      
    }
  },
  async created() {
    await this.$axios.get('/users/')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        this.$error(err)
      })
  },
  components: {

  }
}
</script>
