<template>
<div>



    <div id="pre-venda">
      <div class="text-data">
        GARANTA AGORA A SUA EXPERIÊNCIA
      </div>
      <div class="btns-datas">

        <router-link class="link" to="/">
          <div class="data">
            <div class="tipo-prog">
              SESSÕES
            </div>
            <div class="desc-data">
              (A PARTIR DE 23/2)
            </div>
          </div>
        </router-link>

        <router-link class="link" to="/">
          <div class="data">
            <div class="tipo-prog">
              PRÉ-ESTREIA
            </div>
            <div class="desc-data">
              (06/10)
            </div>
          </div>
        </router-link>

        <router-link class="link" to="/">
          <div class="data">
            <div class="tipo-prog">
              SPOILER NIGHT
            </div>
            <div class="desc-data">
              (05/10)
            </div>
          </div>
        </router-link>
     
      </div>

      <div class="logo">
        <img class="img-responsive" src="~@/assets/logo-venom.png" alt="">
      </div>

      <div class="in-cinema">
        EXCLUSIVAMENTE NOS CINEMAS
      </div>

      <div class="credits">
        <img class="img-responsive" src="~@/assets/marvel.png" alt="">
        <img class="img-responsive" src="~@/assets/instasony.png" alt="">
        <img class="img-responsive" src="~@/assets/venom.png" alt="">
        <img class="img-responsive" src="~@/assets/columbia.png" alt="">
        <img class="img-responsive" src="~@/assets/sony_logo_m.png" alt="">
      </div>

    </div>

</div>
</template>

<script>

import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

  export default {
    name: "presite",
    components: {
      
    },
    mounted(){
        (function($) {
        var positionPushDownInterval = null;
        $(document).ready(function() {
            positionPushDownInterval = window.setInterval(function() {
            if ($('#_evidon_banner').length > 0) {
                $('#_evidon-message').attr("style", $('#_evidon-message').attr('style').replace('margin', 'padding'));
                // if($('#_evidon-accept-button').length > 0) {
                //     $('#_evidon-accept-button').attr("style", $('#_evidon-accept-button').attr('style').replace('margin', 'padding').concat("margin: 0px auto;"));
                // }
                $('body').prepend($('#_evidon_banner').attr('style', $('#_evidon_banner').attr('style').replace('static', 'sticky').concat("padding-bottom: 5px;")));
              
              window.clearInterval(positionPushDownInterval);

            }
            }, 1000);

        });

        })(jQuery);

    }
  };

</script>


<style src="../scss/app.scss" lang="scss" />
