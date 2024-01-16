<template>
  <div id="app" class="d-flex flex-column h-100">

    <main role="main" class="flex-shrink-0">

      <!-- <div class="header_sony">
     <div class="logo_sony_pictures">
        <a target="_blank" href="https://www.sonypictures.com.br/">
          <img
            src="https://vibezz-assets.s3.sa-east-1.amazonaws.com/assets_hub/sony-pictures-logo.png"
        /></a>
      </div>
      <div class="logo_sony">
        <a target="_blank" href="https://www.sony.com/en">
          <img
            src="https://vibezz-assets.s3.sa-east-1.amazonaws.com/assets_hub/sony-logo.png"
          />
        </a>
      </div>
    </div> -->

      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>

      <div id="creditos" @click="carregar()" class="cred_logos">
        <div class="container">
          <div class="row cred-logo">
            <p>Acessibilidade: a exibição deste filme conta com suporte do aplicativo Movie Reading - criado para
              proporcionar acessibilidade completa disponibilizando os recursos da Audiodescrição, Legendas e LIBRAS -
              Língua Brasileira de Sinais. <a href="https://www.moviereadingbrasil.com.br/" target="blank">Saiba mais</a>
            </p>

          </div>
        </div>
      </div>

      <div class="footer_wrapper">
        <div class="container">

          <div class="links_footer">
            <div class="cp"> © 2024 CALIFORNIA FILMES FILMS</div>
            <div class="btn-creditos" :class="{ credito_ativo: credito_ativo }" @click="carregar()">
              Acessibilidade
            </div>
          </div>
        </div>
      </div>

    </main>

  </div>
</template>

<script>


import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

export default {
  name: "teste",
  components: {},
  data() {

    return {
      credito_ativo: true,
    }
  },
  methods: {

    carregar() {

      $('#creditos').slideToggle("slow");
      if (this.credito_ativo == true) {
        this.credito_ativo = false
      } else {
        this.credito_ativo = true
      }
    },


  },
  mounted() {

    setTimeout(this.carregar, 4000);

  }

}


</script>

<style src="./scss/app.scss" lang="scss" />


