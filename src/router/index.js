import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Senha from '@/components/Senha'
import NovaSenha from '@/components/NovaSenha'
import store from '../store'
import toastr from 'toastr'
import Cookie from 'js-cookie'

Vue.use(Router)

let router = new Router({
    linkActiveClass: 'active',
    store,
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: (to, from, next) => {
                if (store.loggedIn) {
                    toastr.info('Você já está logado.')
                    next('/')
                } else {
                    next()
                }
            }
        },
        {
            path: '/senha',
            name: 'Senha',
            component: Senha,
            beforeEnter: (to, from, next) => {
                if (store.loggedIn) {
                    toastr.info('Você já está logado.')
                    next('/')
                } else {
                    next()
                }
            }
        },
        {
            path: '/novasenha/:token/:email',
            name: 'Nova Senha',
            component: NovaSenha,
            beforeEnter: (to, from, next) => {
                if (store.loggedIn) {
                    toastr.info('Você já está logado.')
                    next('/')
                } else {
                    next()
                }
            }
        },
        {
            path: '/logout',
            name: 'Logout',
            beforeEnter: (to, from, next) => {
                store.commit('logout')
                toastr.info('Você saiu do sistema.')
                next('/')
            }
        }
    ]
})

router.beforeEach(function (to, from, next) {
    if (to.name !== 'Logout') {
        var bearerToken = Cookie.get('bearer')
        if (bearerToken) {
            store.dispatch('login', {token: bearerToken}).then(function (data, textStatus, jqXHR) {
                if (data) {
                    store.commit('assignInfo', data)
                }
            })
        }
    }
    next()
})

export default router
