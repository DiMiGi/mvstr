angular.module('movistar')

.factory('login', function() {

  var o = {};

  o.clientId = null;

  o.login = function(id){
    o.clientId = id;
  }

  return o;

 });
