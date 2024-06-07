import Swal from "sweetalert2";
import axios from "axios";

export function show_alerta(mensaje, icono, foco = '') {
  if (foco !== '') {
    document.getElementById(foco).focus();
  }
  Swal.fire({
    title: mensaje,
    icon: icono,
    customClass: {
      confirmButton: 'btn btn-primary',
      popup: 'animated zoomIn'
    },
    buttonsStyling: false
  });
}

export function confirmar(id, title, callback) {
  var url = 'http://127.0.0.1:8000/api/projects/' + id;
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success me-3',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: '¿Seguro de eliminar el proyecto ' + title + '?',
    text: 'Se perderá la información del proyecto',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '<i class="fa-solid fa-check"></i> Sí, eliminar',
    cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      enviarSolicitud('DELETE', {}, url, 'Proyecto eliminado con éxito')
        .then(() => {
          if (callback) callback();
        })
        .catch(error => {
          console.error('Error eliminando el proyecto:', error);
        });
    } else {
      show_alerta('Operación cancelada', 'info');
    }
  });
}

export function enviarSolicitud(metodo, parametros, url, mensaje) {
  return axios({
    method: metodo,
    url: url,
    data: parametros
  })
    .then(function (respuesta) {
      var status = respuesta.status;
      if (status === 200 || status === 201 || status === 204) {  // Manejar correctamente los códigos de éxito
        show_alerta(mensaje, 'success');
        window.setTimeout(function () {
          window.location.href = '/';
        }, 1000);
      } else {
        var listado = '';
        var errores = respuesta.data.errors || respuesta.data;
        if (typeof errores === 'object') {
          Object.keys(errores).forEach(
            key => listado += errores[key][0] + '.'
          );
        } else {
          listado = errores;
        }
        show_alerta(listado, 'error');
      }
    })
    .catch(function (error) {
      let mensajeError = 'Error en la solicitud';
      if (error.response && error.response.data) {
        mensajeError = error.response.data.message || mensajeError;
      }
      show_alerta(mensajeError, 'error');
      console.error('Error en la solicitud:', error);
    });
}