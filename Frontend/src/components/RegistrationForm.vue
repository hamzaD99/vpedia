<template>
    <v-container class="fill-height">
      <v-row justify="center" class="ma-7 ma-md-0">
        <v-col md="5" cols="12" :style="$vuetify.display.mdAndUp ? 'border-radius: 10px 0px 0px 10px;padding: 50px 40px;':'border-radius: 10px 10px 0px 0px;padding: 30px 20px;'" class="brainboost-section brainboost-section__left text-center align-center align-md-baseline text-md-start">
          <h1 class="text-uppercase mb-6">Welcome!</h1>
          <p class="mb-10"><b>BrainBoost</b> is an innovative online learning platform that caters to students of all ages and backgrounds. Its design focuses on delivering an engaging learning experience that's both dynamic and effective. With a user-friendly interface and a wealth of resources, it makes education enjoyable and accessible to a wide audience.</p>
          <h3 class="text-uppercase mb-9 mb-md-16" style="font-family: 'Barlow Semi Condensed';font-size: 25px;">Boost your mind, boost your future</h3>
          <v-btn @click="$router.push('/login')" class="text-uppercase" style="height: 50px;">
            Have an account?
          </v-btn>
        </v-col>
        <v-col md="5" cols="12" :style="$vuetify.display.mdAndUp ? 'border-radius: 0px 10px 10px 0px;padding: 50px 40px;':'border-radius: 0px 0px 10px 10px;padding: 30px 20px;'" class="brainboost-section brainboost-section__right text-center align-center align-md-baseline text-md-start">
          <h1 class="text-uppercase mb-6">registration form</h1>
          <!-- Name -->
          <v-container class="pa-0">
            <v-row align="center" justify="center" class="mb-1">
              <v-col cols="7" md="6">
                <InputField :rules="rules.nameRules" v-model="firstName" name="First Name" label />
              </v-col>
              <v-col cols="7" md="6">
                <InputField :rules="rules.nameRules" v-model="lastName" name="Last Name" label />
              </v-col>
            </v-row>
            <InputField :rules="rules.emailRules" v-model="email" name="Email" label />
            <v-row align="center" justify="center" class="mt-1 mb-1">
              <v-col cols="7" md="6">
                <InputField type="password" :rules="rules.passwordRules" v-model="password" name="Password" label />
              </v-col>
              <v-col cols="7" md="6">
                <InputField type="password" :rules="confirmPasswordRules" v-model="confirmPassword" name="Confirm Password" label />
              </v-col>
            </v-row>
            <div class="d-flex mb-5">
              <input class="ml-1 mr-2" style="transform: scale(1.3);" type="checkbox" @change="terms = !terms" />
              <div class="text-black font-weight-medium">
                I agree to the <a href="/terms">Terms and Conditions</a>
              </div>
            </div>
            <v-btn :loading="registerationLoading" @click="registerUser()" :disabled="isRegisterDisabled" class="text-uppercase" color="primary" style="height: 50px;">
            Register
            </v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>

import InputField from '@/components/InputField.vue'
export default {
  name: 'RegistrationForm',
  components:{
    InputField
  },
  computed: {
    confirmPasswordRules() {
      return [
        (value) => !!value || 'Confirm Password is required',
        (value) => value === this.password || 'Passwords do not match',
      ]
    },
    isRegisterDisabled(){
      return this.confirmPasswordRules.some(rule => rule(this.confirmPassword) !== true) || this.rules.nameRules.some(rule => rule(this.firstName) !== true) || this.rules.nameRules.some(rule => rule(this.lastName) !== true) || this.rules.emailRules.some(rule => rule(this.email) !== true) || this.rules.passwordRules.some(rule => rule(this.password) !== true) || !this.terms
    }
  },
  data: () => ({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    terms: null,
    registerationLoading: false,
    rules:{
      nameRules: [
        value => !!value || 'Name is required',
      ],
      emailRules: [
        (value) => !!value || 'Email is required',
        (value) => /.+@.+\..+/.test(value) || 'Not a valid Email',
      ],
      passwordRules: [
        (value) => !!value || 'Password is required',
        (value) => value.length >= 8 || 'Password must be at least 8 characters',
        (value) => /[A-Z]/.test(value) || 'Password must contain an uppercase letter',
        (value) => /[a-z]/.test(value) || 'Password must contain a lowercase letter',
        (value) => /\d/.test(value) || 'Password must contain a digit',
        (value) => /[!@#$%^&*]/.test(value) || 'Password must contain a special character',
      ],
    }
  }),
  methods: {
    registerUser() {
      this.registerationLoading = true;
      this.$axios.post('/users/',{
        email: this.email,
        name: `${this.firstName} ${this.lastName}`,
        password: this.password
      })
      .then(() => {
        this.$router.push('/login')
      })
      .catch((err) => {
        let keys = Object.keys(err.response.data)
        let error_message = ''
        keys.map((error)=>{
          err.response.data[error].map((msg) => {
            error_message += `${msg}\n`
          })
        })
        error_message = error_message.slice(0,-1)
        this.$store.dispatch('showSnackbar',{ message: error_message })
      })
      .finally(()=>{
        this.registerationLoading = false;
      })
    },
  },
}
</script>

<style scoped lang="scss">
.brainboost-section{
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  &__right{
    background-color: white;
    color: rgb(var(--v-theme-primary));
  }
  &__left{
    background-color: rgb(var(--v-theme-primary));
    z-index: 1;
    color: white;
  }
}
</style>