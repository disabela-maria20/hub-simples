import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Presite from '../views/Presite.vue'


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '/dogman/',
    routes: [


        {
            path: '/home',
            name: 'home',
            component: Home,
        },

        {
            path: '/',
            name: 'programacao',
            component: Home,
        },

        {
            path: '/presite',
            name: 'presite',
            component: Presite,
        },

        // {
        //   path: '/filme',
        //   name:'filme',
        //   component: Filme,
        // },
    ]
})

export default router