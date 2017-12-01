angular.module('movistar').controller('IndexCtrl', function($scope, login, $cordovaLocalNotification) {
  $scope.currentUser = null;
  $scope.form = { clientId: "" };
  $scope.login = function(){
    var id = $scope.form.clientId;
    var nombres = $scope.form.clientNames;
    var correo = $scope.form.clientEmail;
    login.login(id,nombres,correo);
    $scope.currentUser = login.clientId;
  }


  $scope.notifEjemplo = function(){
    var now = new Date().getTime();
    var _5SecondsFromNow = new Date(now + 5 * 1000);

    $cordovaLocalNotification.schedule({
      id: _5SecondsFromNow.getTime(),
      title: 'Texto ejemplo',
      text: 'Contenido ejemplo',
      at: _5SecondsFromNow
    }).then(function (result) {
      // ...
    });
  }

});
