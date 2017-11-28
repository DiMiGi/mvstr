
angular.module('movistar')

  .controller('AgendamientoTomarNumeroController', function ($ionicPopup, $location, $scope, $rootScope, $ionicPlatform, geo, sucursal, motivo, aloha) {

    $scope.motivosAtencion = [];
    $scope.usandoGeolocalizacion = true;

    $scope.motivoAtencionSeleccionado = {
      motivo: null
    };
    $scope.sucursalElegida = {
      sucursal: null
    };
    $scope.todosDatos = {};

    $scope.readyAction= false;

    // En esta variable se cargan las regiones, con sus comunas y sucursales, para poder escoger manualmente
    $scope.regiones = null;

    $scope.actionButton = function () {
      if (($scope.motivoAtencionSeleccionado.motivo!= null) && ($scope.sucursalElegida.sucursal!= null)){
        return true;
      }
      return false;
    }


    $scope.tomaDeNumero = function () {

      hora.tomarNumero(obtenerTodoFormulario(), function (data) {

        var alertPopup = $ionicPopup.alert({
          title: "Número tomado",
          template: data.msg
        });

        $location.path('/agendamiento');

      }, function () {
        $scope.agendado = false;
      });

    }


    function obtenerTodoFormulario() {

      let motivo = $scope.motivosAtencion.find(x => x.id == +$scope.motivoAtencionSeleccionado.motivo);

      return {
        sucursal: $scope.sucursalElegida.sucursal,
        motivo: motivo
      };
    }


    // Reiniciar valores cada vez que se entre a la página
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.motivoAtencionSeleccionado.motivo = null;
      $scope.sucursalElegida.sucursal = null;
    });


    $scope.verMapa = function (sucursal) {
      geo.abrirMapa({
        latitud: sucursal.latitude,
        longitud: sucursal.longitude
      });
    }


    /*
    * Cambia a la pestana de geolocalizacion. Si el argumento
    * es verdadero, se redirecciona a la pestana de 'busqueda manual'
    * en caso que la geolocalizacion falle.
    */
    $scope.usarGeo = function (redireccionar) {
      $scope.usandoGeolocalizacion = true;

      // Para evitar errores raros, desmarco la sucursal elegida
      $scope.sucursalElegida.sucursal = null;

      $scope.obtenerSucursalesSugeridas(function (exito) {
        if (!exito && redireccionar)
          $scope.usarManual();
      });
    }


    $scope.usarManual = function () {
      $scope.usandoGeolocalizacion = false;

      // Para evitar errores raros, desmarco la sucursal elegida
      $scope.sucursalElegida.sucursal = null;

      // Si aun no se han obtenido las regiones, obtenerlas.
      if ($scope.regiones == null) {
        sucursal.obtenerRegionCiudadSucursal(function (regiones) {
          $scope.regiones = regiones;
        });
      }
    }


    /*
    * Obtiene sucursales sugeridas, se le pasa true o false al
    * callback en caso que se pueda o no pueda obtener sucursales cercanas.
    */
    $scope.obtenerSucursalesSugeridas = function (callback) {

      if (typeof callback !== "function") callback = () => {
      }; // Funcion lambda vacia

      $scope.geoEstado = "OBTENIENDO";

      geo.obtenerPosicion({timeout: 10000}, function (pos) {

        if (!pos) {
          $scope.geoEstado = "FALLO";
          callback(false);
          return;
        }
        sucursal.encontrarSucursalesCercanas(3, 100, pos, function (sucursales) {

          if (sucursales && sucursales.length > 0) {
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


    motivo.obtenerMotivosAtencion(function (motivos) {
      $scope.motivosAtencion = motivos;
    });

    $scope.usarGeo(true);


    $scope.confirmation = function (){
      $ionicPopup.show({
        //templateUrl: 'popup-template.html',
        title: '¿Confirma toma de número?',
        scope: $scope,
        buttons: [
          { text: 'Volver', onTap: function(e) { return false; } },
          {
            text: '<b>Si</b>',
            type: 'button-positive',
            onTap: function(e) {
              $scope.accionTomaNumero($scope.sucursalElegida.sucursal.address);
            }
          },
        ]
      }).then(function(numero) {

      });
    }

    $scope.accionTomaNumero = function(sucursal){
      var response = aloha.tomarNumero("fecha", "cac", "idRemoto", "idProceso");
      $scope.showAlert(sucursal, response);
      $location.path('/agendamiento');
    }

    // Mensaje Finalización Encuesta
    $scope.showAlert = function (sucursal, response) {

      //var mensaje= "Tu número para la sucursal " + sucursal + "para el día de hoy es: " + response.module + "en el módulo" + response.module;
      var mensaje= "Tu número para la sucursal " + sucursal + " para el día de hoy es: " + "001" + " en el módulo " + "A";

      var alertPopup = $ionicPopup.alert({
        title: 'Numero Obtenido',
        template: mensaje
      });
    };

  });
