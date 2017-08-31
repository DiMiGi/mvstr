angular.module('movistar')

.factory('geo', function($cordovaGeolocation) {

  var o = {};

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
