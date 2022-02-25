
import { createRouter, createWebHashHistory } from 'vue-router'
import isAuthenticatedGuard from './auth-guard'

//import AboutPage from '../modules/pokemon/pages/AboutPage'
//import ListPage from '../modules/pokemon/pages/ListPage'
//import PokemonPage from '../modules/pokemon/pages/PokemonPage'

//import NoPageFound from '../modules/shared/pages/NoPageFound'


const routes = [

    // Pokemon
    {
        path: '/',
        redirect: '/pokemon'
    },

    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import(/* webpackChunkName: "PokemonLayout"*/ '../modules/pokemon/layouts/PokemonLayout'),
        children: [
                { 
                    path: 'home',
                    name: 'pokemon-home',
                    component: () => import(/* webpackChunkName: "ListPage" */'../modules/pokemon/pages/ListPage')
                },
                { 
                    path: 'about',
                    name: 'pokemon-about',
                    component: () => import(/* webpackChunkName: "AboutPage" */'../modules/pokemon/pages/AboutPage')
                },
                { 
                    path: 'pokemonid/:id',
                    name: 'pokemon-id',
                    component: () => import(/* webpackChunkName: "PokemonPage" */'../modules/pokemon/pages/PokemonPage'),
                    props:  ( route ) => {
                        const id = Number( route.params.id )
                        return isNaN( id ) ? { id: 1 } : { id: id }
                    }
                },
                {
                    path: '',
                    redirect: { name: 'pokemon-about' }
                }
        ]
    },

    // { 
    //     path: '/home',
    //     name: 'home',
    //     component: () => import(/* webpackChunkName: "ListPage" */'../modules/pokemon/pages/ListPage')
    // },
    // { 
    //     path: '/about',
    //     name: 'about',
    //     component: () => import(/* webpackChunkName: "AboutPage" */'../modules/pokemon/pages/AboutPage')
    // },
    // { 
    //     path: '/pokemonid/:id',
    //     name: 'pokemon-id',
    //     component: () => import(/* webpackChunkName: "PokemonPage" */'../modules/pokemon/pages/PokemonPage'),
    //     props:  ( route ) => {
    //         const id = Number( route.params.id )
    //         return isNaN( id ) ? { id: 1 } : { id: id }
    //     }
    // },


    // DBZ Layout
    {
        path: '/dbz',
        name: 'dbz',
        beforeEnter: [ isAuthenticatedGuard ],
        component: () => import(/* webpackChunkName: "DragonBallLayout"*/ '../modules/dbz/layouts/DragonBallLayout'),
        children: [
            { 
                path: 'characters',
                name: 'dbz-characters',
                component: () => import(/* webpackChunkName: "Characters" */'../modules/dbz/pages/Characters')
            },
            { 
                path: 'about',
                name: 'dbz-about',
                component: () => import(/* webpackChunkName: "About DBZ" */'../modules/dbz/pages/About')
            },
            {
                path: '',
                redirect: { name: 'dbz-characters' }
            }
        ]
    },


    // Shared
    { 
        path: '/:pathMatch(.*)*',
        component: () => import(/* webpackChunkName: "NoPageFound" */'../modules/shared/pages/NoPageFound')
        //redirect: '/home'
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})


// Global Guard - Synchronous
/*
router.beforeEach( ( to, from, next ) => {
    console.log( {to, from, next} )

    const random = Math.random() * 100
    if ( random > 50 ) {
        console.log('Authenticated user')
        next()
    } else {
        console.log(random, 'Blocked by beforeEach Guard')
        next({ name: 'pokemon-home' })
    }
})
*/

const canAccess = () => {
    return new Promise ( resolve => {

        const random = Math.random() * 100
        if ( random > 50 ) {
            console.log('Authenticated user - canAccess')
            resolve(true)
        } else {
            console.log(random, 'Blocked by beforeEach Guard - canAccess')
            resolve(false)
        }

    })
}

router.beforeEach( async(to, from, next) => {

    const authorized = await canAccess(to, from, next)

    authorized
        ? next()
        : next({ name: 'pokemon-home' })

})


export default router
