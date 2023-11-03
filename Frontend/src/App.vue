<template>
  <v-app :style="this.$i18n.locale === 'ar' ? 'direction: rtl !important;' : ''">
    <v-main>
      <v-snackbar location="top" top v-model="snackbar.show" timeout="4000">
        {{ snackbar.message }}
        <template v-slot:actions>
          <v-btn color="primary" variant="text" @click="$store.dispatch('hideSnackbar')">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed:{
    ...mapGetters({
			snackbar: 'snackbar',
    })
  },
  watch:{
    snackbar:{
      handler(val){
        if(!val.show) this.$store.dispatch('hideSnackbar')
      },
      deep: true
    }
  },
  data: () => ({
  }),
}
</script>