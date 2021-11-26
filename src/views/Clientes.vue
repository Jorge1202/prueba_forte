<template>
    <div class="clientes">
        <Nav :nombre="nombre"/>
        <div class="clientes__cont">
            <div class="clientes__title">
                    <h3>Lista de usuarios</h3>
            </div>
            <div class="clientes__title">
                <div class="container">
                    <div class="row button">
                        <button @click="agregarCliente" type="button" class="btn-add btn btn-secondary">Agregar nuevo</button>
                    </div>
                </div>
            </div>
            <div class="clientes__body">
                <div class="container">
                    <div class="row">
                        <div class="clientes__tabla">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                    <th scope="col">Nombre </th>
                                    <th scope="col">Correo electrónico</th>
                                    <th scope="col">Edad</th>
                                    <th scope="col">Limite credito</th>
                                    <th scope="col">Estatus</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, i) in clientes" :key="i">
                                        <td>{{item.nombreCompleto}}</td>
                                        <td>{{item.correoElectronico}}</td>
                                        <td>{{item.edad}}</td>
                                        <td>{{item.limiteCredito}}</td>
                                        <td>{{item.estatusCliente}}</td>
                                        <td> 
                                            <button type="button" @click="editarCliente(item)" class="btn btn-primary btn-sm"><i class="bi bi-pencil-square "></i></button>
                                            <button :id="'openModal'+i" type="button" @click="confirmar(item)" class="btn btn-secondary btn-sm" data-bs-toggle="modal" :data-bs-target="'#confirmar'+i">
                                                <i class="bi bi-archive-fill" ></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showModal">
            <transition name="modal">
                <div :class="{clsshow:showModal}"  class="modal-mask">
                    <div class="modal-wrapper">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirmación</h5>
                                <button @click="showModal = false" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" >&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>¿Deseas eliminar al cliente?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="showModal = false">Cancelar</button>
                                <button type="button" class="btn btn-primary" @click="eliminarCliente">Confirmar</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </transition>
        </div>
        <FormCliente :showForm="modalform.showForm" :dataInfo="modalform" @closeModal="closeM" @resourceChildren="resource" @getdata="datosClientes" title=""/>
         <Alert v-if="alert.show" :msg="alert.mensaje" :clsAlert="alert.clsAlert"/>
    </div>
</template>

<script>
import Alert from '@/components/Alert.vue'
import FormCliente from '@/components/FormCliente.vue'
import Nav from '@/components/Nav.vue'
import filefetch from '../assets/js/fetch';
let fetch = new filefetch();

export default {
    name: 'Clientes',
    data(){
        return{
            nombre:'FORTEDEV',
            clientes:[],
            showModal: false,
            alert:{
                show: false,
                mensaje:'',
                clsAlert:''
            },
            dataDelete:{},
            modalform:{
                agregar: true,
                title: '',
                nameBtn:'',
                showForm: false,
            }
        }
    },
    components: {
        Nav,
        Alert,
        FormCliente
    },
    mounted(){
        let sesion = sessionStorage.getItem('token');
        if(sesion && sesion.length!=0){
            // this.datosUsuario();
            this.datosClientes();
        }else {
            sessionStorage.removeItem('token')
            this.$router.push('/login');
        }
    },
    methods:{
        resource(data){
            this.alert.mensaje = data.mensaje
            this.alert.clsAlert = data.clsAlert
            this.alert.show = true

            setTimeout(()=>{this.alert.show  = false;}, 3000);
        },
        closeM(){
            this.modalform.showForm = false;
        },
        agregarCliente(){
   
            this.modalform.agregar= true;
            this.modalform.title= 'Agregar cliente';
            this.modalform.nameBtn='Guardar';
            this.modalform.showForm= true;
            this.modalform.formulario= {};
        },
        editarCliente(item){
            this.modalform.agregar= false;
            this.modalform.title= 'Editar cliente';
            this.modalform.nameBtn='Guardar';
            this.modalform.showForm= true;
            this.modalform.formulario= item;
        },
        datosUsuario(){
            let id = 0;
            let objFetch = {
                url: `usuario/${id}`,
            }
            fetch.GET(objFetch)
                .then(async data =>{
                    if(data.code === 200 && data.data){
                        console.log('Enrro');
                    } 
                }).catch((e) => {
                    console.log(e);
                });
        },
        datosClientes(){
            let objFetch = {
                url: 'clientes',
            }
            fetch.GET(objFetch)
                .then(async data =>{
                    console.log(data);
                    if(data.code === 200 && data.data){
                        this.clientes = data.data;
                    } 
                }).catch((e) => {
                    console.log(e);
                });
        },
        confirmar(data){
            this.dataDelete = data;
            this.showModal = true;
        },
        eliminarCliente(){
            let objFetch = {
                url: `cliente/${this.dataDelete.clienteId}`,
            }

            fetch.DELETE(objFetch)
                .then(async data =>{
                    if(data.code === 200 && data.data){
                        this.alert.mensaje = data.mensaje
                        this.alert.clsAlert = 'success'
                        this.alert.show = true
                    } else{
                        this.alert.mensaje = data.mensaje
                        this.alert.clsAlert = 'warning'
                        this.alert.show = true
                    }
                    this.datosClientes();
                    this.dataDelete ={};
                    this.showModal = false;
                    setTimeout(()=>{this.alert.show  = false;}, 3000);
                }).catch((e) => {
                    console.log(e);
                });
        }
    }
}
</script>

<style>
.clientes{
    width: 100%;
    height: 100%;
    
}
.clientes__cont{
    width: 100%;
    height: 70%;
    padding: 15px 0;
}
.clientes__title{
    height: 3rem;
}

.button{
    float: right;
}
.btn-add{
    width: 9rem;
}


.clientes__body{
    width: 100%;
    height: calc(100% - 4rem);
    overflow: auto;
    margin-top: 16px;
}
.clientes__tabla{
    width: 100%;
    height: 100%;
    padding: 0 0;
}

table .btn{
    margin: 0px 4px;
}
table .btn i{
    font-size: 10px;
}
@media (max-width: 700px){
    .container {
        padding: 0 25px 0 10px;
    }
}
@media (max-width: 800px){
    table .btn{
        margin: 4px 4px;
    }
}
.clsshow{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1060;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    background-color: #00000063;
}
</style>