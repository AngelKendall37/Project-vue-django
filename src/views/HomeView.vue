<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2 mt-5">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Tecnologia</th>
              <th>Fecha creacion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">
            <tr v-for="(projec, i) in projects" :key="projec.id">
              <td>{{ (i + 1) }}</td>
              <td>{{ projec.title }}</td>
              <td>{{ projec.description }}</td>
              <td>{{ projec.tecnology }}</td>
              <td>{{ projec.created_at }}</td>
              <td>
                  <router-link :to="{ path: 'edit/' + projec.id }" class="btn btn-warning">
                      <i class="fa-solid fa-edit"></i>
                  </router-link> &nbsp;
                  <button class="btn btn-danger" @click="eliminar(projec.id, projec.title)">
                      <i class="fa-solid fa-trash"></i>
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { confirmar } from '../funciones';

export default {
  data() {
    return {
      projects: null,
      error: null
    };
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    getProjects() {
      axios.get('http://127.0.0.1:8000/api/projects/')
        .then(response => {
          this.projects = response.data;
        })
        .catch(error => {
          console.error('Se ha producido un error', error);
          this.error = error;
        });
    },
    eliminar(id, title) {
      confirmar(id, title, this.getProjects); // Pasamos getProjects para actualizar la lista después de eliminar
    }
  }
};
</script>
