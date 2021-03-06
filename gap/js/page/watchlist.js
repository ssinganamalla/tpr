//preferred tickers section
com.fa.PreferredTickersSection = (function() {
	 
	//store the object, used to refer in the ajax call
	var me = null;
	var preferredTickers = null;
	var tickersLoadingArray = [];
	var periodType = PeriodStmts.PERIOD_INTERIM;
	var minMaxCriteriaMetric = [];
	var reg_id = 1;
	
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
    
	return {
		
		isLoadedAllData : false,
		
		//init is called once
		init : function() {
			$('#stockTickerSymbol_Compare').finsearchbox({});
			
			//make a sync call
			//var tickersArray = com.fa.controller.ajax.getPreferredTickers(); //com.fa.model.prefTickers set
			//$('#enterPreferredTickersDiv1').labeltextfield({label:tickersArray.join(' ')});
			$('#enterPreferredTickersDiv1').labeltextfield({label:"MSFT GOOG YHOO", readOnly: false});
			
			$('#addComparableBtn').click(function(evt){
//				if(validateTicker()) {
					var value = $('#stockTickerSymbol_Compare').finsearchbox('option', 'shortVal');
					$('#enterPreferredTickersDiv1').labeltextfield('append', value);
//				}
				
			});
			var self = this;
			$('#submitCompare').click(function(evt){
				com.fa.model.errors.getInstance().emptyErrors();
				var tickers = $('#enterPreferredTickersDiv1').labeltextfield('option', 'dataArray');
				self.loadPrefTickersData(tickers);
			});
			
			$('#clearCompare').click(function(evt){
				$('#enterPreferredTickersDiv1').labeltextfield('option', 'label', '');
				com.fa.model.errors.getInstance().emptyErrors();
			});
		},
		
		allDataInitialized : function() {
			if(!this.isLoadedAllData) return;
			
			com.fa.model.errors.getInstance().showErrors();
			//once all the data is fetched, load other data which we might need
			//render ui
			this.renderInit();
			com.fa.RatioAnalysisSection.init();
			$("#results").css('display', 'block');
		},
		
		loadPrefTickersData : function(tickersArray, evtStr) {
			$("#loading").css("display", "inline");
			com.fa.model.prefTickers = tickersArray;
			com.fa.model.compareStocksInfo.getSingletonInstance().setStocks(tickersArray);
			
			
			
			//fire getPreferredTickers, companyInfo, tickerInfo
			for(var i=0; i<tickersArray.length; i++) {
				var ticker = tickersArray[i];
				com.fa.controller.ajax.getTickerInfo(ticker);
				com.fa.controller.ajax.getQuoteInfo(ticker);
				com.fa.controller.ajax.getCompanyStmt(ticker);
			}
			
			
			//take time to load the information
			var instance = com.fa.model.companies.getInstance();
			
			//check at regular interval to see if the stocks are loaded
			var stmtsLoading = false;
			var timedOut = false;
			var counter = 0;
			var c = 0;
			var stocks = com.fa.model.prefTickers;
			var me = this;
			c = setInterval(function() {
				stmtsLoading = false;
				counter ++;
				for(var i=0; i<stocks.length; i++) {
					if(!instance.sheetProcessed(stocks[i]) || !instance.priceExists(stocks[i]) || !instance.nameExists(stocks[i])) {
						stmtsLoading = true;
						
						if(counter >= 4) {
							com.fa.utils.log('info', "fin statements did not load for " + stocks[i]);
							com.fa.utils.log('timed out');
							timedOut = true;
							break;
						} else {
							continue;
						}
					} 
				}
				if(!stmtsLoading || timedOut) {
					com.fa.utils.log('info', "fin statements all loaded ");
					clearInterval(c);
					com.fa.utils.log('info', "clearing interval");
					$("#loading").css("display", "none");
					me['isLoadedAllData'] = true;
					me['allDataInitialized']();
				}	
			
			}, 500);
		},
		
		//ui
		renderInit : function() {
			this.renderTableAndGraphs();
			var tickersArray = com.fa.model.prefTickers || [];
			//this.renderEnterPreferredTickersDiv(tickersArray.join(' '));
			this.renderComparisonCriteriaBox();
			this.renderPeriodTypeRadioBtns();
		},
		
		loadGoogScripts: function() {
			//google.load("visualization", "1", {packages:["linechart", "table"]}, "callback" : com.fa.PreferredTickersSection.renderInit());
		},

		
		renderTableAndGraphs : function() {
			com.fa.utils.log('info', "redering the graphs");
			var tickerArray = com.fa.model.prefTickers;
			com.fa.PreferredTickersTable.render(tickerArray, "#savedTickersDiv");
			com.fa.controller.redrawComparisonChart(periodType, null);
		},
		
		updateComparableTickers : function(stocks){
			if(!me) me = this;
			me.loadPrefTickersData(stocks);
			me.renderTableAndGraphs();
		},
		
	    
		/**
	    renderEnterPreferredTickersDiv : function(text) {
	    	if(!me){me = this;}
	    	$textFld = com.fa.uicontrols.get$LabelTextField(text, me.savePreferredTickers); 
	    	$("#enterPreferredTickersDiv").append($textFld);
		},
		**/
		renderPeriodTypeRadioBtns : function() {
			var template = "<span class=\"f2\" style=\"margin-left: 30px\">\r\n" + 
					"						<label class=\"f3\">Period Type: </label>\r\n" + 
					"						<input id=\"interimRadio\" name=\"periodStmtsType\" type=\"radio\"></input><label for=\"interimRadio\">Interim</label>\r\n" + 
					"						<input id=\"annualRadio\" name=\"periodStmtsType\" type=\"radio\"/><label for=\"annualRadio\">Annual</label>\r\n" + 
					"					</span>";
			
			$("#selectedCriteriaGraphHeader").empty();
			$("#selectedCriteriaGraphHeader").append($(template));
			
			//check the radio
			var idRadioSel = (periodType == PeriodStmts.PERIOD_INTERIM) ? '#interimRadio' : '#annualRadio'; 
			$(idRadioSel).attr("checked", true);
			
			//attach event listeners
			$("#interimRadio").click(
				function() {
					periodType = PeriodStmts.PERIOD_INTERIM;
					com.fa.controller.redrawComparisonChart(PeriodStmts.PERIOD_INTERIM, null);
					com.fa.PreferredTickersSection.renderComparisonCriteriaBox();
				}
			);	
			$("#annualRadio").click(
				function() {
					periodType = PeriodStmts.PERIOD_ANNUAL;
					com.fa.controller.redrawComparisonChart(PeriodStmts.PERIOD_ANNUAL, null);
					com.fa.PreferredTickersSection.renderComparisonCriteriaBox();
				}
			);
			
			
		},
		
		renderComparisonCriteriaBox : function() {
			
			$("#criteriaSelectionsDiv").empty();
			
			/**
			var sels = {'Current Ratio' : PeriodStmts.CURRENT_RATIO, 'Quick Ratio' : PeriodStmts.QUICK_TEST_RATIO, 'Inventory Turns' : PeriodStmts.INVENTORY_TURNS, 
					'Avg Collection Period' : PeriodStmts.RECEIVABLE_TURN_IN_DAYS, 'Return on Assets' : PeriodStmts.RETURN_ON_TOTAL_ASSETS, 'Return on Equity' : PeriodStmts.RETURN_ON_EQUITY, 'Gross Margin' : IncomeStatement.GROSS_PROFIT_MARGIN, 'Net Profit Margin': IncomeStatement.NET_PROFIT_MARGIN, 
					'Debt to Equity Ratio' : PeriodStmts.DEBT_TO_EQUITY_RATIO, 'Debt to Assets Ratio' : PeriodStmts.DEBT_RATIO, 'Operating Cash to Sales/Rev' : PeriodStmts.OPERATING_CASH_TO_REVENUE,
					'Cash to Total Debt' : PeriodStmts.CASH_TO_TOTAL_DEBT_RATIO, 'Cash to Current Liabilities' : PeriodStmts.CASH_TO_CURRENT_LIABILITIES};
			**/
			var sels = com.fa.EnumCriteria.getCriteriaLabelToIdMap();
			var idToLabels = com.fa.EnumCriteria.getCriteriaIdToLabelMap();
			var liqRatios = com.fa.EnumCriteria.getLiquidityCriteriaIdsArray();
			var assetMgtRatios = com.fa.EnumCriteria.getAssetMgmtRatioIdsArray();
			var proftRatios = com.fa.EnumCriteria.getProfitabilityIdsArray();
			var levgRatios = com.fa.EnumCriteria.getLeverageRatioIdsArray();
			var otherRatios = com.fa.EnumCriteria.getOtherCriteriaArray();

			
			
			/**
			 Absolute Liquidity Ratio
			 Average Collection Period 
			 
			 */
			var $div = $('<div id="compcritbox"></div>');
			//var $divHdr = $('<div class="critbox_hdr">' + 'Criteria' + '</div>');
			//$div.append($divHdr);
			
			
			var sections = [liqRatios, assetMgtRatios, proftRatios, levgRatios, otherRatios];
			//the labels should match sections
			var sectionLabels = ['Liquidity Ratios', 'Asset Management Ratios', 'Profitability Ratios', 'Leverage Ratios', 'Other Criteria Ratios'];
			
			var $table = $('<div></div>');
			$div.append($table);
			for(var i=0; i<sections.length; i++) {
				var lbl = sectionLabels[i];
				var ratioArray = sections[i];
				var $h3 = $('<h3 class="crit_sec_hdr">' + lbl + '</h3>');
				$table.append($h3);
				
				var $ul = $('<ul></ul>');
				for(var j=0;j<ratioArray.length; j++) {
					var idx = ratioArray[j];
					var key = idToLabels[idx];
					var $a = $('<a></a>');
					$a.attr("href", "#");
					var val = sels[key];
					$a.click(function(evt) {
								var selKey = $(this).text();
								com.fa.controller.redrawComparisonChart(null, sels[selKey]);
								return false;
							}
						);
					var trClass = (j%2 == 0) ? 'crit_cell_hdr_odd' : 'crit_cell_hdr_even';
					var $li = $('<li></li>');
					$li.append($a);
					$ul.append($li);
					$a.append(key);
				}
				$table.append($ul);
			}
			$div.appendTo($("#criteriaSelectionsDiv"));
		}
	}
})();


com.fa.EnumCriteria = (function(){
	
	var _ratioThresholds = null;
	return {
		
		getCriteriaLabelToIdMap : function() {
			return {
						'Current Ratio' : PeriodStmts.CURRENT_RATIO, 
						'Quick Ratio' : PeriodStmts.QUICK_TEST_RATIO, 
						'Inventory Turns' : PeriodStmts.INVENTORY_TURNS, 
						'Avg Collection Period' : PeriodStmts.RECEIVABLE_TURN_IN_DAYS, 
						'Return on Assets' : PeriodStmts.RETURN_ON_TOTAL_ASSETS, 
						'Return on Equity' : PeriodStmts.RETURN_ON_EQUITY, 
						'Gross Margin' : IncomeStatement.GROSS_PROFIT_MARGIN, 
						'Net Profit Margin': IncomeStatement.NET_PROFIT_MARGIN, 
						'Debt to Equity Ratio' : PeriodStmts.DEBT_TO_EQUITY_RATIO, 
						'Debt to Assets Ratio' : PeriodStmts.DEBT_RATIO, 
						'Operating Cash to Sales/Rev' : PeriodStmts.OPERATING_CASH_TO_REVENUE,
						'Cash to Total Debt' : PeriodStmts.CASH_TO_TOTAL_DEBT_RATIO, 
						'Cash to Current Liabilities' : PeriodStmts.CASH_TO_CURRENT_LIABILITIES,
						'Debt to Cash Ratio' : PeriodStmts.DEBT_TO_CASH_RATIO,
						'Book Value Per Share' : PeriodStmts.BOOK_VALUE_PER_SHARE
						};
		},
		
		getCriteriaIdToLabelMap : function() {
			
			var jsonStr = "{ " +
							"'" + (PeriodStmts.CURRENT_RATIO) + "' : " + "'Current Ratio'," + 
							"'" + (PeriodStmts.QUICK_TEST_RATIO) + "' : " + "'Quick Ratio'," + 
							"'" + (PeriodStmts.INVENTORY_TURNS) + "' : " + "'Inventory Turns'," + 
							"'" + (PeriodStmts.RECEIVABLE_TURN_IN_DAYS) + "' : " + "'Avg Collection Period'," + 
							"'" + (PeriodStmts.RETURN_ON_TOTAL_ASSETS) + "' : " + "'Return on Assets'," + 
							"'" + (PeriodStmts.RETURN_ON_EQUITY) + "' : " + "'Return on Equity'," + 
							"'" + (IncomeStatement.GROSS_PROFIT_MARGIN) + "' : " + "'Gross Margin'," + 
							"'" + (IncomeStatement.NET_PROFIT_MARGIN) + "' : " + "'Net Profit Margin'," + 
							"'" + (PeriodStmts.DEBT_TO_EQUITY_RATIO) + "' : " + "'Debt to Equity Ratio'," + 
							"'" + (PeriodStmts.DEBT_RATIO) + "' : " + "'Debt to Assets Ratio'," + 
							"'" + (PeriodStmts.OPERATING_CASH_TO_REVENUE) + "' : " + "'Operating Cash to Sales/Rev'," +
							"'" + (PeriodStmts.CASH_TO_TOTAL_DEBT_RATIO) + "' : " + "'Cash to Total Debt'," + 
							"'" + (PeriodStmts.DEBT_TO_CASH_RATIO) + "' : " + "'Debt to Cash Ratio'," + 
							"'" + (PeriodStmts.CASH_TO_CURRENT_LIABILITIES) + "' : " + "'Cash to Current Liabilities'," +
							"'" + (PeriodStmts.BOOK_VALUE_PER_SHARE) + "' : " + "'Book Value Per Share'" +
							" }";
							
			//eval is discouraged
			var jsonObj = eval('(' + jsonStr + ')');
			return jsonObj;
		},
		
		getThresholds : function() {
			if(!_ratioThresholds) {
				var uidata = $.ajax({
					  url: com.fa.Global.prefixPath + "/watchlist/getThresholdControlPrefs",
					  async: false
					 }).responseText;
				
				this.updateThresholds(eval('('+uidata+')'));
			}
			return _ratioThresholds;
		},
		
		updateThresholds: function(uidata) {
			if(!uidata) return;
			
			if(_ratioThresholds == null) _ratioThresholds = [];
			for(var i=0; i<uidata.length; i++) {
				//only add the data if the type if of type 'tslider' and the id exists
				if(uidata[i].id) {
					var thold = {};
					thold.v = uidata[i].v;
					if(uidata[i].rev) {
						thold.rev = uidata[i].rev;
					}
					_ratioThresholds[uidata[i].id] = thold;
				}
			}
			
		},
		
		getCriteriaIdsArray : function() {
			return [
				PeriodStmts.CURRENT_RATIO, 
				PeriodStmts.QUICK_TEST_RATIO, 
				PeriodStmts.INVENTORY_TURNS, 
				PeriodStmts.RECEIVABLE_TURN_IN_DAYS, 
				PeriodStmts.RETURN_ON_TOTAL_ASSETS, 
				PeriodStmts.RETURN_ON_EQUITY, 
				IncomeStatement.GROSS_PROFIT_MARGIN, 
				IncomeStatement.NET_PROFIT_MARGIN, 
				PeriodStmts.DEBT_TO_EQUITY_RATIO, 
				PeriodStmts.DEBT_RATIO, 
				PeriodStmts.OPERATING_CASH_TO_REVENUE,
				PeriodStmts.CASH_TO_TOTAL_DEBT_RATIO, 
				PeriodStmts.DEBT_TO_CASH_RATIO, 
				PeriodStmts.CASH_TO_CURRENT_LIABILITIES
				];
		},
		
		getLiquidityCriteriaIdsArray : function() {
			return [
			        PeriodStmts.CURRENT_RATIO, 
			        PeriodStmts.QUICK_TEST_RATIO, 
			        PeriodStmts.CASH_TO_TOTAL_DEBT_RATIO, 
			        PeriodStmts.CASH_TO_CURRENT_LIABILITIES
			        ];
		},
		
		getAssetMgmtRatioIdsArray : function() {
			return [
				PeriodStmts.INVENTORY_TURNS, 
				PeriodStmts.RECEIVABLE_TURN_IN_DAYS, 
				];
		},
		
		getProfitabilityIdsArray : function() {
			return [
				PeriodStmts.RETURN_ON_TOTAL_ASSETS, 
				PeriodStmts.RETURN_ON_EQUITY, 
				IncomeStatement.GROSS_PROFIT_MARGIN, 
				IncomeStatement.NET_PROFIT_MARGIN, 
				];
		},
		
		getLeverageRatioIdsArray : function() {
			return [
				PeriodStmts.DEBT_TO_EQUITY_RATIO, 
				PeriodStmts.DEBT_RATIO, 
				PeriodStmts.DEBT_TO_CASH_RATIO 
				];
		},
		
		getOtherCriteriaArray : function() {
			return [
			        PeriodStmts.BOOK_VALUE_PER_SHARE
			        ];
			
		}
		
	}
	
})();

com.fa.RatioAnalysisSection = (function(){
	
	//private variable
	var elemIdToCriteriMap = {'liquidityTable' : com.fa.EnumCriteria.getLiquidityCriteriaIdsArray(),
			'assetMgmtTable' : com.fa.EnumCriteria.getAssetMgmtRatioIdsArray(),
			'profitabilityTable' : com.fa.EnumCriteria.getProfitabilityIdsArray(),
			'leverageTable' : com.fa.EnumCriteria.getLeverageRatioIdsArray(),
			'otherCriteriaTable' : com.fa.EnumCriteria.getOtherCriteriaArray() 
	};
	var elemIdToTitleMap = {'liquidityTable' : 'Liquidity Ratios',
			'assetMgmtTable' : 'Asset Management Ratios',
			'profitabilityTable' : 'Profitability Ratios',
			'leverageTable' : 'Leverage Ratios',
			'otherCriteriaTable' : 'Other Criteria Ratios'
	};
	
	var reg_id = com.fa.getNextId();
	
	
	return {
		
		
		//init is called once
		init : function() {
			this.subscribeEvents();
			this.renderInit();
			
		},
	
		getId: function() {
			return reg_id;
		},
		
		subscribeEvents: function() {
			if(com.fa.events.ModifyThresholdsEvent) {
				com.fa.events.ModifyThresholdsEvent.subscribe(reg_id, this, this.on_modify_thresholds);
			}
		},
		
		renderInit : function() {
			var $ratioAnalysisDiv = $('#ratioAnalysisDiv');
			$ratioAnalysisDiv.empty();
			
			var me = this;
			
			
			
			var $secHdr = $("<div class='section_hdr'>Ratio Analysis (Recent Quarter)</div>");
			$ratioAnalysisDiv.append($secHdr);
//			$secHdr.append($("<div class='leftElement'></div>"));
//			$secHdr.append($("<div class='rightElement'></div>").append($modifyThresholds)).append($("<div class='clearBothElement'></div>"));
			
			//Draw each table under Ratio Analysis
			for(var elemId in elemIdToCriteriMap) {
				//check for existence
				if($('#'+elemId).length == 0) {
					var $ratioTitleDiv = $('<div class="f3 mt" style=""></div>');
					//<a id="dlglink_profitabilityTable" href="#">Modify Thresholds</a>
					var $modifyThresholds = $(' <a style="margin-left:10px" href="#" key="' + elemId + '" title="Click to set the thresholds"><img style="" src="images/arrow_ug.png"></img>/<img style="" src="images/arrow_dr.png"></img></a>').click(function(){
						//key is elemId
						me.openThresholdsDlg($(this).attr("key"));
						return false;
					});
					$ratioAnalysisDiv.append($ratioTitleDiv);
					$ratioTitleDiv.append(elemIdToTitleMap[elemId]);
					$ratioTitleDiv.append($modifyThresholds);
					$ratioAnalysisDiv.append($('<div id="' + elemId + '"></div>'));
				}
			}
			
			this.drawCharts();
		},
		
		
		drawCharts : function() {
			for(var elemId in elemIdToCriteriMap) {
				var tableJson = this._buildTableJson(elemIdToCriteriMap[elemId]);
				if(tableJson) {
					this._drawChart(elemId, tableJson);
				}
			}
		},
		
		on_modify_thresholds: function(sender, faEvent) {
			var formData = {};
			if(faEvent.data && faEvent.data instanceof Array) {
				for(var i=0; i<faEvent.data.length; i++) {
					var formName = faEvent.data[i].fn;
					var formValue = faEvent.data[i].v;
					formData[formName] = formValue
				}
			}
			
			//save the control prefs
			$.getJSON(com.fa.Global.prefixPath + "/watchlist/applyThresholdControlPrefs", formData,
					function(jsonObj) {
		    			if(jsonObj) {
		    				$('#dialog').controlsdialog({controls:jsonObj, okEvt: com.fa.events.ModifyThresholdsEvent});			
		    			}
	    			});
			
			//com.fa.utils.log('info', eventArgs.getName());
			com.fa.EnumCriteria.updateThresholds(faEvent.data);
			this.drawCharts();
		},
		
		
		openLiquidRatioPrefsDlg : function() {
			//open dialog as overlay??? with processing symbol
			
			//make an ajax call
			
			//get the data json and create the dialog
			
			$.getJSON(com.fa.Global.prefixPath + "/watchlist/getLiquidRatioPrefs", {},
					function(jsonObj) {
		    			if(jsonObj) {
		    				$('#dialog').controlsdialog({controls:jsonObj, okEvt: com.fa.events.ModifyThresholdsEvent});			
		    			}
	    			});
			
			
		},
		
		openThresholdsDlg : function(elemId) {
			//open dialog as overlay??? with processing symbol
			
			//make an ajax call
			
			//get the data json and create the dialog
			
			var path = "/watchlist/getThresholdControlPrefs";
			if(elemId) {
				switch (elemId) {
				case 'liquidityTable':
					path = "/watchlist/getLiquidRatioPrefs";
					break;

				case 'assetMgmtTable':
				path = "/watchlist/getAssetMgmtRatioPrefs";
					break;
				
				case 'profitabilityTable':
					path = "/watchlist/getProfitbailityRatioPrefs";
					break;
				
				case 'leverageTable':
					path = "/watchlist/getLeverageRatioPrefs";
					break;
				}
				
			}			
			
			$.getJSON(com.fa.Global.prefixPath + path, {},
					function(jsonObj) {
		    			if(jsonObj) {
		    				$('#dialog').controlsdialog({controls:jsonObj, okEvt: com.fa.events.ModifyThresholdsEvent});			
		    			}
	    			});
			
			
		},
		
		_drawChart : function(chartDivId, tableJson) {
			var thresholds = com.fa.EnumCriteria.getThresholds();
			var data = this._convertToGoogVizFormat(tableJson, thresholds);
			var chartDiv = document.getElementById(chartDivId);
			var chart = new google.visualization.Table(chartDiv);
			var chartTitle = 'Ratio Analysis';
//			data.setTableProperty('className', 'ratioAnalysisTable');, //does not seem to work
			chart.draw(data, {showRowNumber: true, width:'800px', allowHtml:true});
		},
		
		_buildTableJson : function(criteria) {
			/*
			var jsonObj = {'tdata' : [
			                           {'n':'STV', 'd':'China Digital TV', 'r':{'cr':0.8, 'qr':1.5, 'cd':25, 'ccl':1.6}},
			                           {'n':'CSIQ', 'd':'China Digital TV', 'r':{'cr':1.5, 'qr':4, 'cd':5, 'ccl':32}},
			                           {'n':'MFST', 'd':'China Digital TV', 'r':{'cr':5.6, 'qr':4.2, 'cd':67, 'ccl':11}}
			                           ],
			                  'hdrsDefn' : {'n':'Ticker', 'd':'Company Name','len': 4, 'r':{'cr':'Current Ratio', 'qr':'Quick Ratio', 'cd':'Cash to Debt', 'ccl':'Cash to Current Liability'}}
							};*/
	
			var instance = com.fa.model.companies.getInstance();
			var tickersArray = com.fa.model.prefTickers;
			
			var jsonObj = {};
			jsonObj.tdata = [];
			
			
			for(var i=0; i<tickersArray.length; i++) {
				var tickerObj = {};
				tickerObj.n = tickersArray[i];
				tickerObj.d = instance.getName(tickersArray[i]);
				tickerObj.r = {};
				if(!instance.sheetExists(tickersArray[i]))continue;
				var periodType = PeriodStmts.PERIOD_INTERIM;
				var periodStmts = PeriodStmts.getStmts(periodType,tickersArray[i]);
				for(var j=0; j<criteria.length; j++) {
					var val = periodStmts.getFinParamValue(criteria[j], 0);
					tickerObj.r[criteria[j]] = val;
				}
				jsonObj.tdata.push(tickerObj);
			}
			
			jsonObj.hdrsDefn = {};
			jsonObj.hdrsDefn.n = 'Ticker';
			jsonObj.hdrsDefn.d = 'Company Name';
			jsonObj.hdrsDefn.len = criteria.length;
			jsonObj.hdrsDefn.r = {};
			
			//get the criteria mapper
			var critIdToLabelMap = com.fa.EnumCriteria.getCriteriaIdToLabelMap();
			for(var id in criteria) {
				var label = critIdToLabelMap[criteria[id]];
				jsonObj.hdrsDefn.r[criteria[id]] = label;
			}
			
			return jsonObj;
		},
		
		_convertToGoogVizFormat : function(jsonObj, thresholds) {
			/**
			  [{n:'STV', d:'China Digital TV', r:{cr:32, qr:31, cd:232, ccl:32}},
			  {n:'CSIQ', d:'China Digital TV', r:{cr:32, qr:31, cd:232, ccl:32}},
			  {n:'MFST', d:'China Digital TV', r:{cr:32, qr:31, cd:232, ccl:32}}]
			 */
			
			/**
			var jsonObj = {'tdata' : [
			                           {'n':'STV', 'd':'China Digital TV', 'r':{'cr':0.8, 'qr':1.5, 'cd':25, 'ccl':1.6}},
			                           {'n':'CSIQ', 'd':'China Digital TV', 'r':{'cr':1.5, 'qr':4, 'cd':5, 'ccl':32}},
			                           {'n':'MFST', 'd':'China Digital TV', 'r':{'cr':5.6, 'qr':4.2, 'cd':67, 'ccl':11}}
			                           ],
			                  'hdrsDefn' : {'n':'Ratios', 'd':'Ratios', 't':'string', 'len': 4, 'r':{'cr':'Current Ratio', 'qr':'Quick Ratio', 'cd':'Cash to Debt', 'ccl':'Cash to Current Liability'}}
							};
			**/
			
			if(!jsonObj) return;
			
			var data = new google.visualization.DataTable();
			var headers = jsonObj.hdrsDefn;
			var title = headers && (headers.d + '(' + headers.n + ')') || '';
			var tickersData = jsonObj.tdata;
			data.addColumn('string', title);
			
			//for each series starting with
			var i=0;
			var labels = jsonObj.hdrsDefn.r;
			var labelKeysArray = []; /** to store the order **/
			for(var id in labels) {
				data.addColumn('number', labels[id], id);
				labelKeysArray.push(id);
				i++;
			}
			data.addRows(tickersData.length);
			
			for(var i=0; i<tickersData.length; i++) {
				//company name and ticker
				data.setValue(i, 0, tickersData[i].d + '(' +tickersData[i].n + ')');
			}
			
			//for each ticker: cheat by setting data values according to the thresholds and then reapply the correct values
			for(var j=0; j<tickersData.length; j++) {
				var vals = tickersData[j].r;
				for(var i=0; i<labelKeysArray.length; i++) {
					var id = labelKeysArray[i];
					if(thresholds[id]) {
						var b = thresholds[id];
						if(b.rev) {
							if(vals[id]<=b.v) {
								data.setValue(j, i+1, b.v+1);
							} else {
								data.setValue(j, i+1, b.v-1);
							}
						} else {
							if(vals[id]>=b.v) {
								data.setValue(j, i+1, b.v+1);
							} else {
								data.setValue(j, i+1, b.v-1);
							}
						}
					}
				}
			}
			
			//apply formatter to the cheated values
			for(var columnIndex=0; columnIndex<data.getNumberOfColumns(); columnIndex++) {
				var id = data.getColumnId(columnIndex);
				if(thresholds[id]) {
					var b = thresholds[id];
					var formatter = new google.visualization.ArrowFormat({base: b.v});
					formatter.format(data, columnIndex);
				}
			}
			
			//for each ticker apply the correct values now
			for(var j=0; j<tickersData.length; j++) {
				var vals = tickersData[j].r;
				for(var i=0; i<labelKeysArray.length; i++) {
					var id = labelKeysArray[i];
					data.setValue(j, i+1, vals[id]);
				}
			}
			
			return data;
		}
	}
	
})();
			
com.fa.PreferredTickersTable = (function(){
	
	var rowTemplate = "<tr name=\"@t@\" class=\"comp_table_row\">\r\n" + 
			"	<td name='ticker'>@a@</td>\r\n" + 
			"	<td name='desc'>@n@</td>\r\n" + 
			"	<td name='price'>@p@</td>\r\n" + 
			"	<td name='bvps'>@bvps@</td>\r\n" + 
			"</tr>";
	
	var headerTemplate = "<tr class='comp_table_hdr' name=\"hdrs\">\r\n" + 
			"	<th name=\"ticker\">Ticker Id</th>\r\n" + 
			"	<th name=\"desc\">Company Name</th>\r\n" + 
			"	<th name=\"price\">Last Stock Price</th>\r\n" +
			"	<th name=\"bvps\">Book Value Price</th>\r\n" +
			"</tr>";
	var tableTemplate = "<table></table>";
	
	var $table = null;
	var $trsMap = [];
	
	var buildRowStrFromTemplate = function(map) {
		var rowStr = rowTemplate;
		for(var  key in map) {
			var id = '@' + key + '@';
			var val = map[key];
			rowStr = rowStr.replace(new RegExp(id, 'g'), val);
		}
		return rowStr; 
	};
	
	return {
		
		render : function(tickersArray, divToAppendSelector) {
			this.$buildTable(tickersArray, divToAppendSelector);
		},
		
		$buildTable : function(tickersArray, divToAppendSelector) {
			$(divToAppendSelector).empty();
			
			$(divToAppendSelector).append('<div class="section_hdr">Stock Prices for Compared Companies</div>')
			var $table = $(tableTemplate);
			var $hdr = $(headerTemplate);
			$table.append($hdr);
			
			for(var i=0; i<tickersArray.length; i++) {
				var note = tickersArray[i];
				
				var instance = com.fa.model.companies.getInstance();
				var data = {};
				
				data.t = note;
				var url = "/finAnalyzer.jsp?stockTickerSymbol=" + note;
				data.a = '<a target = "_blank" href="' + url + '">'+ note + '</a>';
				data.n = instance.getName(note);
				data.p = instance.getPrice(note);
				
				var $row = $(buildRowStrFromTemplate(data));
				$table.append($row);
				$trsMap[note] = $row;
			}
			$(divToAppendSelector).append($table);
		},
		
		/**{'ticker: 'STV', 'bvps': '4.55'} **/
		updateBVPS : function(jsonArray) {
			for(var i=0; i<jsonArray.length; i++) {
				var ticker = jsonArray[i]['ticker'];
				var bvps = jsonArray[i]['bvps'];
				if($trsMap[ticker]) {
					var $row = $trsMap[ticker];
					var $td = $row.find('td[name="bvps"]');
					$td.html(bvps);
				}
			}
		}
		
	}
	
})();


//recent tickers section
com.fa.RecentTickersSection = (function() {
	
	//model private variables
	var tickersJsonArray = [];
	var idsToRemove = [];
	var divSelector = '#recentTickersDiv';

	
	//json keys
	var SHORT_DESC = 'sd';
	var LONG_DESC = 'ld';
	var TICKERS = 't';
	var ID = 'id';
	
	//ui private variables
	var trs = null;
	return {

		init : function(theJsonArray) {
			for(var i=0; i<theJsonArray.length; i++) {
				tickersJsonArray[theJsonArray[i][ID]] = theJsonArray[i];
			}
			this.renderInit();
		},
		
		//model
		add : function(theJson) {
		
		},
		
		remove : function(theIds /** id array*/) {
			idsToRemove.push(theIds);
		},
		
		setShortDesc : function(id, desc) {
			if(!tickersJsonArray[id]) {
				com.fa.utils.log("error", "id for recent ticker section ticker " + id + " is not available");
				return;
			}
			if(!desc) {
				com.fa.utils.log("error", "desc for recent ticker section ticker is undefined");
				return;
			}
			tickersJsonArray[id][SHORT_DESC] = desc;
			renderShortDesc(id, desc);
		},
		
		setLongDesc : function(id) {
			
		},
		
		
		//UI part
		renderInit : function() {
			var shortDetailsClass = "shortDetails";
			var tickersClass = "tickers";
			
			$(divSelector).empty();
			
			var $table = $('<table></table>');
			var headers = "<tr>\r\n" + 
			"					<th>Short Desc</th>\r\n" + 
			"					<th>Tickers for comparision</th>\r\n" + 
			"					<th><input type='button' id='loadBtn' value='Load Graphs'/></th>\r\n" + 
			"					<th><button>Delete</button></th>\r\n" + 
			"					</tr>";

			$table[0].appendChild($(headers)[0]);
			for(var i in tickersJsonArray) {
				var cssClass = i%2 == 0 ? 'r0' : 'r1';
				var row = $('<tr class=' + cssClass + '></tr>');
				$table.append(row);
				var $td = $('<td class="' + shortDetailsClass + '">' + tickersJsonArray[i][SHORT_DESC] + '</td>');
				row.append($td);
				$td = $('<td class="' + tickersClass + '"></td>');
				row.append($td);
				$td.append(com.fa.uicontrols.get$LabelTextField(tickersJsonArray[i][TICKERS]));
				row.append(('<td><input type="radio" name="selectRadio"' + 'id=' + tickersJsonArray[i][ID] + '></td>'));
				row.append(('<td><input type="checkbox" name="deleteHistCheck"' +  'id=' + tickersJsonArray[i][ID] + '></td>'));
			}
			$table.appendTo(divSelector);
		},
		
		renderAndGetShortDescDiv : function(id, desc) {
			
		}
	}
})();


