angular.module('movistar').controller('IndexCtrl', function($scope, login, $cordovaLocalNotification) {
  $scope.currentUser = null;
  $scope.form = { clientId: "" };
  $scope.login = function(){
    var id = +$scope.form.clientId;
    login.login(id);
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
