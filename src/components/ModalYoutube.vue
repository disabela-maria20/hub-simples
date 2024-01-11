<template>
  <div class="img-preview" v-if="!clicked">
    <img  src="~@/assets/bg-trailer.jpg"  @click="clicked=true">
  </div>
  <youtube v-else :video-id="videoId" :player-vars="{autoplay: 1}" :player-width="videoW" :player-height="videoH"></youtube>
</template>

<script>

import Vue from 'vue'
import youtube from 'vue-youtube-embed'
 
Vue.use(youtube)
export default {

  name: 'Wrapper',
  data () {
    return {
      clicked: false
    }
  },
  props: {
    videoId: String,
    videoH:Number,
    videoW:Number,
    imgpreview:String
  }
}
</script>

<style lang="scss" scoped>

.img-preview{
    position: absolute;
    top: 0;
    cursor: pointer;
}

</style>