angular.module('movistar')

.controller('AgendamientoTomarAgendaController', function($ionicPopup, $location, $scope, $rootScope, $ionicPlatform, geo, ionicDatePicker, sucursal, motivo, hora) {

  $scope.motivosAtencion = [];
  $scope.usandoGeolocalizacion = true;
  $scope.motivoAtencionSeleccionado = {
    motivo: null
  };

  $scope.paso = 1;

  // En esta variable se cargan las regiones, con sus comunas y sucursales,
  // para poder escoger manualmente
  $scope.regiones = null;

  $scope.tiemposLibres = null;

  $scope.sucursalElegida = {
    sucursal: null
  };

  $scope.fechaSeleccionada = null;

  $scope.horaSeleccionada = null;

  $scope.todosDatos = {};

  $scope.siguiente = function(){
    $scope.paso++;

    if($scope.paso == 4){

      // Cuando llega al paso 4 del formulario (seleccionar hora)
      // se hace la consulta para saber cuales horas disponibles hay.

      let datos = obtenerTodoFormulario();

      let params = {
        yyyy: datos.yyyy,
        mm: datos.mm,
        dd: datos.dd,
        branch_office_id: datos.sucursal.id,
        attention_type_id: datos.motivo.id
      };

      hora.obtenerHorasLibres(params, function(res){
        $scope.tiemposLibres = res;
      });
    }
  }

  $scope.agendando = false;
  $scope.agendar = function(){

    $scope.agendando = true;
    hora.agendarHora(obtenerTodoFormulario(), function(data){

      $scope.agendando = false;

      var alertPopup = $ionicPopup.alert({
       title: "Hora agendada",
       template: data.msg
     });

      $location.path('/agendamiento');

    }, function(){ $scope.agendado = false; });

  }

  $scope.seleccionarHora = function(hora){
    $scope.horaSeleccionada = hora;
    $scope.todosDatos = obtenerTodoFormulario();
    $scope.siguiente();
  }

  function obtenerTodoFormulario(){

    let motivo = $scope.motivosAtencion.find(x => x.id == +$scope.motivoAtencionSeleccionado.motivo);

    let date = new Date($scope.fechaSeleccionada);

    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();

    return {
      sucursal: $scope.sucursalElegida.sucursal,
      motivo: motivo,
      yyyy, mm, dd,
      hora: Math.floor($scope.horaSeleccionada/60),
      minutos: $scope.horaSeleccionada%60,
      horaSeleccionada: $scope.horaSeleccionada
    };
  }

  // Esto es para que cuando entre a la vista, el formulario empiece desde
  // el primer paso.
  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.paso = 1;
    $scope.agendando = false;
  });


  var manana = new Date();
  var semanaDespues = new Date();
  manana.setDate(manana.getDate() + 1);
  semanaDespues.setDate(semanaDespues.getDate() + 7);

  var calendar = {
      callback: function (val) {
        $scope.fechaSeleccionada = val;
      },
      from: manana,
      to: semanaDespues,
      inputDate: manana,
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
    geo.abrirMapa({
      latitud: sucursal.latitude,
      longitud: sucursal.longitude
    });
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
