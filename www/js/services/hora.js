angular.module('movistar')

.factory('hora', function(geo, $timeout) {

  function obtenerHoraAgendada(callback){

    var hora = {
      id: 23,
      fecha: new Date(),
      sucursal: {
        id: 3,
        direccion: "Departamento de Ingenieria informatica, USACH #123, Estacion Central, Santiago de Chile",
        posicion: { latitud: -33.4497562, longitud: -70.6871716 }
      },
      motivo: "Falla tecnica"
    }


    $timeout(function(){
      callback(null);
    }, 2000);

  }



  function eliminarHora(callback){
    var err = null;

    // Probando la demora
    $timeout(function(){
      callback(err);
    }, 1800);

  }



  function tieneHoraAgendada(callback){

    $timeout(function(){
      callback(false);
    }, 1500);
  }

  return { obtenerHoraAgendada, tieneHoraAgendada, eliminarHora };
 });
