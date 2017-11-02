angular.module('movistar')

.factory('motivo', function(geo, $http) {

  let urlBase = "http://localhost:3000";

  function obtenerMotivosAtencion(callback){

    var lista = [];

    $http.get(`${urlBase}/api/attention_types`)
    .then(function(response) {
      var data = response.data;
      callback(response.data);
    });
  }

  return { obtenerMotivosAtencion };
 });
