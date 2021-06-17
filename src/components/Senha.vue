<template>
    <div class="row">
        <div class="col-md-6 col-md-offset-4">
            <div class="panel panel-info">
                <div class="panel-heading">Informe seu email cadastrado no sistema</div>
                <div class="panel-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="account" class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" v-model="account" class="form-control" id="account" placeholder="Email">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="submit" v-bind:disabled="sending" class="btn btn-default" v-on:click="submit">OK</button>
                                <template v-if="sending">
                                    <p class="help-block">Por favor aguarde aproximadamente 1 minuto.</p>
                                    <p class="help-block">Sua solicitação está sendo processada. <span class="glyphicon glyphicon-repeat fast-right-spinner"></span></p>
                                    <p class="help-block">A página recarregará automaticamente no fim do processo.</p>
                                </template>
                                <div style="margin-top: 2rem" v-if="!sending">
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
    var slugify = require('slugify')

    export default {
        data: () => {
            return {
                account: null,
                sending: false
            }
        },
        methods: {
            submit: function (evt) {
                evt.preventDefault()
                var diz = this
                this.sending = true
                $.ajax({
                    url: process.env.BACKEND_URL.SENHA,
                    method: 'POST',
                    data: {
                        account: this.account,
                        evento_id: this.$store.state.evento_id
                    },
                    success: (data, textStatus, jqXHR) => {
                        toastr.success('Verifique o seu email (' + this.account + ') para obter o link de recriação de senha.')
                        diz.$router.push('/')
                    },
                    error: (jqXHR, textStatus, errorThrown) => {
                        toastr.error(errorThrown)
                    },
                    complete: () => {
                        this.sending = false
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
