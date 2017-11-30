angular.module('movistar')

.controller('AgendamientoTomarAgendaController', function($ionicPopup, $location, $scope, $rootScope, $ionicPlatform, geo, ionicDatePicker, sucursal, motivo, hora, $cordovaLocalNotification) {

  $scope.motivosAtencion = [];
  $scope.usandoGeolocalizacion = true;
  $scope.motivoAtencionSeleccionado = {
    motivo: null
  };


  $scope.horasPosibles = [
    {
      hh: 8,
      mm: [0, 15, 45]
    },
    {
      hh: 10,
      mm: [15, 30]
    }
  ];

  $scope.tiempoElegido = {
    horaElegida: {},
    minutoElegido: null
  };

  $scope.ubicacion = {}

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

  $scope.atras = function(){
    $scope.paso--;
  }

  $scope.siguiente = function(){

    if(datosValidos($scope.paso)){
      $scope.paso++;
    }

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

    if($scope.paso == 5){
      $scope.todosDatos = obtenerTodoFormulario();
    }
  }

  $scope.agendando = false;
  $scope.agendar = function(){

    $scope.agendando = true;

    hora.agendarHora(obtenerTodoFormulario(), function(data){

      $scope.agendando = false;

      console.log("Cuando se agenda, esto viene del Backend:");
      console.log(data);

      try {
        $cordovaLocalNotification.schedule(data.notifications).then(function(){ });
      } catch(e){
        console.log("No se pudo planificar notificaciones, probablemente debido a que en PC no funciona.");
        console.log(e);
      }

      var alertPopup = $ionicPopup.alert({
       title: "Hora agendada",
       template: data.msg
     });

      $location.path('/agendamiento');

    }, function(){
      $scope.agendado = false;

      popUpAlert("La hora ya ha sido tomada");

      $scope.agendando = false;

    });

  }

  function popUpAlert(mensaje){
    $ionicPopup.alert({
      title: mensaje
    });
  }

  function datosValidos(paso){
    switch (paso) {
      /* SELECCION DE MOTIVO DE ATENCIÓN */
      case 1:
        if($scope.motivoAtencionSeleccionado.motivo === null){
          popUpAlert("Seleccione el motivo de atención");
          return false;
        }
        return true;
        break;
      /* SELECCION DEL DIA DE ATENCIÓN */
      case 2:
        if($scope.fechaSeleccionada === null){
          popUpAlert("Seleccione el dia de atención");
          return false;
        }
        return true;
        break;
      /* SELECCION DE REGION, COMUNA Y SUCURSAL */
      case 3:
        if($scope.sucursalElegida.sucursal === null){
          popUpAlert("Asegurese de seleccionar región, comuna y sucursal a la que desea agendar una hora");
          return false;
        }
        if( $scope.sucursalElegida.sucursal.full_address === undefined & $scope.sucursalElegida.sucursal.address !== null){
          $scope.sucursalElegida.sucursal.full_address = $scope.sucursalElegida.sucursal.address + ", " + $scope.ubicacion.comunaSeleccionada.comuna + ", " + $scope.ubicacion.regionSeleccionada.region;
        }
        return true;
        break;
      /* SELECCION DE HORA DE AGENDA */
      case 4:
        if($scope.tiempoElegido.horaElegida === null || $scope.tiempoElegido.minutoElegido === null){
          popUpAlert("Asegurese de seleccionar minuto y hora en la que desea agendar la cita");
          return false;
        }
        return true;
        break;
      default:
        return false;
    }
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
      hora: $scope.tiempoElegido.horaElegida.hh,
      minutos: $scope.tiempoElegido.minutoElegido
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
