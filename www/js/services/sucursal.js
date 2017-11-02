angular.module('movistar')

.factory('sucursal', function(geo, $http) {

  let urlBase = "http://localhost:3000";

  // Esta funcion obtiene un mapa con las regiones, con las comunas anidadas,
  // y con las sucursales anidadas.
  function obtenerRegionCiudadSucursal(callback){

    $http.get(`${urlBase}/api/regions/comunas/branch_offices`)
    .then(function(response) {
      var data = response.data;
      var sucursales = [];

      // Esto es para cambiar el formato de los datos.
      for(i in data){

        var region = {
          region: i,
          comunas: []
        };

        var comunas = data[i];
        for(j in comunas){
          var comuna = {
            comuna: j,
            sucursales: comunas[j]
          };
          region.comunas.push(comuna);
        }
        sucursales.push(region);
      }

      callback(sucursales);

    });
  }



  function encontrarSucursalesCercanas(cuantas, distanciaMaxima, posicion, callback){
    $http.get(`${urlBase}/api/branch_offices/nearest?latitude=${posicion.latitud}&longitude=${posicion.longitud}`)
    .then(function(response) {
      callback(response.data)
    });
  }


  return { encontrarSucursalesCercanas, obtenerRegionCiudadSucursal };
 });
