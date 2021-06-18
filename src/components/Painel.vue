<template>
  <div class="row">
    <div class="col-md-12">
      <div class="small text-right painel__main-info">
        <div class="nome">
          {{ $store.state.user.nome }} ({{ $store.state.user.login }})
        </div>
        <span class="main-info__label">Status da inscrição:</span>
        {{ $store.state.inscricao.options.status[$store.state.user.status] }}
      </div>

      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active">
          <a
            href="#inscricao"
            aria-controls="inscricao"
            role="tab"
            data-toggle="tab"
            >Inscrição</a
          >
        </li>
        <!--
                <li role="presentation"><a href="#loja" aria-controls="loja" role="tab"
                                           data-toggle="tab">Loja</a></li>
                -->
        <li role="presentation">
          <a
            id="comprasTab"
            href="#compras"
            aria-controls="compras"
            role="tab"
            data-toggle="tab"
            >Suas compras</a
          >
        </li>
        <li role="presentation">
          <a href="#dados" aria-controls="dados" role="tab" data-toggle="tab"
            >Seus dados</a
          >
        </li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="inscricao">
          <div v-if="$store.state.inscricaoOk">
            <p class="alert alert-success">Sua inscrição já foi confirmada!</p>
          </div>
          <div v-else>
            <div v-if="$store.state.inscricaoIniciada && !inscricaoInCart">
              <p class="alert alert-info">
                Você já iniciou um pagamento para a sua inscrição.
              </p>
              <a
                class="btn btn-lg btn-success"
                href="javascript:document.getElementById('comprasTab').click()"
                >Clique aqui para visualizar suas compras.</a
              >
              <hr />
              <div class="well">
                <p>
                  <strong
                    >Para fazer uma nova tentativa de pagamento, utilize o botão
                    abaixo.</strong
                  >
                </p>
                <button
                  class="btn btn-primary"
                  v-on:click="addInscricaoToCart()"
                >
                  REFAZER PAGAMENTO
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--
                <div role="tabpanel" class="tab-pane" id="loja">
                    <div v-if="$store.state.produtos.length">
                        <table class="table table-striped table-condensed">
                            <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Observação</th>
                                <th>Quantidade</th>
                                <th class="text-right">Valor</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="produto in $store.state.produtos">
                                <td>{{produto.name}}</td>
                                <td v-html="produto.description"></td>
                                <td>1</td>
                                <td class="text-right">{{ formatCurrency(produto.price) }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        <p class="alert alert-info">Nenhum produto disponível no momento!</p>
                    </div>
                </div>
                -->
        <div role="tabpanel" class="tab-pane" id="compras">
          <table
            class="table table-striped table-bordered"
            v-if="$store.state.compras.length"
          >
            <thead>
              <tr>
                <th>Data</th>
                <th>Produto</th>
                <th>Valor</th>
                <th>Quantidade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="compra in $store.state.compras">
                <td>{{ formatDateTime(compra.data) }}</td>
                <td>{{ compra.name }}</td>
                <td>{{ formatCurrency(compra.price) }}</td>
                <td>{{ compra.quantity }}</td>
                <td>{{ compra.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div role="tabpanel" class="tab-pane" id="dados">
          <table class="table table-striped table-bordered">
            <tbody>
                <tr>
                    <th colspan="2" style="text-align: right">
                        <div v-if="editing" class="btn-group btn-group-sm">
                            <a class="btn btn-default btn-sm" v-on:click="editBack">Voltar</a>
                        </div>
                        <div v-else>
                            <a class="btn btn-primary btn-sm" v-on:click="editForm">Editar dados</a>
                        </div>

                    </th>
                </tr>
              <template v-if="editing">
                <inscricao edit-mode="true" />
              </template>
              <template v-else>
                <tr>
                  <th>Razão Social</th>
                  <td>{{ $store.state.user.nome }}</td>
                </tr>
                <tr>
                  <th>Nome fantasia</th>
                  <td>{{ $store.state.user.metadados.nome_fantasia }}</td>
                </tr>
                <tr>
                  <th>Nome do representante</th>
                  <td>{{ $store.state.user.metadados.nome_representante }}</td>
                </tr>
                <tr>
                  <th>Número de funcionarios</th>
                  <td>{{ $store.state.user.metadados.funcionarios }}</td>
                </tr>
                <tr>
                  <th>Associado</th>
                  <td>{{ formatBool($store.state.user.metadados.associado) }}</td>
                </tr>
                <tr>
                  <th>Receber informações</th>
                  <td>{{ formatBool($store.state.user.metadados.comunicacao) }}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{{ $store.state.user.email }}</td>
                </tr>
                <tr>
                  <th>Nome de usuário</th>
                  <td>{{ $store.state.user.login }}</td>
                </tr>
                <tr>
                  <th>Tipo de documento</th>
                  <td>{{ $store.state.user.documento_tipo }}</td>
                </tr>
                <tr>
                  <th>Documento</th>
                  <td>{{ $store.state.user.documento }}</td>
                </tr>
                <tr>
                  <th>Telefone</th>
                  <td>{{ $store.state.user.telefone }}</td>
                </tr>
                <tr>
                  <th>Celular</th>
                  <td>{{ $store.state.user.celular }}</td>
                </tr>
                <tr>
                  <th>CEP</th>
                  <td>{{ $store.state.user.cep }}</td>
                </tr>
                <tr>
                  <th>Logradouro</th>
                  <td>{{ $store.state.user.logradouro }}</td>
                </tr>
                <tr>
                  <th>Número</th>
                  <td>{{ $store.state.user.numero }}</td>
                </tr>
                <tr>
                  <th>Complemento</th>
                  <td>{{ $store.state.user.complemento }}</td>
                </tr>
                <tr>
                  <th>Bairro</th>
                  <td>{{ $store.state.user.bairro }}</td>
                </tr>
                <tr>
                  <th>Cidade</th>
                  <td>{{ $store.state.user.cidade }}</td>
                </tr>
                <tr>
                  <th>UF</th>
                  <td>{{ $store.state.user.uf }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

      <div class="panel panel-success" v-if="$store.state.cart.length">
        <div class="panel-heading">
          Carrinho
        </div>
        <div class="panel-body">
          <table class="table table-striped table-condensed">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Observação</th>
                <th>Quantidade</th>
                <th class="text-right">Valor</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tfoot>
              <tr class="text-right">
                <td class="text-right row--total" colspan="5">
                  TOTAL: {{ total }}
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <div
                    class="text-right form-inline"
                    v-show="!$store.state.user.metadados.amigo"
                  >
                    <div class="form-group">
                      <label class="control-label" for="voucher"
                        >Informe o seu código promocional, caso possua
                        um:</label
                      >
                      <input
                        type="text"
                        class="form-control input-lg"
                        id="voucher"
                        v-model="extraData.voucher"
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <div class="text-right">
                    <button
                      type="button"
                      class="btn btn-lg btn-success"
                      v-bind:disabled="sending"
                      v-show="!completed"
                      v-on:click="paymentRequest"
                    >
                      EFETUAR PAGAMENTO
                    </button>
                    <span class="help-block" v-show="sending"
                      >Processando, por favor aguarde...</span
                    >
                    <span class="help-block" v-show="completed"
                      >Concluído! Redirecionando para o PagSeguro...</span
                    >
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for="produto in $store.state.cart">
                <td>{{ produto.name }}</td>
                <td v-html="produto.description"></td>
                <td>1</td>
                <td class="text-right">{{ formatCurrency(produto.price) }}</td>
                <td>
                  <div
                    class="btn-group btn-group-sm"
                    v-if="cartRemovalPossible(produto)"
                  >
                    <button
                      class="btn btn-sm btn-danger"
                      v-on:click="removeInscricaoFromCart(produto)"
                    >
                      Remover
                    </button>
                  </div>
                  <div v-else>
                    &nbsp;
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import $ from "jquery";
import Inscricao from "./Inscricao";

var numeral = require("numeral");
var moment = require("moment");
require("sweetalert");
moment.locale("pt-BR");

require("numeral/locales/pt-br");

numeral.locale("pt-br");

export default {
    components: {
        Inscricao
    },
    data() {
        return {
            sending: false,
            completed: false,
            user: null,
            inscricaoInCart: false,
            extraData: {
                voucher: null
            },
            editing: false
        };
    },
    computed: {
        total: function() {
            let total = 0;
            for (const i in this.$store.state.cart) {
                total += this.$store.state.cart[i]["price"];
            }
            return this.formatCurrency(total);
        }
    },
    methods: {
        editForm: function() {
            this.editing = true;
        },
        editBack: function() {
            this.editing = false;
        },
        addInscricaoToCart: function() {
            for (const i in this.$store.state.requiredProducts) {
                this.$store.commit(
                    "addToCart",
                    this.$store.state.requiredProducts[i]
                );
            }
            this.inscricaoInCart = true;
        },
        removeInscricaoFromCart: function(produto) {
            this.$store.commit("removeFromCart", produto);
            this.inscricaoInCart = false;
        },
        cartRemovalPossible: function(produto) {
            if (produto.required && !this.$store.state.inscricaoIniciada) {
                return false;
            }
            return true;
        },
        paymentRequest: function() {
            let bearerToken = Cookie.get("bearer");
            let diz = this;
            this.sending = true;
            $.ajax({
                url: process.env.BACKEND_URL.PAYMENT,
                method: "POST",
                data: {
                    cart: { 0: { id: "inscricao", quantity: 1 } },
                    extraData: diz.extraData
                },
                success: function(data, textStatus, jqXHR) {
                    if (data.ok) {
                        diz.completed = true;
                        if (typeof data.url !== "undefined") {
                            window.location.href = data.url;
                        }
                        if (typeof data.status !== "undefined") {
                            swal(
                                {
                                    title: "Sucesso!",
                                    text: "Seu código promocional foi aceito",
                                    type: "success"
                                }
                            ).then(function() {
                                window.location.reload();
                            });
                        }
                    }
                },
                error: function(data, textStatus, jqXHR) {
                    diz.completed = false;
                    toastr.error(data.responseJSON.message);
                },
                complete: function(data, textStatus, jqXHR) {
                    diz.sending = false;
                },
                headers: {
                    Authorization: "Bearer " + bearerToken
                },
                dataType: "JSON"
            });
        },
        formatBool: function(val) {
            return val ? 'Sim' : 'Não';
        },
        formatDate: function(val) {
            return moment(val, "YYYY-MM-DD").format("L");
        },
        formatDateTime: function(val) {
            return moment(val, "YYYY-MM-DD HH:mm:ss").format(
                "DD-MM-YYYY HH:mm:ss"
            );
        },
        formatCurrency: function(val) {
            return numeral(val).format("$0,0.00");
        }
    },
    watch: {
        "extraData.voucher": function(val) {
            this.extraData.voucher = val.toUpperCase().replace("  ", " ");
        }
    },
    validations: {}
};
</script>
