/*
* PierreLaurent dev Start
* */

///////////////MAIN//////////////////////

var x, inputList = document.getElementsByTagName("input"); //we get all the inputs in a list and scroll it with the x
for(x in inputList) {
    if (inputList[x].value =="Order") {		//test if the value ofthe input is Order, corresponding to the button
        
        inputList[x].addEventListener('click',processOrderOnClick, false);
    }
}



function processOrderOnClick(){
	// Product Name
	var productName = getProductName();

	//Specification
	var specifications = getSpecifications();
	var specLength = Object.keys(specifications).length //using the length to read the JSON object returning from the server
	var specificationsTitled = {"specifications" :specifications}; //adding "specifications" to the JSON to identify the elements of the JSON object returning from the server

	//Session ID
	var sessionIdEncoded = document.getElementById('session_id').value;
	var sessionId = decodeSessionId(sessionIdEncoded);

	//pushing all of it in a dataToSend object
	var dataToSend = []
	dataToSend.push(productName)
	dataToSend.push(specifications)
	dataToSend.push(sessionId)

	/////////////////////////
	//Starting XHR httprequest
	////////////

	var XHR = new XMLHttpRequest();
	//Alert if the data are successfully sent
	XHR.addEventListener('load', function(event) {
		alert('Data sent and response loaded.');
	});
	///Alert in case of error
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
					var dataJsonResponse = JSON.parse(dataResponse); //parsing the JSON

					//recovering the 3 objects from the JSON returning from server
					var productNameCap = recoverProductName(dataJsonResponse)
					var specificationsCap = recoverSpecifications(dataJsonResponse, specLength)
					var sessionIdCap = recoverSessionId(dataJsonResponse)

					//printing the data in the grey textarea
					printData(productNameCap, specificationsCap, sessionId);
	            }
	        }
	    };

	// We stringify and send the dataToSend object, HTTP headers are set automatically
	var dataSendStr = JSON.stringify({dataToSend});
	XHR.send(dataSendStr);

};


///////////////functions//////////////////////

//function get the name of the product from the first h4 of the body in the DOM
function getProductName(){
	var xpathToProductName = '//body/h4'		//xpath to the h4 elements
	var nodeProductNameXPath =  document.evaluate(xpathToProductName, document, null, XPathResult.ANY_TYPE, null );
	var nodeProductName = nodeProductNameXPath.iterateNext();  		//need to iterate once on the node to be able to use .textContent  
	var product = {"productName" : nodeProductName.textContent}; //adding the "productName" so we can identify it in the data we'll recover back from the server
	return product;
}

//function that get the name and value elements from the td's of the first table in the first div 
function getSpecifications(){
	
	var specificationsArray = []  	//we gather the captured elements in this array

	var xpathToSpecElements = '//body/div[1]/table/tbody/tr'		//xpath to the tr of the first table
	var trNodesXPath = document.evaluate(xpathToSpecElements, document, null, XPathResult.ANY_TYPE, null);
	var trNodes = trNodesXPath.iterateNext();

	var loopCount = 1 ;
	while (trNodes){	//loop while there tr found in the table
		// We first captur the Name element of the specification
		var xpathTdName = '//body/div[1]/table/tbody/tr['+loopCount+']/td[1]'	//loopcount keep trac of the current tr so we can identify the td
		var tdNameXPath =  document.evaluate(xpathTdName, document, null, XPathResult.ANY_TYPE, null);
		var tdName = tdNameXPath.iterateNext();	
		var tdNameText = tdName.textContent;

		// captur the Value element of the specification
		var xpathTdValue = '//body/div[1]/table/tbody/tr['+loopCount+']/td[2]'
		var tdValueXPath =  document.evaluate(xpathTdValue, document, null, XPathResult.ANY_TYPE, null);
		var tdValue = tdValueXPath.iterateNext();
		var tdValueText = tdValue.textContent;

		var specificationTd = {name:tdNameText, value: tdValueText} // constructing the JSON from the captured name and value

	    specificationsArray.push(specificationTd); //add the current tr element to our specificationArray

	    loopCount++;
	    trNodes = trNodesXPath.iterateNext(); // iterate to the next tr
	}
	return specificationsArray;
}


// function to decode the session id and format the result as: "MM/DD/YYYY HH:MM"
function decodeSessionId(sessionIdRaw) {
	var sessionString = sessionIdRaw.toString()
	var sessionStringDate = sessionString.substr(0,10)
	var sessionDate = Date(Number(sessionStringDate)*1000)
	var sessionIdDate = new Date(sessionDate)
	var sessionId = formatDate(sessionIdDate);
	return sessionId;
}
// add a zero when  hours or min is <10
function addZero(i) { 
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function formatDate(date) {
	var day = addZero(date.getDate());
	var month = addZero(date.getMonth());
	var year = date.getFullYear();
	var hours = addZero(date.getHours());
	var min = addZero(date.getMinutes());

	return day + '/' + month + '/' + year + ' ' + hours + ':' + min;
}


// //capitalise the elements of the specifications object
// function capitalizeSpec(specifications){
// 	var specificationsCap = specifications;
// 	for (var i=0; i<specifications.length; i++){
// 		specificationsCap[i].name = specifications[i].name.toString().toUpperCase();
// 		specificationsCap[i].value = specifications[i].value.toString().toUpperCase();
// 	}
// 	return specificationsCap;
// }


// we're retrieving tha data object and need to decode it, I simply looked at the structure ofwhat i was receiving from the server
function recoverProductName(data){
	var productNameCap = data.DATATOSEND[0].PRODUCTNAME
	return productNameCap;
}

function recoverSpecifications(data, specLength){
	var specificationArray = [] 

	for (var i = 0; i<specLength; i++) {
		var specificationElements = {name:data.DATATOSEND[1][i].NAME, value: data.DATATOSEND[1][i].VALUE}
		specificationArray.push(specificationElements); 
	};
	return specificationArray;
}

function recoverSessionId(data){
	var sessionId = data.DATATOSEND[2].SESSIONID
	return sessionId;
}

//print the data in the textarea
function printData(productNameCap, specificationsCap, sessionID){
	var dataToPrint ='Order Processed :' + '\n' + productNameCap + '\n';

	for (var i=0; i<specificationsCap.length; i++){
		dataToPrint +='  ' + specificationsCap[i].name + ":" + specificationsCap[i].value + '\n'
	}
	dataToPrint+= sessionID;

	document.getElementsByTagName("textarea")[0].innerHTML = dataToPrint;
}


/*
* PierreLaurent dev End
* */