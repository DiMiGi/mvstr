angular.module('movistar')

.factory('geo', function($cordovaGeolocation) {

  var o = {};

  /*
  * Abre el mapa usando el mapa por defecto en el dispositivo
  *
  */
  o.abrirMapa = function(pos){

    console.log(pos);

    if(!pos.hasOwnProperty("longitud") || !pos.hasOwnProperty("latitud")){
      throw new Error("Para abrir un mapa, la posición debe contener 'longitud' y 'latitud'.");
    }

    var geoString = '';

    if(ionic.Platform.isIOS()) {
      geoString = 'maps://?q='+pos.latitud+','+pos.longitud+'';
    }
    else if(ionic.Platform.isAndroid()) {
      geoString = 'geo://?q='+pos.latitud+','+pos.longitud+'';
    } else {
      geoString = `https://www.google.com/maps/search/?api=1&query=${pos.latitud},${pos.longitud}`;
    }
    window.open(geoString, '_system');
  }


  /*
  * Obtiene la posicion usando la geolocalizacion del dispositivo
  *
  */
  o.obtenerPosicion = function(opciones, callback){

    $cordovaGeolocation.getCurrentPosition(opciones).then(function(position){

      callback({

        latitud: position.coords.latitude,
        longitud: position.coords.longitude

      });

    }, function(error){
      callback(null);
    });
  }

  return o;

 });
