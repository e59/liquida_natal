<template>
    <div class="row">
        <div class="col-md-6 col-md-offset-4">
            <div class="panel panel-info">
                <div class="panel-heading">
                    Recriação de senha
                </div>
                <div class="panel-body">
                    <div v-if="nome">
                        <p style="font-size: 2rem; text-align: center; margin-bottom: 2rem">{{ nome
                            }}, informe uma nova senha de acesso.</p>
                    </div>
                    <form class="form-horizontal">
                        <div class="form-group has-required">
                            <label for="senha" class="col-sm-4 control-label">Nova senha</label>
                            <div class="col-sm-8">
                                <input type="password" v-model="senha" class="form-control" id="senha"
                                       @input="$v.senha.$touch()"
                                       required="required"
                                       placeholder="Nova senha">
                            </div>
                        </div>
                        <div class="form-group has-required">
                            <label for="confirma_senha" class="col-sm-4 control-label">Confirme a senha</label>
                            <div class="col-sm-8">
                                <input type="password" v-model="confirma_senha" class="form-control" id="confirma_senha"
                                       @input="$v.confirma_senha.$touch()"
                                       required="required"
                                       placeholder="Confirme a senha">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-4 col-sm-8">
                                <span class="help-block" v-show="$v.$invalid">Preencha os campos de senha com o mesmo valor. A senha precisa ter pelo menos 4 caracteres.</span>
                                <button type="submit"
                                        v-bind:disabled="$v.$invalid"
                                        class="btn btn-default" v-on:click="submit">Salvar
                                </button>
                                <div style="margin-top: 2rem">
                                    <router-link to="/login">Voltar</router-link>
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
    import { required, minLength, sameAs } from 'vuelidate/lib/validators'

    var slugify = require('slugify')

    export default {
        data: () => {
            return {
                nome: null,
                senha: null,
                confirma_senha: null
            }
        },
        mounted: function () {
            var diz = this
            var email = this.$route.params.email
            var token = this.$route.params.token
            $.ajax({
                url: process.env.BACKEND_URL.NOVASENHA,
                method: 'POST',
                data: {
                    email: email,
                    token: token,
                    evento_id: this.$store.state.evento_id
                },
                success: (data, textStatus, jqXHR) => {
                    diz.nome = data.nome
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    toastr.error(errorThrown)
                    diz.$router.push('/')
                },
                dataType: 'JSON'
            })
        },
        methods: {
            submit: function (evt) {
                evt.preventDefault()
                var diz = this
                var email = this.$route.params.email
                var token = this.$route.params.token
                $.ajax({
                    url: process.env.BACKEND_URL.NOVASENHA,
                    method: 'POST',
                    data: {
                        senha: this.senha,
                        email: email,
                        token: token,
                        evento_id: this.$store.state.evento_id
                    },
                    dataType: 'JSON',
                    success: (data, textStatus, jqXHR) => {
                        toastr.success('Sua senha foi alterada com sucesso.')
                        diz.$store.dispatch('login', {token: data.access_token}).then(function (data, textStatus, jqXHR) {
                            diz.$store.commit('assignInfo', data)
                        })
                        toastr.success('Bem-vindo!')
                        diz.$router.push('/')
                    },
                    error: (jqXHR, textStatus, errorThrown) => {
                        toastr.error(errorThrown)
                    }
                })
            }
        },
        watch: {
            'login': function (val) {
                this.login = slugify(val.toLowerCase(), '.').replace('..', '.')
            }
        },
        validations: {
            senha: {
                required,
                minLength: minLength(4)
            },
            confirma_senha: {
                sameAs: sameAs('senha')
            }
        }
    }
</script>

<style>

</style>
