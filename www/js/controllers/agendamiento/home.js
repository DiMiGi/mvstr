angular.module('movistar')

.controller('AgendamientoHomeController', function($scope, hora, $timeout, $ionicPopup) {

  $scope.$on('$ionicView.beforeEnter', function(){

    $scope.tieneHoraAgendada = 'OBTENIENDO';
    hora.tieneHoraAgendada(function(tiene){
      $scope.tieneHoraAgendada = tiene;
    });

  });

});
