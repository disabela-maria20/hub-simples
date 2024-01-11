<template>
<div>
    <Loading v-if="loading" />
    <div id="box-busca-programacao" class="box-busca-programacao">
        
            <div class="text-buscar-prog">
                Consulte abaixo as sessões disponíveis no cinema mais próximo de você.
            </div>

            <div class="combos-busca">
                <select class="form-control" name="estado data-select" ref="estado" v-model="configs.filter_estado" v-on:change="alt_estado()">
                    <option value="" disabled selected hidden>Estado</option>
                    <option v-for="(estado, index) in estados" :value="index" :key="index">{{index}}</option>
                </select>

                <select class="form-control" name="cidade data-select" ref="cidade" v-model="configs.filter_cidade" v-on:change="alt_cidade()">
                    <option value="" disabled selected hidden>Cidade</option>
                    <option v-for="(cidade, index) in cidades" :value="index" :key="index">{{index}}</option>
                </select>
                <button class="btn btn-md my-auto" :class="btn ? 'btn-active' : 'btn-inative'" @click.prevent="set_prog()">Pesquisar</button>
            </div>
    </div>

    <div v-if="!filme" class="video-wrapper embed-responsive embed-responsive-16by9">

        <div class="embed-responsive embed-responsive-16by9" id="video">
            <Video/>
        </div>

    </div>

    <div class="container-programacao">
            
            <filme-prog :cinemas="filme" ref="setloading"></filme-prog>
    </div>

</div>


</template>

<script>
import  FilmeProg from '@/components/ProgFilmeComponent.vue';
import axios from 'axios'
import _ from 'lodash'
import Loading from '@/components/LoadSpinner.vue';
import Video from '@/components/Video.vue';

import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

export default {
    components:{
        FilmeProg, Loading,Video
    },

    data(){

        return {
            btn:false,
            loading:false,
            filme:'',
            cineestados:[],
            videoId: 'rzOvXvBNzMc',
            videoH: null,
            videoW:null,
            imgpreview:'bg-trailer.jpeg',

            configs: {
                orderBy: 'CIDADE',
                orderByEstado: 'ESTADO',
                order: 'asc',
                filter_estado: '',
                filter_cidade: '',
            },
        }
    },
    methods:{

            alt_estado(){
                this.configs.filter_cidade = "";
                this.configs.filter_cinema = "";
                  this.$refs.cidade.focus();
                  this.btn = false
            },

            alt_cidade(){
                this.configs.filter_cinema = "";
                this.btn = true
            },

            set_prog(){
                this.loading = true;
                this.$refs.setloading.setLoad(false);
                axios
                .get(process.env.VUE_APP_API+"/progApi/movie/"+process.env.VUE_APP_ID_FILME+"/" + this.remove_acentos(this.configs.filter_estado) + "/" + this.remove_acentos(this.configs.filter_cidade))
                .then((response) => {
                    this.filme = response.data.filme.programacao;

                    let dataLayer = window.dataLayer || []
                    dataLayer.push({

                        'event':'city',
                        'event_category':'Ticketing Event',
                        'event_action':'city select',
                        'event_label':this.configs.filter_cidade,
                        'page_title': process.env.VUE_APP_TITLE_FILME + ' Ticketing', 
                        'property_title': process.env.VUE_APP_TITLE_FILME, 
                        'content_type': 'microsite', 
                        'site_country': 'BR',

                    })

                })
                .catch((error) => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => (this.$refs.setloading.setLoad(true), this.loading = false));
            },


            set_estados(){
                // this.loading = true;
                // this.$refs.setloading.setLoad(false);


                axios
                .get(process.env.VUE_APP_API+"/progApi/getEstadosFilme/"+ process.env.VUE_APP_ID_FILME + "")
                .then((response) => {
                    this.cineestados = response.data.estados;
                })
                .catch((error) => {
                    console.log(error);
                    this.errored = true;
                })
                  //              .finally(() => (this.$refs.setloading.setLoad(true), this.loading = false));

                ;
            },




            remove_acentos(text){
                let text_norm = text;
                
                return text_norm.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            }
    },
    mounted(){

        this.set_estados()

    },

    updated(){



        (function($) {
        
        var positionPushDownInterval = null;
        $(document).ready(function() {
            positionPushDownInterval = window.setInterval(function() {
            if ($('#_evidon_banner').length > 0) {

                $('#_evidon-message').attr("style", $('#_evidon-message').attr('style').replace('margin', 'padding'));

                // if($('#_evidon-accept-button').length > 0) {
                //     $('#_evidon-accept-button').attr("style", $('#_evidon-accept-button').attr('style').replace('margin', 'padding').concat("margin: 0px auto;"));
                // }
                //$('body').prepend($('#_evidon_banner').attr('style', $('#_evidon_banner').attr('style').replace('static', 'sticky').concat("padding-bottom: 20px;")));

                $('body').prepend($('#_evidon_banner'));
                $('#_evidon_banner').css("position", "sticky");
                $('#_evidon_banner').css("padding-bottom", 20);
                
                window.clearInterval(positionPushDownInterval);

            }
            }, 1000);

           

        });

        })(jQuery);

        var scrollEventHandler = function()
        {
        window.scroll(0, window.pageYOffset)
        }

        window.addEventListener("scroll", scrollEventHandler, false);

    },
    
    computed:{

            estados() {
                //const filter_estado = this.configs.filter_estado;
                const estados = _.orderBy(this.cineestados, this.configs.orderByEstado, this.configs.order);

                return _.groupBy(estados, repo => repo.ESTADO );

            },

            cidades() {

                const filter_estado = this.configs.filter_estado;
                //const filter_cidade = this.configs.filter_cidade;

                const cidades = _.orderBy(this.cineestados, this.configs.orderBy, this.configs.order);

                if (_.isEmpty(filter_estado)) {
                    return null;
   
                }

                return _.groupBy(_.filter(cidades, repo => repo.ESTADO.indexOf(filter_estado) >= 0  ), repo => repo.CIDADE);
            },
    }
}



</script>



