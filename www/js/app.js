// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('movistar', ['ionic'])

.run(function($ionicPlatform) {
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
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
   $stateProvider

   /* App base */
   .state('index', { url: '/', templateUrl: 'home.html'})

   /* Vistas para la toma de numeros y agenda */
   .state('agendamiento', { url: '/agendamiento', templateUrl: 'templates/agendamiento/home.html', controller: "AgendamientoHomeController" })
   .state('agendamiento_agenda', { url: '/agendamiento/agenda', templateUrl: 'templates/agendamiento/agenda.html', controller: "AgendamientoAgendaController" })
   .state('agendamiento_numero', { url: '/agendamiento/numero', templateUrl: 'templates/agendamiento/numero.html', controller: "AgendamientoNumeroController" });

   $urlRouterProvider.otherwise('/');
});
