<template>
    <v-form @submit.prevent="login">
        <v-container class="text-center text-md-start">
            <v-row justify="center" style="width: 100%;" class="mb-10">
                <v-col cols="12" class="d-flex align-center">
                    <v-divider />
                    <h1 style="text-wrap: nowrap;color: rgb(var(--v-theme-primary));" class="mx-5">{{ $t('Login') }}</h1>
                    <v-divider />
                </v-col>
            </v-row>
            <v-row justify="center" style="width: 100%;">
                <v-col md="5" cols="12">
                    <InputField :rules="$rules.requiredRule" v-model="loginHandle" :name="$t('Username or Email')" star />
                </v-col>
            </v-row>
            <v-row justify="center" style="width: 100%;">
                <v-col md="5" cols="12">
                    <InputField type="password" :rules="$rules.requiredRule" v-model="password" :name="$t('Password')"
                        star />
                </v-col>
            </v-row>
            <v-row justify="center" style="width: 100%;">
                <v-col md="5" cols="12">

                    <v-btn type="submit" height="50px" :loading="loginLoading" :disabled="isRegisterDisabled"
                        color="primary" width="100%">{{ $t('Login') }}</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>

import InputField from './InputField.vue';
export default {
    name: 'LoginForm',
    components: {
        InputField
    },
    computed: {
        isRegisterDisabled() {
            return this.$rules.requiredRule.some(rule => rule(this.loginHandle) !== true)
        }
    },
    data: () => ({
        loginHandle: null,
        password: null,
        loginLoading: false
    }),
    methods: {
        login() {
            let isEmail = true;
            this.$rules.emailRules.some(rule => {
                if (rule(this.loginHandle) !== true) isEmail = false
            })
            this.loginLoading = true;
            this.$axios.post('/users/login', {
                email: isEmail ? this.loginHandle : null,
                userName: isEmail ? null : this.loginHandle,
                password: this.password
            })
                .then((response) => {
                    if(response.response && response.response.data && response.response.data.error == "Wrong Credentials"){
                        this.$error(response.response, response.response.data ? response.response.data.error : 'Something Went Wrong!')
                    }
                    else{
                        this.$store.dispatch('login', response.data)
                        this.$router.push("/films")
                    }
                })
                .catch((err) => {
                    this.$error(err, err.response && err.response.data ? err.response.data.error : 'Something Went Wrong!')
                })
                .finally(() => {
                    this.loginLoading = false
                })
        }
    },
}
</script>