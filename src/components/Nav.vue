<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">{{nombre}}</a>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <button type="button" class="btn btn-secondary" @click.prevent="logout">Cerrar Sesión</button>
                    </li>
                </ul>
            </div>
        </div> 
    </nav>
</template>


<script>
    export default {
        name: 'Clientes',
        data(){
            return{
                nombre:'FORTEDEV',
            }
        },
        methods:{
            logout(){
                sessionStorage.removeItem('token')
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>
.navbar {
    padding-right: 1rem;
    padding-left: 1rem;
}
.collapse{
    justify-content: end;
}
</style>