angular.module('movistar')

.factory('login', function() {

  var o = {};

  o.clientId = null;
  o.clientNames = null;
  o.clientEmail = null;

  o.login = function(id,nombres,email){
    o.clientId = id;
    o.clientNames = nombres;
    o.clientEmail = email;
  }

  return o;

 });
