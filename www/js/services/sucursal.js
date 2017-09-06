angular.module('movistar')

.factory('sucursal', function(geo, $timeout) {

  // Esta funcion obtiene un mapa con las regiones, con las comunas anidadas,
  // y con las sucursales anidadas.
  function obtenerRegionCiudadSucursal(callback){


    var ohiggins = {
      region: "Region VI O'higgins",
      comunas: [
        {
          comuna: "Rancagua",
          sucursales: [
            {
              id: 10,
              direccion: "Campos #123"
            },
            {
              id: 11,
              direccion: "Miguel Ramirez #123"
            },
            {
              id: 12,
              direccion: "Carretera del cobre #123"
            }
          ]
        },
        {
          comuna: "San Fernando",
          sucursales: [
            {
              id: 13,
              direccion: "Calle principal de San Fernando #123"
            }
          ]
        }
      ]
    };

    var metropolitana = {
      region: "Region metropolitana",
      comunas: [
        {
          comuna: "Providencia",
          sucursales: [
            {
              id: 14,
              direccion: "Calle providencia 1 #123"
            },
            {
              id: 15,
              direccion: "Calle providencia 2 #123"
            },
            {
              id: 16,
              direccion: "Calle providencia 3 #123"
            }
          ]
        }
      ]
    };



    var sucursales = [ohiggins, metropolitana];



    $timeout(function(){
      callback(sucursales);
    }, 3000);


  }



  function encontrarSucursalesCercanas(cuantas, distanciaMaxima, posicion, callback){

    // distanciaMaxima hay que tener cuidado porque las distancias aca son por coordenadas.

    var costanera = { id: 1, direccion: "Costanera Center #123, Estacion Central, Santiago de Chile", posicion: { latitud: -33.417758, longitud: -70.6063115 } };
    var usach = { id: 3, direccion: "Departamento de Ingenieria informatica, USACH #123, Estacion Central, Santiago de Chile", posicion: { latitud: -33.4497562, longitud: -70.6871716 } };
    var bancoParis = { id: 2, direccion: "Banco Paris #123, Estacion Central, Santiago de Chile", posicion: { latitud: -33.4221537, longitud: -70.6084995 } };
    var caupolican = { id: 4, direccion: "Teatro Caupolican #123, Estacion Central, Santiago de Chile", posicion: { latitud: -33.4561991, longitud: -70.6493315 } };
    var corto = { id:9, direccion: "Aqui", posicion: { latitud: -33.4561991, longitud: -70.6493315 } };

    var lista = [costanera, bancoParis, caupolican, corto, usach];

    // Obtener la distancia desde la persona hasta la sucursal
    // para ordenarlas por distancia.
    for(i=0; i<lista.length; i++){
      var sucPos = lista[i].posicion;
      var dist = Math.sqrt(Math.pow(posicion.latitud - sucPos.latitud, 2) + Math.pow(posicion.longitud - sucPos.longitud, 2));
      lista[i].distancia = dist;
    }

    lista.sort(function(a, b){ return a.distancia - b.distancia });
    lista.splice(cuantas);


    $timeout(function(){
      callback(lista);
    }, 1500);

  }


  return { encontrarSucursalesCercanas, obtenerRegionCiudadSucursal };
 });
