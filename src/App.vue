<template>
  <div id="app">
    <navbar :brand="brand" />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "bootstrap-sass";
import Navbar from "./components/Navbar";

export default {
  data: function() {
    return {
      brand: "LIQUIDA NATAL – SISTEMA DE ADESÃO PARA LOJISTAS"
    };
  },
  components: {
    Navbar
  },
  created: function() {
    let diz = this;
    this.$store.dispatch("loadData").then(function(data, textStatus, jqXHR) {
      diz.$store.commit("assignData", data);
    });
  },
  mounted: function() {
    document.title = this.brand;
  }
};
</script>

<style lang="scss">
@import "assets/stylesheets/app.scss";
</style>
