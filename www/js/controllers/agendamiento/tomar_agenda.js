angular.module('movistar')

.controller('AgendamientoTomarAgendaController', function($scope, geo, ionicDatePicker, sucursal, motivo) {

  $scope.motivosAtencion = [];
  $scope.usandoGeolocalizacion = true;


  // Cuando el usuario abre la vista de agenda por primera vez, y la geolocalizacion
  // ha fallado, la idea es redireccionar al usuario a la vista de busqueda manual.
  // Sin embargo, si el usuario decide el mismo ir a la vista de busqueda por geolocalizacion,
  // y vuelve a fallar, la idea es que ya no se redireccione. Para eso sirve esta bandera.
  var usuarioEligioMetodoBusqueda = false;

  $scope.sucursalElegida = {
    sucursal: null
  };

  $scope.fechaSeleccionada = null;

  var hoy = new Date();
  var proxMes = new Date();
  proxMes.setMonth(proxMes.getMonth() + 1);

  var calendar = {
      callback: function (val) {
        $scope.fechaSeleccionada = val;
      },
      from: hoy,
      inputDate: proxMes,
      mondayFirst: true,
      setLabel: 'Elegir',
      closeLabel: 'Cancelar',
      todayLabel: 'Hoy',
      weeksList: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sa"],
      monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"],
      closeOnSelect: false,
      templateType: 'modal'
    };


  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(calendar);
  };


  $scope.verMapa = function(sucursal){
    geo.abrirMapa(sucursal.posicion);
  }

  $scope.usarGeo = function(){
    $scope.usandoGeolocalizacion = true;
    usuarioEligioMetodoBusqueda = true;
  }

  $scope.usarManual = function(){
    $scope.usandoGeolocalizacion = false;
    usuarioEligioMetodoBusqueda = true;
  }


  $scope.obtenerSucursalesSugeridas = function(){

    $scope.geoEstado = "OBTENIENDO";

    geo.obtenerPosicion({ timeout: 10000 }, function(pos){

      if(!pos){
        $scope.geoEstado = "FALLO";

        if(!usuarioEligioMetodoBusqueda){
          $scope.usarManual();
        }

        return;
      }

      sucursal.encontrarSucursalesCercanas(3, 100, pos, function(sucursales){

        if(sucursales && sucursales.length > 0){
          $scope.geoEstado = "EXITO";
          $scope.sucursalesCercanas = sucursales;
          $scope.sucursalElegida.sucursal = sucursales[0];
        } else {
          $scope.geoEstado = "NO_HAY_SUCURSALES_CERCANAS";
          $scope.sucursalesCercanas = [];

          if(!usuarioEligioMetodoBusqueda){
            $scope.usarManual();
          }

        }
      });

    });
  }



  motivo.obtenerMotivosAtencion(function(motivos){

    $scope.motivosAtencion = motivos;

  });

  $scope.obtenerSucursalesSugeridas();



});
