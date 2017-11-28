angular.module('movistar')

  .factory('aloha',function() {

    function getNumber (fecha, cac, idRemoto, idProceso, aCallback) {

      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
          aCallback(httpRequest.responseText);
      }

      var urlBase = "http://192.168.10.11:8080/webapp/citasFactory?";

      theUrl = urlBase + "fechaSolicitada=" + fecha + "&codigoCac=" + cac
        + "&idRemoto=" + idRemoto + "&tipoCreador=APP&idProceso=" + idProceso;

      httpRequest.open("GET", theUrl, true); // true for asynchronous
      httpRequest.send(null);
    }

    function  tomarNumero(fecha, cac, idRemoto, idProceso, successCallback, errorCallback) {
      getNumber(fecha, cac, idRemoto, idProceso, function (err, nuberTicket) {
        if (!err) {
          successCallback(nuberTicket);
        } else {
          errorCallback(err);
        }
      });
    }



    return { tomarNumero};
  });


