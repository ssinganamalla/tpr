var navigate = {
	
	//public
	init : function(max, prev, next, callback) {
		this.value = 0;
		this.max = max;
		this.callback = callback;
		
		
		prev.onclick = navigate.prev;
		next.onclick = navigate.next;
	},

	//public
	reset: function(max) {
		this.max = max;
		this.value = 0;
		this.update();
	},
	
	//public
	getValue : function() {
		return navigate.value;
	},
		
	next : function() {
		navigate.value = Math.min(navigate.max-1, ++navigate.value);
		navigate.update();
		return false;
	},
	
	prev : function() {
		navigate.value = Math.max(0, --navigate.value);
		navigate.update();
		return false;
	},
	
	
	update : function() {
		navigate.callback();
		if(navigate.value == 0) {
			//this.prevAnchor.setAttribute("disabled", true);
			com.fa.utils.log("info", "prev disabled");
		} else {
			//this.prevAnchor.setAttribute("disabled", false);
		}
		
		if(navigate.value == navigate.max-1) {
			com.fa.utils.log("info", "next disabled");
			//this.nextAnchor.setAttribute("disabled", true);
		} else {
			//this.nextAnchor.setAttribute("disabled", false);
		}
		
		
		com.fa.utils.log("info", "update called value is " + navigate.value);
	}
		
}



var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

function getInnerText(elem) {
	switch (BrowserDetect.browser) {
	case "Explorer":
		return com.fa.Utils.trim(elem.innerText);

	case "Firefox":
	case "Chrome":
	default:
		return com.fa.Utils.trim(elem.textContent);
	}
}

function setFilter(elem, val /* 0 <=val <= 1 */) {
	var ieVal = val*100;
	switch (BrowserDetect.browser) {
	case "Explorer":
		elem.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + ieVal + ")";

	case "Firefox":
	case "Chrome":
	default:
		return elem.style.opacity = val;
	}

	
}

function setCssFloat(elem, attrValue) {
	switch (BrowserDetect.browser) {
	case "Explorer":
		elem.style.styleFloat = attrValue;
		break;

	case "Firefox":
	case "Chrome":
	default:
		elem.style.cssFloat = attrValue;
		break;
	}

}