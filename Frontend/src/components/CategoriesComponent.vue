<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <v-col cols="12" md="5" class="d-flex flex-column">
        <span class="mb-3">{{ $t('Main Category') }}:</span>
        <v-autocomplete v-model="categoriesSelected" clearable chips :label="$t('Choose...')" :items="categories" multiple
          :item-value="$i18n.locale === 'ar' ? 'name_arabic' : 'name_english'"
          :item-title="$i18n.locale === 'ar' ? 'name_arabic' : 'name_english'" hide-no-data return-object close-text
          hide-selected :loading="categoriesLoading" />
      </v-col>
      <v-col cols="12" md="5">
        <div v-if="films.length"
          style="width: 100%; padding: 20px;display: flex;justify-content: space-between;align-items: center;">
          <v-btn :size="$vuetify.display.mobile? 'small' : 'default'" :disabled="page == 1" @click="fetchPage(-1)" :elevation="0" icon>
            <v-icon>{{ $i18n.locale === 'ar' ? 'mdi-arrow-right' : 'mdi-arrow-left' }}</v-icon>
          </v-btn>
          <span :style="$vuetify.display.mobile ? 'font-size: 14px' : ''">{{ $t('Page number') }} {{ page }} {{ $t('out of') }} {{ filmsTotalPages }}</span>
          <v-btn :size="$vuetify.display.mobile? 'small' : 'default'" :disabled="page == filmsTotalPages" @click="fetchPage(1)" :elevation="0" icon>
            <v-icon>{{ $i18n.locale === 'ar' ? 'mdi-arrow-left' : 'mdi-arrow-right' }}</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="filmsLoading" align="center" justify="center">
      <v-progress-circular size="50" indeterminate color="primary" />
    </v-row>
    <v-row v-else>
      <v-col cols="6" md="3" v-for="film in films" :key="film.id">
        <MovieCard :name="$i18n.locale === 'ar' ? film.name_arabic : film.name_english" :path="`/film/${film.slug}`"
          :description="`${$t('From')} ${$i18n.locale === 'ar' ? film.Series.name_arabic : film.Series.name_english}`"
          :description-path="`/series/${film.Series.slug}`"
          :disabled="!$filters.isActiveUser(user)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import MovieCard from '@/components/MovieCard.vue'
import { mapGetters } from 'vuex';
export default {
  name: 'CategoriesComponent',
  data() {
    return {
      categories: [],
      categoriesLoading: false,
      categoriesSelected: [],
      filmsLoading: false,
      films: [],
      lastPayload: {},
      page: 1,
      filmsTotalCount: null,
      filmsTotalPages: null,
      pageSize: 12
    }
  },
  components: {
    MovieCard
  },
  props: {
    slug: {
      type: Object,
      required: true
    }
  },
  async created() {
    await this.getCategories();
    if (this.slug) {
      if (this.slug.category) {
        this.categoriesSelected = this.categories.filter((category) => category.name_arabic == this.slug.category)
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
    filmsPayload() {
      return {
        categories: this.categoriesSelected.map((category) => category.id),
        includeCategories: true,
        includeSeries: true,
        page: this.page,
        pageSize: this.pageSize
      }
    }
  },
  watch: {
    categoriesSelected() {
      if (this.categoriesSelected.length) {
        this.getFilms()
      }
    }
  },
  methods: {
    fetchPage(direction) {
      this.page += direction
      this.getFilms()
    },
    async getCategories() {
      this.categoriesLoading = true;
      await this.$axios.get(`/categories/`)
        .then((res) => {
          this.categories = res.data
        })
        .catch((err) => {
          this.$error(err)
        })
        .finally(() => {
          this.categoriesLoading = false
        })
    },
    async getFilms() {
      if (this.areObjectsEqual(this.lastPayload, this.filmsPayload)) return
      this.lastPayload = { ...this.filmsPayload };
      this.filmsLoading = true;
      await this.$axios.get('/films/', {
        params: this.filmsPayload
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
    areObjectsEqual(obj1, obj2) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (let key of keys1) {
        if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
          return false;
        }
      }

      return true;
    }
  },
}
</script>
