import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import $ from 'jquery'
import toastr from 'toastr'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        loggedIn: false,
        loaded: false,
        evento_id: 24,
        user: false,
        cart: false,
        inscricao: false,
        evento: false,
        produtos: false,
        compras: false,
        inscricaoIniciada: false,
        requiredProducts: false,
        inscricaoOk: false,
        ended: false
    },
    mutations: {
        addToCart(state, payload) {
            state.cart.push(payload)
        },
        removeFromCart(state, payload) {
            for (const i in state.cart) {
                if (state.cart[i].product === payload.product) {
                    state.cart.splice(i, 1)
                }
            }
        },
        logout(state) {
            state.produtos = state.compras = state.user = state.loggedIn = false
            Cookie.remove('bearer')
        },
        assignInfo: function (state, payload) {
            state.produtos = payload.produtos
            state.compras = payload.compras
            state.user = payload.user
            state.cart = payload.cart
            state.loggedIn = true
            state.inscricaoIniciada = payload.inscricaoIniciada
            state.requiredProducts = payload.requiredProducts
            state.inscricaoOk = payload.inscricaoOk
        },
        assignData: function (state, payload) {
            state.inscricao = payload.inscricao
            state.evento = payload.evento
            state.loaded = true
            state.ended = payload.ended
        }
    },
    actions: {
        login(context, payload) {
            if (payload.token) {
                Cookie.set('bearer', payload.token)
            }

            let bearerToken = Cookie.get('bearer')

            return $.ajax({
                url: process.env.BACKEND_URL.INFO,
                method: 'GET',
                error: function (data, textStatus, jqXHR) {
                    toastr.error('Erro obtendo informações do servidor')
                },
                dataType: 'JSON',
                headers: {
                    'Authorization': 'Bearer ' + bearerToken
                }
            })
        },
        dataServer (context, payload) {
            console.log(process.env.BACKEND_URL.DATASERVER);
            return $.ajax({
                url: process.env.BACKEND_URL.DATASERVER,
                method: 'POST',
                data: {
                    evento_id: context.state.evento_id,
                    type: payload.type,
                    data: payload.data
                },
                error: function (data, textStatus, jqXHR) {
                    toastr.error('Erro obtendo informações para a inscrição')
                },
                dataType: 'JSON'
            })
        },
        loadData(context) {
            return $.ajax({
                url: process.env.BACKEND_URL.SKEL,
                method: 'GET',
                data: {
                    evento_id: context.state.evento_id
                },
                error: function (data, textStatus, jqXHR) {
                    toastr.error('Erro obtendo informações para a inscrição')
                },
                dataType: 'JSON'
            })
        }
    }
})
