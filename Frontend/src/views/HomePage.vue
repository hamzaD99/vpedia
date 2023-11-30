<template>
  <div>
    <!-- Landing -->
    <v-container fluid class="pa-0">
      <v-row style="height: 525px; overflow: hidden;">
        <v-col cols="12" class="pa-1">
          <v-img style="width: 100%; height: 525px;" cover class="image-transition" :src="require(`@/assets/Banner-01.jpg`)">
            <div class="text-center" style="display: flex;height: 525px;align-items: center;justify-content: center;">
              <h1 style="color: white; font-size: 55px;">
                {{ $t("Vpedia") }}
              </h1>
            </div>
          </v-img>
        </v-col>
      </v-row>
    </v-container>


    <!-- About us -->
    <v-container class="pa-0 d-flex flex-column align-center justify-center">
      <v-row justify="center" style="width: 85%;" class="mb-1 mt-5">
        <v-col cols="12" class="d-flex align-center">
          <v-divider />
          <h1 style="text-wrap: nowrap;color: rgb(var(--v-theme-primary));" class="mx-5">{{ $t('About Us') }}</h1>
          <v-divider />
        </v-col>
      </v-row>
      <v-row justify="center" style="width: 100%;column-gap: 95px" class="ma-0">
        <v-col md="3" sm="5" cols="8">
          <v-img width="340px" class="image-transition" :src="require('@/assets/logo.png')" />
        </v-col>
        <v-col md="6" sm="8" cols="12" class="align-center align-md-start d-flex flex-column px-6 px-md-0" style="row-gap: 20px;">
          <p>
          {{ $t('We are the leading private media institution in the Arab world that specializes in educational documentary film series of various types, from cultural, historical and scientific. For this purpose, we employ a group of distinguished media professionals, with extensive competencies and experience, each in his field. Our organization has produced a wide range of educational visual materials that have won awards in Arab festivals') }}
          </p>
          <router-link :to="{ name: 'AboutUsPage' }">
            <v-btn height="40px" color="primary">{{ $t('Read More') }}</v-btn>
          </router-link>
        </v-col>
      </v-row>


      <!-- Most Wastshed Movies -->
      <v-row justify="center" style="width: 85%;" class="mb-1 mt-5">
        <v-col cols="12" class="d-flex align-center">
          <v-divider />
          <h1 style="text-wrap: nowrap;color: rgb(var(--v-theme-primary));" class="mx-5">{{ $t('Most Watched Series') }}
          </h1>
          <v-divider />
        </v-col>
      </v-row>
      <v-row style="width: 85%;" class="mb-10 d-flex justify-center">
        <v-progress-circular v-if="seriesLoading" indeterminate color="primary" />
        <v-col v-else v-for="series in seriesList" :key="series.UUID" md="3" sm="6" cols="12">
          <MovieCard :name="$i18n.locale === 'ar' ? series.name_arabic : series.name_english"
            :description="$i18n.locale === 'ar' ? series.description_arabic : series.description_english"
            :path="`/series/${series.slug}`" :image="series.image"/>
        </v-col>
      </v-row>
      <v-row justify="center" style="width: 85%;" class="mb-1 mt-5">
        <router-link :to="{ name: 'FilmsPage' }">
          <v-btn style="border-radius: 3px; font-weight: 600;" height="50px" color="primary">{{ $t('Watch all series')
          }}</v-btn>
        </router-link>
      </v-row>
    </v-container>


    <!-- Numbers -->
    <v-container class="my-8 pa-0" style="max-width: 100% !important; height: 400px;" ref="numbers">
      <v-row style="height: 100%; overflow: hidden;">
        <v-col cols="12" class="pa-1">
          <v-img cover style="width:100%;" class="image-transition" :src="require(`@/assets/Numbers-Background.jpg`)">
            <div class="align-center d-flex flex-column justify-center" cover style="width:100%;height: 400px;color: white; background-color: rgba(0,0,0,0.7); row-gap: 50px;">
              <div class="d-flex align-center mb-2" :style="$vuetify.display.mdAndUp ? 'width: 70%' : 'width: 85%'">
                <v-divider class="border-opacity-100" color="white" />
                <h1 style="text-wrap: nowrap;color: white;" class="mx-5">{{ $t('Insights') }}</h1>
                <v-divider class="border-opacity-100" color="white" />
              </div>
              <div class="d-flex justify-space-around" style="width: 70%; flex-wrap: wrap;">
                <div v-for="number in numbers" :key="number.text" class="d-flex flex-column align-center mx-3">
                  <number style="font-size: 40px; direction: ltr !important;" animationPaused ref="numberElements" :from="number.from" :to="number.to" :duration="1" easing="Power1.easeIn" :format="fromatNumber" />
                  <span>{{ $t(number.text) }}</span>
                </div>
              </div>
            </div>
          </v-img>
        </v-col>
      </v-row>
    </v-container>


    <!-- Contact Us -->
    <v-container class="pa-0 d-flex flex-column align-center justify-center">
      <v-row justify="center" style="width: 85%;" class="mb-1 mt-5">
        <v-col cols="12" class="d-flex align-center">
          <v-divider />
          <h1 style="text-wrap: nowrap;color: rgb(var(--v-theme-primary));" class="mx-5">{{ $t('Contact Us') }}</h1>
          <v-divider />
        </v-col>
      </v-row>
      <v-row justify="space-between" style="width: 85%;" class="mb-1 mt-5">
        <v-col cols="12" md="7" class="d-flex flex-column">
          <h3 class="mb-4" style="color: rgb(var(--v-theme-primary-darken-3));">{{ $t('Send us a message') }}</h3>
          <!-- Form -->
          <div class="d-flex flex-column" style="row-gap: 7px;">
            <div class="d-flex align-center" style="column-gap: 10px;">
              <InputField style="width: 33%;" :rules="$rules.nameRules" v-model="name" :name="$t('Name')" star label />
              <InputField style="width: 33%;" :rules="$rules.emailRules" v-model="email" :name="$t('Email')" label />
              <InputField style="width: 33%;" v-model="phone" :name="$t('Phone Number')" label />
            </div>
            <InputField style="width: 100%;" :rules="$rules.requiredRule" v-model="subject" :name="$t('Subject')" label />
            <InputField style="width: 100%; height: 400px;" :rules="$rules.requiredRule" v-model="message" :name="$t('Message')" label />
            <v-btn :disabled="isSendDisabled" :loading="sendLoading" style="height: 50px;width: fit-content;margin-top: -150px;" color="primary-darken-2" @click="sendMessage">{{ $t('Send') }}</v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="3" class="d-flex flex-column">
          <h3 class="mb-7" style="color: rgb(var(--v-theme-primary-darken-3));">{{ $t('Contact information') }}</h3>
          <div class="d-flex align-center" style="column-gap: 10px;">
            <v-btn
            class="ma-2 pa-2"
            color="primary"
            icon="mdi-phone"
            href="tel:00962777536804"/>
            <div class="d-flex flex-column" style="row-gap: 6px;">
              <h3 style="font-weight: normal; color: rgb(var(--v-theme-primary-darken-3));">{{ $t("Phone Number") }}</h3>
              <a style="direction: ltr;" href="tel:00962777536804">+962 77 753 6804</a>
            </div>
          </div>
          <div class="d-flex align-center mt-7" style="column-gap: 10px;">
            <v-btn
            class="ma-2 pa-2"
            color="primary"
            icon="mdi-email"
            href="mailto:info@vpedia.net"/>
            <div class="d-flex flex-column" style="row-gap: 6px;">
              <h3 style="font-weight: normal; color: rgb(var(--v-theme-primary-darken-3));">{{ $t("Email") }}</h3>
              <a style="direction: ltr;" href="mailto:info@vpedia.net">info@vpedia.net</a>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import InputField from '@/components/InputField.vue'
export default {
  components: {
    MovieCard,
    InputField
  },
  data() {
    return {
      seriesList: [],
      seriesLoading: false,
      name: null,
      email: null,
      phone: null,
      subject: null,
      message: null,
      sendLoading: false,
      numbers: [
        {
          from: 10000,
          to: 100000000,
          text: 'Views'
        },
        {
          from: 10,
          to: 1000,
          text: 'Scientific Films'
        },
        {
          from: 0,
          to: 20,
          text: 'Documentary Series'
        },
        {
          from: 5,
          to: 150,
          text: 'Categories'
        }
      ]
    };
  },
  created() {
    this.getSeries()
  },
  computed: {
    isSendDisabled(){
      return this.$rules.nameRules.some(rule => rule(this.name) !== true) || this.$rules.emailRules.some(rule => rule(this.email) !== true) || this.$rules.requiredRule.some(rule => rule(this.subject) !== true) || this.$rules.requiredRule.some(rule => rule(this.message) !== true)
    }
  },
  methods: {
    getSeries() {
      this.seriesLoading = true;
      this.$axios.get("/series", {
        params: {
          name: {
            lang: "ar",
            names: ["العالم من حولنا", "أحداث القرن العشرين", "قضايا عالمية", "المستكشفون الجدد"]
          }
        }
      })
      .then((res) => {
        this.seriesList = res.data
      })
      .catch((err) => {
        this.$error(err)
      })
      .finally(() => {
        this.seriesLoading = false;
      })
    },
    sendMessage(){
      this.sendLoading = true;
      this.$axios.post("/contact_us", {
        name: this.name,
        email: this.email,
        phone: this.phone,
        subject: this.subject,
        message: this.message,
      })
      .then((res) => {
        this.$store.dispatch('showSnackbar',{ message: this.$t('Your message has been sent successfuly!') })
      })
      .catch((err) => {
        this.$error(err)
      })
      .finally(() => {
        this.sendLoading = false;
      })
    },
    playAnimation() {
      this.$refs.numberElements.map((numberElement) =>{
        numberElement.play()
      })
    },
    fromatNumber(number){
      return '+' + number.toLocaleString('en-US');
    },
    initIntersectionObserver() {
      const target = this.$refs.numbers.$el;

      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const callback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.playAnimation();
          }
        });
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(target);
    },
  },
  mounted() {
    this.initIntersectionObserver();
  },
};
</script>

<style scoped>
.image-transition-enter-active,
.image-transition-leave-active {
  transition: transform 1s;
}

.image-transition-enter,
.image-transition-leave-to {
  transform: translateX(100%);
}
</style>
