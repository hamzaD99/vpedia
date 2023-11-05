<template>
    <v-container>
        <v-row justify="center" style="width: 100%;" class="mb-10">
            <v-col cols="12" class="d-flex align-center">
                <v-divider />
                <h1 style="text-wrap: nowrap;color: rgb(var(--v-theme-primary));" class="mx-5">{{ $t('Login') }}</h1>
                <v-divider />
            </v-col>
        </v-row>
        <v-row justify="center" style="width: 100%;">
            <v-col cols="5">
                <InputField :rules="$rules.loginHandleRules" v-model="loginHandle" :name="$t('Username or Email')" star />
            </v-col>
        </v-row>
        <v-row justify="center" style="width: 100%;">
            <v-col cols="5">
                <InputField type="password" :rules="$rules.loginHandleRules" v-model="password" :name="$t('Password')" star />
            </v-col>
        </v-row>
        <v-row justify="center" style="width: 100%;">
            <v-col cols="5">
                <v-btn height="50px" :loading="loginLoading" :disabled="isRegisterDisabled" color="primary" width="100%" @click="login">{{ $t('Login') }}</v-btn>
            </v-col>
        </v-row>
    </v-container>
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
            return this.$rules.loginHandleRules.some(rule => rule(this.loginHandle) !== true)
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
                if(rule(this.loginHandle) !== true) isEmail = false
            })
            this.loginLoading = true;
            this.$axios.post('/users/login', {
                email: isEmail ? this.loginHandle : null,
                userName: isEmail ? null : this.loginHandle,
                password: this.password
            })
            .then((response) => {
                this.$store.dispatch('login',response.data)
                this.$router.push("/films")
            })
            .catch((err) => {
                this.$error(err, err.response && err.response.data ? err.response.data.error  : null)
            })
            .finally(() => {
                this.loginLoading = false
            })
        }
    },
}
</script>