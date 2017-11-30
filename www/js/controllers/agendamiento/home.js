angular.module('movistar')

.controller('AgendamientoHomeController', function($scope, hora, $timeout, $ionicPopup) {

  $scope.$on('$ionicView.beforeEnter', function(){

    $scope.tieneHoraAgendada = 'OBTENIENDO';
    hora.tieneHoraAgendada(function(tiene){
      $scope.tieneHoraAgendada = tiene;
    });

    document.getElementById("headerTexto").textContent="Bienvenido";
    $('#headerIcon').hide();
  });

  $scope.$on('$ionicView.beforeLeave', function(){
    document.getElementById("headerTexto").textContent="Volver a inicio";
    $('#headerIcon').show();
    });

});
