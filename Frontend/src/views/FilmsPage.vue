<template>
  <span>{{user ? user :'null'}}</span>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
  name: 'FilmsPage',
  components:{
    
  },
  computed:{
    ...mapGetters({
			token: 'token',
      user: 'user'
    })
  },
}
</script>
