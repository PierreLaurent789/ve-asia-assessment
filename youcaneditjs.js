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
	productNameCap = productName.toString().toUpperCase();

	//Specification
	var specifications = getSpecifications();
	console.log(specifications)
	var specificationsCap = capitalizeSpec(specifications);

	//Session ID
	var sessionIdEncoded = document.getElementById('session_id').value;
	var sessionId = decodeSessionId(sessionIdEncoded);

	//printing the data
	printData(productNameCap, specificationsCap, sessionId);
};



///////////////functions//////////////////////

//function get eh nam of the product from the first h4 of the body in the DOM
function getProductName(){
	var xpathToProductName = '//body/h4'		//xpath to the h4 elements
	var nodeProductNameXPath =  document.evaluate(xpathToProductName, document, null, XPathResult.ANY_TYPE, null );
	var nodeProductName = nodeProductNameXPath.iterateNext();  		//need to iterate once on the node to be able to use .textContent  
	var product = nodeProductName.textContent;
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

//capitalise the elements of the specifications object
function capitalizeSpec(specifications){
	var specificationsCap = specifications;
	for (var i=0; i<specifications.length; i++){
		specificationsCap[i].name = specifications[i].name.toString().toUpperCase();
		specificationsCap[i].value = specifications[i].value.toString().toUpperCase();
	}
	return specificationsCap;
}

//print the data in the textarea
function printData(productNameCap, specificationsCap, sessionID){
	var dataToPrint ='Order Processed :' + '\n' +
		productNameCap + '\n';

	for (var i=0; i<specificationsCap.length; i++){
		dataToPrint +='  ' + specificationsCap[i].name + ":" + specificationsCap[i].value + '\n'
	}
	dataToPrint+= sessionID;

	document.getElementsByTagName("textarea")[0].innerHTML = dataToPrint;
}


/*
* PierreLaurent dev End
* */