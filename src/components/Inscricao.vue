<template>
    <div class="row" v-if="$store.state.ended">
        <h2>Inscrições online encerradas!</h2>
    </div>
    <div class="row" v-else>
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading" v-if="!editMode">Preencha o formulário abaixo</div>
                <div class="panel-body">
                    <form v-if="$store.state.loaded">
                        <div class="row" v-if="errors">
                            <div class="col-md-12" v-html="errors"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 has-required">
                                <div class="checkbox">
                                    <label class="control-label">
                                        <input type="checkbox" value="1" v-model="aceito">
                                        Aceito os <a href="https://www.lojistaliquidanatal.com.br/wp-content/uploads/2021/06/Termo-de-aceite-HC.pdf" target="_blank">termos de adesão a condições de participação para a Campanha Líquida Natal 2021</a>.
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2 has-required hidden">
                                <div class="form-group">
                                    <label
                                        class="control-label"
                                        for="documento_tipo"
                                    >Tipo de Documento</label>
                                    <select
                                        class="form-control"
                                        id="documento_tipo"
                                        v-model="inscricao.documento_tipo"
                                    >
                                        <option value="CNPJ">CNPJ</option>
                                        <option value="CPF">CPF</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 has-required">
                                <div
                                    class="form-group"
                                    v-bind:class="formGroupClass($v, 'documento')"
                                >
                                    <label class="control-label" for="documento">
                                        {{
                                        documentoLabel
                                        }}
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="documento"
                                        v-model.trim="inscricao.documento"
                                        v-mask="documentoMask"
                                        @input="setMaskedFieldState($v, 'documento')"
                                        required="required"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 has-required">
                                <div class="form-group" v-bind:class="formGroupClass($v, 'nome')">
                                    <label class="control-label" for="nome">Razão Social</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="nome"
                                        v-model.trim="inscricao.nome"
                                        @input="$v.inscricao.nome.$touch()"
                                        maxlength="50"
                                        required="required"
                                    />
                                    <span
                                        class="help-block"
                                        v-if="
                      $v.inscricao.nome.$error
                    "
                                    >Digite a razão social.</span>
                                </div>
                            </div>
                            <div class="col-md-5 has-required">
                                <div class="form-group" v-bind:class="formGroupClass($v, 'email')">
                                    <label class="control-label" for="email">Email</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="email"
                                        v-model.trim="inscricao.email"
                                        @input="$v.inscricao.email.$touch()"
                                        maxlength="60"
                                        required="required"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-5 has-required">
                                <div
                                    class="form-group"
                                    v-bind:class="formGroupClass($v, 'metadados.nome_fantasia')"
                                >
                                    <label class="control-label" for="nome_fantasia">Nome Fantasia</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="nome_fantasia"
                                        v-model.trim="inscricao.metadados.nome_fantasia"
                                        maxlength="50"
                                        @input="$v.inscricao.metadados.nome_fantasia.$touch()"
                                        required="required"
                                    />
                                </div>
                            </div>
                            <div class="col-md-5 has-required">
                                <div
                                    class="form-group"
                                    v-bind:class="formGroupClass($v, 'metadados.nome_representante')"
                                >
                                    <label class="control-label" for="nome_fantasia">Nome do Representante</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="nome_representante"
                                        v-model.trim="inscricao.metadados.nome_representante"
                                        maxlength="50"
                                        @input="$v.inscricao.metadados.nome_representante.$touch()"
                                        required="required"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="row" v-if="!editMode">
                            <div class="col-md-6 has-required">
                                <div class="form-group" v-bind:class="formGroupClass($v, 'login')">
                                    <label class="control-label" for="login">Nome de usuário</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="login"
                                        v-model.trim="inscricao.login"
                                        @input="$v.inscricao.login.$touch()"
                                        required="required"
                                    />
                                    <span
                                        class="help-block"
                                    >Crie um nome de usuário. Exemplo: seunome.seusobrenome</span>
                                </div>
                            </div>
                            <div class="col-md-3 has-required">
                                <div class="form-group" v-bind:class="formGroupClass($v, 'senha')">
                                    <label class="control-label" for="senha">Senha</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="senha"
                                        v-model="inscricao.senha"
                                        @input="$v.inscricao.senha.$touch()"
                                        required="required"
                                    />
                                </div>
                            </div>
                            <div class="col-md-3 has-required">
                                <div
                                    class="form-group"
                                    v-bind:class="formGroupClass($v, 'confirma_senha')"
                                >
                                    <label
                                        class="control-label"
                                        for="confirma_senha"
                                    >Confirme a senha</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="confirma_senha"
                                        v-model="inscricao.confirma_senha"
                                        @input="$v.inscricao.confirma_senha.$touch()"
                                        required="required"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <div
                                    class="form-group"
                                    v-bind:class="formGroupClass($v, 'telefone')"
                                >
                                    <label class="control-label" for="telefone">Telefone</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="telefone"
                                        v-model.trim="inscricao.telefone"
                                        v-mask="telefoneMask"
                                        @input="setMaskedFieldState($v, 'telefone')"
                                    />
                                </div>
                            </div>
                            <div class="col-md-2 has-required">
                                <div
                                    class="form-group"
                                    v-bind:class="formGroupClass($v, 'celular')"
                                >
                                    <label class="control-label" for="celular">Celular</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="celular"
                                        v-model.trim="inscricao.celular"
                                        v-mask="celularMask"
                                        required="required"
                                        @input="setMaskedFieldState($v, 'celular')"
                                    />
                                </div>
                            </div>
                            <div class="col-md-2 has-required">
                                <div class="form-group" v-bind:class="formGroupClass($v, 'cep')">
                                    <label class="control-label" for="cep">CEP</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="cep"
                                        v-model.trim="inscricao.cep"
                                        @input="$v.inscricao.cep.$touch()"
                                        v-mask="'##.###-###'"
                                        required="required"
                                    />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label">&nbsp;</label>
                                    <p id="loading" class="form-control form-control--text-only">
                                        <em>
                                            Informe o CEP para preencher o endereço
                                            automaticamente.
                                        </em>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div id="container-endereco" class="container--overlay">
                            <div
                                class="overlay"
                                v-bind:class="{ shown: loadingCep }"
                                id="cep-overlay"
                            >
                                <img src="../assets/loading.svg" />
                            </div>

                            <div class="row">
                                <div class="col-md-6 has-required">
                                    <div
                                        class="form-group"
                                        v-bind:class="formGroupClass($v, 'logradouro')"
                                    >
                                        <label class="control-label" for="logradouro">Logradouro</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="logradouro"
                                            v-model.trim="inscricao.logradouro"
                                            @input="$v.inscricao.logradouro.$touch()"
                                            required="required"
                                        />
                                    </div>
                                </div>
                                <div class="col-md-2 has-required">
                                    <div
                                        class="form-group"
                                        v-bind:class="formGroupClass($v, 'numero')"
                                    >
                                        <label class="control-label" for="nome">Número</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="numero"
                                            v-model.trim="inscricao.numero"
                                            maxlength="20"
                                            @input="$v.inscricao.numero.$touch()"
                                            required="required"
                                        />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div
                                        class="form-group"
                                        v-bind:class="formGroupClass($v, 'complemento')"
                                    >
                                        <label class="control-label" for="complemento">Complemento</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="complemento"
                                            maxlength="40"
                                            @input="$v.inscricao.complemento.$touch()"
                                            v-model.trim="inscricao.complemento"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-5 has-required">
                                    <div
                                        class="form-group"
                                        v-bind:class="formGroupClass($v, 'bairro')"
                                    >
                                        <label class="control-label" for="bairro">Bairro</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="bairro"
                                            v-model.trim="inscricao.bairro"
                                            maxlength="60"
                                            @input="$v.inscricao.bairro.$touch()"
                                            required="required"
                                        />
                                    </div>
                                </div>
                                <div class="col-md-4 has-required">
                                    <div
                                        class="form-group"
                                        v-bind:class="formGroupClass($v, 'cidade')"
                                    >
                                        <label class="control-label" for="cidade">Cidade</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="cidade"
                                            v-model.trim="inscricao.cidade"
                                            maxlength="50"
                                            @input="$v.inscricao.cidade.$touch()"
                                            required="required"
                                        />
                                    </div>
                                </div>
                                <div class="col-md-3 has-required">
                                    <div class="form-group">
                                        <label class="control-label" for="uf">UF</label>
                                        <select class="form-control" id="uf" v-model="inscricao.uf">
                                            <option value="AC" selected="selected">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="BA">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="ES">Espírito Santo</option>
                                            <option value="GO">Goiás</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MT">Mato Grosso</option>
                                            <option value="MS">Mato Grosso do Sul</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PR">Paraná</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piauí</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RO">Rondônia</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RR">Roraima</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="TO">Tocantins</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-if="!editMode">
                            <div class="col-md-12">
                                <div class="form-group text-right">
                                    <button
                                        type="submit"
                                        class="btn btn-primary btn-lg"
                                        v-on:click="inscricaoSave"
                                        v-bind:disabled="$v.$invalid || sending"
                                    >
                                        <span class="glyphicon glyphicon-ok"></span> Enviar
                                    </button>
                                    <span class="help-block" v-show="$v.$invalid">
                                        É preciso preencher o formulário corretamente para efetuar
                                        a inscrição.
                                    </span>
                                    <span
                                        class="help-block"
                                        v-show="sending"
                                    >Processando, por favor aguarde...</span>
                                </div>
                            </div>
                        </div>
                        <div v-else class="row">
                            <div class="col-md-12 text-right">
                                <a class="btn btn-success btn-sm" @click="inscricaoUpdate">Salvar</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    required,
    email,
    minLength,
    maxLength,
    sameAs
} from "vuelidate/lib/validators";
import cep from "cep-promise";
import $ from "jquery";
import toastr from "toastr";
import Cookie from "js-cookie";

var throttle = require("lodash.throttle");
var CPF = require("cpf_cnpj").CPF;
var CNPJ = require("cpf_cnpj").CNPJ;
var moment = require("moment");
var slugify = require("slugify");
moment.locale("pt-BR");

export default {
    props: ["editMode", "value"],
    data: function() {
        return {
            aceito: false,
            continueCep: false,
            continueCpf: false,
            idadeMinima: 0,
            idadeAdulto: 18,
            sending: false,
            errors: false,
            loadingCep: false,
            telefoneMask: "",
            celularMask: "",
            documentoMask: "",
            documentoLabel: "",
            inscricao: {
                numeroFocus: true,
                email: "",
                login: "",
                senha: "",
                confirma_senha: "",
                nome: "",
                sexo: "Feminino",
                documento: "",
                documento_tipo: "CNPJ",
                telefone: "",
                celular: "",
                nascimento: "",
                especial: "",
                cep: "",
                logradouro: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                uf: "RN",
                metadados: {
                    nome_fantasia: "",
                    nome_representante: ""
                }
            }
        };
    },
    mounted: function() {
        if (this.editMode) {
            let insc = Object.assign({}, this.inscricao);
            $.extend(insc, this.$store.state.user);
            insc.metadados = Object.assign({}, insc.metadados);
            insc.nascimento = moment(insc.nascimento).format("DD/MM/YYYY");
            this.inscricao = insc;
        }
        this.$nextTick(() => {
            this.adjustDocumentoField();
        });
    },
    computed: {
        meiaEntrada: function() {
            return false;
        },
        idoso: function() {
            return this.getIdade(this.inscricao.nascimento) >= 60;
        }
    },
    methods: {
        inscricaoUpdate: function(evt) {
            let bearerToken = Cookie.get("bearer");
            evt.preventDefault();
            this.inscricao.evento_id = this.$store.state.evento_id;
            this.sending = true;
            let diz = this;
            $.ajax({
                url: process.env.BACKEND_URL.UPDATE,
                method: "POST",
                data: diz.inscricao,
                headers: {
                    Authorization: "Bearer " + bearerToken
                },
                success: function(data, textStatus, jqXHR) {
                    window.location.reload();
                },
                error: function(data, textStatus, jqXHR) {
                    toastr.error(data.responseText);
                },
                complete: function(data, textStatus, jqXHR) {
                    diz.sending = false;
                },
                dataType: "JSON"
            });
        },
        getIdade: function(val) {
            return moment(
                "31-12-" + new Date().getFullYear(),
                "DD-MM-YYYY"
            ).diff(moment(val, "DD-MM-YYYY"), "years");
        },
        inscricaoSave: function(evt) {
            evt.preventDefault();
            this.inscricao.evento_id = this.$store.state.evento_id;
            this.sending = true;
            let diz = this;
            $.ajax({
                url: process.env.BACKEND_URL.CREATE,
                method: "POST",
                data: this.inscricao,
                success: function(data, textStatus, jqXHR) {
                    diz.$store
                        .dispatch("login", {
                            token: data.access_token
                        })
                        .then(function(data, textStatus, jqXHR) {
                            diz.$store.commit("assignInfo", data);
                        });
                    toastr.success("Seus dados foram salvos.");
                },
                error: function(data, textStatus, jqXHR) {
                    toastr.error(data.responseText);
                },
                complete: function(data, textStatus, jqXHR) {
                    diz.sending = false;
                },
                dataType: "JSON"
            });
        },
        formGroupClass: function($v) {
            for (let i in arguments) {
                if (typeof arguments[i] !== "string") {
                    continue;
                }
                var isMetadados = arguments[i].indexOf(".");
                var el;
                if (isMetadados >= 0) {
                    let index = arguments[i].substr(isMetadados + 1);
                    el = $v.inscricao.metadados[index];
                } else {
                    el = $v.inscricao[arguments[i]];
                }

                if (el.$error) {
                    return "has-error";
                } else if (el.$dirty && !el.$error) {
                    return "has-success";
                }
            }
            return false;
        },
        adjustDocumentoField: function() {
            if (this.inscricao.documento_tipo === "CPF") {
                this.documentoLabel = "CPF";
                this.documentoMask = "###.###.###-##";
            } else {
                this.documentoLabel = "CNPJ";
                this.documentoMask = "##.###.###/####-##";
            }
        },
        setMaskedFieldState: function($v, field) {
            var isMetadados = field.indexOf(".");
            if (isMetadados < 0) {
                if (this.inscricao[field].length) {
                    $v.inscricao[field].$touch();
                }
            } else {
                var el;
                var fieldName = field;
                if (isMetadados >= 0) {
                    el = $v.inscricao.metadados;
                    fieldName = field.substr(isMetadados + 1);
                } else {
                    el = $v.inscricao;
                }

                if (el[fieldName]) {
                    el[fieldName].$touch();
                }
            }
        },
        throttledCep: throttle(function(val) {
            if (this.editMode && !this.continueCep) {
                this.continueCep = true;
                return;
            }
            this.loadingCep = true;
            var diz = this;
            toastr.info("Carregando informações para o CEP " + val + ".");
            cep(val).then(
                function(data) {
                    toastr.success("Informações obtidas com sucesso.");
                    diz.loadingCep = false;

                    diz.inscricao.uf = data.state;
                    diz.inscricao.cidade = data.city;
                    diz.inscricao.bairro = data.neighborhood;
                    diz.inscricao.logradouro = data.street;
                    diz.$v.inscricao.cidade.$touch();
                    diz.$v.inscricao.bairro.$touch();
                    diz.$v.inscricao.logradouro.$touch();
                    if (diz.numeroFocus) {
                        document.getElementById("numero").focus();
                    }
                },
                function() {
                    diz.loadingCep = false;
                    toastr.error(
                        "Não foi possível carregar as informações do CEP."
                    );
                    toastr.warning(
                        "Por favor, informe seu endereço manualmente."
                    );
                }
            );
        }, 3000)
    },
    watch: {
        "inscricao.login": function(val) {
            this.inscricao.login = slugify(val.toLowerCase(), ".").replace(
                "..",
                "."
            );
        },
        "inscricao.email": function(val) {
            this.inscricao.email = val.toLowerCase();
        },
        "inscricao.nome": function(val) {
            this.inscricao.nome = val.toUpperCase().replace("  ", " ");
        },
        "inscricao.logradouro": function(val) {
            this.inscricao.logradouro = val.toUpperCase().replace("  ", " ");
        },
        "inscricao.numero": function(val) {
            this.inscricao.numero = val.toUpperCase().replace("  ", " ");
        },
        "inscricao.complemento": function(val) {
            this.inscricao.complemento = val.toUpperCase().replace("  ", " ");
        },
        "inscricao.bairro": function(val) {
            this.inscricao.bairro = val.toUpperCase().replace("  ", " ");
        },
        "inscricao.cidade": function(val) {
            this.inscricao.cidade = val.toUpperCase().replace("  ", " ");
        },
        "inscricao.documento_tipo": function(val) {
            this.adjustDocumentoField();
        },
        "inscricao.documento": function(val) {
            if (val.length === 14 && this.inscricao.documento_tipo === "CPF") {
                if (this.editMode && !this.continueCpf) {
                    this.continueCpf = true;
                    return;
                }
                toastr.info("Consultando o CPF " + val + ".");
                let diz = this;
                this.$store
                    .dispatch("dataServer", { type: "dado", data: val })
                    .then(function(data) {
                        if (data) {
                            toastr.success("CPF localizado.");
                            if (data.celular) {
                                diz.inscricao.celular = data.celular;
                            }
                            if (data.fone) {
                                diz.inscricao.telefone = data.fone;
                            }
                            // if (data.cep) {
                            //     diz.numeroFocus = false;
                            // } else {
                            //     diz.numeroFocus = true;
                            // }
                            // diz.inscricao.cep = data.cep;
                            if (data.razao_social) {
                                diz.inscricao.nome = data.razao_social;
                            }
                            if (data.email) {
                                diz.inscricao.email = data.email;
                            }
                            if (data.nome_fantasia) {
                                diz.inscricao.metadados.nome_fantasia = data.nome_fantasia;
                            }
                            if (data.contato) {
                                diz.inscricao.metadados.nome_representante = data.contato;
                            }
                            if (data.bairro) {
                                diz.inscricao.bairro = data.bairro;
                            }
                            if (data.cidade) {
                                diz.inscricao.cidade = data.cidade;
                            }
                            if (data.uf) {
                                diz.inscricao.uf = data.uf;
                            }
                            if (data.logradouro) {
                                diz.inscricao.logradouro = data.endereco;
                            }
                        } else {
                            toastr.warn("Nenhum dado encontrado.");
                        }
                    });
            } else if (val.length === 18 && this.inscricao.documento_tipo === "CNPJ") {
                if (this.editMode && !this.continueCpf) {
                    this.continueCpf = true;
                    return;
                }
                toastr.info("Consultando o CNPJ " + val + ".");
                let diz = this;
                this.$store
                    .dispatch("dataServer", { type: "dado", data: val })
                    .then(function(data) {
                        if (data) {
                            toastr.success("CNPJ localizado.");
                            if (data.celular) {
                                diz.inscricao.celular = data.celular;
                            }
                            if (data.fone) {
                                diz.inscricao.telefone = data.fone;
                            }
                            // if (data.cep) {
                            //     diz.numeroFocus = false;
                            // } else {
                            //     diz.numeroFocus = true;
                            // }
                            // diz.inscricao.cep = data.cep;
                            if (data.razao_social) {
                                diz.inscricao.nome = data.razao_social;
                            }
                            if (data.email) {
                                diz.inscricao.email = data.email;
                            }
                            if (data.nome_fantasia) {
                                diz.inscricao.metadados.nome_fantasia = data.nome_fantasia;
                            }
                            if (data.contato) {
                                diz.inscricao.metadados.nome_representante = data.contato;
                            }
                            if (data.bairro) {
                                diz.inscricao.bairro = data.bairro;
                            }
                            if (data.cidade) {
                                diz.inscricao.cidade = data.cidade;
                            }
                            if (data.uf) {
                                diz.inscricao.uf = data.uf;
                            }
                            if (data.logradouro) {
                                diz.inscricao.logradouro = data.endereco;
                            }
                        } else {
                            toastr.warning("Nenhum dado de auto-preenchimento encontrado.");
                        }
                    });
            }
        },
        "inscricao.telefone": function(val) {
            if (this.inscricao.telefone.length <= 14) {
                this.telefoneMask = "(##) ####-#####";
            } else {
                this.telefoneMask = "(##) #####-####";
            }
        },
        "inscricao.celular": function(val) {
            if (this.inscricao.celular.length <= 14) {
                this.celularMask = "(##) ####-#####";
            } else {
                this.celularMask = "(##) #####-####";
            }
        },
        "inscricao.cep": function(val) {
            if (!this.$v.inscricao.cep.$error) {
                this.throttledCep(val);
            }
        }
    },
    validations: {
        aceito: {
            required
        },
        inscricao: {
            login: {
                required
            },
            email: {
                required,
                email,
                maxLength: maxLength(60)
            },
            senha: {
                required,
                minLength: minLength(4)
            },
            confirma_senha: {
                sameAs: sameAs("senha")
            },
            nome: {
                required,
                maxLength: maxLength(50)
            },
            documento: {
                required,
                cpf: function(val) {
                    if (val === "") return true;
                    if (this.inscricao.documento_tipo === "CPF") {
                        return CPF.isValid(val);
                    } else if (this.inscricao.documento_tipo === "CNPJ") {
                        return CNPJ.isValid(val);
                    }
                    return true;
                }
            },
            telefone: {
                minLength: minLength(14)
            },
            celular: {
                required,
                minLength: minLength(14)
            },
            cep: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(10)
            },
            logradouro: {
                required
            },
            numero: {
                required,
                maxLength: maxLength(20)
            },
            complemento: {
                maxLength: maxLength(40)
            },
            bairro: {
                required,
                maxLength: maxLength(60)
            },
            cidade: {
                required,
                maxLength: maxLength(50)
            },
            metadados: {
                nome_fantasia: {
                    required
                },
                nome_representante: {
                    required
                }
            }
        }
    }
};
</script>
