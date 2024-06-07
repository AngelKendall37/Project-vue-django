<template>
    <div class="row mt-3">
      <div class="col-md-6 offset-md-3 mt-5">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">Editar Proyecto</div>
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
  import { show_alerta } from '../funciones';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        id: 0,
        title: '',
        description: '',
        tecnology: '',
        baseUrl: 'http://127.0.0.1:8000/api/projects'
      }
    },
    mounted() {
      const route = useRoute();
      this.id = route.params.id;
      if (!this.id) {
        show_alerta('ID no encontrado en la ruta', 'error');
        return;
      }
      this.getProject();
    },
    methods: {
      getProject() {
        const url = `${this.baseUrl}/${this.id}/`;
        axios.get(url)
          .then(response => {
            this.title = response.data.title;
            this.description = response.data.description;
            this.tecnology = response.data.tecnology;
          })
          .catch(error => {
            console.error('Error fetching project:', error);
            if (error.response && error.response.status === 404) {
              show_alerta('Proyecto no encontrado. Verifica que el ID es correcto.', 'error');
            } else {
              show_alerta('No se pudo obtener el proyecto. Intenta nuevamente más tarde.', 'error');
            }
          });
      },
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
          const url = `${this.baseUrl}/${this.id}/`;
          console.log('Sending parameters:', parametros);
          axios.patch(url, parametros)
            .then(response => {
              console.log('Update response:', response);
              show_alerta('Proyecto Actualizado', 'success');
            })
            .catch(error => {
              console.error('Error en la solicitud:', error);
              if (error.response && error.response.status === 500) {
                show_alerta('Error del servidor al actualizar el proyecto. Verifica los datos y vuelve a intentar.', 'error');
              } else {
                show_alerta('Error al actualizar el proyecto. Intenta nuevamente más tarde.', 'error');
              }
            });
        }
      }
    }
  }
  </script>
  