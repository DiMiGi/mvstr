// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('movistar', ['ionic', 'ngCordova', 'ionic-datepicker'])

.run(function($ionicPlatform, $state) {


  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }

    // Esto es para que cuando se reciba una notificacion y se haga clic en ella,
    // se redireccione a la vista para ver la hora agendada.
    try {
      // Lo pongo dentro de un try & catch porque en modo PC no funciona.
      cordova.plugins.notification.local.on("click", function (id, state, json) {
        $state.go("agendamiento_ver_hora_agendada");
      });
    } catch(e){

    }


    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
   $stateProvider

   /* App base */
   .state('index', { url: '/', templateUrl: 'home.html', controller: 'IndexCtrl'})

   /* Vistas para la toma de numeros y agenda */
   .state('agendamiento', { url: '/agendamiento', templateUrl: 'templates/agendamiento/home.html', controller: "AgendamientoHomeController" })
   .state('agendamiento_tomar_agenda', { url: '/agendamiento/agenda', templateUrl: 'templates/agendamiento/tomar_agenda.html', controller: "AgendamientoTomarAgendaController" })
   .state('agendamiento_tomar_numero', { url: '/agendamiento/numero', templateUrl: 'templates/agendamiento/tomar_numero.html', controller: "AgendamientoTomarNumeroController" })
   .state('agendamiento_ver_hora_agendada', { url: '/agendamiento/agenda/ver_hora', templateUrl: 'templates/agendamiento/ver_hora_agendada.html', controller: "AgendamientoVerHoraAgendadaController" });

   $urlRouterProvider.otherwise('/');
});


angular.module('movistar')
.filter('horaFormato', function() {

  function cero(n){
    if(n < 10) return "0"+n;
    return n;
  }

  return function(input) {

    let hh = Math.floor(input/60);
    let mm = input%60;

    hh = cero(hh);
    mm = cero(mm);

    return `${hh}:${mm}`;
  };
})

.filter('dosCeros', function() {
  return function(input) {
    return input < 10? "0"+input : input;
  };
});
