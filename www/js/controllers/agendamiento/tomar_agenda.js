angular.module('movistar')

.controller('AgendamientoTomarAgendaController', function($scope, geo, ionicDatePicker, sucursal, motivo) {

  $scope.motivosAtencion = [];
  $scope.usandoGeolocalizacion = true;

  // En esta variable se cargan las regiones, con sus comunas y sucursales,
  // para poder escoger manualmente
  $scope.regiones = null;


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




  /*
  * Cambia a la pestana de geolocalizacion. Si el argumento
  * es verdadero, se redirecciona a la pestana de 'busqueda manual'
  * en caso que la geolocalizacion falle.
  *
  */
  $scope.usarGeo = function(redireccionar){
    $scope.usandoGeolocalizacion = true;

    // Para evitar errores raros, desmarco la sucursal elegida
    $scope.sucursalElegida.sucursal = null;

    $scope.obtenerSucursalesSugeridas(function(exito){
      if(!exito && redireccionar)
        $scope.usarManual();
    });
  }

  $scope.usarManual = function(){
    $scope.usandoGeolocalizacion = false;

    // Para evitar errores raros, desmarco la sucursal elegida
    $scope.sucursalElegida.sucursal = null;

    // Si aun no se han obtenido las regiones, obtenerlas.
    if($scope.regiones == null){
      sucursal.obtenerRegionCiudadSucursal(function(regiones){
        $scope.regiones = regiones;
      });
    }
  }



  /*
  * Obtiene sucursales sugeridas, se le pasa true o false al
  * callback en caso que se pueda o no pueda obtener sucursales cercanas.
  *
  */
  $scope.obtenerSucursalesSugeridas = function(callback){

    if(typeof callback !== "function") callback = () => {}; // Funcion lambda vacia

    $scope.geoEstado = "OBTENIENDO";

    geo.obtenerPosicion({ timeout: 10000 }, function(pos){

      if(!pos){
        $scope.geoEstado = "FALLO";
        callback(false);
        return;
      }

      sucursal.encontrarSucursalesCercanas(3, 100, pos, function(sucursales){

        if(sucursales && sucursales.length > 0){
          $scope.geoEstado = "EXITO";
          $scope.sucursalesCercanas = sucursales;
          $scope.sucursalElegida.sucursal = sucursales[0];
          callback(true);
        } else {
          $scope.geoEstado = "NO_HAY_SUCURSALES_CERCANAS";
          $scope.sucursalesCercanas = [];
          callback(false);
        }
      });
    });
  }



  motivo.obtenerMotivosAtencion(function(motivos){

    $scope.motivosAtencion = motivos;

  });

  $scope.usarGeo(true);


});
