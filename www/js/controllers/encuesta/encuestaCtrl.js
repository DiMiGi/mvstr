angular.module('movistar')

  .controller('encuestaCtrl', function ($scope, $rootScope, $ionicPopup, $timeout, $location, opinat) {

    //console.log("Controlador encuesta");

    $scope.preguntas = 8;

    $scope.slide = 1;
    $scope.answers = [];
    $scope.rangeValue = 3;
    $scope.textValue = "";
    $scope.buttonName = "Siguiente";
    $scope.buttonAvailability = false;


    // Al cargar la página se cargan valores iniciales y vacían posibles respuestas
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.slide = 1;
      $scope.answers = [];
      $scope.rangeValue = 3;
      $scope.textValue = "";
      $scope.buttonName = "Siguiente";
      $scope.buttonAvailability = false;
    });


    $scope.enableBtn = function () {
      $scope.buttonAvailability = true;
    }


    $scope.addAnswer = function () {

      // Almacenar Pregunta
      if($scope.slide < $scope.preguntas){
        $scope.answers[$scope.slide -1] = $scope.rangeValue;
      }else if($scope.slide == $scope.preguntas){
        $scope.answers[$scope.slide -1] = $scope.textValue;
      }

      // Pasar a la siguiente pregunta
      if($scope.slide < $scope.preguntas){

        $scope.buttonAvailability = false;
        $scope.rangeValue = 3;
        $scope.slide++;

        if (($scope.slide +1) == $scope.preguntas) {
          $scope.buttonName = "Finalizar";
        }
      //finalizar encuesta
      }else if($scope.slide == $scope.preguntas){
        $scope.enviarEvaluacion();
        $scope.showAlert();
        $location.path('/agendamiento');
      }

    }


    // Mensaje Finalización Encuesta
    $scope.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Encuesta finalizada',
        template: 'Gracias por compartir tu opinión con nosotros'
      });
    };


    $scope.enviarEvaluacion = function () {

      var poll = [
        {
          wave_id: 1,
          "internal_code": "EFA01",
          "email": "mailuser1@mail.es",
          "lang": "es",
          "name": "Pedro L\u00f3pez",
          "field01": "Campo 1",
          "internal_data_field": "Datos\\nvarios\\n",
          "email_notif_1": "email@mail.es",
          "answers": {
            "1": "2",
            "2": "1,2",
            "4": "Comentario desde soap"
          }
        }
      ];

      //opinat.session();
      opinat.soap();

      /*
      opinat.soapClient(
        function (client) {
          console.log(client);

          try {
            var first = new client.apiLogin("tlfc", "tlfc123");
            alert(JSON.stringify(first));

            console.log(first);

          } catch (e) {
            console.error(e);
          }
        }
      );
      */
    }

  });
