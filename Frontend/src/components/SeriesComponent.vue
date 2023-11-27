<template>
  <v-container>
    <v-row style="height: 55vh;" v-if="seriesLoading" align="center" justify="center">
      <v-progress-circular size="50" indeterminate color="primary" />
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-img style="width: 100%; height: 450px;" cover="contain"
        :src="series ? series.image : require('@/assets/default-series.jpg')"></v-img>
      </v-col>
      <v-col class="d-flex justify-center" cols="12">
        <h1 style="color: rgb(var(--v-theme-primary));">{{ $i18n.locale === 'ar' ? series.name_arabic : series.name_english }}</h1>
      </v-col>
      <v-col class="d-flex justify-center" cols="12">
        <h3>{{ $i18n.locale === 'ar' ? series.description_arabic : series.description_english }}</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'SeriesComponent',
  data() {
    return{
      series: null,
      seriesLoading: false
    }
  },
  mounted() {
    document.title = `${this.$t('Vpedia')}`;
  },
  props:{
    slug: {
      type: String,
      required: true
    }
  },
  created(){
    this.getSeriesBySlug()
  },
  methods:{
    getSeriesBySlug() {
      this.seriesLoading = true;
      this.$axios.get(`/series/${this.slug}`)
      .then((res) => {
        this.series = res.data
        document.title = `${this.$i18n.locale === 'ar' ? this.series.name_arabic : this.series.name_english} - ${this.$t('Vpedia')}`;
        console.log(this.series)
      })
      .catch((err) => {
        this.$error(err)
      })
      .finally(() => {
        this.seriesLoading = false;
      })
    },
  }
}
</script>
