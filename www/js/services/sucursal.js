angular.module('movistar')

.factory('sucursal', function(geo) {

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

    lista.sort(function(a, b){return a.distancia - b.distancia});
    lista.splice(cuantas);
    callback(lista);
  }


  return { encontrarSucursalesCercanas };
 });
