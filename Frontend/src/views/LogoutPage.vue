<template>
  <div></div>
</template>

<script>

export default {
  name: 'LogoutPage',
  mounted(){
    console.log("hi")
    this.$store.dispatch('logout')
    this.$router.push("/")
  }
}
</script>
