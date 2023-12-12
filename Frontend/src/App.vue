<template>
  <v-app :style="this.$i18n.locale === 'ar' ? 'direction: rtl !important;' : ''" style="overflow: hidden;">
    <v-main>
      
      <NavBar v-if="!$route.meta.hideHeaderFooter" />

      <v-snackbar location="top" top v-model="snackbar.show" :style="this.$i18n.locale === 'ar' ? 'direction: rtl !important;' : ''">
        {{ snackbar.message }}
        <template v-slot:actions>
          <v-btn color="primary" variant="text" @click="$store.dispatch('hideSnackbar')">
            {{ $t('Close') }}
          </v-btn>
        </template>
      </v-snackbar>
      <router-view style="min-height: calc(100vh - 186px);"></router-view>

      <v-footer v-if="!$route.meta.hideHeaderFooter" style="padding: 0;">
        <TheFooter />
      </v-footer>

    </v-main>
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex';
import NavBar from './components/NavBar.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  name: 'App',
  components:{
    NavBar,
    TheFooter
  },
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
  }
}
</script>