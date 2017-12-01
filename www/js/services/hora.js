angular.module('movistar')

.factory('hora', function(geo, $http, login) {

  let urlBase = "http://localhost:3000";

  function obtenerHoraAgendada(callback){
    $http.get(`${urlBase}/api/appointments/current?client_id=${login.client_id}`).then(function(response){
      callback(response.data);
    });
  }


  function eliminarHora(callback){
    $http.delete(`${urlBase}/api/appointments/cancel?client_id=${login.client_id}`).then(callback);
  }

  function confirmarHora(callback){
    $http.post(`${urlBase}/api/appointments/confirm_appointment?client_id=${login.client_id}`).then(callback);
  }

  function agendarHora(params, callback, errorCallback){

    let url = `${urlBase}/api/appointments/schedule_appointment`;

    // Esta linea no deberia estar en la aplicacion real:
    //url += `?client_id=${login.client_id}`;

    let p = {
      client: login,
      hour: params.hora,
      minutes: params.minutos,
      yyyy: params.yyyy,
      mm: params.mm,
      dd: params.dd,
      attention_type_id: params.motivo.id,
      branch_office_id: params.sucursal.id
    };

    $http.post(url, p).then(function(response){
      if(response.status == 200){
        callback(response.data);
      } else {
        errorCallback(response.data.error);
      }
    });

  }


  function obtenerHorasLibres(params, callback){
    let url = `${urlBase}/api/appointments/${params.yyyy}/${params.mm}/${params.dd}/branch_office/${params.branch_office_id}/attention_type/${params.attention_type_id}`;

    // Esta linea no deberia estar en la aplicacion real:
    url += `?client_id=${login.client_id}`;

    console.log(url);

    $http.get(url).then(function(response){
      callback(response.data.times);
    });
  }

  function tieneHoraAgendada(callback){
    obtenerHoraAgendada(function(h){
      callback(h.hasOwnProperty("time"));
    });
  }

  return { obtenerHoraAgendada, tieneHoraAgendada, eliminarHora, obtenerHorasLibres, agendarHora };
 });
