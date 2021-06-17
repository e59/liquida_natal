<template>
    <div v-if="$store.state.loaded">
        <div v-if="$store.state.loggedIn">
            <painel />
        </div>
        <div v-else>
            <div v-html="$store.state.evento.descricao"></div>
            <inscricao />
        </div>
    </div>
</template>

<script>
    import Inscricao from './Inscricao'
    import Painel from './Painel'

    export default {
        components: {
            Inscricao,
            Painel
        }
    }
</script>
