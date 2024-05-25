<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="5" class="d-flex flex-column">
        <v-text-field prepend-inner-icon="mdi-magnify" variant="solo" :label="$t('Enter Film Name')" v-model="searchValue"
          @keyup.enter="searchName" />
      </v-col>
    </v-row>
    <v-row v-if="filmsLoading" align="center" justify="center">
      <v-progress-circular size="50" indeterminate color="primary" />
    </v-row>
    <v-row v-else justify="center">
      <v-col cols="6" md="3" v-for="film in films" :key="film.id">
        <MovieCard :name="$i18n.locale === 'ar' ? film.name_arabic : film.name_english" :path="`/film/${film.slug}`"
          :description="`${$t('From')} ${$i18n.locale === 'ar' ? film.Series.name_arabic : film.Series.name_english}`"
          :description-path="`/series/${film.Series.slug}`"
          :disabled="!$filters.isActiveUser(user)" />
      </v-col>
    </v-row>
    <v-row v-if="!filmsLoading && films.length" justify="center">
      <v-col md="7" cols="12">
        <div style="padding: 20px;display: flex;justify-content: space-between;align-items: center;">
          <v-btn :size="$vuetify.display.mobile ? 'small' : 'default'" :disabled="page == 1" @click="fetchPage(-1)"
            :elevation="0" icon>
            <v-icon>{{ $i18n.locale === 'ar' ? 'mdi-arrow-right' : 'mdi-arrow-left' }}</v-icon>
          </v-btn>
          <span :style="$vuetify.display.mobile ? 'font-size: 14px' : ''">{{ $t('Page number') }} {{ page }} {{ $t('out of') }} {{ filmsTotalPages }}</span>
          <v-btn :size="$vuetify.display.mobile ? 'small' : 'default'" :disabled="page == filmsTotalPages"
            @click="fetchPage(1)" :elevation="0" icon>
            <v-icon>{{ $i18n.locale === 'ar' ? 'mdi-arrow-left' : 'mdi-arrow-right' }}</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import MovieCard from '@/components/MovieCard.vue'
import { mapGetters } from 'vuex';
export default {
  name: 'SearchComponent',
  data() {
    return {
      filmsLoading: false,
      films: [],
      searchValue: null,
      page: 1,
      nameFilter: null,
      filmsTotalCount: null,
      filmsTotalPages: null
    }
  },
  components: {
    MovieCard
  },
  async created() {
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  watch: {

  },
  methods: {
    async getFilms() {
      this.filmsLoading = true;
      await this.$axios.get('/films', {
        params: {
          page: this.page,
          name: this.nameFilter,
          includeSeries: true
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
          this.filmsLoading = false;
        })
    },
    fetchPage(direction) {
      this.page += direction
      this.getFilms()
    },
    searchName() {
      if (this.searchValue.length > 1) {
        this.nameFilter = {
          lang: "ar",
          names: [this.searchValue]
        }
        this.page = 1
        this.getFilms()
      }
      else if (this.searchValue.length > 0 && this.searchValue.length < 2) {
        this.$error(this.$t('Enter more than 1 letter'), 'Enter more than 1 letter')
      }
    },
  },
}
</script>
