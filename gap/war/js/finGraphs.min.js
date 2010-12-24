function StocksCompareGraphsDataCreator(theCompareStocksModel) {
	var tickersArray = theCompareStocksModel.getStocks();
	var type = theCompareStocksModel.getType();
	var indicatorKey = theCompareStocksModel.getIndicator();
	var chartDivId = 'selectedCriteriaChartDiv';
	return {
		getPeriodStmts: function(type, ticker) {
			return PeriodStmts.getStmts(type, ticker);
		},
		
		redrawChart : function() {
			var idselector = '#' + chartDivId;
			$(idselector).empty();
			this.drawChart();
		},
		
		drawChart: function() {
			/** {'id': seriesId, 'xArray': x[], 'yArray':y[], 'xtype':type, 'ytype':type} **/
			if(!indicatorKey) {
				indicatorKey =PeriodStmts.CURRENT_RATIO;
			}
			if(!type) {
				type = PeriodStmts.PERIOD_INTERIM;
			}
			var graphData = new GraphsData();
			var instance = com.fa.model.companies.getInstance();
			for(var i=0; i<tickersArray.length; i++) {
				if(!instance.sheetExists(tickersArray[i]))continue;
				var periodStmts = this.getPeriodStmts(type, tickersArray[i]);
				var seriesData = {};
				seriesData.id = tickersArray[i];
				seriesData.xtype = 'datestring';
				seriesData.yArray = periodStmts.getStmtsFinHealthIndicatorArray(indicatorKey);
				seriesData.ytype = 'number';
				graphData.addSeries(seriesData);
			}
			var data = graphData.getPlotDataInGoogVizFormat();
			var chart = new google.visualization.LineChart(document.getElementById(chartDivId));
			var chartTitle = this.getTitle(indicatorKey);
			
			window.setTimeout( function() {
				chart.draw(data, {width: 450, height: 300, title: chartTitle, legend:'right', curveType:'function', hAxis:null});
			},0)
		},
		
		getTitle : function(key) {
			var title = 'title@notdefined@getTitle@finGraphs.js';
			switch (key) {
			case PeriodStmts.CURRENT_RATIO:
				title = 'Current Ratio';
				break;
			case PeriodStmts.QUICK_TEST_RATIO:
				title = 'Quick Ratio';
				break;
			case PeriodStmts.INVENTORY_TURNS:
				title = 'Inventory Turns';
				break;
			case PeriodStmts.INVENTORY_TURNS_IN_DAYS:
				title = 'Inventory Turns in Days';
				break;
			case PeriodStmts.RECEIVABLE_TURN:
				title = 'Receivable Turns';
				break;
			case PeriodStmts.RECEIVABLE_TURN_IN_DAYS:
				title = 'Receivable Turn in Days';
				break;
			case PeriodStmts.RETURN_ON_TOTAL_ASSETS:
				title = 'Return on Total Assets';
				break;
			case PeriodStmts.RETURN_ON_EQUITY:
				title = 'Return on Equity';
				break;
			case PeriodStmts.OPERATING_CASH_TO_REVENUE:	
				title = 'Operating Cash to Sales/Rev';
				break;
			case IncomeStatement.GROSS_PROFIT_MARGIN:	
				title = 'Gross Profit Margin';
				break;
			case IncomeStatement.NET_PROFIT_MARGIN:	
				title = 'Net Profit Margin';
				break;
			case PeriodStmts.DEBT_TO_EQUITY_RATIO:	
				title = 'Debt to Equity Ratio';
				break;
			case PeriodStmts.DEBT_RATIO:	
				title = 'Debt to Assets Ratio';
				break;
			case PeriodStmts.CASH_TO_TOTAL_DEBT_RATIO:	
				title = 'Cash to Total Debt';
				break;
			case PeriodStmts.CASH_TO_CURRENT_LIABILITIES:	
				title = 'Cash to Current Liabilities';
				break;
			case PeriodStmts.DEBT_TO_CASH_RATIO:
				title = 'Debt to Cash Ratio';
				break
			}
			return title;
		}
	}
	
}


function GraphsData(){
	
	var mapOfSeriesData = []; 
	var superSetXAxisDataMap = []; /** order not guaranteed **/
	
	return {
		/**
		 * seriesData is a json object
		 * {'id': seriesId, 'xArray': x[], 'yArray':y[x], 'xtype':type, 'ytype':type}
		 * @param seriesData
		 */
		addSeries : function(seriesData) {
			if(!seriesData) {
				com.fa.utils.log('error', 'seriesData is undefined@@StmtsGraphData@@addSeries');
			}
			
			if(!seriesData.id) {
				com.fa.utils.log('error', 'seriesData.id is undefined@@StmtsGraphData@@addSeries');
			}
			if(mapOfSeriesData[seriesData.id] != null) {
				//why are you replacing the previously populated data for this series
				com.fa.utils.log('warn', 'seriesData for' + seriesData.id + 'is replaced by new seriesData@@StmtsGraphData@@addSeries');
			}
			mapOfSeriesData[seriesData.id] = seriesData;
		},
	
		/** 
		 * this method should be called after all the series data has been added by #addSeries
		 * This method reads all the x axis data for all the series and constructs a superset.
		 **/
		createSuperSetXAxisData : function() {
			//for each series data
			for(var id in mapOfSeriesData) {
				var seriesData = mapOfSeriesData[id];
				//extract the array of x
				var yArray = seriesData.yArray;
				for(var x in yArray) { 
					//add it to the superset if it does not exist
					if(!superSetXAxisDataMap[x]) {
						superSetXAxisDataMap[x] = 1; /** 1 suggests it exists **/
					}
				}
			}
		},
		
		getPlotDataInGoogVizFormat : function() {
			this.createSuperSetXAxisData();
			var superSetDateArray = new Array();
			var index = 0;
			for(var id in superSetXAxisDataMap) {
				superSetDateArray.push(id);  
			}
			
			//a,b are in the format 2005-12-30
			superSetDateArray.sort(function(a, b){
				var da = new Date();
				var groups = a.split('-', 3);
				var year = groups[0];
				var month = groups[1];
				var date = groups[2];
				da.setYear(year);
				da.setMonth(month);
				da.setDate(date);
				
				var db = new Date();
				groups = b.split('-', 3);
				year = groups[0];
				month = groups[1];
				date = groups[2];
				db.setYear(year);
				db.setMonth(month);
				db.setDate(date);
				
				return db.getTime() - da.getTime();   /** decreasing order, most recent first **/
			});
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Date');
			var numSeries = 0;
			var seriesIdArray = new Array();
			for(seriesId in mapOfSeriesData) {
				data.addColumn('number', seriesId);
				seriesIdArray.push(seriesId);
			}
			data.addRows(superSetDateArray.length);
			
			//xaxis, date axis
			for(var x=0; x<superSetDateArray.length; x++) {
				data.setValue(x, 0, superSetDateArray[x]);
			}
			
			//y values for each series
			for(var y=0; y<seriesIdArray.length; y++) {
				var seriesData = mapOfSeriesData[seriesIdArray[y]];
				var yDataArray = seriesData.yArray || [];
				for(x=0; x<superSetDateArray.length; x++) {
					if(yDataArray[superSetDateArray[x]] || yDataArray[superSetDateArray[x]] ==0) {
						data.setValue(x, y+1, yDataArray[superSetDateArray[x]]);
					} else {
						data.setValue(x, y+1, null);
					}
				}
			}
			
			return data; 
		}	
	}
}

function GraphsView() {
	
	return {
		
		drawChart : function(chartDivId, data) {
			if(chartDivId) {
				var chart = new google.visualization.BarChart(document.getElementById(chartDivId));
				chart.draw(data, {width: 700, height: 450, legend: 'bottom', title: 'Company Performance'});
			}
		}
		
	}
}
