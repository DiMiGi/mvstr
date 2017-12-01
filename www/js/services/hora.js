angular.module('movistar')

.factory('hora', function(geo, $http, login) {

  let urlBase = "http://localhost:3000";

  function obtenerHoraAgendada(callback){
    $http.get(`${urlBase}/api/appointments/current?client[client_id]=${login.clientId}`).then(function(response){
      callback(response.data);
    });
  }


  function eliminarHora(callback){
    $http.delete(`${urlBase}/api/appointments/cancel?client[client_id]=${login.clientId}`).then(callback);
  }

  function confirmarHora(callback){
    $http.post(`${urlBase}/api/appointments/confirm_appointment?client[client_id]=${login.clientId}`).then(callback);
  }

  function agendarHora(params, callback, errorCallback){

    let url = `${urlBase}/api/appointments/schedule_appointment`;

    // Esta linea no deberia estar en la aplicacion real:
    //url += `?client_id=${login.clientId}`;

    let p = {
      cliente: login,
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
    url += `?client[client_id]=${login.clientId}`;

    console.log(url);

    $http.get(url).then(function(response){

      let minutesArray = response.data.times;

      let hourMap = {};

      for(let i=0; i<minutesArray.length; i++){
        let h = Math.floor(minutesArray[i]/60);
        let m = minutesArray[i] % 60;
        if(!hourMap.hasOwnProperty(h)){
          hourMap[h] = [];
        }
        hourMap[h].push(m);
      }

      let formattedResult = [];

      for(let key in hourMap){
        formattedResult.push({
          hh: key,
          mm: hourMap[key]
        });
      }

      callback(formattedResult);
    });
  }

  function tieneHoraAgendada(callback){
    obtenerHoraAgendada(function(h){
      callback(h.hasOwnProperty("time"));
    });
  }

  return { obtenerHoraAgendada, tieneHoraAgendada, eliminarHora, obtenerHorasLibres, agendarHora };
 });
