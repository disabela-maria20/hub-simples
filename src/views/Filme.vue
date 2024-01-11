<template>
  <div class="filme">
    <div class="header">Teste header</div>
    <div class="conteudo">
      <div class="posters">
        POster
      </div>
      <div class="filme_content">
         <div class="datas_content">

        Nullam sollicitudin libero vel gravida convallis. Praesent viverra vel metus at cursus. 

         </div>
         <div class="conteudo_filme">
           <estados></estados>
         </div>
      </div>
    </div>

<div class="footer_wrapper">teste</div>

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

<style  lang="scss" scoped>
*{margin:0; padding:0;}
.filme{
  display: flex;
  flex-direction: column;
  position: relative;
  color: #fff;
  width: 100%;
  
  height: 100%!important;
  background-color: rgb(97, 81, 81);


  .conteudo{
    display: flex;
    flex-direction: row;
    padding-top: 30px;
    background-color: rgb(47, 116, 92);
    height: 100%;
    width: 100%;

    .posters{
      position: fixed;
      min-width: 60vh;
      height: 95vh;
      //background-color: bisque;
    }
    .filme_content{
      display: table;
      min-width: 50vh; 
      margin-left: 60vh;
      background-color: rgb(196, 255, 236);
      height: 95vh;
      padding: 30px 30px 100px;
      .datas_content{
        padding: 10px;
        position: sticky;
        height: 60px;
        background-color: black;

        left: 50%;
        top: 30px;
   
      }
      .conteudo_filme{
        color: blue;
      }
    }

  }


}


</style>
