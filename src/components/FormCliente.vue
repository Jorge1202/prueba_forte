<template>
    <section>
        <div v-if="dataInfo.showForm">
            <transition name="modal">
                <div :class="{clsshowModal:dataInfo.showForm}"  class="modal-mask">
                    <div class="modal-wrapper">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <form v-on:submit.prevent="guardar">
                                <div class="modal-header">
                                    <h5 class="modal-title">{{dataInfo.title}}</h5>
                                    <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" >&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label for="nombre" class="form-label">Nombre completo</label>
                                                    <input v-model="dataInfo.formulario.nombreCompleto" type="text" class="form-control" id="nombre" placeholder="" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label for="correoElectronico" class="form-label">Email address</label>
                                                    <input v-model="dataInfo.formulario.correoElectronico" type="email" class="form-control" id="correoElectronico" placeholder="name@example.com" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label for="telefonoMovil" class="form-label">Teléfono</label>
                                                    <input v-model="dataInfo.formulario.telefonoMovil" type="phone" class="form-control" id="telefonoMovil" placeholder="555 5555 555">
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label for="fechaNacimiento" class="form-label">Fecha nacimiento</label>
                                                    <input v-model="dataInfo.formulario.fechaNacimiento" type="date" class="form-control" id="fechaNacimiento" placeholder="" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label for="rfc" class="form-label">RFC</label>
                                                    <input v-model="dataInfo.formulario.rfc" type="text" class="form-control" id="rfc" placeholder="" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label for="domicilio" class="form-label">Domicilio</label>
                                                    <input v-model="dataInfo.formulario.domicilio" type="text" class="form-control" id="domicilio" placeholder="" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label for="limiteCredito" class="form-label">Limite de crédito</label>
                                                    <input v-model="dataInfo.formulario.limiteCredito" type="text" class="form-control" id="limiteCredito" placeholder="" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-check form-switch">
                                                    <label class="form-check-label" for="flexSwitchCheckChecked">Estatus</label>
                                                    <input v-model="dataInfo.formulario.estatusClienteId" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="closeModal">Cerrar</button>
                                    <button type="submit" class="btn btn-primary">{{dataInfo.nameBtn}}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </transition>
        </div>
    </section>
</template>


<script>
import filefetch from '../assets/js/fetch';
let fetch = new filefetch();

export default {
  name: 'HelloWorld',
  props: {
    showForm: Boolean,
    dataInfo:Object
  },

  methods:{
    closeModal(){
        this.dataInfo.showForm = false
        this.$emit('closeModal');
    },
    guardar(){
        if(this.dataInfo.agregar){
            this.agregarCliete();
        }else {
            this.editarCliete();
        }
    },
    agregarCliete(){

        let params = this.dataInfo.formulario;
        let objFetch = {
            url: 'cliente',
            params:params
        }
        fetch.POST(objFetch)
            .then(async data =>{
                console.log(data);
                if(data.code === 200 && data.data){
                    let tem = {
                       mensaje: data.message,
                       clsAlert: 'success',
                       show: true,
                    }
                    this.$emit('resourceChildren', tem);
                    this.$emit('getdata');
                    this.closeModal();
                } else{
                    let tem = {
                       mensaje: data.title,
                       clsAlert: 'warning',
                       show: true,
                    }
                    
                    this.$emit('resourceChildren', tem);
                }

            }).catch((e) => {
                console.log(e);
            });
    },
    editarCliete(){
       let params = this.dataInfo.formulario;
        let objFetch = {
            url: `cliente/${params.clienteId}`,
            params:params
        }
        fetch.PUT(objFetch)
            .then(async data =>{
                console.log(data);
                 if(data.code === 200 && data.data){
                    let tem = {
                       mensaje: data.message,
                       clsAlert: 'success',
                    }
                    this.$emit('resourceChildren', tem);
                    this.$emit('getdata');
                    this.closeModal();

                } else{
                    let tem = {
                       mensaje: data.message,
                       clsAlert: 'warning',
                    }
                    this.$emit('resourceChildren', tem);
                }
            }).catch((e) => {
                console.log(e);
            });
    }
  }
}
</script>

<style>
.modal-body{
    text-align: left;
}
.clsshowModal{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 22;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    background-color: #00000063;
}
</style>