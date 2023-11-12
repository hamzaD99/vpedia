<template>
  <v-container fluid class="pa-0">
    <v-row style="height: 525px; overflow: hidden;">
      <v-col cols="12" class="pa-1">
        <v-img class="image-transition" :src="require(`@/assets/Banner-01.jpg`)">
          <div style="display: flex;height: 525px;align-items: center;justify-content: center;">
            <h1 style="color: white; font-size: 55px;">
              {{ $t("Vpedia") }}
            </h1>
          </div>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
    };
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
