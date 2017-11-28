angular.module('movistar')

  .factory('opinat',function() {

    /*
    function soap() {
      var symbol = "MSFT";
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST", "http://www.webservicex.net/stockquote.asmx?op=GetQuote",true);
      xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4) {
          alert(xmlhttp.responseText);
          // http://www.terracoder.com convert XML to JSON
          var json = XMLObjectifier.xmlToJSON(xmlhttp.responseXML);
          var result = json.Body[0].GetQuoteResponse[0].GetQuoteResult[0].Text;
          // Result text is escaped XML string, convert string to XML object then convert to JSON object
          json = XMLObjectifier.xmlToJSON(XMLObjectifier.textToXML(result));
          alert(symbol + ' Stock Quote: $' + json.Stock[0].Last[0].Text);
        }
      }
      xmlhttp.setRequestHeader("SOAPAction", "http://www.webserviceX.NET/GetQuote");
      xmlhttp.setRequestHeader("Content-Type", "text/xml");
      var xml =

      '<soapenv:Envelope'+
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'+
      'xmlns:xsd="http://www.w3.org/2001/XMLSchema"'+
      'xmlns:soapenv="https://cors-anywhere.herokuapp.com/http://schemas.xmlsoap.org/soap/envelope/"'+
      'xmlns:urn="urn:ApiSoapControllerwsdl">\n' +
      '   <soapenv:Header/>\n' +
      '   <soapenv:Body>\n' +
      '      <urn:apiLogin soapenv:encodingStyle="https://cors-anywhere.herokuapp.com/http://schemas.xmlsoap.org/soap/encoding/">\n' +
      '         <username xsi:type="xsd:string">tlfc</username>\n' +
      '         <password xsi:type="xsd:string">tlfc123</password>\n' +
      '      </urn:apiLogin>\n' +
      '   </soapenv:Body>\n' +
      '</soapenv:Envelope>';

      xmlhttp.send(xml);
    }
    */


    function soap(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'https://cors-anywhere.herokuapp.com/https://bo.opinat.com/index.php?r=apiSoap/ws', true);

        // build SOAP request
        var sr =
          '<soapenv:Envelope'+
          'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'+
          'xmlns:xsd="http://www.w3.org/2001/XMLSchema"'+
          'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'+
          'xmlns:urn="urn:ApiSoapControllerwsdl">\n' +
          '   <soapenv:Header/>\n' +
          '   <soapenv:Body>\n' +
          '      <urn:apiLogin soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">\n' +
          '         <username xsi:type="xsd:string">tlfc</username>\n' +
          '         <password xsi:type="xsd:string">tlfc123</password>\n' +
          '      </urn:apiLogin>\n' +
          '   </soapenv:Body>\n' +
          '</soapenv:Envelope>';

        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              alert('done. use firebug/console to see network response');
              alert(xmlhttp.responseText); console.log(xmlhttp.responseText);
            }
          }
        }

        // Send the POST request
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(sr);
      console.log(xmlhttp.responseText);

      // send request
    }


    function soapClient( successCallback, errorCallback){
      tinysoap.createClient("https://cors-anywhere.herokuapp.com/https://bo.opinat.com/index.php?r=apiSoap/ws", function(err, client) {
        if (!err)
        {
          successCallback(client);
        }else{
          errorCallback(err);
        }
      });
    }

    function session() {

      soapClient(
        function (client){
          console.log(client)

          //var key = client.apiLogin("tlfc", "tlfc123");
          var key = client.apiTestWithoutLogin("tlfc");

          console.log(key);
        }
      );

    }


    return { session , soap};
  });


