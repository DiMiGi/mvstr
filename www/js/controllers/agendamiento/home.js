angular.module('movistar')

.controller('AgendamientoHomeController', function($scope, hora) {

  $scope.$on('$ionicView.beforeEnter', function(){

    $scope.tieneHoraAgendada = 'OBTENIENDO';
    hora.tieneHoraAgendada(function(tiene){
      $scope.tieneHoraAgendada = tiene;
    });

  });

});
