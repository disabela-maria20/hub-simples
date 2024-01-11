<template>
  <div>
    <div id="hub_vibezz">

      <div class="poster">
        <img class="img-responsive"
             alt="Vue logo"
             src="~@/assets/cartaz.jpg">
      </div>

      <div class="poster-mobile">
        <img class="img-responsive"
             src="../assets/cartaz-mobile.jpg">
      </div>

      <div class="content-movie">
        <estados></estados>
      </div>
    </div>
  </div>
</template>

<script>
import estados from "../components/FilterEstadoCidade.vue";

export default {
  name: "hub_vibezz",
  components: {
    estados,
  },
};
</script>




<style src="../scss/app.scss" lang="scss" />