angular.module('movistar')

.factory('login', function() {

  var o = {};

  o.client_id = null;
  o.client_names = null;
  o.client_email = null;

  o.login = function(id,nombres,email){
    o.client_id = id;
    o.client_names = nombres;
    o.client_email = email;
  }

  return o;

 });
