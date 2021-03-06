$DEBUG = true;
com.fa.utils.Dom = (function() {
	var Dom = {};
	
	Dom.getChild = function(elem, id) {
		if(!elem) return null;
		var children = elem.childNodes;
		if(!children) return null;
		
		for(var i=0 ;i<children.length; i++) {
			if(id == children[i].getAttribute("id")) {
				return children[i];
			}
		}
		return null;
	}
	
	Dom.getX = function(element) {
		var elem = element;  
		var sum = 0;
		while(elem) {
			sum = sum + elem.offsetLeft;
			elem = elem.offsetParent;
		}
		return sum;
	}
	
	Dom.getY = function(element) {
		var elem = element;  
		var sum = 0;
		while(elem) {
			sum = sum + elem.offsetTop;
			elem = elem.offsetParent;
		}
		return sum;
	}
	
	Dom.getElementsByTagNameAndAtt = function(elem, tag, att, attVal) {
		var elems = elem.getElementsByTagName(tag);
		if(!elems) return null;
		
		var runningElems = new Array();
		for(var i=0; i<elems.length; i++) {
			if(attVal == elems[i].getAttribute(att)) {
				runningElems.push(elems[i]);
			}
		}
		return runningElems;
	}
	
	Dom.getFirstElementByTagNameAndAtt = function(elem, tag, att, attVal) {
		var elems = Dom.getElementsByTagNameAndAtt(elem, tag, att, attVal);
		if(!elems) return null;
		return elems[0];
	}
	
	Dom.getElementsByClassName = function(elem, tag, className) {
		var elems = elem.getElementsByTagName(tag);
		if(!elems) return null;
		
		var runningElems = new Array();
		for(var i=0; i<elems.length; i++) {
			if(className == elems[i].getAttribute("class") || className == elems[i].className) {
				runningElems.push(elems[i]);
			}
		}
		return runningElems;
	}
	Dom.getFirstElementByClassName = function(elem, tag, className) {
		var elems = Dom.getElementsByClassName(elem, tag, className);
		if(!elems) return null;
		return elems[0];
	}
	
	
	//return the first child's attribute value containing the attribute
	Dom.getChildAttVal = function(elem, tag, att) {
		var elems = elem.getElementsByTagName(tag);
		if(!elems) return null;
		
		for(var i=0; i<elems.length; i++) {
			if(elems[i].getAttribute(att)) {
				return elems[i].getAttribute(att);
			}
		}
		return null;
	}
	
	Dom.removeChildren = function(elem) {
		if(!elem) return;
		
		var first = elem.childNodes[0];
		while(first != null) {
			elem.removeChild(first);
			first = elem.childNodes[0];
		}
	}
	
	Dom.creatTextSpan = function(text, className) {
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(text));
		if(className) {
			span.className = className;
		}
		return span;
	}
	
	Dom.preventDefault = function(event) {
		if(!event) return;
		
		if(event.preventDefault) { 
			event.preventDefault();
		}else {
			event.returnValue = false;
		}
		
	}
	
	Dom.addMouseOverListener = function(elem, callback) {
		if(elem.addMouseOverListener) {
			elem.addEventListener("mouseover", callback, false);
		} else {
			elem.onmouseover = callback;
		}
	}
	
	
	return Dom;
})();

/**
 * ticker might contain exchange information
 * ticker could be of the form "NYSE:GE", returns "GE"
 * If the the ticker does not containg ":", returns input ticker itself
 */
com.fa.utils.extractTickerSymbol = function(ticker) {
	if(!ticker)return;
	
	var index = ticker.indexOf(':');
	if(index>0) {
		return ticker.substring(index+1);
	} else {
		return ticker;
	}
}

com.fa.utils.trace = function() {
	if(!DEBUG) return;
	
	if(!console) return;
	
	console.trace();
	
}
com.fa.utils.log = function(level, theMesg, theClassName, theMethodName) {
	if(!$DEBUG) return;
	
	if(window.console) {
		
		var mesg = theMesg || '';
		var className = theClassName || '';
		var methodName = theMethodName || '';
		
		switch (level) {
		case 'error':
			console.error(mesg, className, methodName);
			break;
	
		default:
			console.log(mesg, className, methodName);
			break;
		}
	}
}

com.fa.utils.ChartData = (function(){
	
	function ChartData(rows, cols, type, chartOptions) {
		this.rows = rows;
		this.cols = cols;
		this.type = type;
		this.chartOpts = chartOptions;
	}
	
	ChartData.HEIGHT = 300;
	ChartData.WIDTH = 400;
	
	ChartData.prototype.getRows = function() {
		return this.rows;
	}
	
	ChartData.prototype.getType = function() {
		if(!this.type) this.type = "linechart";
		
		return this.type;
	}
	
	ChartData.prototype.getCols = function() {
		return this.cols;
	}
	
	ChartData.prototype.getOptions = function() {
		if(!this.chartOpts) return { width:400, height:300, 'legend':'right', 'curveType':'function' };
		
		/*if(!this.chartOpts.backgroundColor) {
			//this.chartOpts.backgroundColor = 'transparent';
		}*/
		
		if(!this.chartOpts.borderColor) {
			this.chartOpts.borderColor = '#000000';
		}
		
		/*if(!this.chartOpts.legendBackgroundColor) {
			//this.chartOpts.legendBackgroundColor = 'transparent';
		}*/
		if(!this.chartOpts.legendFontSize) {
			this.chartOpts.legendFontSize = '10';
		}
	
		if(!this.chartOpts.interpolateNulls) {
			this.chartOpts.interpolateNulls = true;
		}
		
		if(!this.chartOpts.pointSize) {
			this.chartOpts.pointSize = 5;
		}
		return this.chartOpts;
	}
	
	ChartData.prototype.getJson = function() {
		var obj = {};
		obj.rows = this.getRowsJson();
		obj.cols = this.getColsJson();
		return obj;
	}
	
	ChartData.prototype.getColsJson = function() {
		var cols = this.cols;
		var objsArr = new Array();
		for(var param in cols) {
			var obj = {};
			obj.type = cols[param];
			obj.label = param;
			objsArr.push(obj);
		}
		return objsArr;
	}
	
	ChartData.prototype.getRowsJson = function() {
		var rows = this.rows[0];
		var rowsObjArr = new Array();
		for(var i=0; i<rows.length; i++) {
			var row = rows[i];
			var rowObjArr = new Array();
			var cObj = {};
			for(var j=0; j<row.length; j++) {
				var obj = {};
				obj.v = row[j];
				rowObjArr.push(obj);
			}
			cObj.c = rowObjArr;
			rowsObjArr.push(cObj);
		}
		return rowsObjArr;
	}
	
	ChartData.getGChart = function(type) {
        if (type == "table")          return google.visualization.Table;
        if (type == "piechart")       return google.visualization.PieChart;
        if (type == "barchart")       return google.visualization.BarChart;
        if (type == "columnchart")    return google.visualization.ColumnChart;
        if (type == "areachart")      return google.visualization.AreaChart;
        if (type == "linechart")      return google.visualization.LineChart;
        if (type == "scatterchart")   return google.visualization.ScatterChart;
        if (type == "imagesparkline") return google.visualization.ImageSparkLine;
        if (type == "intensitymap")   return google.visualization.IntensityMap;
        if (type == "geomap")         return google.visualization.GeoMap;
    }


	return ChartData;
	
})();

com.fa.Utils.errorHandler = function() {
	document.getElementById("loading").style.display = "none";
	alert("Error Happened during ajax call");
}

com.fa.Utils.trim = function(str){
    var lIndex = 0;
    var rIndex = str.length - 1;

    while (lIndex < str.length) {
        if (str.charCodeAt(lIndex) == 160 || String(str.charAt(lIndex)).search(/\s/) == 0) {
            lIndex++;
        }
        else {
            break;
        }
    }

    if (lIndex == str.length)
        return '';

    while (rIndex > 0) {
        if (str.charCodeAt(rIndex) == 160 || String(str.charAt(rIndex)).search(/\s/) == 0) {
            rIndex--;
        }
        else {
            break;
        }
    }
    return str.substring(lIndex, rIndex + 1);
};

com.fa.getNextId = function() {
	var num;
	if(!window['regIdCounter']) {
		window['regIdCounter'] = 0;
	} else {
		window['regIdCounter'] = window['regIdCounter'] + 1;
	}
	var num = window['regIdCounter'];
	return 'fa_' + (num)
	
}