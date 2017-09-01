angular.module('movistar')

.controller('AgendamientoVerHoraAgendadaController', function($scope, hora, geo, $state, $ionicPopup) {

  console.log("Controlador ver hora agendada");

  $scope.horaAgendada = null;
  $scope.eliminandoHora = false;

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
        $scope.eliminandoHora = true;
        hora.eliminarHora(function(){
          $state.go("agendamiento");
        });
      }
    });
  }


  hora.obtenerHoraAgendada(function(hora){

    if(!hora){
      // Error, deberia volver al inicio de la aplicacion.
      $state.go("agendamiento");
    }

    $scope.horaAgendada = hora;
  });

});
