<template>
    <div class="row mt-3">
      <div class="col-md-6 offset-md-3 mt-5">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">Crear Proyecto</div>
          <div class="card-body">
            <form @submit="guardar">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-pen"></i></span>
                <input type="text" v-model="title" id="title" class="form-control" maxlength="50" placeholder="Titulo" required>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-comment"></i></span>
                <input type="text" v-model="description" id="description" class="form-control" maxlength="50" placeholder="Descripcion" required>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-cogs"></i></span>
                <input type="text" v-model="tecnology" id="tecnology" class="form-control" maxlength="50" placeholder="Tecnologia" required>
              </div>
              <div class="d-grid col-6 mx-auto">
                <button type="submit" class="btn btn-success">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { show_alerta, enviarSolicitud } from '../funciones';
  
  export default {
    data() {
      return {
        title: '',
        description: '',
        tecnology: '',
        url: 'http://127.0.0.1:8000/api/projects/'
      }
    },
    methods: {
      guardar(event) {
        event.preventDefault();
        if (this.title.trim() === '') {
          show_alerta('Escribe el titulo', 'warning', 'title');
        } else if (this.description.trim() === '') {
          show_alerta('Escribe la descripcion', 'warning', 'description');
        } else if (this.tecnology.trim() === '') {
          show_alerta('Escribe la tecnologia', 'warning', 'tecnology');
        } else {
          const parametros = {
            title: this.title.trim(),
            description: this.description.trim(),
            tecnology: this.tecnology.trim()
          };
          enviarSolicitud('POST', parametros, this.url, 'Proyecto guardado');
        }
      }
    }
  }
  </script>
  