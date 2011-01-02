
var SELECT_SECTOR_CLASS = 'selectSector';
$(function() {
	$("#expandBrokerStockData").show();
	$("#commentDiv").hide();
	
   // code to execute when the DOM is ready
   $("#addComment a").toggle(function(e){
			$("#commentDiv").show('slow');
	   }, function(e){
		   e.preventDefault();
			$("#commentDiv").hide('fast');
		   });
   
   $("#updateBrokerStockDataBtn").click(com.fa.controller.performance.updateBrokerStockDataClicked);
   $("#addStockTrans").click(com.fa.controller.performance.addStockClicked);
   com.fa.ui.performance.init();

   $("#cancelNote").click( function() {
		   $("#commentDiv").hide('fast');
		   $("#commentDiv").val('');
   		}
   );
   
   $("#sectorOption").change(function(){
	   com.fa.controller.performance.drawSectorPie();
   });
   
   $("div.rightElement .updateSectorIds").click(function(){
	   var tickerSymbolSectorIdMap = [];
	   var selector = "div#pf-view-table select." + SELECT_SECTOR_CLASS;
	   $(selector).each(function(index){
		   console.log($(this).attr('id') + $(this).val());
		   var tickerId = $(this).attr('id').substring(6); //remove 'sector'
		   tickerSymbolSectorIdMap[tickerId] = Number($(this).val());
	   });
	   $('#tickersData').data('tickerSymbolSectorIdMap', tickerSymbolSectorIdMap);
	   com.fa.controller.performance.updateSectorValues(tickerSymbolSectorIdMap);
	   
	   $("div.rightElement .renderSectorDistribution").removeAttr('disabled');
   	});
   
   $("div.rightElement .renderSectorDistribution").attr('disabled', 'true');
   
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
				"			<th class=\"\">Sector</th>\r\n" + 
				"			<th class=\"\">Shares</th>\r\n" + 
				"			<th class=\"\">Cost basis</th>\r\n" + 
				"			<th class=\"\">Mkt value</th>\r\n" + 
				"			<th class=\"\">Gain</th>\r\n" + 
				"		</tr>\r\n" + 
				"	</thead>"; 
		return $thead;
	 
	};
 
	var buildTBody = function(ticker) {
	 
		 var $tbody = $('<tbody></tbody>');
		 var $tr = $('<tr></tr>');
		 var $tdTitle = $('<td></td>');
		 	$tdTitle.append(ticker.sb);
		 var $tdTicker = $('<td></td>');
		 	$tdTicker.append(ticker.ds);
		 var $tdSector = $('<td></td>');
		 
		 	var $sectorOption = $("<select class='" + SELECT_SECTOR_CLASS + "' id='sector" + ticker.sb + "'></select>");
		 	var enumSectorMap = com.fa.controller.performance.getEnumSectorsMap();
		 	for(var i in enumSectorMap) {
		 		var $option = $('<option value="' + i  + '"></option>');
		 		$option.append(enumSectorMap[i]);
		 		$sectorOption.append($option);
		 	}
		 	
		 	$tdSector.append($sectorOption);
		 var $tdQty = $('<td></td>');
		 	$tdQty.append(ticker.q);
		 var $tdCostBasis = $('<td></td>');
		 	$tdCostBasis.append(ticker.cb);
		 var $tdMktValue = $('<td></td>');
		 	$tdMktValue.append(ticker.mv);
		 var $tdGain = $('<td></td>');
		 	$tdGain.append(ticker.gl);
	    	 
	    $tbody.append($tr);
	    $tr.append($tdTitle);
	    $tr.append($tdTicker);
	    $tr.append($tdSector);
	    $tr.append($tdQty);
	    $tr.append($tdCostBasis);
	    $tr.append($tdMktValue);
	    $tr.append($tdGain);
	
	    return $tbody;	 
		 
	 };
	 
	 
	
	return {
		
		init: function() {
			$('#stockTickerSymbol').finsearchbox({});
		},
		
		setup: function() {
			
			
		},
		
		buildHoldingsTable: function(tickersArray) {
			var tickersArray = $('#tickersData').data('tickers');
			if(!tickersArray) return;			
			if(tickersArray.length < 1) return;
			
			$('#pf-view-table').empty();
			var $table = $('<table id="pf-table"></table>');			
			$table.append(buildThead());
			for(var i=0; i<tickersArray.length; i++) {
				var $tbody = buildTBody(tickersArray[i]);
				$table.append($tbody);
			}
			
			$('#pf-view-table').append($table);
		},
	
		addToHoldingsTable: function(ticker) {
			var tickersArray = $('#tickersData').data('tickers');
			if(!tickersArray) {
				$('#tickersData').data('tickers', [ticker]);
			} else {
				tickersArray.push(ticker);
				com.fa.ui.performance.buildHoldingsTable();
			}
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
			return ticker.cb;
			break;
		case com.fa.Constants.GAIN_LOSS:
			return ticker.gl;
			
		case com.fa.Constants.MARKET_VALUE:
			return ticker.mv;
		}
		return ticker.cb;
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
		
		getEnumSectorsMap : function() {
			return {0:' Basic Materials', 1:'Capital Goods', 2: 'Conglomerates', 3:'Consumer Cyclical', 4:'Consumer Non cyclical', 5:'Energy', 
				   6:'Financial', 7:'Healthcare', 8:'Services', 9:'Technology', 10:'Transportation', 11:'Utilities'};
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
			var ticker = $("#stockTickerSymbol").finsearchbox("option", "shortVal");
			var dateString = $("#add_date").val();
			var dateFormat = $("#add_date").datepicker("option", "dateFormat");

			
			$.post("/struts/performance/addPortfolioTicker", {symbol: ticker, costBasis:addprice, brokerId:0, quantity:numShares, datepickerFormat:dateFormat, dateString:dateString },
					function(responseJson) {
						var ticker = eval( '(' + responseJson + ')' );
						com.fa.ui.performance.addToHoldingsTable(ticker);
						//com.fa.controller.performance.drawSectorPie();						
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

			var enumSectors = {0:' Basic Materials', 1:'Capital Goods', 2: 'Conglomerates', 3:'Consumer Cyclical', 4:'Consumer Non cyclical', 5:'Energy', 
							   6:'Financial', 7:'Healthcare', 8:'Services', 9:'Technology', 10:'Transportation', 11:'Utilities'};
			
			var tickersArray = $('#tickersData').data('tickers');
			
			if(tickersArray.length < 1) {
				alert('No data to draw the sector pie');
				return;
			}
			
			var sectors = [];
			for(var m=0; m<tickersArray.length; m++) {
				
				var ticker = tickersArray[m];
				var i = ticker.si;
				if(!sectors[i]) {
					sectors[i] = getRelevantTickerInput(ticker); 
				} else {
					sectors[i] = sectors[i] + getRelevantTickerInput(ticker);  
				}
			}
			
	        var data = new google.visualization.DataTable();
	        data.addColumn('string', 'Sector');
	        data.addColumn('number', getCriteriaLabel());
	        data.addRows(10);
	        
	        for(var i=0; i<10; i++) {
	        	data.setValue(i, 0, enumSectors[i]);
	            data.setValue(i, 1, sectors[i] ? sectors[i] : 0);        	
	        }

	        var val = $('#sectorOption').val();
	        
	        switch (Number(val)) {
				case com.fa.Constants.COST_BASIS:
					var chart = new google.visualization.PieChart(document.getElementById('sectorChart'));
			        chart.draw(data, {width: 450, height: 300, title: 'Sector Cost Basis Allocation'});
			        break;    
				case com.fa.Constants.MARKET_VALUE:
					var chart = new google.visualization.PieChart(document.getElementById('sectorChart'));
			        chart.draw(data, {width: 450, height: 300, title: 'Sector Market Value'});
					break;
				case com.fa.Constants.GAIN_LOSS:
					var chart = new google.visualization.ColumnChart(document.getElementById('sectorChart'));
			        chart.draw(data, {width: 450, height: 300, title: 'Sector Gain Loss'});
					break;				
			}
	        
	        google.visualization.events.addListener(chart, 'select', function() {
	        	var selection = chart.getSelection();
	        	for (var i = 0; i < selection.length; i++) {
	        		var item = selection[i];
	        		if(item.row != null && item.column != null) {
	        			console.log('row ' + item.row);
		        		console.log('column ' + item.column);
		        		//item.row should be the sectorId
	        			com.fa.controller.performance.drawSectorChart(item.row);
	        		}
	        		
	        	}
	        });	        
	        
	        
	        
	        
	     },
	     
	     drawSectorChart : function(sectorId) {

				var enumSectors = {0:' Basic Materials', 1:'Capital Goods', 2: 'Conglomerates', 3:'Consumer Cyclical', 4:'Consumer Non cyclical', 5:'Energy', 
								   6:'Financial', 7:'Healthcare', 8:'Services', 9:'Technology', 10:'Transportation', 11:'Utilities'};
				
				var tickersArray = $('#tickersData').data('tickers');
				
				if(tickersArray.length < 1) {
					alert('No data to draw the sector pie');
					return;
				}
				
				var sectors = new Array();
				for(var m=0; m<tickersArray.length; m++) {
					
					var ticker = tickersArray[m];
					if(sectorId == ticker.si) {
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
				        chart.draw(data, {width: 450, height: 300, title: 'Sector Cost Basis Allocation'});
				        break;    
					case com.fa.Constants.MARKET_VALUE:
						var chart = new google.visualization.PieChart(document.getElementById('dissectSectorChart'));
				        chart.draw(data, {width: 450, height: 300, title: 'Sector Market Value'});
						break;
					case com.fa.Constants.GAIN_LOSS:
						var chart = new google.visualization.ColumnChart(document.getElementById('dissectSectorChart'));
				        chart.draw(data, {width: 450, height: 300, title: 'Sector Gain Loss'});
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