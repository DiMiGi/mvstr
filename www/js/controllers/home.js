angular.module('movistar').controller('IndexCtrl', function($scope, login) {
  $scope.currentUser = null;
  $scope.form = { clientId: "" };
  $scope.login = function(){
    var id = +$scope.form.clientId;
    login.login(id);
    $scope.currentUser = login.clientId;
  }
});
