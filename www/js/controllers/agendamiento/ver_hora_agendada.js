angular.module('movistar')

.controller('AgendamientoVerHoraAgendadaController', function($scope, hora, geo, $timeout, $state, $ionicPopup, $cordovaLocalNotification, ionicDatePicker) {

  console.log("Controlador ver hora agendada");


  $scope.confirmable = false;
  $scope.polling = null;

  $scope.confirmada = false;

  $scope.reagendando = false;
  $scope.fechaSeleccionada = null;
  $scope.paso = 1;
  $scope.tiempoElegido = {
    horaElegida: {},
    minutoElegido: null
  };

  // Si la diferencia con el tiempo actual y con la hora agendada es menor a este valor,
  // aparecera un boton para confirmar la hora, y ademas se hara con geolocalizacion.
  $scope.minutosAntesDeConfirmar = 20;

  // Este es el tiempo (en minutos) que hay entre cada intento de verificar si la
  // posicion del usuario esta lo suficientemente cerca de la sucursal
  $scope.minutosPolling = 3;

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

  $scope.verMapa = function(){
    geo.abrirMapa({
      latitud: $scope.horaAgendada.executive.branch_office.latitude,
      longitud: $scope.horaAgendada.executive.branch_office.longitude
    });
  }

  $scope.cancelar = function(){
    $scope.reagendando = false;
  }

  $scope.atras = function(){
    $scope.paso--;
  }

  $scope.siguiente = function(){
    if($scope.fechaSeleccionada !== null){
      $scope.paso++;
    }else {
      popUpAlert("Seleccione la fecha a reagendar.");
    }

    if($scope.paso == 2){

      agenda_time = new Date($scope.fechaSeleccionada);

      params = {
        yyyy: agenda_time.getFullYear(),
        mm: agenda_time.getMonth()+1,
        dd: agenda_time.getDate(),
        branch_office_id: $scope.horaAgendada.executive.branch_office_id,
        attention_type_id: $scope.horaAgendada.executive.attention_type_id
      };

      hora.obtenerHorasLibres(params, function(res){
        $scope.tiemposLibres = res;
      });
    }

    if($scope.paso == 3){
      if($scope.tiempoElegido.horaElegida !== null && $scope.tiempoElegido.minutoElegido !== null){
        $scope.paso = 1;
        $scope.reagendarMiHora(params.dd,params.mm,params.yyyy,$scope.tiempoElegido.horaElegida,$scope.tiempoElegido.minutoElegido);
      }else{
        $scope.paso--;
        popUpAlert("Ingrese la a que hora quiere reagendar la cita");
      }
    }
  }

  function popUpAlert(mensaje){
    $ionicPopup.alert({
      title: mensaje
    });
  }

  $scope.reagendandoMiHora = function(){
    $scope.reagendando = true;
  }

  $scope.reagendarMiHora = function(day,month,year,hours,minutes){
    console.log(hours);
    console.log(minutes);
      if(parseInt(minutes/10) === 0){
        minutes = '0'+minutes;
      }
      var confirm = $ionicPopup.confirm({
         title: '¿Esta seguro de reagendar su hora para el '+day+'/'+month+'/'+year+' a las '+hours.hh+':'+minutes+'?',
         template: 'Si reagenda su hora, no puede deshacer esta acción.',
         cancelText: 'Cancelar',
         okText: 'Reagendar'
       });

      confirm.then(function(res) {
        if(res){
          // Reagenda
          /*try {
            $cordovaLocalNotification.cancellAll().then(function(){ });
          } catch(e){
            console.log("No se pudo eliminar notificaciones. En PC no funciona.");
            console.log(e);
          }*/

          params = {
            yyyy: agenda_time.getFullYear(),
            mm: agenda_time.getMonth()+1,
            dd: agenda_time.getDate(),
            hora: $scope.tiempoElegido.horaElegida.hh,
            minutos: $scope.tiempoElegido.minutoElegido
          };

          $scope.estado = 'REAGENDANDO';
          hora.reagendarHora(params,function(data){
            $scope.reagendando = false;
            $scope.paso = 1;
            popUpAlert("Su hora ha sido reagendada");
            $state.go("agendamiento");
          });
        }
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
