<template>
  <div class="align-center d-flex fill-height flex-column justify-center" style="row-gap: 50px; font-size: xx-large;">
    {{ $t('Wait for the redirection..') }}
    <v-progress-circular size="100" indeterminate color="primary" />
  </div>
</template>

<script>

export default {
  name: 'SAMLLoginPage',
  async mounted(){
    let token = this.$route.query.token
    this.$axios.defaults.headers.Authorization = `Bearer ${token}`
    await this.getUser()
  },
  methods:{
    async getUser() {
      await this.$axios.get(`/users/get/`)
        .then((res) => {
          if(res.data && res.data.token && res.data.user){
            this.$store.dispatch('login', res.data)
            this.$router.push("/films")
          }
          this.$router.push("/")
        })
        .catch((err) => {
          this.$error(err)
        })
    },
  }
}
</script>
