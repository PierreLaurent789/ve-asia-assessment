var productName = {"productName" : "nom du produit"}
var specifications = {"specifications" :[{"name":"name1","value":"value1"},{"name":"name2","value":"value2"},{"name":"name3","value":"value3"}]};
var sessionId = {"sessionID": "16/01/2017 00:42"};

var specifications2 = [{"name":"name1","value":"value1"},{"name":"name2","value":"value2"},{"name":"name3","value":"value3"}];
var specLength = Object.keys(specifications2).length

console.log(specLength)

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
				
				var productNameCap = recoverProductName(jsonResponse)
				var specificationsCap = recoverSpecifications(jsonResponse, specLength)
				var sessionIdCap = recoverSessionId(jsonResponse)
            }
        }
    };

// We just send our FormData object, HTTP headers are set automatically
var dataSend = JSON.stringify({data});
XHR.send(dataSend);


function recoverDataFromServ(data){
	console.log(data)
	console.log(data.DATA[0].PRODUCTNAME);
	var productNameCap = data.DATA[0].PRODUCTNAME

	var specificationArray = [] 
	for (var i = 0; i<this.specLength; i++) {
		var specificationElements = {name:data.DATA[1].SPECIFICATIONS[i].NAME, value: data.DATA[1].SPECIFICATIONS[i].VALUE}
		specificationArray.push(specificationElements); 
	};
	console.log(specificationArray);

	var sessionId = data.DATA[2].SESSIONID
	console.log(sessionId);
}
function recoverProductName(data){
	var productNameCap = data.DATA[0].PRODUCTNAME
	console.log(productNameCap);
	return productNameCap;
}

function recoverSpecifications(data, specLength){
	var specificationArray = [] 

	for (var i = 0; i<specLength; i++) {
		var specificationElements = {name:data.DATA[1].SPECIFICATIONS[i].NAME, value: data.DATA[1].SPECIFICATIONS[i].VALUE}
		specificationArray.push(specificationElements); 
	};
	console.log(specificationArray);
	return specificationArray;
}

function recoverSessionId(data){
	var sessionId = data.DATA[2].SESSIONID
	console.log(sessionId);
	return sessionId;
}