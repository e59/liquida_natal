<template>
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-default">
                <div class="panel-heading">Identificação</div>
                <div class="panel-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="login" class="col-sm-2 control-label">Usuário</label>
                            <div class="col-sm-10">
                                <input type="text" v-model="login" class="form-control" id="login" placeholder="Usuário">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="senha" class="col-sm-2 control-label">Senha</label>
                            <div class="col-sm-10">
                                <input type="password" v-model="senha" class="form-control" id="senha"
                                       placeholder="Senha">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="submit" class="btn btn-default" v-on:click="submit">Login</button>
                                <div style="margin-top: 2rem">
                                    <router-link to="/senha">Clique aqui caso tenha perdido sua senha</router-link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import toastr from 'toastr'
    var slugify = require('slugify')

    export default {
        data: () => {
            return {
                login: null,
                senha: null
            }
        },
        methods: {
            submit: function (evt) {
                evt.preventDefault()
                var diz = this
                $.ajax({
                    url: process.env.BACKEND_URL.LOGIN,
                    method: 'POST',
                    data: {
                        grant_type: 'password',
                        username: this.login,
                        password: this.senha,
                        evento_id: 24,
                        client_id: 'hcinscricoes',
                        client_secret: 'hcinscricoes'
                    },
                    success: (data, textStatus, jqXHR) => {
                        diz.$store.dispatch('login', {token: data.access_token}).then(function (data, textStatus, jqXHR) {
                            diz.$store.commit('assignInfo', data)
                        })
                        toastr.success('Bem-vindo!')
                        diz.$router.push('/')
                    },
                    error: (data, textStatus, jqXHR) => {
                        toastr.error('Usuário e/ou senha inválidos')
                    }
                })
            }
        },
        watch: {
            'login': function (val) {
                this.login = slugify(val.toLowerCase(), '.').replace('..', '.')
            }
        }
    }
</script>

<style>

</style>
