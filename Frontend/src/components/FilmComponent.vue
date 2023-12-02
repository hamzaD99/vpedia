<template>
  <v-container>
    <v-row style="height: 55vh;" v-if="filmLoading" align="center" justify="center">
      <v-progress-circular size="50" indeterminate color="primary" />
    </v-row>
    <v-row v-if="!filmLoading && film" align="center" justify="center">
      <v-col class="text-center" cols="12"><h1>{{ $i18n.locale === 'ar' ? film ? film.name_arabic : '' : film ? film.name_english : '' }}</h1></v-col>
      <v-col class="text-center" cols="12"><h3 style="color: rgb(var(--v-theme-primary));cursor: pointer;" @click="$router.push(`/series/${film.Series.slug}`)">{{ $t("From") }}: {{ $i18n.locale === 'ar' ? film ? film.Series.name_arabic : '' : film ? film.Series.name_english : '' }}</h3></v-col>
      <v-col cols="8">
        <div style="padding:56.25% 0 0 0;position:relative;"><iframe :src="`https://player.vimeo.com/video/${film.film_link}?h=35e46d5ad9&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" :title="film.name_arabic"></iframe></div>
      </v-col>
      <v-col cols="8" class="mt-3 d-flex flex-column" style="font-size: 18px;">
        <span class="mb-4">{{ $i18n.locale === 'ar' ? film.description_arabic : film.description_english }}</span>
        <span v-if="film.reviewer_arabic || film.reviewer_english" class="mb-2" style="color: rgb(var(--v-theme-primary));font-weight: bold;">{{ $t('Scientific Reviewer') }}:</span>
        <span class="mb-4" v-if="film.reviewer_arabic || film.reviewer_english">{{ $i18n.locale === 'ar' ? film.reviewer_arabic : film.reviewer_english }}</span>
        <span class="mb-2" style="color: rgb(var(--v-theme-primary));font-weight: bold;">{{ $t('Main Category') }}:</span>
        <div class="d-flex mb-4" style="column-gap: 18px;">
          <div style="padding: 10px;background: gainsboro;color: black;border-radius: 5px;" v-for="category in film.Categories" :key="category.UUID">{{ $i18n.locale === 'ar' ? category.Category.name_arabic : category.Category.name_english }}</div>
        </div>
        <span class="mb-2" style="color: rgb(var(--v-theme-primary));font-weight: bold">{{ $t('Sub Categories') }}:</span>
        <div class="d-flex mb-4" style="column-gap: 18px;">
          <div style="padding: 10px;background: gainsboro;color: black;border-radius: 5px;" v-for="subCategory in film.SubCategories" :key="subCategory.UUID">{{ $i18n.locale === 'ar' ? subCategory.SubCategory.name_arabic : subCategory.SubCategory.name_english }}</div>
        </div>
      </v-col>
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
          includeSeries: true,
          includeCategories: true,
          includeSubCategories: true
        }
      })
        .then((res) => {
          this.film = res.data
          if(this.film){
            document.title = `${this.$i18n.locale === 'ar' ? this.film.name_arabic : this.film.name_english} - ${this.$t('Vpedia')}`;
            console.log(this.film)
          }
          else {
            this.$error('Film not found')
            this.$router.push('/films')
          }
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
