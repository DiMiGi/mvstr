angular.module('movistar')

.controller('AgendamientoVerHoraAgendadaController', function($scope, hora, geo, $interval) {

  console.log("Controlador ver hora agendada");

  $scope.horaAgendada = null;

  $scope.verMapa = function(){
    geo.abrirMapa($scope.horaAgendada.sucursal.posicion);
  }


  hora.obtenerHoraAgendada(function(hora){

    if(!hora){
      // Error, deberia volver al inicio de la aplicacion.
    }

    $scope.horaAgendada = hora;
  });

});
