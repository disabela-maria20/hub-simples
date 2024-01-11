<template>
    <div> teste
        <CineProg :cinemas="cinemas"/>
    </div>
</template>


<script>

import CineProg from '@/components/CinemaProgComponent.vue'
import axios from 'axios';
export default {
    name: 'Cinema',

    components: {CineProg},

    data() {
        return {
            cinemas:''
        };
    },


      mounted() {
           this.getProgCinema('Cinépolis JK Iguatemi');
        },

    methods: {
            getProgCinema(keyCinema) {
                this.loading = true;
                axios("http://localhost:8000/imax/getCinemaImax/" + keyCinema)
                .then(response => {

                    // let filmes = Object.keys(response.data).map((key) => {
                    //     return response.data[key]
                    // })
                    this.cinemas = response.data
                    this.loading = false;
                })
                .catch( error => {
                    console.log(error)
                })
            },
    },
};

</script>

<style lang="scss" scoped>

</style>