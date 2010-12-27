/** Models **/

com.fa.model = {
		
		setTypePeriodAndIndex : function(type, period, index) {
			//alert("setting the newType " + type + ", newPeriod " + period);
			this.prevType = this.type;
			this.prevPeriod = this.period;
			this.prevNaviIndex = this.index;
			
			this.type = type;
			this.period = period;
			this.index = index;
		},
		
		getType : function() {
			return this.type;
		},
		
		getPeriod : function() {
			return this.period;
		},
		getPrevType : function() {
			return this.prevType;
		},
		
		getPrevPeriod : function() {
			return this.prevPeriod;
		},
		
		getNaviIndex : function() {
			return this.index;
		}
		
};


com.fa.model.UserStockInfo = function(theSymbol, theCompanyName, theAvgPrice, theNumShares){
	var symbol = theSymbol;
	var companyName = theCompanyName;
	var avgPrice = theAvgPrice;
	var numShares = theNumShares;
	
	return {
		getSymbol : function() {
			return symbol;
		},
		getAvgPrice : function() {
			return avgPrice;
		},
		getCompanyName : function() {
			return companyName;
		},
		getNumShares : function() {
			return numShares;
		}
	};
}

com.fa.model.UserSectorInfo = function(theSectorId) {
	var sectorId = theSectorId;
	var stocks = new Array();
	
	return {
		addStockInfo : function(theSymbol, theAvgPrice, theNumShares) {
			var theCompanyName = "";    /** get the company name from the cache **/
			stocks.push(new com.fa.model.UserStockInfo(theSymbol, theCompanyName, theAvgPrice, theNumShares))
		},
		
		/**
		 * Returns an Array<com.fa.model.UserStockInfo>
		 */
		getStockList : function() {
			return stocks;
		}
		
	}
	
}

com.fa.model.error = function(str) {
	
	return {
		getString: function() {
			return str;
		}
		
	}
	
}

/** don't use this class directly: use com.fa.model.errors.getInstance **/
com.fa.model.errors = function() {
	var errs = [];
	return {
		addError: function(error) {
			if(typeof(error) == "string") {
				errs.push(new com.fa.model.error(error));
			} else {
				//type of com.fa.model.error
				errs.push(error);
			}
		},
		
		getErrors: function() {
			return errs;
		},
		
		emptyErrors: function() {
			errs = [];
			$('#errors').empty();
		},
		showErrors: function() {
			if($('#errors').length == 0) {
				com.fa.utils.log('error', '#errors div is not found, so cannot add the errors');
			}
			
			$('#errors').empty();
			$ul = $('<ul></ul>');
			for(var i=0; i<errs.length; i++) {
				var error = errs[i];
				var val = error.getString();
				$li = $('<li class="error_str">' + val + '</li>');
				$ul.append($li);
			}
			$('#errors').append($ul);
		}
	}
	
}

/**
 * model to store the companies info
 */
com.fa.model.companies = function() {
	
	var className = 'com.fa.model.companies';
	/** keys consists of tickers **/
	if(!window['companyArray']) {
		window['companyArray'] = [];
	}
	var companyArray = window['companyArray'];
	
	
	/** private helper functions **/
	var logNoCompanyTicker = function(companyTicker, theMethodName) {
		if(!companyTicker) {
			com.fa.utils.log('error',"companyTicker is not defined @@", 'com.fa.model.companies', theMethodName);
		}
	};
	
	var toCompanyArrayIndex = function(tickerSymbol) {
		return tickerSymbol.toUpperCase();
	};
	
	var getCompanyArray = function(tickerSymbol) {
		if(!tickerSymbol) return [];
		return companyArray[toCompanyArrayIndex(tickerSymbol)];
	};
	
	return {
		
		/**
		 * tickerInfo : {'name': name, 'ticker':ticker}
		 */
		addSheet : function(sheet, tickerInfo) {
			if(!tickerInfo.ticker) {
				com.fa.utils.log('error', "tickerInfo.ticker is false: com.fa.model.companies@@com.fa.model.companies");
				return;
			}
			
			var tick = toCompanyArrayIndex(tickerInfo.ticker);
			if(!companyArray[tick]) {
				companyArray[tick] = {};
			}
			
			if(!companyArray[tick].ticker) {
				companyArray[tick].ticker = tickerInfo.ticker && tickerInfo.ticker;
			}
			
			if(!companyArray[tick].sheets) {
				companyArray[tick].sheets = [];
			}
			if(sheet && sheet.containsData) {
				companyArray[tick].sheets[sheet.key] = sheet;
			}else {
				//already a sheet error, no need to add again
				if(companyArray[tick].sheets != 'SHEET_ERROR') {
					companyArray[tick].sheets = 'SHEET_ERROR';
					com.fa.model.errors.getInstance().addError("No financial data available for " + tickerInfo.ticker);
				}
			}
		},
		
		nameExists : function(tickerSymbol) {
			return companyArray[tickerSymbol] && (companyArray[tickerSymbol].name != null);
		},
		
		setName : function(tickerSymbol, name) {
			if(!companyArray[tickerSymbol]) {
				companyArray[tickerSymbol] = {};
			}
			companyArray[tickerSymbol].name = name; 
		},
		
		getName : function(tickerSymbol) {
			return companyArray[tickerSymbol].name || '';
		},
		
		setPrice : function(tickerSymbol, price) {
			if(!companyArray[tickerSymbol]) {
				companyArray[tickerSymbol] = {};
			}
			companyArray[tickerSymbol].price = price; 
		},
		
		getPrice : function(tickerSymbol) {
			return companyArray[tickerSymbol].price || '';
		},
		
		priceExists : function(tickerSymbol) {
			return companyArray[tickerSymbol.toUpperCase()] && companyArray[tickerSymbol.toUpperCase()].price != null;
		},
		
		sheetProcessed : function(tickerSymbol) {
			return this.sheetError(tickerSymbol) || this.sheetExists(tickerSymbol);
		},
		sheetError : function(tickerSymbol) {
			return companyArray[tickerSymbol.toUpperCase()] && companyArray[tickerSymbol.toUpperCase()].sheets == 'SHEET_ERROR';
		},
		
		sheetExists : function(tickerSymbol) {
			return companyArray[tickerSymbol.toUpperCase()] && companyArray[tickerSymbol.toUpperCase()].sheets != null && companyArray[tickerSymbol.toUpperCase()].sheets != 'SHEET_ERROR';
		},
		
		getSheets : function(companyTicker) {
			logNoCompanyTicker(companyTicker, 'getSheets');
			return getCompanyArray(companyTicker).sheets;
		},
		
		getInterimStmts : function(companyTicker) {
			return this.getPeriodStmts(companyTicker, PeriodStmts.PERIOD_INTERIM);
		},
		
		getAnnualStmts : function(companyTicker) {
			return this.getPeriodStmts(companyTicker, PeriodStmts.PERIOD_ANNUAL);
		},
		
		getPeriodStmts: function(companyTicker, period) {
			logNoCompanyTicker(companyTicker, 'getPeriodStmts');
			var sheets = getCompanyArray(companyTicker).sheets;
			if(!sheets) return null;
			
			var stmts = null;
	    	if(PeriodStmts.PERIOD_INTERIM == period) {
	    		stmts = new PeriodStmts(sheets[BalanceSheet.INTERIM],sheets[IncomeStatement.INTERIM], sheets[CashFlow.INTERIM], PeriodStmts.PERIOD_INTERIM);
			} else {
				stmts = new PeriodStmts(sheets[BalanceSheet.ANNUAL],sheets[IncomeStatement.ANNUAL], sheets[CashFlow.ANNUAL], PeriodStmts.PERIOD_ANNUAL);
			}
	    	return stmts;
		}
		
	}
	
	
}

com.fa.model.companies.getInstance  = function() {
	return com.fa.model.companies();
}

com.fa.model.errors.getInstance = function() {
	if(!window['com.fa.errors']) {
		window['com.fa.errors'] = new com.fa.model.errors();
	}
	return window['com.fa.errors'];
}

com.fa.model.compareStocksInfo = function() {
	/** PeriodStmts.PERIOD_INTERIM  or PeriodStmts.PERIOD_ANNUAL**/
	var type = PeriodStmts.PERIOD_INTERIM;
	var indicator = PeriodStmts.CURRENT_RATIO;
	var stocks = [];
	return {
		setType : function(theType) {
			type = theType;
		},
		
		getType : function() {
			return type;
		},
		
		setIndicator : function(theIndicator) {
			indicator = theIndicator;
		},
		
		getIndicator : function() {
			return indicator;
		},
		
		setStocks : function(theStocks) {
			stocks = theStocks;
		},
		
		getStocks : function() {
			return stocks;
		}
		
	}
	
}

com.fa.model.compareStocksInfo.getSingletonInstance = function() {
	var modelKey = 'compareStocksInfo';
	if(!window[modelKey]) {
		window[modelKey] = new com.fa.model.compareStocksInfo();
	}
	return window[modelKey];
}


com.fa.model.prefTickerInfo = function(symbol) {
	var exchange = "";
	var companyName = "";
	var loaded = false;
	
	return {
		
		set : function(exch, cname) {
			exchange = exch;
			companyName = cname;
			loaded = true;
		},
		
		isLoaded : function() {
			return loaded;
		},
		
		getExchange : function() {
			return exchange;
		},
		getCompanyName : function() {
			return companyName;
		},	
		
		getSymbol : function() {
			return symbol;
		}
	};
}

/** Array<com.fa.model.prefTickerInfo objects>**/
com.fa.model.prefTickerInfos = [];

com.fa.model.prefTickers = [];