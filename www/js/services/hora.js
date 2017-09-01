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



  function eliminarHora(callback){
    var err = null;

    // Probando la demora
    setTimeout(function(){ callback(err); }, 1000);

  }



  function tieneHoraAgendada(callback){
    callback(true);

  }

  return { obtenerHoraAgendada, tieneHoraAgendada, eliminarHora };
 });
