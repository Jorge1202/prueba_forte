<template> 
    <div class="login">
        <div class="login_cont">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                        <div class="card login-content shadow-lg border-0">
                            <div class="card-body">
                                <div class="text-center">
                                    <img class="logo" src="https://cdn3.iconfinder.com/data/icons/galaxy-open-line-gradient-i/200/account-256.png">
                                </div>
                                <h3 class="text-logo">Iniciar sesión</h3>
                                <br>
                                <form v-on:submit.prevent="login" class="text-center" >
                                    <input v-model="usuarioo" class="form-control border-0" type="" name="" placeholder="Username" required>
                                    <br>
                                    <input v-model="password" class="form-control border-0" type="" name="" placeholder="Password" required>
                                    <br>
                                    <button class="btn btn-primary btn-sm border-0" type="submit" name="submit">Iniciar sesión</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Alert v-if="alert.show" :msg="alert.mensaje" :clsAlert="alert.clsAlert"/>
    </div>

</template>

<script>
import Alert from '@/components/Alert.vue'

import filefetch from '../assets/js/fetch';
let fetch = new filefetch();
export default {
    name: 'login',
    data(){
        return{
            usuarioo:'',
            password:'',
            alert:{
                show: false,
                mensaje:'',
                clsAlert:''
            }
        }
    },
    components: {
        Alert
    },
    methods:{
        login(){
            let objFetch = {
                url: 'auth/login',
                params:{
                        "usuario": this.usuarioo,
                        "password": this.password
                }
            }
            fetch.POST(objFetch)
                .then(async data =>{
                    console.log(data);
                    if(data.code === 200 && data.data){
                        this.alert.mensaje = data.message
                        this.alert.clsAlert = 'success'
                        this.alert.show = true

                        sessionStorage.setItem('token', data.data.token);
                        this.$router.push('/clientes');
                    } else{
                        this.alert.mensaje = data.message
                        this.alert.clsAlert = 'warning'
                        this.alert.show = true
                    }
                    setTimeout(()=>{this.alert.show  = false;}, 3000);
                }).catch((e) => {
                    console.log(e);
                });
        }
    }
}
</script>


<style scoped lang="scss">
.login{
    width: 100%;
    height: 100%;
}
.login_cont{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (min-width: 1300px){
    .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
        max-width: 30rem;
    }
}
@media (max-width: 1300px){
    .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
        max-width: 30rem;
    }
}


</style>