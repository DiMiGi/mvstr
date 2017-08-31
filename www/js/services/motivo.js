angular.module('movistar')

.factory('motivo', function(geo) {

  function obtenerMotivosAtencion(callback){

    var lista = [];

    lista.push({ id: 1, titulo: "Falla tecnica", minutosAtencion: 15 });
    lista.push({ id: 2, titulo: "Seguridad", minutosAtencion: 30 });
    lista.push({ id: 3, titulo: "Contratar servicio", minutosAtencion: 45 });
    lista.push({ id: 4, titulo: "Otro motivo", minutosAtencion: 30 });
    lista.push({ id: 5, titulo: "Y otro motivo mas", minutosAtencion: 60 });

    callback(lista);
  }

  return { obtenerMotivosAtencion };
 });
