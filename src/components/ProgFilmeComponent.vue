<template>


    <div v-if="loading" class="programacao">

        <div>

            <div id="filtra-datas" class="container-filter-data-cinemas">

                <div class="box-datas">
                    <carousel :margin="5" :responsive="{0:{items:3,nav:false},600:{items:4,nav:false, dots: true}, 1000:{items:6,nav:false, dots: true}}">
                            <div v-for="(data, index) in datas"  :key="index"><a  href="javascript:;" @click="filtra_data(index)" v-on:click="activeBtn=index" >
                                <div class="item-data-prog text-center" :class="{active_data:activeBtn===index}"><span>{{index | formatDia}}</span> <span  class="day">{{index | formatDate}}</span><span>{{index | formatMes}}</span></div> </a>
                            </div>
                        
                    </carousel>
                      
                </div>          

                <div class="box-filtrar-cinema">

                    <label class="d-none" for="cinemas">FILTRAR POR</label>
                    <select class="form-control" name="cinemas data-select" v-model="configs.filter_cinema" @change="set_event_cine_tgm(configs.filter_cinema)">
                        <option value="" disabled selected hidden>Filtrar por Cinema</option>
                        <option v-for="(cinema, index) in theaters" :value="index" :key="index">{{index}}</option>
                    </select>

                    <!-- <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    </select> -->


                </div>
            </div>
            
            <div class="content-programacao">
                <div v-for="prog in conf" :key="prog.id">
        
                    <div > 
                        <div class="container-cinema">
                            <div class="col-12 tit-cinema-prog">
                                {{prog.CINEMA}}
                                <br><span class="small">{{prog.CIDADE}} | {{prog.ESTADO}} </span>
                                <hr>
                            </div>

                            <div class="salas">         
                                <div class="sala" v-for="(data, index) in prog.SALAS" :key="index">
                                    <div class="top-prog">
                                        <H4>{{data.SALA}}</H4>
                                    <span class="text-sessoes"> SESSÕES</span> <span class="tag-legendas">{{data.TIPO}}</span> <span class="tag-legendas"> {{data.LEGENDA}}</span>
                                    </div>
                                    <div class="body-prog">

                                        <div v-for="(sessao, index) in data.HORARIOS" :key="index">
                                            <a :href="sessao.URL_COMPRA" @click="set_event_time_tgm(sessao.HORARIO, prog.CINEMA)" target="_blank"><div 
                                                v-tooltip.top="{
                                                    content: 'Comprar Ingressos', 
                                                    class: 'tooltip-custom'
                                                }" class="horario">{{sessao.HORARIO | formatHora}}</div></a>
                                        </div>
                                    </div>
                                </div>
                            </div> 

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>




</template>

<script>


import moment from 'moment'
import _ from 'lodash'
import carousel from 'vue-owl-carousel'
//const now = moment().format('YYYY-MM-DD');

import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

    export default {
        components: { carousel },
        props: [
            'cinemas'
        ],

        data(){

            return {
                activeBtn: '',
                loading:false,
                configs: {
                orderBy: 'CIDADE',
                orderCinema: 'CINEMA',
                order: 'asc',
                filter_estado: '',
                filter_cidade: '',
                filter_cinema: "",
                filter_data: '',

                confs:""

                },
            }

        },

        mounted() {
                


        },
        methods:{

            set_event_data_tgm(date_session){
            let dataLayer = window.dataLayer || []
                dataLayer.push({

                    'event':'date',
                    'event_category':'Ticketing Event',
                    'event_action':'Date',
                    'event_label':date_session, //this would pull from the full date string
                    'page_title': process.env.VUE_APP_TITLE_FILME + ' Ticketing', 
                    'property_title': process.env.VUE_APP_TITLE_FILME, 
                    'content_type': 'microsite', 
                    'site_country': 'BR', 

                
                })
            },

            set_event_time_tgm(session){

                    let dataLayer = window.dataLayer || []
                    dataLayer.push({
     
                    'event':'time',
                    'event_category':'Ticketing Event',
                    'event_action':'time',
                    'event_label':session, 
                    'page_title': process.env.VUE_APP_TITLE_FILME + ' Ticketing', 
                    'property_title': process.env.VUE_APP_TITLE_FILME, 
                    'content_type': 'microsite', 
                    'site_country': 'BR',

                    })

            },

            set_event_cine_tgm(cine){

                    let dataLayer = window.dataLayer || []
                    dataLayer.push({
     
                    'event':'time',
                    'event_category':'Ticketing Event',
                    'event_action':'theater select',
                    'event_label':cine, //this would pull from the full time string
                    'page_title':process.env.VUE_APP_TITLE_FILME + ' Ticketing', 
                    'property_title': process.env.VUE_APP_TITLE_FILME, 
                    'content_type': 'microsite', 
                    'site_country': 'BR',

                    })

            },

            alt_estado(){
                this.configs.filter_cidade = "";
                this.configs.filter_cinema = "";

            },

            alt_cidade(){
                this.configs.filter_cinema = "";
            },

            filtra_data: function(data) {
                this.configs.filter_data = data;
                this.set_event_data_tgm(data);
            },


            setLoad: function(data) {
                if (data === true) {
                    this.loading = true;
                    
                } else {
                    this.loading = false;
                }
            },

        },
        filters:{

            formatHora: function(value) {
                if (value) {
                    return String(value).substring(-2,5);
                }
            },
            formatDate: function(value) {
                if (value) {
                    return moment(String(value)).format('DD')
                }
            },
            formatDia: function(value) {
                if (value) {
                    return moment(String(value)).locale("pt-br").format('ddd')
                }
            },
            formatMes: function(value) {
                if (value) {
                    return moment(String(value)).locale("pt-br").format('MMM')
                }
            },

        },
        computed:{

            cine() {
            const cine = this.cinemas
            //const city = this.cidade
            return cine
            },
            filme(){
                const filter_data = this.configs.filter_data;
                const lista = this.datas[filter_data][0]
                return lista
            },
            
            suplist() {
                const filter_data = this.configs.filter_data;
                const lista = this.datas[filter_data][0].CINEMAS

                  //let datateste = this.cinemas[Object.keys(this.cinemas).sort()[0]].DATA;

                 return lista
            },
             estados() {
                //const filter_estado = this.configs.filter_estado;
                const estados = _.orderBy(this.suplist, this.configs.orderBy, this.configs.order);

                return _.groupBy(estados, repo => repo.ESTADO );

            },

            cidades() {

                const filter_estado = this.configs.filter_estado;
                //const filter_cidade = this.configs.filter_cidade;

                const cidades = _.orderBy(this.suplist, this.configs.orderBy, this.configs.order);

                if (_.isEmpty(filter_estado)) {
                    return _.groupBy(cidades, repo => repo.CIDADE );
                }

               return _.groupBy(_.filter(cidades, repo => repo.ESTADO.indexOf(filter_estado) >= 0  ), repo => repo.CIDADE);
            },
            theaters() {

                const filter_estado = this.configs.filter_estado;
                const filter_cidade = this.configs.filter_cidade;
                const filter_cinema = this.configs.filter_cinema;

                //this.set_event_cine_tgm(this.configs.filter_cinema)

                const cidades = _.orderBy(this.suplist, this.configs.orderCinema, this.configs.order);

               if (_.isEmpty(filter_cidade)) {
                    return _.groupBy(_.filter(cidades, repo => repo.ESTADO.indexOf(filter_estado) >= 0  ), repo => repo.CINEMA);
                }

                if (_.isString(filter_cidade) && _.isString(filter_cinema) ) {
                    return _.groupBy(_.filter(cidades, repo => repo.CIDADE.indexOf(filter_cidade) === 0  ), repo => repo.CINEMA);
                }

               return _.groupBy(_.filter(this.conf, repo => repo.CIDADE.indexOf(filter_cidade) >=0  ), repo => repo.CINEMA);

            },

            datas(){
                //const filter_data = this.configs.filter_data;
                const cinemas = _.orderBy(this.cinemas, this.configs.orderBy, this.configs.order);

                return _.groupBy(cinemas, repo => repo.DATA );

            
            },

            conf(){

                const list = _.orderBy(this.suplist, this.configs.orderCinema, this.configs.order);

                const configs = this.configs
                const conf = []


                // this.configs.confs = conf
                // const resut = this.configs.confs

                const resut = conf

                _.forEach(configs, function(value, key) {

                    
                    if(!_.isEmpty(value)){

                        switch (key) {
                            case 'filter_data':
                                conf.push({'DATA':value}); 
                                break;
                            case 'filter_estado':
                                conf.push({'ESTADO':value}); 
                                break;
                            case 'filter_cidade':
                                conf.push({'CIDADE':value}); 
                                break;
                            case 'filter_cinema':
                                conf.push({'CINEMA':value}); 
                                break;

                            default:
                                break;
                        }

                    }

                });

                const str = JSON.stringify(resut)
                const result1 = str.replace(/[{]|[}]+/g, '');
                const result2 = result1.replace("]", '}');
                const result3 = result2.replace("[", '{');
                const result4 = JSON.parse(result3)

                return _.filter(list, result4 );
                

            },

        },

        updated: function () {
               
                //this.initDatas();              
        },

        watch: {

            cinemas: function () {
                
                this.activeBtn = this.cinemas[Object.keys(this.cinemas).sort()[0]].DATA;
                this.configs.filter_data = this.cinemas[Object.keys(this.cinemas).sort()[0]].DATA;
                this.configs.filter_cinema = '';
                

                    //this.removeOWL();
                
            },

            datas: function () {

                        const filter_estado = this.configs.filter_estado;
                        const filter_cidade = this.configs.filter_cidade;
                        const filter_data = this.configs.filter_data;
                        
                    
                    if(_.isString(filter_estado) && _.isString(filter_cidade) ){

                        this.configs.filter_estado = filter_estado;
                        this.configs.filter_cidade = filter_cidade;
                        this.configs.filter_data = filter_data;

                    }

            },


        }
    }
</script>

