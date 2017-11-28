angular.module('movistar')

.controller('AgendamientoVerHoraAgendadaController', function($scope, hora, geo, $timeout, $state, $ionicPopup, $cordovaLocalNotification) {

  console.log("Controlador ver hora agendada");


  $scope.confirmable = false;
  $scope.polling = null;

  $scope.confirmada = false;

  // Si la diferencia con el tiempo actual y con la hora agendada es menor a este valor,
  // aparecera un boton para confirmar la hora, y ademas se hara con geolocalizacion.
  $scope.minutosAntesDeConfirmar = 20;

  // Este es el tiempo (en minutos) que hay entre cada intento de verificar si la
  // posicion del usuario esta lo suficientemente cerca de la sucursal
  $scope.minutosPolling = 3;


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


  // Esta funcion inicia un polling cada ciertos minutos para ver si
  // la persona se encuentra cerca de la sucursal
  function geoPolling(){

    $scope.polling = $timeout(function(){

      geo.obtenerPosicion({ timeout: 10000 }, function(pos){

        // Se obtuvo la posicion, ahora hay que ver si esta cercana
        // a la sucursal
        console.log("La posicion obtenida por GPS es:")
        console.log(pos.latitud)
        console.log(pos.longitud)
        console.log("Y la posicion de la sucursal es: ")
        console.log($scope.horaAgendada.executive.branch_office.latitude)
        console.log($scope.horaAgendada.executive.branch_office.longitude)
      });

    }, $scope.minutosPolling * 60 * 1000);
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

      let ahora = (new Date()).getTime();
      let cita = (new Date(hora.time)).getTime();
      let diferenciaMinutos = ((cita - ahora)/1000)/60;

      // Si "diferenciaMinutos" es menor al valor indicado, hacer que
      // la cita sea confirmable.
      if(diferenciaMinutos < $scope.minutosAntesDeConfirmar){
        $scope.confirmable = true;
        geoPolling();
      }

      $scope.horaAgendada = hora;
      $scope.estado = 'EXITO';
    });

  });

});
