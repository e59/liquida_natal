<template>
    <div class="hesllo">
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                            aria-expanded="false">
                        <span class="sr-only">Alternar menu</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <router-link to="/" class="navbar-brand">{{ brand }}</router-link>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="navbar">
                    <ul class="nav navbar-nav navbar-right">
                        <template v-if="$store.state.loggedIn">
                            <!-- <router-link tag="li" to="/logout"><a>Editar inscrição</a></router-link> -->
                            <router-link tag="li" to="/logout"><a>Sair</a></router-link>
                        </template>
                        <template v-else>
                            <router-link tag="li" to="/login"><a>Login</a></router-link>
                        </template>

                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
    </div>
</template>

<script>
    export default {
        props: {
            brand: {
                'default': 'Mude-me'
            }
        }
    }
</script>
