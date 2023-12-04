<template>
  <v-container style="width: 80%;" class="text-center text-md-start">
    <v-row align="center" :style="$vuetify.display.mobile ? 'margin-top: 5px;' : 'margin-top: 50px;'">
      <v-col md="4" cols="12">
        <v-img style="width: 100%;" cover
          :src="require('@/assets/default-series.jpg')"></v-img>
      </v-col>
      <v-col md="8" cols="12" class="d-flex flex-column" style="row-gap: 6px;">
        <h3 style="color: rgb(var(--v-theme-primary-darken-2));" class="mb-3">{{ $t('About our institution') }}</h3>
        <p>{{ $t("We are the leading private media institution in the Arab world that specializes in educational documentary film series of various types, from cultural, historical and scientific. For this purpose, we employ a group of distinguished media professionals, with extensive competencies and experience, each in his field. Our organization has produced a wide range of educational visual materials that have won awards in Arab festivals.") }}</p>
        <p>{{ $t("Our organization pays special attention to the selection of topics and the content of its visual materials, as each film, in all film series, goes through multiple stages of work, so that we can produce each educational documentary in its distinct form and content, in which it appears on the screen. We take great care in preparing the wording of the Arabic texts carefully, as we use that text in the film, so that the word matches the image. After the final text is prepared, the scientific materials are reviewed by specialist scholars, each in his field, to ensure absolute guarantee of every piece of information, whether small or large, in each of our films. Over the years and decades, the Foundation has also chosen the best quotes to comment on its scientific documentaries.") }}</p>
      </v-col>
    </v-row>
    <v-row align="center" style="flex-direction: row-reverse;" :style="$vuetify.display.mobile ? 'margin: 20px 0px;' : 'margin: 70px 0px;'">
      <v-col md="4" cols="12">
        <v-img style="width: 100%;" cover
          :src="require('@/assets/default-series.jpg')"></v-img>
      </v-col>
      <v-col md="8" cols="12" class="d-flex flex-column" style="row-gap: 12px;">
        <h3 style="color: rgb(var(--v-theme-primary-darken-2));" class="mb-3">{{ $t('Our institution philosophy') }}</h3>
        <p>{{ $t("In addition to the above, our institution’s specialization in presenting documentary films leads us to direct special attention to historical, scientific and cultural films. We also pay similar attention to films that deal with the conditions of the contemporary world and shed light on its various issues. We begin our media work from a clear vision, the goal of which is to serve Arab culture, Arab students, scholars, and researchers, by selecting the best visual materials that achieve this goal, and presenting them in a framework that does not contradict the spirit of Arab-Islamic culture. Our method of preparing films is distinctive, which leads to providing what suits the recipients, in terms of wording, content, knowledge, and scientific benefit.") }}</p>
        <p>{{ $t("Our organization presents these films from two points of view, the first of which is that the Arab viewer deserves to see films rich in information, serious, and of an excellent standard, and this viewer also has the right to keep up with the latest developments in the scientific, political, and economic fields in order to remain knowledgeable and informed about a developing world. always.") }}</p>
        <p>{{ $t("The second starting point in the philosophy of our organization is the keenness to enrich the Arab-Islamic personality and consolidate it in the souls of young people, and our way to do this is to provide these educational visual materials through which we present facts and information in an objective and sober manner") }}, <span style="font-weight: bold;color: rgb(var(--v-theme-primary));text-decoration: underline;">{{ $t("as the benefit of watching one of our films is equivalent to reading an entire book.") }}</span>.</p>
        <p>{{ $t("Through our diligent work, we seek to provide the best educational documentaries, in a way that expands perceptions, develops personality and stimulates productive work.") }}</p>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
  name: 'FilmsPage',
  components:{
    
  },
  computed:{
    ...mapGetters({
			token: 'token',
      user: 'user'
    })
  },
  created(){
    // this.$axios.get("/users")
    // .then((res)=>{
    //   console.log(res)
    // })
    // .catch((err)=>{
    //   this.$error(err)
    // })
  }
}
</script>
