angular.module('movistar')

.controller('AgendamientoVerHoraAgendadaController', function($scope, hora, geo, $state, $ionicPopup, $cordovaLocalNotification) {

  console.log("Controlador ver hora agendada");


  $scope.verMapa = function(){
    geo.abrirMapa({
      latitud: $scope.horaAgendada.executive.branch_office.latitude,
      longitud: $scope.horaAgendada.executive.branch_office.longitude
    });
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
        // Eliminar todas las notificaciones que habian sido planificadas
        // para recordarle al usuario.
        try {
          $cordovaLocalNotification.cancellAll().then(function(){ });
        } catch(e){
          console.log("No se pudo eliminar notificaciones. En PC no funciona.");
          console.log(e);
        }

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
