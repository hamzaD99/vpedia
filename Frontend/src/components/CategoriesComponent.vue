<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="5" class="d-flex flex-column">
        <span class="mb-3">{{ $t('Main Category') }}:</span>
        <v-autocomplete v-model="categoriesSelected" clearable chips :label="$t('Choose...')" :items="categories" multiple
          :item-value="$i18n.locale === 'ar' ? 'name_arabic' : 'name_english'"
          :item-title="$i18n.locale === 'ar' ? 'name_arabic' : 'name_english'" hide-no-data return-object close-text
          hide-selected :loading="categoriesLoading" />
      </v-col>
      <v-col cols="5" class="d-flex flex-column">
        <span class="mb-3">{{ $t('Sub Categories') }}:</span>
        <v-autocomplete v-model="subCategoriesSelected" clearable chips :label="$t('Choose...')" :items="subCategories"
          multiple :disabled="!categoriesSelected.length"
          :item-value="$i18n.locale === 'ar' ? 'name_arabic' : 'name_english'"
          :item-title="$i18n.locale === 'ar' ? 'name_arabic' : 'name_english'" hide-no-data return-object close-text
          hide-selected :loading="subCategoriesLoading" />
      </v-col>
    </v-row>
    <v-row v-if="filmsLoading" align="center" justify="center">
      <v-progress-circular size="50" indeterminate color="primary" />
    </v-row>
    <v-row v-else>
      <v-col cols="3" v-for="film in films" :key="film.UUID">
        <MovieCard :name="$i18n.locale === 'ar' ? film.name_arabic : film.name_english" :path="`/film/${film.slug}`" :description="`${$t('From')} ${$i18n.locale === 'ar' ? film.Series.name_arabic : film.Series.name_english}`" :description-path="`/series/${film.Series.slug}`" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import MovieCard from '@/components/MovieCard.vue'
export default {
  name: 'CategoriesComponent',
  data() {
    return {
      categories: [],
      categoriesLoading: false,
      categoriesSelected: [],
      subCategories: [],
      subCategoriesLoading: false,
      subCategoriesNameFilter: null,
      subCategoriesSelected: [],
      filmsLoading: false,
      films: []
    }
  },
  components: {
    MovieCard
  },
  async created() {
    await this.getCategories();
  },
  watch: {
    categoriesSelected() {
      if (this.categoriesSelected.length) {
        this.getSubCategories()
        this.getFilms()
      }
    },
    subCategoriesSelected() {
      this.getFilms()
    }
  },
  methods: {
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
    async getSubCategories() {
      this.subCategoriesLoading = true;
      await this.$axios.get(`/sub-categories/`, {
        params: {
          categoryId: this.categoriesSelected.map((category) => category.UUID),
        }
      })
        .then((res) => {
          this.subCategories = res.data
        })
        .catch((err) => {
          this.$error(err)
        })
        .finally(() => {
          this.subCategoriesLoading = false
        })
    },
    async getFilms() {
      this.filmsLoading = true;
      await this.$axios.get('/films/by-category/', {
        params: {
          categories: this.categoriesSelected.map((category) => category.UUID),
          subcategories: this.subCategoriesSelected.map((category) => category.UUID)
        }
      })
        .then((res) => {
          this.films = res.data
        })
        .catch((err) => {
          this.$error(err)
        })
        .finally(() => {
          this.filmsLoading = false;
        })
    },
  },
}
</script>
