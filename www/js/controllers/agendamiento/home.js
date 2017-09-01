angular.module('movistar')

.controller('AgendamientoHomeController', function($scope, hora) {

  console.log("Controlador Home");

  hora.tieneHoraAgendada(function(tiene){
    $scope.tieneHoraAgendada = tiene;
  });




});
