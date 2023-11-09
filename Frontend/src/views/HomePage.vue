<template>
  <NavBar />
</template>

<script>

import { mapGetters } from 'vuex';
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'HomePage',
  components:{
    NavBar
  },
  computed:{
    ...mapGetters({
			token: 'token'
    })
  },
}
</script>
