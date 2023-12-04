<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="12" md="5" class="d-flex flex-column">
        <span class="mb-3">{{ $t('Main Category') }}:</span>
        <v-autocomplete v-model="categoriesSelected" clearable chips :label="$t('Choose...')" :items="categories" multiple
          :item-value="$i18n.locale === 'ar' ? 'name_arabic' : 'name_english'"
          :item-title="$i18n.locale === 'ar' ? 'name_arabic' : 'name_english'" hide-no-data return-object close-text
          hide-selected :loading="categoriesLoading" />
      </v-col>
      <v-col cols="12" md="5" class="d-flex flex-column">
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
      <v-col cols="6" md="3" v-for="film in films" :key="film.UUID">
        <MovieCard :name="$i18n.locale === 'ar' ? film.name_arabic : film.name_english" :path="`/film/${film.slug}`"
          :description="`${$t('From')} ${$i18n.locale === 'ar' ? film.Series.name_arabic : film.Series.name_english}`"
          :description-path="`/series/${film.Series.slug}`"
          :disabled="userSeries.length ? (userSeries.includes(film.Series.UUID) ? false : true) : true" />
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
      subCategories: [],
      subCategoriesLoading: false,
      subCategoriesNameFilter: null,
      subCategoriesSelected: [],
      filmsLoading: false,
      films: [],
      lastPayload: {}
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
      if (this.slug.subCategory) {
        await this.getSubCategoriesByName();
        const categoriesIds = this.subCategories.map((category) => category.category_id)
        this.categoriesSelected = this.categories.filter((category) => categoriesIds.includes(category.UUID))
        this.subCategoriesSelected = this.subCategories
      }
      else if (this.slug.category && !this.slug.subCategory) {
        this.categoriesSelected = this.categories.filter((category) => category.name_arabic == this.slug.category)
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
    userSeries() {
      if (this.user && this.user.Series_access) return this.user.Series_access.map((access) => access.series_id)
      return []
    },
    filmsPayload() {
      return {
        categories: this.categoriesSelected.map((category) => category.UUID),
        subcategories: this.subCategoriesSelected.map((category) => category.UUID)
      }
    }
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
    async getSubCategoriesByName() {
      this.subCategoriesLoading = true;
      await this.$axios.get(`/sub-categories/`, {
        params: {
          name: {
            lang: "ar",
            names: [this.slug.subCategory]
          },
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
      if (this.areObjectsEqual(this.lastPayload, this.filmsPayload)) return
      this.lastPayload = { ...this.filmsPayload };
      this.filmsLoading = true;
      await this.$axios.get('/films/by-category/', {
        params: this.filmsPayload
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
