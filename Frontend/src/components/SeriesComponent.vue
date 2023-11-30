<template>
  <v-container>
    <v-row style="height: 55vh;" v-if="seriesLoading" align="center" justify="center">
      <v-progress-circular size="50" indeterminate color="primary" />
    </v-row>
    <v-row v-else align="center" justify="center">
      <v-col cols="12">
        <v-img style="width: 100%; height: 450px;" cover
          :src="series ? series.image : require('@/assets/default-series.jpg')"></v-img>
      </v-col>
      <v-col class="d-flex justify-center" cols="12">
        <h1 style="color: rgb(var(--v-theme-primary));">{{ $i18n.locale === 'ar' ? series.name_arabic :
          series.name_english }}</h1>
      </v-col>
      <v-col class="d-flex justify-center" cols="12">
        <h3>{{ $i18n.locale === 'ar' ? series.description_arabic : series.description_english }}</h3>
      </v-col>
      <v-col cols="4">
        <v-text-field prepend-inner-icon="mdi-magnify" variant="solo" label="ابحث عن فيلم معين" v-model="searchValue" @keyup.enter="searchName" />
      </v-col>
      <v-col class="mt-3" cols="12">
        <v-expansion-panels v-model="panel">
          <v-expansion-panel value="content" :title="`${$t('Content')} (${filmsTotalCount} ${$t('Film')})`">
            <v-expansion-panel-text>
              <div style="border: 1px solid rgba(128, 128, 128, 0.621);padding-top: 30px;border-radius: 3px;">
                <div v-if="filmsLoading" style="width: 100%;display: flex; justify-content: center;margin-bottom: 25px;">
                  <v-progress-circular size="50" indeterminate color="primary" />
                </div>
                <div v-else v-for="film in films" :key="film.UUID" style="width: 100%;" class="px-16">
                  <div class="d-flex justify-space-between" style="width: 100%;">
                    <router-link :style="this.hasAccessVar ? 'color: rgb(var(--v-theme-primary));text-decoration: none;' : 'pointer-events: none;text-decoration: none;color: black;'" :to="this.hasAccessVar ? `/film/${film.slug}` : ''">
                      <h3>{{ $i18n.locale === 'ar' ? film.name_arabic : film.name_english }}</h3>
                    </router-link>
                    <div style="height: 20px; width: 40px; background-color: blue;">j</div>
                  </div>
                  <v-divider class="mt-5 mb-5" />
                </div>
                <div v-if="!filmsLoading"
                  style="width: 100%; background-color: rgb(221 221 221 / 62%);padding: 20px;display: flex;justify-content: space-between;align-items: center;">
                  <v-btn :disabled="page == 1" @click="fetchPage(-1)" :elevation="0" icon>
                    <v-icon>{{ $i18n.locale === 'ar' ? 'mdi-arrow-right' : 'mdi-arrow-left' }}</v-icon>
                  </v-btn>
                  <span>{{ $t('Page number') }} {{ page }} {{ $t('out of') }} {{ filmsTotalPages }}</span>
                  <v-btn :disabled="page == filmsTotalPages" @click="fetchPage(1)" :elevation="0" icon>
                    <v-icon>{{ $i18n.locale === 'ar' ? 'mdi-arrow-left' : 'mdi-arrow-right' }}</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SeriesComponent',
  data() {
    return {
      series: null,
      seriesLoading: false,
      films: null,
      page: 1,
      filmsTotalCount: null,
      filmsTotalPages: null,
      filmsLoading: false,
      searchValue: null,
      panel: null,
      nameFilter: null,
      hasAccessVar: false
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
    await this.getSeriesBySlug()
    await this.getFilms()
    this.hasAccess()
  },
  methods: {
    async getSeriesBySlug() {
      this.seriesLoading = true;
      await this.$axios.get(`/series/${this.slug}`)
        .then((res) => {
          this.series = res.data
          if(!this.series) this.$router.push('/films')
          document.title = `${this.$i18n.locale === 'ar' ? this.series.name_arabic : this.series.name_english} - ${this.$t('Vpedia')}`;
          console.log(this.series)
        })
        .catch((err) => {
          this.$error(err)
        })
    },
    async getFilms() {
      this.filmsLoading = true;
      await this.$axios.get(`/films/seriesId/${this.series.UUID}`, {
        params: {
          page: this.page,
          name: this.nameFilter
        }
      })
        .then((res) => {
          console.log(res.data)
          this.filmsTotalCount = res.data.pagination.totalCount
          this.filmsTotalPages = res.data.pagination.totalPages
          this.films = res.data.films
        })
        .catch((err) => {
          this.$error(err)
        })
        .finally(() => {
          this.seriesLoading = false;
          this.filmsLoading = false;
        })
    },
    fetchPage(direction) {
      this.page += direction
      this.getFilms()
    },
    searchName(){
      if (this.searchValue.length > 2) {
        if (!this.panel) this.panel = 'content'
        this.nameFilter = {
          lang: "ar",
          names: [this.searchValue]
        }
        this.page = 1
        this.getFilms()
        this.nameFilter = null
      }
      else if(this.searchValue.length > 0 && this.searchValue.length < 3){
        this.$error(this.$t('Enter more than 2 letters'), 'Enter more than 2 letters')
      }
      if(!this.searchValue){
        if (!this.panel) this.panel = 'content'
        this.page = 1
        this.getFilms()
      }
    },
    hasAccess(){
      if(Object.keys(this.user).length === 0){
        this.hasAccessVar = false
        return
      }
      const series_ids = this.user.Series_access.map((access) => access.series_id)
      this.hasAccessVar =  series_ids.includes(this.series.UUID)
    }
  }
}
</script>
