
//controllers
com.fa.controller = (function() { 
	
	/** private helper functions **/
	var sheetClickedHelper = function(event, type, evtMesg) {
		var e = event || window.event;
		var tar =  e.srcElement || e.target;
		
		var prevType = com.fa.model.getType();
		var prevPeriod = com.fa.model.getPeriod();
		
		var period = prevPeriod;
		
		if(prevType == type) return;
		com.fa.model.setTypePeriodAndIndex(type, period,0);
		com.fa.view.update(event, evtMesg);
	};
	
	var periodClickedHelper = function(event, period, evtMesg) {
		var e = event || window.event;
		var tar =  e.srcElement || e.target;
		
		var prevType = com.fa.model.getType();
		var prevPeriod = com.fa.model.getPeriod();
		var naviIndex = com.fa.model.getNaviIndex();
		var type = prevType;
		
		if(prevPeriod == period) return;
		com.fa.model.setTypePeriodAndIndex(type, period, naviIndex);
		com.fa.view.update(event, evtMesg);
	};
	

	return {
		/*
		changeStocksComparisionIndicator : function(val) {
			var compareModel = com.fa.model.compareStocksInfo.getSingletonInstance();
			if(val) {
				compareModel.setIndicator(val);
			}
			var obj = new StocksCompareGraphsDataCreator(compareModel);
			obj.redrawChart();
			//update the view
		},
		
		*//** interim or annual **//*
		changeStocksComparisionType : function(type) {
			var compareModel = com.fa.model.compareStocksInfo.getSingletonInstance();
			if(type) {
				compareModel.setType(type);
			}
			var obj = new StocksCompareGraphsDataCreator(compareModel);
			obj.redrawChart();
			//update the view (graph + links)
		},
		*/
		redrawComparisonChart : function(type, selKey) {
			var compareModel = com.fa.model.compareStocksInfo.getSingletonInstance();
			if(type) {
				compareModel.setType(type);
			}
			if(selKey) {
				compareModel.setIndicator(selKey);
			}
			var obj = new StocksCompareGraphsDataCreator(compareModel);
			obj.redrawChart();
		},
		
		getSectorInputTextValFromJson : function(currSectorId) {
			var jsonModel = $("#currSectorTickers").data("sectorTickers");
	    	if(!jsonModel) return;
	    	
	    	var sectorTickers = jsonModel[currSectorId];
	    	if(sectorTickers) {
	    		var runningTickerStr = '';
	    		for(var i=0; i<sectorTickers.length; i++) {
	    			var ticker = sectorTickers[i].t;
	    			var costBasis = sectorTickers[i].cb;
	    			var numShares = sectorTickers[i].n;
	    			var separator = (i < sectorTickers.length - 1) ? "\n" : "";
	    			runningTickerStr += ticker + " " + costBasis + " " + numShares + separator;
	    		}
	    	} 
	    	return runningTickerStr;
		},
		
		updateCurrSectorTextInJson : function(oldSectorId) {
			var jsonObj = $("#currSectorTickers").data("sectorTickers");
			if(jsonObj) {
				//update old model with ui data
				var oldSectorIdText = $("#currSectorTickers").val();
				var tickerLines = oldSectorIdText.split("\n");
				var newJsonObj = [];
				for(var i=0; i<tickerLines.length; i++) {
					var tickerInfo = tickerLines[i].split(" ");
					if(tickerInfo.length==3) {
						if(!jsonObj[oldSectorId]) {
							jsonObj[oldSectorId] = {};
						}
						newJsonObj.push(new Object());
						newJsonObj[i]['t'] = tickerInfo[0];
						newJsonObj[i]['cb'] = tickerInfo[1];
						newJsonObj[i]['n'] = tickerInfo[2];
						
					}
				}
				//replace the oldjsonObj values with the updated one
				//FIXME, add it only if u change the values
				jsonObj[oldSectorId] = newJsonObj;
			}
	    },
		
		changeSector : function(oldSectorId, newSectorId) {
	    	com.fa.controller.updateCurrSectorTextInJson(oldSectorId);
				//update the model with this text info
			com.fa.view.updateSectorUI(newSectorId);
				//update the ui with new sectorId
			$("#currSectorTickers").data("currentTickerId", newSectorId);
		},
		
		savePreferredTickersBtnClicked : function(event) {
			com.fa.controller.ajax.savePreferredTickers();
		},
		
		addNoteBtnClicked : function(event) {
			com.fa.controller.ajax.submitAddNote(event, false);
		},
		addPublicNoteBtnClicked : function(event) {
			com.fa.controller.ajax.submitAddNote(event, true);
		},
		
		loadBtnClicked : function(event) {
			var ticker = $("#stockTickerSymbol").val();
	    	com.fa.company.tickerSymbol = com.fa.utils.extractTickerSymbol(ticker);
			com.fa.controller.ajax.loadCompanyStmt(com.fa.company.tickerSymbol);
		},
		
		analyzeBtnClicked : function(event) {
			com.fa.view.update(event, 'analyzeBtnClicked', this);
		},
		
		naviLinksClicked : function(event) {
			var e = event || window.event;
			
			var tar =  e.srcElement || e.target;
			
			var oldType = com.fa.model.getType();
			var oldPeriod = com.fa.model.getPeriod();
	    	if(e.target && e.target.tagName && "A" == e.target.tagName.toUpperCase()) {
	    		var index = e.target.getAttribute("i");
	    		var newType = e.target.getAttribute("k");
	    	}
	    	var newPeriod = oldPeriod;
	    	
	    	if(newType == oldType && com.fa.model.naviIndex == index) return;
	    	
			com.fa.model.setTypePeriodAndIndex(newType, newPeriod, index);
			com.fa.view.update(event, 'navilinksclicked');
			com.fa.utils.Dom.preventDefault(e);
		},
		
		balSheetClicked : function(event) {
			var type = this.getAttribute("id");
			sheetClickedHelper(event, type, 'balSheetClicked');
		},
		incSheetClicked : function(e) {
			var type = this.getAttribute("id");
			sheetClickedHelper(e, type, 'incSheetClicked');
		},
		casSheetClicked : function(event) {
			var type = this.getAttribute("id");
			sheetClickedHelper(event, type, 'casSheetClicked');
		},
		
		interimClicked : function(event) {
			var period = this.getAttribute("id");
			periodClickedHelper(event, period, 'interimClicked');
		},
		
		annualClicked : function(event) {
			var period = this.getAttribute("id");
			periodClickedHelper(event, period, 'annualClicked');
		},
		
		loadCurrentSheetView : function(event) {
			var e = event || window.event;
			
			com.fa.view.update(event, 'loadCurrentSheetView');
			com.fa.utils.Dom.preventDefault(e);
		}
	}
})();

com.fa.controller.ajax = (function() {
		//private members
	
		var buildThead = function() {
			var $thead = "<thead>\r\n" + 
					"		<tr>\r\n" + 
					"			<th>Comments</th>\r\n" + 
					"			<th>Period</th>\r\n" + 
					"			<th>Statement Type</th>\r\n" + 
					"			<th>Date</th>\r\n" + 
					"		</tr>\r\n" + 
					"	</thead>"; 
			return $thead;
		 
		};
	
		var updateNotesUI = function(notes) {
			$("#addedComments").empty();
			var $table = $('<table id="stmt-comments-table" class="tablesorter"></table>');
			$table.append(buildThead());
			for(var i=0; i<notes.length; i++) {
				var note = notes[i];
				var row = $('<tr></tr>')[0];
				if(note) {
					$table[0].appendChild(row);
					row.appendChild($('<td class="title">' + note.co + '</td>')[0]);
					row.appendChild($('<td>' + note.pts + '</td>')[0]);
					row.appendChild($('<td>' + note.sts + '</td>')[0]);
					row.appendChild($('<td class="date" nowrap="1">' + note.da + '</td>')[0]);
				}
			}
			$("#commentDiv").hide();
			$table.appendTo("#addedComments");
			$table.tablesorter();
			
		};
		
		
		var getTickerDropdownDiv = function(e, ticker, name) {
	    	var div = document.createElement("div");
	    	div.setAttribute("e", e);
	    	div.setAttribute("t", ticker);
	    	div.setAttribute("name", "ticker");
	    	var tickerSpan = document.createElement("span");
	    	tickerSpan.className = "ticker";
	    	tickerSpan.appendChild(document.createTextNode(ticker));
	    	var sname = document.createElement("span");
	    	sname.className = "sname";
	    	sname.style.whiteSpace = 'nowrap';
	    	sname.appendChild(document.createTextNode(name));
	    	div.appendChild(tickerSpan);
	    	div.appendChild(sname);
	    	
	    	div.onmouseover = function() {
	    		this.style.cursor = 'pointer';
	    		this.className = "ticker_selected";
	    	}
	    	
	    	div.onmouseout = function() {
	    		this.className = "ticker_unselected";
	    	}
	    	
	    	div.onclick = function() {
	    		setMatchedTicker(this);
	    	}
	    	return div;
	    };
	    
	   
	    var setMatchedTicker = function(div) {
	    	var e = div.getAttribute("e");
	    	
	    	var tickerElem = com.fa.utils.Dom.getFirstElementByClassName(div, 'span', 'ticker');
	    	var nameElem = com.fa.utils.Dom.getFirstElementByClassName(div, 'span', 'sname');
	    	
	    	var ticker = $(tickerElem).text();
	    	var name = $(nameElem).text();
	    	
	    	var x = e + ":" + ticker;
			document.getElementById("stockTickerSymbol").value = x;
			var suggestList = document.getElementById("suggestList");
			suggestList.style.display = "none";
	    	com.fa.utils.Dom.removeChildren(suggestList);
	    	com.fa.company.ticker = x;
	    	com.fa.company.tickerSymbol = ticker;
	    	com.fa.company.name = name;
	    };
	    
	    var varSpaceSplit = function(x) {
	    	var s = "";
	    	var a = new Array();
	    	for(var i=0;i<x.length; i++) {
	    	    if(x[i] != " " ) {
	    	        s = s + x[i];
	    	    } else if(x[i] == " ") {
	    	        if(s.length>0) {
	    	           a.push(s);
	    	            s = "";
	    	        }
	    	    } 
	    	    
	    	    if(i==x.length-1 && x[i] != " ") {
	    	        a.push(s);
	    	    }
	    	}
	    	return a;
	    };
	    
	    var updateSectorTickers = function(json) {
	    	//create the sectors, sectorsgraphdata
	    	//append information about the tickers
	    	
	    	//move to sectorTickers
	    	$("#currSectorTickers").data("sectorTickers", json);
	    	
	    	
	    	var oldSectorId = 0;
	    	var newSectorId = 0;
	    	com.fa.view.updateSectorUI(0);
	    };
	    
	    
	    var updatePreferredTickers = function(text) {
	    	if(text && text.length>0) {
	    		$("#preferredTickers").data("preferredTickers", text);
	    	}
	    	updatePreferredTickersTable(text);
	    	com.fa.view.updatePreferredTickerTextArea();
	    };
	    
	    var updatePreferredTickersTable = function(text) {
	    	var tickers = text && varSpaceSplit(text);
	    	var tickersTableRows = [];
	    	if(tickers && tickers.length > 0) {
	    		$("#savedTickersDiv").empty();
		    	var $table = $('<table></table>');
				for(var i=0; i<tickers.length; i++) {
					var note = tickers[i].toUpperCase();
					var cssClass = i%2 == 0 ? 'r0' : 'r1';
					var row = $('<tr class=' + cssClass + '></tr>')[0];
					if(note) {
						tickersTableRows[note] = row;
						$table[0].appendChild(row);
						row.appendChild($('<td class="title">' + note + '</td>')[0]);
						//row.appendChild($('<td>' + note.au + '</td>')[0]);
						row.appendChild($('<td class="date" nowrap="1">Desc</td>')[0]);
					}
				}
				$table.appendTo("#savedTickersDiv");
	    	}
	    	
	    	
	    	//for each note
	    	for(var i=0; i<tickers.length; i++) {
	    		//make a call to get the ticker info
	    		$.getJSON(com.fa.Global.prefixPath + "/urlfetch/getTickerMatchInfo", {"ticker":tickers[i]},
	    			function(jsonObj) {
	    			if(jsonObj) {
			    		var matches = jsonObj.matches;
			    		if(matches) {
			    			//hopefully the first match is fine
			    			var match = matches[0];
			    			if(match.e == "NASDAQ" || match.e == "NYSE" || match.e == "OTC" || match.e == "AMEX") {
			    				//if a ticker matched update the ticker model and add it to the list
			    				//if(match.t == tickers[i]) {
			    					var info = new com.fa.model.prefTickerInfo(tickers[i]);
			    					info.set(match.e, match.n);
			    					com.fa.model.prefTickerInfos[tickers[i]] = info;
			    		  			//update the row using this ticker model
			    					tickersTableRows[match.t].appendChild($('<td class="date" nowrap="1">' + match.n + '</td>')[0])
			    					//var $a = $('<a href="#">Analyze</a>').click(function(){document.forms[0].stockTickerSymbol.value = match.e + ':' + match.t; document.forms[0].submit()})
			    					var url = "/finAnalyzer.jsp?stockTickerSymbol=" + match.e + ':' + match.t;
			    					var $a = $('<a href="' + url + '">Analyze</a>');
			    					tickersTableRows[match.t].appendChild(($('<td class="analyze" nowrap="1"></td>').append($a))[0])
			    				//}
		    				}
			    		}
	    			}
	    			});
	    	}
	    };
	
		
	return {
		//public functions
		getMatchedTickers : function(tickerVal) {
			$.getJSON(com.fa.Global.prefixPath + "/urlfetch/getTickerMatchInfo", {"ticker":tickerVal},
					
					function(jsonObj) {
						var suggestList = document.getElementById("suggestList");
				    	suggestList.style.display = "none";
				    	com.fa.utils.Dom.removeChildren(suggestList);
				    	
				    	var tickerText = document.getElementById("stockTickerSymbol");
				    	var x = com.fa.utils.Dom.getX(tickerText);
				    	var y = com.fa.utils.Dom.getY(tickerText);
				    	
				    	suggestList.style.position = 'absolute';
				    	
				    	suggestList.style.top = '' + (y + tickerText.offsetHeight + 2/**gap**/) + 'px';
				    	suggestList.style.left = '' + x + 'px';
				    	if(jsonObj) {
				    		var matches = jsonObj.matches;
				    		if(matches) {
				    			var min = Math.min(15, matches.length);
				    			for(var i=0; i<min; i++) {
				    				if(matches[i].e == "NASDAQ" || matches[i].e == "NYSE" || matches[i].e == "OTC" || matches[i].e == "AMEX") {
				    					suggestList.appendChild(getTickerDropdownDiv(matches[i].e, matches[i].t, matches[i].n));
				    				}
				    			}
				    			if(matches.length > 0) {
				    				suggestList.style.display = "block";
				    			}
				    		}
				    	}
					}
			);
		
		},
		
		getNotes : function(isPublic) {
			$.getJSON("/addNote", {},
					function(notes) {updateNotesUI(notes)}
			);
		},
		
		saveSectorTickers : function(){
			//update the last modified sector value in the json object
			var lastSectorId = $("#currSectorTickers").data("currentTickerId");
			com.fa.controller.updateCurrSectorTextInJson(lastSectorId);
			
			//get the json
			
			//conver to params and pass it to a post request
			var jsonModel = $("#currSectorTickers").data("sectorTickers");
			var requestParams = {};
	    	for (var currSectorId in jsonModel) {
	    		var sectorTickers = jsonModel[currSectorId];
	    		requestParams[currSectorId] = com.fa.controller.getSectorInputTextValFromJson(currSectorId);
	    	}
	    	$.post("/saveSectorTickers", requestParams, function(text){}, "json");
			
		},
		savePreferredTickers : function(){
			var tickers = $("#preferredTickers").val();
			var stocks = tickers.split(" ");
			com.fa.model.compareStocksInfo.getSingletonInstance().setStocks(stocks);
			com.fa.controller.compareStocks(stocks);
			$.post("/savePreferredTickers", {"preferredTickers" : tickers}, function(text){updatePreferredTickers(text)}, "text");
		},

		updateRecentComparisonTickers : function() {
			$.post("/getComparisonTickers", {}, function(jsonArray){
					com.fa.RecentTickersSection.init(jsonArray);	    	
				}, "json");
		},
//		
//		getPreferredTickers : function(){
//			var tickers = $("#preferredTickers").val();
//			$.post("/getPreferredTickers", {}, function(text){updatePreferredTickers(text)}, "text");
//		},
		
		getSectorTickers : function() {
			$.post("/getSectorTickers", {}, function(json){updateSectorTickers(json)}, "json");
			
		},
		
		submitAddNote : function(e, isPublic) {
			var noteVal = $("#comments").val();
			var periodIndex = PeriodStmts.getPeriodEnumIndex(com.fa.model.getPeriod());
			var typeIndex = PeriodStmts.getTypeEnumIndex(com.fa.model.getType());
			var ticker = $("#stockTickerSymbol").val();
			$.getJSON("/addNote", {note: noteVal, 'isPublic' : isPublic, 'ticker': ticker, period:periodIndex, stmtType: typeIndex},
					function(notes) {updateNotesUI(notes)}
			);
		},
		
		loadCompanyStmt : function(ticker) {
	    	$("#loading").show();
	    	
	    	$.ajax({
	    		url : com.fa.Global.prefixPath + "/urlfetch/getCompanyInfo",
	    		data : {'ticker': HTTP.encode(ticker)},
	    		success : function(htmlText){
	    			var tickerInfo = {};
	    			tickerInfo.ticker = ticker;
					com.fa.loadStatementsCB(htmlText, tickerInfo);
				  },
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					  $("#loading").hide();
					var text = 'Could not get data for this ticker : ' + com.fa.company.ticker;
					$('#errors').append("<li>" + text + "</li>");
				}
	    	});
		},
		
		
		getPreferredTickers : function(){
			var text = $.ajax({
				  url: "/getPreferredTickers",
				  async: false
				 }).responseText;
			return text && text.split(' ') || [];
		},
		
		/** gets the data **/
		getCompanyStmt : function(ticker) {
			var instance = com.fa.model.companies.getInstance();
			if(instance.sheetExists(ticker)) return;
			
			var htmlText = $.ajax({
				  url: com.fa.Global.prefixPath + "/urlfetch/getCompanyInfo",
				  data : {'ticker': HTTP.encode(ticker.toUpperCase())},
				  async: false
				 }).responseText;
			
			var tickerInfo = {};
			tickerInfo.ticker = ticker;
			com.fa.utils.log("info", "fetched stmts data for " + ticker);
			var containsData = com.fa.createFinSheets(htmlText, tickerInfo, false/**updateUI**/);
			if(!containsData) {
				com.fa.utils.log("error", "stmts could not be created for " + ticker);
			} 
			
			return containsData;
			
			/**
			$.ajax({
				url : com.fa.Global.prefixPath + "/urlfetch/getCompanyInfo",
				data : {'ticker': HTTP.encode(ticker.toUpperCase())},
				success : function(htmlText){
					var tickerInfo = {};
	    			tickerInfo.ticker = ticker;
	    			com.fa.utils.log("info", "fetched stmts data for " + ticker);
					var containsData = com.fa.createFinSheets(htmlText, tickerInfo, false);
					if(!containsData) {
						com.fa.utils.log("error", "stmts could not be created for " + ticker);
					} 
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					com.fa.utils.log('error', "Error in getting statements data@@com.fa.controller.ajax@@getCompanyStmt");
				}
			});**/
		},
		
		getQuoteInfo : function(ticker) {
			var instance = com.fa.model.companies.getInstance();
			if(instance.priceExists(ticker)) return;
			
			$.get(com.fa.Global.prefixPath + "/urlfetch/getQuoteInfo", {ticker: HTTP.encode(ticker)}, 
	    			function(innerText) {
			        	if(innerText) {
			        		innerText = innerText.substring(4, innerText.length-1);
			        		var jsonObj = eval('( ' + innerText + ' )');
			        		if(jsonObj) {
			        			instance.setPrice(ticker, jsonObj[0].l);
			        		}
			        	}
			        }
	    	);
			
			
		},
		
		getTickerInfo : function(ticker) {
			var instance = com.fa.model.companies.getInstance();
			if(instance.nameExists(ticker)) return;
			/**
			var tickerInfoText = $.ajax({
				  url: com.fa.Global.prefixPath + "/watchlist/getTickerMatchInfo",
				  "ticker":ticker,
				  async: false
				 }).responseText;
			**/
			
			$.ajax({
	    		url : com.fa.Global.prefixPath + "/urlfetch/getTickerMatchInfo",
	    		data : {'ticker': HTTP.encode(ticker)},
	    		success : function(htmlText){
	    			var jsonObj = eval('(' + htmlText + ')');
	    			if(jsonObj) {
			    		var matches = jsonObj.matches;
			    		if(matches) {
			    			//hopefully the first match is fine
			    			var match = matches[0];
			    			if(match.e == "NASDAQ" || match.e == "NYSE" || match.e == "OTC" || match.e == "AMEX") {
			    				var info = new com.fa.model.prefTickerInfo(match.t);
			    				info.set(match.e, match.n);
			    				com.fa.model.prefTickerInfos[info.getSymbol()] = info;
			    				
			    				instance.setName(match.t, match.n);
		    				}
			    		}
	    			}
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					var text = 'Could not get tickermatch info for this ticker #getTickerInfo ' ;
					$('#errors').append("<li>" + text + "</li>");
				}
	    	});
/**			
			$.getJSON(com.fa.Global.prefixPath + "/urlfetch/getTickerMatchInfo", {"ticker":ticker},
					function(jsonObj) {
	    			if(jsonObj) {
			    		var matches = jsonObj.matches;
			    		if(matches) {
			    			//hopefully the first match is fine
			    			var match = matches[0];
			    			if(match.e == "NASDAQ" || match.e == "NYSE" || match.e == "OTC" || match.e == "AMEX") {
			    				var info = new com.fa.model.prefTickerInfo(match.t);
			    				info.set(match.e, match.n);
			    				com.fa.model.prefTickerInfos[info.getSymbol()] = info;
			    				
			    				instance.setName(match.t, match.n);
		    				}
			    		}
	    			}
	    			});
 **/	    			
		},
		
		//sync call
		getPreferredTickers : function(){
			var text = $.ajax({
				  url: "/getPreferredTickers",
				  async: false
				 }).responseText;
			return text && text.split(' ') || [];
		}
	};
})();


//view
com.fa.view = (function() { 
	
	/** private functions **/
	var loadCurrentGraph = function(e) {
	var key = com.fa.model.getType() + com.fa.model.getPeriod();
	var chartDiv = document.getElementById('finGraph');
	com.fa.utils.Dom.removeChildren(chartDiv);
	
	//sheet
	var stmts = com.fa.model.companies.getInstance().getPeriodStmts(com.fa.company.tickerSymbol, com.fa.model.getPeriod());
	if(stmts.isEmpty()) return;
	var graphsData = stmts.getGraphsData(key);
	if(graphsData[com.fa.model.getNaviIndex()]) {
		var chart = graphsData[com.fa.model.getNaviIndex()]();
		window.setTimeout( function() {
			drawChart(chartDiv, chart);
						}, 0);
			loadCurrentInfo(com.fa.model.getNaviIndex(), com.fa.model.getType());
		
	}
	};
	
	
	var loadCurrentInfo = function (index, type) {
    	var parentDiv = document.getElementById("currGraphInfo");
    	var allInfos = com.fa.utils.Dom.getElementsByTagNameAndAtt(parentDiv, 'div', 'name', 'info');
    	if(allInfos) {
    		for(var i=0; i<allInfos.length; i++) {
    			allInfos[i].style.display = "none";
    		}
    		
    		for(var i=0; i<allInfos.length; i++) {
    			if((type == allInfos[i].getAttribute("k")) && (""+index ==allInfos[i].getAttribute("i"))) {
    				allInfos[i].style.display = "block";
    			}
    		}
    	}
    	
    };
	
	var loadMessages = function(e) {
		var msgsDiv = document.getElementById('msgs')
    	com.fa.utils.Dom.removeChildren(msgsDiv);
    	
		var key = com.fa.model.getType() + com.fa.model.getPeriod();
    	
		var div = document.createElement('div');
		div.setAttribute("id", key + "msgs");
		//div.style.border = "1px";
		//div.style.borderColor = "#000000";
		div.style.textAlign = "left";
		
		var sheets = com.fa.model.companies.getInstance().getSheets(com.fa.company.tickerSymbol);
		var msgs = null;
		if(!(sheets[key].isEmpty())) {
			msgs = sheets[key].analyze();
		}
		
		var stmts = com.fa.model.companies.getInstance().getPeriodStmts(com.fa.company.tickerSymbol, com.fa.model.getPeriod());
		if(!stmts.isEmpty()) {
			var msgs2 = stmts.analyze(0);/** 0: latest period */
		}
		if(msgs && msgs2) {
			msgs = msgs.concat(msgs2);
		}
		
		var innerHtml = "";
		if(msgs && msgs.length > 0) {
			var h3 = document.createElement('h3');
			h3.appendChild(document.createTextNode("Selected Statement Summary (Recent Period)"));
			h3.className = 'section_hdr';
			div.appendChild(h3);
			var ul = document.createElement('ul');
    		 for(var i=0; i<msgs.length; i++) {
    			 var levelClass = msgs[i].getLevelClass();
    			 var tpKey = msgs[i].getTooltipKey();
    			 var li = document.createElement('li');
    			 if(levelClass) {
    				 li.className = levelClass;
    			 }
    			 li.appendChild(document.createTextNode(msgs[i].getMesg()));
    			 
    			 if(tpKey) {
	    			 var hintAnchor = document.createElement('a');
	    			 hintAnchor.appendChild(document.createTextNode("[?]"));
	    			 hintAnchor.setAttribute('tp', tpKey);
	    			 li.appendChild(hintAnchor);
	    			 com.fa.utils.Dom.addMouseOverListener(hintAnchor, 
	    					 	function(event) {
	    				 			var tooltips = com.fa.getTooltipDescArray(this.getAttribute('tp'));
	    				 			showhint(tooltips[0], this, event);
	    			 			}
	    			 		);
    			 }
    			 ul.appendChild(li);
    			 
    		 }
    	} else {
    		var noMsgsSpan = document.createElement('span');
    		noMsgsSpan.appendChild(document.createTextNode('There are no Messages to show'));
    		h3.appendChild(noMsgsSpan);
    	}
		//div.innerHTML = innerHtml;
		div.appendChild(ul);
		//append it to msgs div
    	msgsDiv.appendChild(div);
	};
	
	var updateNaviLinksDiv = function(e) {
		var j = $("#naviDiv a.nlk");
		j.removeClass("nlk");
		j.removeClass("important");
		j.addClass("lk");
		
		var type = com.fa.model.getType();
		var k = $("#" +type+ "NaviDiv a");
		var i = com.fa.model.getNaviIndex();
		if(k) {
			$(k[i]).addClass("nlk");
			$(k[i]).addClass("important");
		}
		
		/**
		var target =  e.target || e.srcElement;
		if(target) {
			$(target).addClass("nlk");
			$(target).addClass("important");
		}**/
	};
	
	var changeFinDiv = function(e) {
		var m = com.fa.model;
		var oldId = m.getPrevType() + m.getPrevPeriod() + "div";
		var newId = m.getType() + m.getPeriod() + "div";
		
		$('#'+oldId).hide();
		$('#'+newId).show();
	};
	
	var finSheetHdg = function() {
		//alert('implement finSheetHdg');
		var type = com.fa.model.getType();
		var period = com.fa.model.getPeriod();
		var typePeriodDiv = document.getElementById("typprd");
    	if(typePeriodDiv) {
    		var anchors = typePeriodDiv.getElementsByTagName('a');
    		for(var i=0; i<anchors.length; i++) {
    			anchors[i].className = "lk";
    		}
    		for(var i=0; i<anchors.length; i++) {
    			if(type == anchors[i].getAttribute("id")) anchors[i].className = "nlk important"
    			if(period == anchors[i].getAttribute("id")) anchors[i].className = "nlk important"
    		}
    	}
	};
	
	var drawChart = function(chartDiv, chartdata) {
    	var data = new google.visualization.DataTable(chartdata.getJson(), 0.5);
    	var view = new google.visualization.DataView(data);
    	var chartType = chartdata.getType();
    	var chartFunc  = com.fa.utils.ChartData.getGChart(chartType);
    	var analyzedChart = new chartFunc(chartDiv);
    	//finGraph.parentNode.firstChild.appendChild(document.createTextNode('Loading...'));
    	google.visualization.errors.addError(chartDiv, 'Loading...', null, {'removable':true});
    	google.visualization.events.addListener(analyzedChart, 'ready', onChartReady);
    	
    	analyzedChart.draw(view, chartdata.getOptions());    
    };
    
    
    var onChartReady = function() {
    	google.visualization.errors.removeAll(finGraph);
//    	finGraph.parentNode.firstChild.innerHTML = '';
    };

	return {
		/** public functions **/
		
		update : function(event, arg, elem/*dom obj*/) {
			if(this['on_' + arg]) {
				this['on_'+arg](event, elem);
			}
		},
		
	    on_analyzeBtnClicked : function(e, btn) {
	    	$('#finGraph').css("padding", 10);
	    	$('#finGraph').css("border", "1px solid #000");
	    	$('#finGraph').css("background", "#fff");
	    	var d = com.fa.utils.ChartData;
	    	$('#finGraph').width(d.WIDTH + 20);
	    	$('#finGraph').height(d.HEIGHT + 20);
	    	$(btn).hide();
	    	com.fa.controller.loadCurrentSheetView(e);
	    	$('#gmContainer').show();
	    	com.fa.controller.ajax.getNotes();
	    },
	    
		on_navilinksclicked : function(e) {
			//alert('update ui');
			com.fa.controller.loadCurrentSheetView(e);
		},
		
		on_balSheetClicked : function(e) {
			com.fa.controller.loadCurrentSheetView(e);
		},
		on_incSheetClicked : function(e) {
			com.fa.controller.loadCurrentSheetView(e);
		},
		on_casSheetClicked : function(e) {
			com.fa.controller.loadCurrentSheetView(e);
		},
		on_interimClicked : function(e) {
			com.fa.controller.loadCurrentSheetView(e);
		},
		on_annualClicked : function(e) {
			com.fa.controller.loadCurrentSheetView(e);
		},
		
		on_loadCurrentSheetView : function(e) {
			com.fa.utils.log("error", "loading current graph, messages, change fin div and fin");
			loadCurrentGraph();
			loadMessages();
			changeFinDiv();
			finSheetHdg();
			updateNaviLinksDiv(e);
		},
		
		updateSectorUI : function(currSectorId) {
	    	var jsonModel = $("#currSectorTickers").data("sectorTickers");
	    	if(!jsonModel) return;
	    	
	    	var sectorTickers = jsonModel[currSectorId];
	    	if(sectorTickers) {
	    		var runningTickerStr = '';
	    		for(var i=0; i<sectorTickers.length; i++) {
	    			var ticker = sectorTickers[i].t;
	    			var costBasis = sectorTickers[i].cb;
	    			var numShares = sectorTickers[i].n;
	    			var separator = (i < sectorTickers.length - 1) ? "\n" : "";
	    			runningTickerStr += ticker + " " + costBasis + " " + numShares + separator;
	    		}
	    		$("#currSectorTickers").val(runningTickerStr);
	    	} else {
	    		$("#currSectorTickers").val("");
	    	}
	    	
	    },
	    
	    updatePreferredTickerTextArea : function() {
	    	var text = $("#preferredTickers").data("preferredTickers");
	    	if(text) {
	    		$("#preferredTickers").val(text);
	    	}
	    }
		
	}
})();