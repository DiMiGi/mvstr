angular.module('movistar').controller('IndexCtrl', function($scope, login, $cordovaLocalNotification) {
  $scope.currentUser = null;
  $scope.form = { clientId: "" };
  $scope.login = function(){
    var id = $scope.form.client_id;
    var nombres = $scope.form.client_names;
    var correo = $scope.form.client_email;
    login.login(id,nombres,correo);
    $scope.currentUser = login.client_id;
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
