<template>
  <v-container>
    <v-row style="height: 55vh;" v-if="filmLoading" align="center" justify="center">
      <v-progress-circular size="50" indeterminate color="primary" />
    </v-row>
    <v-row v-else align="center" justify="center">
      {{ this.film }}
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FilmComponent',
  data() {
    return {
      filmLoading: false
    }
  },
  mounted() {
    document.title = `${this.$t('Vpedia')}`;
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  async created() {
    await this.getFilmBySlug()
  },
  methods: {
    async getFilmBySlug() {
      this.filmLoading = true;
      await this.$axios.get(`/films/${this.slug}`,{
        params: {
          includeSeries: true
        }
      })
        .then((res) => {
          this.film = res.data
          if(!this.film) this.$router.push('/films')
          document.title = `${this.$i18n.locale === 'ar' ? this.film.name_arabic : this.film.name_english} - ${this.$t('Vpedia')}`;
          console.log(this.film)
        })
        .catch((err) => {
          this.$error(err, this.$t("You don't have access to this film"))
        })
        .finally(()=>{
          this.filmLoading = false
        })
    },
    hasAccess(){

    }
  }
}
</script>
