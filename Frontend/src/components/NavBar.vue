<template>
  <div id="navBar">
    <v-app-bar v-if="!$vuetify.display.mobile" flat app :elevation="1"
      style="background-color: rgba(var(--v-theme-secondaryBackground),0.4) !important" clipped-left class="navbar">
      <router-link class="ml-5 mb-1 mr-3 mt-1" :to="{ name: 'HomePage' }">
        <v-img alt="Vpedia" class="shrink" contain :src="require('../assets/logo.png')" transition="scale-transition"
          width="100" />
      </router-link>
      <router-link v-for="item in items" :key="item.path" :to="{ name: item.path }" exact class="nav-link">
        <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
        <span v-if="item.name">{{ $t(item.name) }}</span>
      </router-link>
      <v-spacer />
      <div class="d-flex align-center">
        <span style="font-size: 13px;
        color: #0c2d48;
        font-weight: bold;" v-if="token && user">{{`${$t("Hi")}, ${user.name}` }}</span>
        <span style="font-size: 13px;padding: 16px;
        color: #0c2d48;" v-if="token && user">|</span>
        <a @click="logout()" v-if="token" exact style="text-decoration: none;
        padding: 8px 16px;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        font-size: 13px;
        color: #0c2d48;
        font-weight: bolder;">
          {{ $t('Logout') }}
        </a>
        <router-link v-else :to="{ name: 'LoginPage' }" exact style="text-decoration: none;
        color: #0c2d48;
        padding: 12px 16px;
        border-bottom: 2px solid transparent;
        font-size: 13px;
        font-weight: bolder;">
          {{ $t('Login') }}
        </router-link>
      </div>
    </v-app-bar>
    <v-app-bar v-else flat app :elevation="1"
      style="background-color: rgba(var(--v-theme-secondaryBackground),0.4) !important" clipped-left class="navbar">
      <router-link class="ml-5 mb-1 mr-3 mt-1" :to="{ name: 'HomePage' }">
        <v-img alt="Vpedia" class="shrink" contain :src="require('../assets/logo.png')" transition="scale-transition"
          width="100" />
      </router-link>
      <v-spacer />
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list lines="one" nav>
        <v-list-item v-for="(item, i) in items" :key="i" :value="item.path" color="primary"
          :to="{ name: item.path }"><v-icon v-if="item.icon">{{ item.icon }}</v-icon>
        <span v-if="item.name" style="font-size: 18px;">{{ $t(item.name) }}</span></v-list-item>

        <div class="mt-10">
          <a @click="logout()" v-if="token" exact style="text-decoration: none;
          color: #0c2d48;
          padding: 8px 16px;
          border-bottom: 2px solid transparent;
          font-size: 13px;
          cursor: pointer;
          font-weight: bolder;">
            {{ $t('Logout') }}
          </a>
          <router-link v-else :to="{ name: 'LoginPage' }" exact style="text-decoration: none;
          color: #0c2d48;
          padding: 8px 16px;
          border-bottom: 2px solid transparent;
          font-size: 13px;
          font-weight: bolder;">
            {{ $t('Login') }}
          </router-link>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
  name: 'NavBar',
  computed: {
    ...mapGetters({
      token: 'token',
      user: 'user'
    })
  },
  data: () => ({
    items: [
      { name: 'Home', path: 'HomePage' },
      { name: 'Films', path: 'FilmsPage' },
      { name: 'Category', path: 'CategoriesPage' },
      { name: 'About Us', path: 'AboutUsPage' },
      { name: 'Contact Us', path: 'ContactPage' },
      { icon: 'mdi-magnify', path: 'SearchPage' }
    ],
    drawer: false
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.go("/films")
    }
  }
}
</script>
<style scoped>
:deep(.v-toolbar__content) {
  align-items: end !important;
  height: 55px !important;
}

.nav-link {
  text-decoration: none;
  color: #0c2d48;
  padding: 8px 16px;
  border-bottom: 2px solid transparent;

  &.router-link-active {
    border-color: #007bff;
    font-weight: bolder;
  }

  &:hover {
    border-color: #007bff;
  }
}
</style>
