<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <button v-on:click="login" class="btn btn-primary btn-sm border-0" type="button" name="submit">Iniciar sesión</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods:{
    login(){
        this.$router.push('/clientes');
    }
  }
  
}
</script>
