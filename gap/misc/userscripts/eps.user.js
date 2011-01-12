function createEarningsDate(pfTable, earningsDataMapArray) {
	var j = 0, i=0;
	var headerToIndexMap = [];
	var numberOfHeaders = 0;
	var theads = pfTable.getElementsByTagName("thead");
	var trs = null;
	if(theads[0]){
		trs = theads[0].getElementsByTagName("tr");
		var ths = trs[0].getElementsByTagName("th");
		numberOfHeaders = ths.length;
		for(j=0; j<ths.length; j++) {
			headerToIndexMap[j] = ths[j].textContent;
		}
	}
	
	var tbodys = pfTable.getElementsByTagName("tbody");
	var earningsDataMap = [];
	
	for(i=0; i<tbodys.length; i++) {
		trs = tbodys[i].getElementsByTagName("tr");
		var tds = trs[0].getElementsByTagName("td");
		if(numberOfHeaders !== tds.length) {
			console.log('table numberOfHeaders: ' + numberOfHeaders + 'not equal to tds '+ tds.length );
		} else {
			for(j=0; j<tds.length; j++) {
				earningsDataMap[headerToIndexMap[j]] = tds[j].textContent;
			}
			earningsDataMapArray.push(earningsDataMap);
		}
	}
}

function epsMap {
	
	return {
		'Date/Time (ET)' : 'dt',
		'Period' : 'pd',
		'EPS Estimate' : 'est',
		'EPS Actual' : 'act'
	};
	
}

// All your GM code must be inside this function
function letsJQuery() {
	var i = 0, j=0;
	
	var earningsDiv = document.getElementById("NEXTEARNINGSDATE");
	if(!earningsDiv) {
		console.log("NEXTEARNINGSDATE is missing");
	}
	var tables = earningsDiv.getElementsByTagName("table");
	var pfTables = [];
	for(i=0; i< tables.length; i++) {
		var table = tables[i];
		var className = table.getAttribute("class");
		if("pf_data" === className) {
			pfTables.push(table);
		}
	}
	
	if(pfTables.length !== 2) {
		console.log('the number of tables in inside #NEXTEARNINGSDATE with pf_data changed and is not 2');
	}
	var earningsDataMapArray = [];
	for(i=0; i<pfTables.length; i++){
		if(i===0) {
			console.log('Upcoming earnings');
			createEarningsDate(pfTables[i], earningsDataMapArray);
		} else if(i===1) {
			console.log('Previous earnings');
			createEarningsDate(pfTables[i], earningsDataMapArray);
		}
	}
	console.log("earningsDataMapArray length" + earningsDataMapArray.length);
	for(i=0; i<earningsDataMapArray.length; i++) {
		var json = earningsDataMapArray[i];
		console.log(earningsDataMapArray[i]);
		for(id in json) {
			console.log(id);
		}
	}
}





function main() {
	var earningsDiv = document.getElementById("NEXTEARNINGSDATE");
	var button = document.createElement("button");
	//button.src = /*enter your button image url here */;
	button.style.cursor = "pointer";
	button.appendChild(document.createTextNode('eps'));
	button.addEventListener("click", function(e) { letsJQuery(); }, false);
	
	earningsDiv.parentNode.insertBefore(button, earningsDiv);
	
}

main();