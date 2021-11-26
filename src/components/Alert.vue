<template>
    <div :class="'Alerta alert-'+clsAlert+' alert'" role="alert">
        {{msg}}
    </div>
</template>

<script>
export default {
    name: 'Alerta',
    props: {
        msg: String,
        clsAlert: String,
    },
    data(){
        return{
        }
    },
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Alerta{
    position: absolute;
    top: 22px;
    right: 11px;
    z-index: 30;
}
</style>