<template>
  <span>{{samlResponse}}</span>
</template>

<script>

export default {
  name: 'SAMLLoginPage',
  created(){
    console.log(this.$route)
  },
  mounted() {
    const samlResponse = this.$route.query.SAMLResponse;
    console.log(samlResponse)
  }
}
</script>
