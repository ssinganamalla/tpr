
var SELECT_SECTOR_CLASS = 'selectSector';
$(function() {
	$("#expandBrokerStockData").show();
	$("#transactionDiv").hide();
	
   // code to execute when the DOM is ready
   $("#addTransaction a").toggle(function(e){
			$("#transactionDiv").show('slow');
	   }, function(e){
		   e.preventDefault();
			$("#transactionDiv").hide('fast');
		   });
   
   $("#updateBrokerStockDataBtn").click(com.fa.controller.performance.updateBrokerStockDataClicked);
   $("#addStockTrans").click(com.fa.controller.performance.addStockClicked);
   com.fa.ui.performance.init();

   $("#cancelNote").click( function() {
		   $("#transactionDiv").hide('fast');
		   $("#transactionDiv").val('');
   		}
   );
   
   $("#sectorOption").change(function(){
	   com.fa.controller.performance.drawSectorPie();
   });
   
   $("#selectbrokerId").change(function() {
	   var allTickersArray = $('#tickersData').data('alltickers');
	   
	   var tickersArray = new Array();
	   if($('#selectbrokerId').val() == '-1') {
		   tickersArray = allTickersArray;
	   } else {
		   for(var i=0; i<allTickersArray.length; i++) {
			   var ticker = allTickersArray[i];
			   if(ticker.bi == $('#selectbrokerId').val()) {
				   tickersArray.push(ticker);
			   }
		   }
	   }
	   
	   $('#tickersData').data('tickers', tickersArray);
	   com.fa.ui.performance.buildHoldingsTable();
	   com.fa.controller.performance.drawSectorPie();
   });
   
  // $("div.rightElement .renderSectorDistribution").attr('disabled', 'false');
   
   $("div.rightElement .renderSectorDistribution").click(function(){
	   com.fa.controller.performance.drawSectorPie();
   });
 });


com.fa.ui.performance = (function(){
	
	var buildThead = function() {
		var $thead = "<thead>\r\n" + 
				"		<tr class=\"portfolio-header-row\">\r\n" + 
				"			<th class=\"\">Name</th>\r\n" + 
				"			<th class=\"\">Symbol</th>\r\n" + 
				"			<th class=\"\">Broker</th>\r\n" + 
				"			<th class=\"\">Sector</th>\r\n" + 
				"			<th class=\"\">Shares</th>\r\n" + 
				"			<th class=\"\">Cost basis</th>\r\n" + 
				"			<th class=\"\">Total Cost</th>\r\n" + 
				//"			<th class=\"\">Mkt value</th>\r\n" + 
				//"			<th class=\"\">Gain</th>\r\n" + 
				"		</tr>\r\n" + 
				"	</thead>"; 
		return $thead;
	 
	};
 
	var buildTBody = function(ticker) {
	 
		 var $tr = $('<tr></tr>');
		 var $tdTitle = $('<td></td>');
		 	$tdTitle.append(ticker.sb);
		 	 var $tdBroker = $('<td></td>');
		 	$tdBroker.append(com.fa.Constants.toBrokerName(ticker.bi));
		 var $tdTicker = $('<td></td>');
		 	$tdTicker.append(ticker.tinfo ? ticker.tinfo.cn : "-");
		 var $tdSector = $('<td></td>');
		 /**
		 	var $sectorOption = $("<select class='" + SELECT_SECTOR_CLASS + "' id='sector" + ticker.sb + "'></select>");
		 	var enumSectorMap = com.fa.controller.performance.getEnumSectorsMap();
		 	for(var i in enumSectorMap) {
		 		var $option = $('<option value="' + i  + '"></option>');
		 		$option.append(enumSectorMap[i]);
		 		$sectorOption.append($option);
		 	}**/
		 	$tdSector.append(ticker.tinfo ? ticker.tinfo.sn : "-");
		 var $tdQty = $('<td></td>');
		 	$tdQty.append(ticker.q);
		 var $tdCostBasis = $('<td></td>');
		 	$tdCostBasis.append(ticker.cb);
		 var $tdTotalCostBasis = $('<td></td>');
		 $tdTotalCostBasis.append(ticker.tcb);	
		 	
		 var $tdMktValue = $('<td></td>');
		 	$tdMktValue.append(ticker.mv);
		 var $tdGain = $('<td></td>');
		 	$tdGain.append(ticker.gl);
	    
		$tr.append($tdTicker); 	
	    $tr.append($tdTitle);	    
	    $tr.append($tdBroker);
	    $tr.append($tdSector);
	    $tr.append($tdQty);
	    $tr.append($tdCostBasis);
	    $tr.append($tdTotalCostBasis);
	   // $tr.append($tdMktValue);
	    //$tr.append($tdGain);
	
	    return $tr;	 
		 
	 };
	 
	 
	
	return {
		
		init: function() {
			$('#stockTickerSymbol_addTrans').finsearchbox({});
		},
		
		setup: function() {
			
			
		},
		
		buildHoldingsTable: function(tickersArray) {
			var tickersArray = $('#tickersData').data('tickers');
			if(!tickersArray) return;			
			$('#pf-view-table').empty();
			if(tickersArray.length == 0) {
				$('#pf-view-table').append("<div style=\"border:1px solid gray; padding:25px;\">No data available for this Broker</div>");
				return;
			}
			
			var $table = $('<table id="pf-table" class="tablesorter"></table>');			
			$table.append(buildThead());
			var $tbody = $('<tbody></tbody>');
			$table.append($tbody);
			for(var i=0; i<tickersArray.length; i++) {
				var $tr = buildTBody(tickersArray[i]);
				$tbody.append($tr);
			}
			
			$('#pf-view-table').append($table);
			$table.tablesorter();
		},
	
		addToHoldingsTable: function(ticker) {
			var tickersArray = $('#tickersData').data('tickers');
			if(!tickersArray) {
				$('#tickersData').data('tickers', [ticker]);
			} else {
				tickersArray.push(ticker);
			}
			com.fa.ui.performance.buildHoldingsTable();
		},
		
		deleteFromHoldingsTable:function(ticker) {
			var tickersArray = $('#tickersData').data('tickers');
			
			if(tickersArray) {
				var newTickersArray = [];
				for(_ticker in tickersArray) {
					if(_ticker.sb != ticker.sb) {
						newTickersArray.push(_ticker);
					}
				}
				$('#tickersData').data('tickers', newTickersArray);
				com.fa.ui.performance.buildHoldingsTable();
			} 
		},
		
		
		buildAddHoldingsTable:function() {
			
		},
		
		editHoldingsTable:function() {
			
			
		}
	}
	
})();

com.fa.controller.performance = (function(){
	
	var getRelevantTickerInput = function(ticker) {
		
		var val = $('#sectorOption').val();
		switch (Number(val)) {
		case com.fa.Constants.COST_BASIS:
			return Number(ticker.tcb);
			break;
		case com.fa.Constants.GAIN_LOSS:
			return ticker.gl;
			
		case com.fa.Constants.MARKET_VALUE:
			return ticker.mv;
		}
		return ticker.tcb;
	};
	
	var getCriteriaLabel = function() {
		
		var val = $('#sectorOption').val();
		switch (Number(val)) {
		case com.fa.Constants.COST_BASIS:
			return 'Cost Basis';
			break;
		case com.fa.Constants.GAIN_LOSS:
			return 'Gain Loss';
			
		case com.fa.Constants.MARKET_VALUE:
			return 'Market Value';
		}
		return 'Cost Basis';
	};
	
	return {
		
		
		//move outside to a 
		getEnumSectorsMap : function() {
			return {0:' Basic Materials', 1:'Capital Goods', 2: 'Conglomerates', 3:'Consumer Cyclical', 4:'Consumer/Non-Cyclical', 5:'Energy', 
				   6:'Financial', 7:'Healthcare', 8:'Services', 9:'Technology', 10:'Transportation', 11:'Utilities', 12: 'Solar', 13: "Chinese Smallcap", 14: "Indian"};
		},
		
		getSelectSectorClass : function() {
			return 'selectSector'
		},
		updateBrokerStockDataClicked : function(event) {
			var noteVal = $("#brokerStockDataTxtArea").val();
			
			$.post("/struts/performance/updateBrokerData", {brokerStockData: noteVal, brokerId:0},
					function(responseJson) {
						var tickersArray = eval( '(' + responseJson + ')' );
						$('#tickersData').data('tickers', tickersArray);
						com.fa.ui.performance.buildHoldingsTable();
						com.fa.controller.performance.drawSectorPie();						
					}
			);
		
		},
		
		
		addStockClicked : function(event) {
			var numShares = $("#add_shares").val();
			var addprice = $("#add_price").val();
			var addCommission = $("#add_commission").val();
			var addNotes = $("add_notes");
			var ticker = $("#stockTickerSymbol_addTrans").finsearchbox("option", "shortVal");
			var dateString = $("#add_date").val();
			var dateFormat = $("#add_date").datepicker("option", "dateFormat");
			var brokerId = $("#brokerId").val();
			var transactionType = $("#add_ttype").val();
			
			
			$.post("/struts/performance/addPortfolioTicker", {symbol: ticker, costBasis:addprice,'commission':addCommission, 'transactionType': transactionType, 'brokerId':brokerId, quantity:numShares, datepickerFormat:dateFormat, dateString:dateString },
					function(responseJson) {
						var ticker = eval( '(' + responseJson + ')' );
						com.fa.ui.performance.addToHoldingsTable(ticker);
						com.fa.controller.performance.drawSectorPie();						
					}
			);
		
		},
		
		getPortfolioTickers : function() {
			$.post("/struts/performance/getPortfolioTickers", { },
					function(responseJson) {
						var allTickersArray = eval( '(' + responseJson + ')' );
						$('#tickersData').data('alltickers', allTickersArray);
						$('#tickersData').data('tickers', allTickersArray);
						
						com.fa.ui.performance.buildHoldingsTable();
						com.fa.controller.performance.drawSectorPie();						
					}
			);
		},
		
		updateTickerSectorsClicked : function(event) {
			var noteVal = $("#brokerStockDataTxtArea").val();
			
			$.post("/struts/performance/updateTickerSectors", {brokerStockData: noteVal, brokerId:0},
					function(responseJson) {
						var tickersArray = eval( '(' + responseJson + ')' );
						$('#tickersData').data('tickers', tickersArray);
						com.fa.ui.performance.buildHoldingsTable();
						com.fa.controller.performance.drawSectorPie();						
					}
			);
		
		},
		
		drawSectorPie : function() {

			var enumSectors = {0:' Basic Materials', 1:'Capital Goods', 2: 'Conglomerates', 3:'Consumer Cyclical', 4:'Consumer/Non-Cyclical', 5:'Energy', 
							   6:'Financial', 7:'Healthcare', 8:'Services', 9:'Technology', 10:'Transportation', 11:'Utilities', 12: 'Solar', 13: "Chinese Smallcap", 14: "Indian"};
			
			var tickersArray = $('#tickersData').data('tickers');
			
			if(tickersArray.length < 1) {
				console.log('No data to draw the sector pie');
				return;
			}
			
			var sectors = [];
			for(var m=0; m<tickersArray.length; m++) {
				
				var ticker = tickersArray[m];
				var i = ticker.tinfo ? ticker.tinfo.si : -1;
				if(!sectors[i]) {
					sectors[i] = getRelevantTickerInput(ticker); 
				} else {
					sectors[i] = sectors[i] + getRelevantTickerInput(ticker);  
				}
			}
			
	        var data = new google.visualization.DataTable();
	        data.addColumn('string', 'Sector');
	        data.addColumn('number', getCriteriaLabel());
	        data.addRows(sectors.length);
	        
	        for(var i=0; i<sectors.length; i++) {
	        	data.setValue(i, 0, enumSectors[i]);
	            data.setValue(i, 1, sectors[i] ? sectors[i] : 0);        	
	        }

	        var val = $('#sectorOption').val();
	        
	        switch (Number(val)) {
				case com.fa.Constants.COST_BASIS:
					var chart = new google.visualization.PieChart(document.getElementById('sectorChart'));
			        chart.draw(data, {width: 400, height: 300, title: 'Sector Cost Basis Allocation'});
			        break;    
				case com.fa.Constants.MARKET_VALUE:
					var chart = new google.visualization.PieChart(document.getElementById('sectorChart'));
			        chart.draw(data, {width: 400, height: 300, title: 'Sector Market Value'});
					break;
				case com.fa.Constants.GAIN_LOSS:
					var chart = new google.visualization.ColumnChart(document.getElementById('sectorChart'));
			        chart.draw(data, {width: 400, height: 300, title: 'Sector Gain Loss'});
					break;				
			}
	        
	        //draw the adjacent sector pie
	        com.fa.controller.performance.drawSectorChart(1);
	        
	        google.visualization.events.addListener(chart, 'select', function() {
	        	var selection = chart.getSelection();
	        	for (var i = 0; i < selection.length; i++) {
	        		var item = selection[i];
	        		if(item.row != null) {
	        			console.log('row ' + item.row);
		        		//console.log('column ' + item.column);
		        		//item.row should be the sectorId
	        			com.fa.controller.performance.drawSectorChart(item.row);
	        		}
	        		
	        	}
	        });	        
	        
	        
	        
	        
	     },
	     
	     drawSectorChart : function(sectorId) {

				var enumSectors = {0:' Basic Materials', 1:'Capital Goods', 2: 'Conglomerates', 3:'Consumer Cyclical', 4:'Consumer/Non-cyclical', 5:'Energy', 
								   6:'Financial', 7:'Healthcare', 8:'Services', 9:'Technology', 10:'Transportation', 11:'Utilities', 12: 'Solar', 13: "Chinese Smallcap", 14: "Indian"};
				
				var tickersArray = $('#tickersData').data('tickers');
				
				if(tickersArray.length < 1) {
					alert('No data to draw the sector pie');
					return;
				}
				
				var sectors = new Array();
				for(var m=0; m<tickersArray.length; m++) {
					
					var ticker = tickersArray[m];
					if(sectorId == (ticker.tinfo ? ticker.tinfo.si : -1)) {
						sectors.push(ticker);
					}
				}
				
		        var data = new google.visualization.DataTable();
		        data.addColumn('string', 'Ticker');
		        data.addColumn('number', 'Value');
		        data.addRows(sectors.length);
		        
		        for(var i=0; i<sectors.length; i++) {
		        	data.setValue(i, 0, sectors[i].sb);//symbol
		        	var tickerVal = getRelevantTickerInput(sectors[i]);
		            data.setValue(i, 1, tickerVal);        	
		        }
		        var val = $('#sectorOption').val();
		        
		        switch (Number(val)) {
					case com.fa.Constants.COST_BASIS:
						var chart = new google.visualization.PieChart(document.getElementById('dissectSectorChart'));
				        chart.draw(data, {width: 400, height: 300, title: 'Stocks for ' + '"' + enumSectors[sectorId] + '"' + ' Sector'});
				        break;    
					case com.fa.Constants.MARKET_VALUE:
						var chart = new google.visualization.PieChart(document.getElementById('dissectSectorChart'));
				        chart.draw(data, {width: 400, height: 300, title: 'Stocks for ' + '"' + enumSectors[sectorId] + '"' + ' Sector'});
						break;
					case com.fa.Constants.GAIN_LOSS:
						var chart = new google.visualization.ColumnChart(document.getElementById('dissectSectorChart'));
				        chart.draw(data, {width: 400, height: 300, title: 'Stocks for ' + '"' + enumSectors[sectorId] + '"' + ' Sector'});
						break;
					
				}	        
		        
		     },
		     
		     updateSectorValues : function(tickerSectorMap) {
		    	 var tickersArray = $('#tickersData').data('tickers');
		    	 for(var i=0; i< tickersArray.length; i++) {
		    		 var sectorId = tickerSectorMap[tickersArray[i].sb];
		    		 //sectorId of a calue 0 is valid
		    		 if(sectorId ==0 || sectorId) {
		    			 //update with the new sectorId
		    			 tickersArray[i].si = sectorId;
		    		 }		    		 
		    	 }		    	 
		     }
	};
	
	
})();