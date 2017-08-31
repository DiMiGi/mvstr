angular.module('movistar')

.controller('AgendamientoTomarAgendaController', function($scope, geo, ionicDatePicker, sucursal, motivo) {

  $scope.motivosAtencion = [];

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


  $scope.obtenerSucursalesSugeridas = function(){

    $scope.geoEstado = "OBTENIENDO";

    geo.obtenerPosicion({ timeout: 10000 }, function(pos){

      if(!pos){
        $scope.geoEstado = "FALLO";
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
        }
      });

    });
  }



  motivo.obtenerMotivosAtencion(function(motivos){

    $scope.motivosAtencion = motivos;

  });

  $scope.obtenerSucursalesSugeridas();

/*
  $scope.onezoneDatepicker = {
    date: new Date(),
    mondayFirst: true,
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
    daysOfTheWeek: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sa"],
    startDate: new Date(),
    //endDate: endDate,
    disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
    showDatepicker: true,
    showTodayButton: false,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    callback: function(value){
      $scope.fechaSeleccionada = value;
    }
  };*/

/*
console.log($scope.onezoneDatepicker)
*/

/*
  $scope.mesAnio = function(date){

    var mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return mes[date.getMonth()] + " " + date.getFullYear();
  }
*/




});
