<template>
  <div class="img-preview" v-if="!clicked">
    <img src="~@/assets/bg-trailer.jpg" @click="clicked = true">
  </div>
  <div v-else class="video embed-responsive embed-responsive-16by9">
    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/iCMLLgEJ1QE?si=SDcIg4Sm32PRmB8z"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
  </div>
</template>

<script>


export default {

  name: 'Video',
  data() {
    return {
      clicked: false
    }
  },
}
</script>

<style lang="scss" scoped>
.img-preview {
  position: absolute;
  top: 0;
  cursor: pointer;
}

.video {
  position: absolute;
  top: 0;
  cursor: pointer;
}
</style>