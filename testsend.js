var productName = "nom du produit"
var specifications = [{"name":"name1","value":"value1"},{"name":"name2","value":"value2"}];
var sessionId = "16/01/2017 00:42";

var data = []
data.push(productName)
data.push(specifications)
data.push(sessionId)
console.log(data)



var XHR = new XMLHttpRequest();


// We define what will happen if the data are successfully sent
XHR.addEventListener('load', function(event) {
	alert('Data sent and response loaded.');
});

// We define what will happen in case of error
XHR.addEventListener('error', function(event) {
	alert('Something went wrong.');
});

// We setup our request
XHR.open('POST', 'http://localhost:8080');

XHR.setRequestHeader("Content-Type", "text/xml");
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4) {
            if (XHR.status == 200) {
				var dataResponse = XHR.responseText;
				var jsonResponse = JSON.parse(dataResponse);
				console.log(jsonResponse);
            }
        }
    };

// We just send our FormData object, HTTP headers are set automatically
var dataSend = JSON.stringify({data});
XHR.send(dataSend);
