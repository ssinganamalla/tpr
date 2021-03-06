(function(){
    var ns = com.fa;
    ns.sheets = new Array(); //sheets contain all the financial statements for a particular company
    var _extractDates = function(row){
        var colsLen = row.cells.length;
        var colsArray = new Array();
        for (var j = 1; j < colsLen; j++) {
            colsArray.push(getInnerText(row.cells[j]));
        }
        return colsArray;
    }

    var _extractCurrText = function(row) {
    	var currText = getInnerText(row.cells[0]);
    	var endIndex = currText.indexOf('(');
    	return currText.substring(0, endIndex-1);
    }
    ns.parseHtmlRows = function(id, finDiv, sheetInnerTextMap) {
    	
    	var tables = finDiv && finDiv.getElementsByTagName('table');
    	var rows = tables && tables[0].rows;
    	
        if (!rows)
            return null;

        var fin = {};
        fin.n = id;
        fin.val = new Array();
        fin.containsData = false;
        if(rows.length > 1) {
        	fin.containsData = true;
        }
        
        var setDates = true;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].cells.length > 1) {
                var textContent = getInnerText(rows[i].cells[0]);
                if (setDates && textContent.search(/except for per share items/)) {
                    fin.ds = _extractDates(rows[i]);
                    fin.curr = _extractCurrText(rows[i]);
                    setDates = false;
                }
                else {
                    var implIndependentKey = sheetInnerTextMap[textContent];
                    fin.name = 'Not Set';
                    
                    if (implIndependentKey) {
                        var colsLen = rows[i].cells.length;
                        var colsArray = [];
                        for (var j = 1; j < colsLen; j++) {
                            var val = getInnerText(rows[i].cells[j]).replace(/,/g, '');
                            if (isNaN(val)) {
                                colsArray.push(0.00);
                            }
                            else {
                                colsArray.push(Number(parseFloat(val)));
                            }
                        }
                        fin.val[implIndependentKey] = colsArray;
                    }
                }
            }
        }
        return fin;

    }
    
    function getFinSheetKey(inputId) {
    	var divIds = {'incinterimdiv' : IncomeStatement.INTERIM, 'incannualdiv' : IncomeStatement.ANNUAL, 
    	              'balinterimdiv' : BalanceSheet.INTERIM, 'balannualdiv' : BalanceSheet.ANNUAL, 
    	              'casinterimdiv' : CashFlow.INTERIM, 'casannualdiv' : CashFlow.ANNUAL};
    	return divIds[inputId];
    }
    
    ns.createFinSheets = function(htmlText, tickerInfo, updateUI){
    	try {
	        var tmpDiv = document.createElement('div')
	        tmpDiv.innerHTML = '<div>' + htmlText + '</div>';
	        var finDivs = tmpDiv.getElementsByTagName('div');
	        
	        for(var i=0; i<finDivs.length; i++) {
	        	var id = finDivs[i].getAttribute("id");
	        	if(id && getFinSheetKey(id)) {
	        		var clonedDiv = finDivs[i].cloneNode(true);
	        		var sheet = createFinanceSheet(getFinSheetKey(id), clonedDiv);
	        		com.fa.model.companies.getInstance().addSheet(sheet, tickerInfo);
	        		if(updateUI) {
	        			$("#compfin").append(clonedDiv);
	        		}
	        	}
	        }
	        return sheet.containsData;
    	}catch(error) {
    		//com.fa.utils.trace();
    		com.fa.model.companies.getInstance().addSheet(sheet, tickerInfo);
    		return false;
    	}
    }
    
    function createFinanceSheet(id, finDiv) {
    	var sheet = SheetFactory.createSheet(id);
    	sheet.parse(id, finDiv);
    	//setSheet(sheet);
    	return sheet;
    }
    
	function LoadNewsBar() {
      var newsBar;
      var options = {
    	        largeResultSet : true,
    	        title : "In the news",
    	        horizontal : true,
    	        resultStyle : GSnewsBar.RESULT_STYLE_EXPANDED,
    	        autoExecuteList : {
    	          executeList : [ com.fa.company.ticker + " Stock"]
    	        }
    	      }

      newsBar = new GSnewsBar(document.getElementById("newsBar-bar"), options);
    }
	    
	
    ns.loadStatementsCB = function(htmlText, tickerInfo) {
    	//update ui
		clear();
		document.getElementById("loading").style.display = "none";
    	
    	//update data
    	var success = ns.createFinSheets(htmlText, tickerInfo, true);
    	if(success) {
    		init();
    	} else {
    		com.fa.utils.log("info", "sheet not available");
    		alert("Sorry. No financial statements data available for this ticker")
    	}
    }
    
    function setHeading() {
    	var hdgDiv = document.getElementById("hdg");
    	var h2 = hdgDiv.getElementsByTagName("div")[0];
    	var name = com.fa.company.name ? ' for ' + com.fa.company.name : "";
    	h2.innerHTML = 'Financial Statements' + name;
    	if(com.fa.company.ticker && com.fa.company.ticker.length > 0) {
    		submitForQuote(com.fa.company.ticker);
    	}
    }
    
    function initLoad() {
    	type = 'bal';
    	period = 'interim';
    	document.getElementById('analyzeBtn').style.display = 'inline';
    }
    
    function init() {
    	initLoad();
    	$("#serverContent").show();
    	$("#typprd").show();
		$("#analyzeBtn").click(com.fa.controller.analyzeBtnClicked);
		$("#clearBtn").click(clear);
		setHeading();
		$("#analyzeBtn").click();
		
    }
    
    function clear() {
		$("#gmContainer").hide();
		$("#serverContent").hide();
		$("#typprd").hide();
		//remove all the listeners
		
    	$('#compfin').empty();
    	$('#msgs').empty();
    	$('#finGraph').empty();
    	
    }
    
    function setSheet(x) {
    	var key = x && x.n;
		ns.sheets[key] = x;
	}
    
    function quoteCallback(innerText) {
    	if(innerText) {
    		innerText = innerText.substring(4, innerText.length-1);
    		var jsonObj = eval('( ' + innerText + ' )');
    		if(jsonObj) {
    			var quoteArea = document.getElementById('quoteArea');
    			com.fa.utils.Dom.removeChildren(quoteArea);
    			quoteArea.appendChild(com.fa.utils.Dom.creatTextSpan(jsonObj[0].l, 'qte'));//last trade quote
    			if(jsonObj[0].c) {
    				var cls = parseFloat(jsonObj[0].c) > 0 ? ' up' : ' down'; 
    			}
    			
    			quoteArea.appendChild(document.createElement('br'));
    			quoteArea.appendChild(com.fa.utils.Dom.creatTextSpan(jsonObj[0].c, 'qtec' + cls));//change
    			if(jsonObj[0].cp && jsonObj[0].cp.length > 0) {
    				quoteArea.appendChild(com.fa.utils.Dom.creatTextSpan('(' + jsonObj[0].cp + '%)', 'qtecp' + cls));//change percentage
    			}
    			quoteArea.appendChild(document.createElement('br'));
    			quoteArea.appendChild(com.fa.utils.Dom.creatTextSpan(jsonObj[0].lt, 'qtelt'));//last time (traded)
    		}
    	}
    }
    /**
    function tickerCallback(innerText) {
    	var suggestList = document.getElementById("suggestList");
    	suggestList.style.display = "none";
    	com.fa.utils.Dom.removeChildren(suggestList);
    	
    	var tickerText = document.getElementById("stockTickerSymbol");
    	var x = com.fa.utils.Dom.getX(tickerText);
    	var y = com.fa.utils.Dom.getY(tickerText);
    	
    	suggestList.style.position = 'absolute';
    	
    	suggestList.style.top = '' + (y + tickerText.offsetHeight + 2) + 'px';
    	suggestList.style.left = '' + x + 'px';
    	if(innerText) {
    		var jsonObj = eval('( ' + innerText + ' )');
    		var matches = jsonObj.matches;
    		if(matches) {
    			var min = Math.min(15, matches.length);
    			for(var i=0; i<min; i++) {
    				if(matches[i].e == "NASDAQ" || matches[i].e == "NYSE" || matches[i].e == "OTC") {
    					suggestList.appendChild(getTickerDropdownDiv(matches[i].e, matches[i].t, matches[i].n));
    				}
    			}
    			if(matches.length > 0) {
    				suggestList.style.display = "block";
    			}
    		}
    	}
    	
    }
    
    function submitMatch(ticker) {
    	var url = com.fa.Global.prefixPath + "/urlfetch/getTickerMatchInfo?ticker="+ HTTP.encode(ticker);
    	HTTP.getText(url, tickerCallback, com.fa.Utils.errorHandler);
    }**/
    
    
    function submitForQuote(tickerVal) {
    	$.get(com.fa.Global.prefixPath + "/quoteInfo", {ticker: HTTP.encode(tickerVal)}, 
    			function(innerText) {
		        	if(innerText) {
		        		innerText = innerText.substring(4, innerText.length-1);
		        		var jsonObj = eval('( ' + innerText + ' )');
		        		if(jsonObj) {
		        			var quoteArea = $('#quoteArea');
		        			$('#quoteArea').empty();
		        			$('#quoteArea').append(com.fa.utils.Dom.creatTextSpan(jsonObj[0].l, 'qte'));//last trade quote
		        			if(jsonObj[0].c) {
		        				var cls = parseFloat(jsonObj[0].c) > 0 ? ' up' : ' down'; 
		        			}
		        			
		        			$('#quoteArea').append(document.createElement('br'));
		        			$('#quoteArea').append(com.fa.utils.Dom.creatTextSpan(jsonObj[0].c, 'qtec' + cls));//change
		        			if(jsonObj[0].cp && jsonObj[0].cp.length > 0) {
		        				$('#quoteArea').append(com.fa.utils.Dom.creatTextSpan('(' + jsonObj[0].cp + '%)', 'qtecp' + cls));//change percentage
		        			}
		        			$('#quoteArea').append(document.createElement('br'));
		        			$('#quoteArea').append(com.fa.utils.Dom.creatTextSpan(jsonObj[0].lt, 'qtelt'));//last time (traded)
		        		}
		        	}
		        }
    	);
    }
    
    function bodyOnClickCB() {
    	suggestList.style.display = 'none';
    	com.fa.utils.Dom.removeChildren(suggestList);
    }
    
    function addListeners() {
    	//init eventlisteners
        //addClickListener("bal", ns.changeType);
        $("#bal").click(com.fa.controller.balSheetClicked);
        $("#inc").click(com.fa.controller.incSheetClicked);
        $("#cas").click(com.fa.controller.casSheetClicked);
        $("#interim").click(com.fa.controller.interimClicked);
        $("#annual").click(com.fa.controller.annualClicked);
        $("#tickInput").click(com.fa.controller.loadBtnClicked);
        $("#naviDiv a").click(com.fa.controller.naviLinksClicked);
//        addKeyUpListener("stockTickerSymbol", filter);
        //addClickListener("naviDiv", naviDivClick);
        //addClickListener("dbody", bodyOnClickCB);
    }
	
	function addClickListener(id, callback) {
		var elem = document.getElementById(id);
		if(elem.addEventListener) {
			elem.addEventListener("click", callback, false);
		} else {
			elem.onclick = callback;
		}
	}
	
	function addKeyUpListener(id, callback) {
		var elem = document.getElementById(id);
		if(elem.addEventListener) {
			elem.addEventListener("keyup", callback, false);
		} else {
			elem.onkeyup = callback;
		}
	}
	$(document).ready(function() {
		addListeners();
		$("#stockTickerSymbol").focus();
	});
	
	var suggestList = document.getElementById("suggestList");

})();

$(function() {
	$("#commentDiv").hide();
	$("#expandComments").show();
	
	/**
	$("#collapseCommentsAnchor").hide();
	$("#expandCommentsAnchor").click( function(e) {
		$("#collapseCommentsAnchor").show();
		$("#expandCommentsAnchor").show();
		$("#expandComments").show();
		return false;
		}
			
	);
	$("#collapseCommentsAnchor").click( function(e) {
		$("#expandCommentsAnchor").hide();
		$("#collapseCommentsAnchor").show();
		$("#expandComments").hide();
		return false;
	});**/
	
   // code to execute when the DOM is ready
   $("#addComment a").toggle(function(e){
			$("#commentDiv").show('slow');
	   }, function(e){
		   e.preventDefault();
			$("#commentDiv").hide('fast');
		   });
   
   $("#addNote").click(com.fa.controller.addNoteBtnClicked);
   $("#addPublicNote").click(com.fa.controller.addPublicNoteBtnClicked);
   $("#cancelNote").click( function() {
		   $("#commentDiv").hide('fast');
		   $("#commentDiv").val('');
   		}
   );
   $("#stars-wrapper").stars({
	       inputType: "select"
	       //Adding an "onHover" caption element
	       //,captionEl: $("#stars-cap")
	 });
 });
