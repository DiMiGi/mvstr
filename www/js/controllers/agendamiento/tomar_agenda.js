angular.module('movistar')

.controller('AgendamientoTomarAgendaController', function($scope, geo, ionicDatePicker) {



  $scope.geoMessage = "";

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
      setLabel: '<i class="icon ion-checkmark"></i>',
      closeLabel: '<i class="icon ion-close"></i>',
      todayLabel: 'Hoy',
      //disableWeekdays: [0],
      weeksList: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sa"],
      monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"],
      closeOnSelect: false,
      templateType: 'popup'
    };
    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(calendar);
    };


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

  geo.obtenerPosicion({ timeout: 10000 }, function(pos){

    if(pos){
      $scope.geoMessage = "Geo: " + pos.latitud + ", " + pos.longitud;
    } else {
      $scope.geoMessage = "No se pudo obtener geolocalizacion.";
    }

  });


});
