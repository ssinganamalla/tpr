HTTP.newRequest = function() {
	if(typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	}
	
	var xmlHttp = false;
	try {
	  xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
	  try {
	    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	  } catch (e2) {
	    xmlHttp = false;
	  }
	}

	if(!xmlHttp) {
		throw new Error("XMLHttpRequest not supported");
	}
	
	return xmlHttp;
}

HTTP.getText = function(url, callback, errorHandler) {
	var request = HTTP.newRequest();
	request.onreadystatechange = function() {
		if(request.readyState == 4) { 
			if(request.status == 200) {
				callback(request.responseText);
			}else {
				if(errorHandler) errorHandler();
			}
		}
	}
	request.open("GET", url);//async call
	request.send(null);
}


HTTP.encode = function(value) {
	var regex = /%20/g; //regex to match an encoded space
	return encodeURIComponent(value).replace(regex, '+');
}
