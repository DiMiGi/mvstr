angular.module('movistar')

.controller('AgendamientoVerHoraAgendadaController', function($scope, hora, geo, $state, $ionicPopup) {

  console.log("Controlador ver hora agendada");


  $scope.verMapa = function(){
    geo.abrirMapa($scope.horaAgendada.sucursal.posicion);
  }

  $scope.eliminarMiHora = function(){

    var confirm = $ionicPopup.confirm({
       title: '¿Desea realmente eliminar?',
       template: 'Si elimina su hora, no puede deshacer esta acción.',
       cancelText: 'Cancelar',
       okText: 'Eliminar'
     });

    confirm.then(function(res) {
      if(res){
        $scope.estado = 'ELIMINANDO';
        hora.eliminarHora(function(){
          $state.go("agendamiento");
        });
      }
    });
  }



  $scope.$on('$ionicView.beforeEnter', function(){

    // Esto es para volver a cargar cada vez que se entra a esta vista.
    // (Porque a veces hay que modificar el ciclo de vida de las vistas
    // de la manera como uno quiere)

    $scope.horaAgendada = null;

    $scope.estado = 'OBTENIENDO';

    hora.obtenerHoraAgendada(function(hora){

      if(!hora){
        // Error, deberia volver al inicio de la aplicacion.
        $state.go("agendamiento");
      }

      $scope.horaAgendada = hora;
      $scope.estado = 'EXITO';
    });

  });

});
