<template>
  <v-container>
    <v-row style="height: 55vh;" v-if="seriesLoading" align="center" justify="center">
      <v-progress-circular size="50" indeterminate color="primary" />
    </v-row>
    <v-row v-else>
      <v-col v-for="series in seriesList" :key="series.id" md="4" sm="6" cols="12">
        <MovieCard :name="$i18n.locale === 'ar' ? series.name_arabic : series.name_english"
          :description="$i18n.locale === 'ar' ? series.description_arabic : series.description_english"
          :path="`/series/${series.slug}`" :image="series.image" default-image />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'FilmsPage',
  components:{
    MovieCard
  },
  data() {
    return {
      seriesList: [],
      seriesLoading: false,
    }
  },
  created(){
    this.getSeries()
  },
  methods: {
    getSeries() {
      this.seriesLoading = true;
      this.$axios.get("/series")
      .then((res) => {
        this.seriesList = res.data
        console.log(this.seriesList)
      })
      .catch((err) => {
        this.$error(err)
      })
      .finally(() => {
        this.seriesLoading = false;
      })
    }
  }
}
</script>
