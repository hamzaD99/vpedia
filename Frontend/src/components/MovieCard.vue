<template>
    <div class="d-flex flex-column align-center pb-2 text-center" style="row-gap: 10px; border: 1px solid #ccc!important;">
        <div width="100%" v-if="(image || defaultImage) && disabled">
            <v-img style="cursor: pointer;width: 100%;" :src="image ? image : require('@/assets/default-series.jpg')"
                @mouseover="showOverlay = true" @mouseout="showOverlay = false">
                <div class="overlay" :class="showOverlay ? 'overlay__active' : ''"></div>
            </v-img>
        </div>
        <router-link v-if="(image || defaultImage) && !disabled" style="width: 100%;" :to="path">
            <v-img style="cursor: pointer;width: 100%;" :src="image ? image : require('@/assets/default-series.jpg')"
                @mouseover="showOverlay = true" @mouseout="showOverlay = false">
                <div class="overlay" :class="showOverlay ? 'overlay__active' : ''"></div>
            </v-img>
        </router-link>
        <h3 style="padding: 3px;font-size: 20px; font-weight: 500; color: rgb(var(--v-theme-primary-darken-1));">{{ name }}</h3>
        <p v-if="description && !descriptionPath">{{ description }}</p>
        <router-link v-if="description && descriptionPath" :to="descriptionPath" style="color: #0c2d48;"><p>{{ description }}</p></router-link>
        <v-tooltip open-delay="200" v-if="disabled" location="top" :text="$t('You don\'t have access to this film')">
            <template v-slot:activator="{ props }">
                <div v-bind="props" style="width: 85%;">
                    <v-btn :disabled="disabled" width="100%" height="40px" color="primary-darken-2">{{ $t('Watch More') }}</v-btn>
                </div>
            </template>
        </v-tooltip>
        <router-link v-else style="width: 85%;" :to="path">
            <v-btn width="100%" height="40px" color="primary-darken-2">{{ $t('Watch More') }}</v-btn>
        </router-link>
    </div>
</template>

<script>

export default {
    name: 'MovieCard',
    props: {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        descriptionPath: {
            type: String,
            required: false
        },
        path: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false
        },
        defaultImage: {
            type: Boolean,
            required: false
        },
    },
    data: () => ({
        showOverlay: false
    }),
    methods: {
    },
}
</script>

<style scoped lang="scss">
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0);
    /* Initially transparent */
    opacity: 0;
    transition: background-color 0.3s ease, opacity 0.3s ease;

    &__active {
        background-color: rgba(255, 255, 255, 0.7);
        /* Initially transparent */
        opacity: 1;
    }
}
</style>