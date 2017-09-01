angular.module('movistar')

.factory('hora', function(geo) {

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

    callback(hora);
  }




  function tieneHoraAgendada(callback){
    callback(false);

  }

  return { obtenerHoraAgendada, tieneHoraAgendada };
 });
