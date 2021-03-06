var SheetFactory = {};
SheetFactory.createSheet = function(x){
	switch (x) {
	case BalanceSheet.ANNUAL:
	case BalanceSheet.INTERIM:
		return new BalanceSheet(x);
	case IncomeStatement.ANNUAL:
	case IncomeStatement.INTERIM:
		return new IncomeStatement(x);
	case CashFlow.ANNUAL:
	case CashFlow.INTERIM:
		return new CashFlow(x);
	}
	return null;
}

function Sheet() {
	/** this is set to true while parsing div if data exists **/
	this.containsData = false;
}

Sheet.prototype.parseHtml = function(id, finDiv, innerTextMap) {
	var sheet = com.fa.parseHtmlRows(id, finDiv, innerTextMap);
	this.val = sheet.val;
	this.n = sheet.n;
	this.name = sheet.name;
	this.ds = sheet.ds;
	this.containsData = sheet.containsData;
	this.da = null; /** array of dates implemented by each financial statement**/
	this.nm = null; /** array of numMonths implemented by cashflow and income statement **/
	this.curr = sheet.curr;
	this.da = this.ds && this.extractDates(this.ds);
	this.nm = this.ds && this.extractMonths(this.ds);
	this.fda = this.ds && this.extractFullDates(this.ds);
}

/** can be called from cashflow and income statement **/
Sheet.prototype.getNumDays = function(index) {
	var methodName = "getNumDays";
	if(this.nm == null) com.fa.utils.log("info", "this.nm is null. " + methodName);
	
	if(this.nm[index] == 12) return 365;
	if(this.nm[index] == 3) return 90;
	
	return this.nm[index]*30;
}

Sheet.prototype.getCurrency = function() {
	if('In Millions of USD' == this.curr)
		return 'mil of USD';
	else if(this.curr && this.curr.length>0)
		return this.curr;
	else //default
		return 'mil of USD';
}


Sheet.prototype.extractMonths = function (inputDates) {
	var dates = new Array();
	for(var i=0; i<inputDates.length; i++) {
		var monthRegexArray = inputDates[i].match(/(\d+)\s(months)/);
		if(monthRegexArray) {
			var month = monthRegexArray[1];
		} else {
			var weekRegexArray =  inputDates[i].match(/(\d+)\s(weeks)/);
			if(weekRegexArray) {
				var month = "" + this.toFixed( parseFloat(weekRegexArray[1])*12/52);
			}
		}
		dates.push(month);
	}
	return dates;
}

/**
 * dates are in the format ["As of 2008-12-31", "As of 2008-12-31"] for BalanceSheet
 * dates are in the format ["12 months ending 2007-12-31", "12 months ending 2007-12-31"] for IncomeStatement, Cashflow
 * @param dates array are in the format ["As of 2008-12-31", "As of 2008-12-31"] or ["12 months ending 2007-12-31", "12 months ending 2007-12-31"] 
 * @return a date array containing strings in the format ["08-12-31", "08-12-31"]
 */
Sheet.prototype.extractDates = function (inputDates) {
	var dates = new Array();
	for(var i=0; i<inputDates.length; i++) {
		var groups = inputDates[i].match(/(\d{4})-(\d{2})-(\d{2})/);
		var year = groups[1];
		var month = groups[2];
		var day = groups[3];
		dates.push(year.substring(2) + "-" + month);
	}
	return dates;
}
Sheet.prototype.extractFullDates = function (inputDates) {
	var dates = new Array();
	for(var i=0; i<inputDates.length; i++) {
		var groups = inputDates[i].match(/(\d{4})-(\d{2})-(\d{2})/);
		var year = groups[1];
		var month = groups[2];
		var day = groups[3];
		dates.push(year + "-" + month + "-" + day);
	}
	return dates;
}


Sheet.prototype.isEmpty = function() {
	var empty = true;
	for(var i in this.val) {
		empty = false;
		break;
	}
	return empty;
}


Sheet.prototype.fraction = function(val1, val2){
	if(val1 == 0) return 0;
	if(val2 == 0) {
		return NaN;
	}
	if(!val2) val2 = 1;
	return Number((val1/val2).toFixed(2));
}

Sheet.prototype.percent = function(val1, val2) {
	if(val1 == 0) return 0;
	if(val2 == 0) {
		return NaN;
	}
	if(!val2) val2 = 1;
	return Number((val1*100/val2).toFixed(2));
}

Sheet.prototype.toFixed = function(val1) {
	return Number((val1).toFixed(2));
}


function PeriodStmts(bal, inc, cas, period){
	this.bal = bal;
	this.inc = inc;
	this.cas = cas;
	this.period = period;
}
PeriodStmts.prototype = new Sheet();
PeriodStmts.prototype.constructor = PeriodStmts;


PeriodStmts.PERIOD_INTERIM = 'interim';
PeriodStmts.PERIOD_ANNUAL = 'annual';

PeriodStmts.BALANCE = 'bal';
PeriodStmts.INCOME = 'inc';
PeriodStmts.CASHFLOW = 'cas';

PeriodStmts.BOOK_VALUE_PER_SHARE = 'bvps';
PeriodStmts.CURRENT_RATIO = 'cr';
PeriodStmts.QUICK_TEST_RATIO = 'qtr';
PeriodStmts.DEBT_TO_EQUITY_RATIO = 'der';
PeriodStmts.OPERATING_CASH_TO_EQUITY_RATIO = 'ocer';
PeriodStmts.CASH_TO_TOTAL_DEBT_RATIO = 'ctdr';
PeriodStmts.DEBT_TO_CASH_RATIO = 'dtc';
PeriodStmts.CURR_LIABILITIES_TO_CASH = 'cltc';
PeriodStmts.CASH_TO_CURRENT_LIABILITIES = 'ctcl';
PeriodStmts.DEBT_RATIO = 'dr';
PeriodStmts.EQUITY_TO_DEB_RATIO = 'ebr';
PeriodStmts.INVENTORY_TO_CURRENT_ASSETS_RATIO = 'icar';
PeriodStmts.RETURN_ON_TOTAL_ASSETS = 'rta';
PeriodStmts.RETURN_ON_EQUITY = 'roe';
PeriodStmts.OPERATING_CASH_TO_REVENUE = 'ocr';
PeriodStmts.RECEIVABLE_TURN_IN_DAYS = 'rtd';
PeriodStmts.RECEIVABLE_TURN = 'rt';
PeriodStmts.INVENTORY_TURNS = 'it';
PeriodStmts.INVENTORY_TURNS_IN_DAYS = 'itd';


/**
 * @return 0, 1, 2
 */
PeriodStmts.getPeriodEnumIndex = function(type) {
	switch (type) {
		case PeriodStmts.PERIOD_INTERIM:
			return 0;
		case PeriodStmts.PERIOD_ANNUAL:
			return 1;
	}
}

/**
 * @return 0, 1, 2
 */
PeriodStmts.getTypeEnumIndex = function(type) {
	switch (type) {
		case PeriodStmts.BALANCE:
			return 0;
		case PeriodStmts.INCOME:
			return 1;
		case PeriodStmts.CASHFLOW:
			return 2;
	}
}


PeriodStmts.getStmts = function(type, ticker) {
	var stmts = null;
	switch (type) {
		case PeriodStmts.PERIOD_INTERIM:
			stmts = com.fa.model.companies.getInstance().getInterimStmts(ticker);
			break;
		case PeriodStmts.PERIOD_ANNUAL:
			stmts = com.fa.model.companies.getInstance().getAnnualStmts(ticker);
			break;
	}
	return stmts;
}

PeriodStmts.prototype.getStmtsFinHealthIndicatorArray = function(key) {
	var xyArray = null;
	var type = null;
	switch (key) {
	case PeriodStmts.CURRENT_RATIO:
	case PeriodStmts.QUICK_TEST_RATIO:
	case PeriodStmts.INVENTORY_TURNS:
	case PeriodStmts.INVENTORY_TURNS_IN_DAYS:
	case PeriodStmts.RECEIVABLE_TURN:
	case PeriodStmts.RECEIVABLE_TURN_IN_DAYS:
	case PeriodStmts.DEBT_RATIO:	
	case PeriodStmts.DEBT_TO_EQUITY_RATIO:
	case PeriodStmts.CASH_TO_TOTAL_DEBT_RATIO:
	case PeriodStmts.DEBT_TO_CASH_RATIO:
	case PeriodStmts.CASH_TO_CURRENT_LIABILITIES:
	case PeriodStmts.BOOK_VALUE_PER_SHARE:	
		type = PeriodStmts.BALANCE;
		break;
		
	case PeriodStmts.RETURN_ON_TOTAL_ASSETS:
	case PeriodStmts.RETURN_ON_EQUITY:
	case IncomeStatement.GROSS_PROFIT_MARGIN:	
	case IncomeStatement.NET_PROFIT_MARGIN:	
		type = PeriodStmts.INCOME;
		break;
	case PeriodStmts.OPERATING_CASH_TO_REVENUE:	
		type = PeriodStmts.CASHFLOW;
		break;
	}
	if(type) {
		return this.getParamXYArray(key, type);
	} else{
		com.fa.utils.log('key is undefined', 'PeriodStmts', 'getStmtsFinHealthIndicatorArray');
	}
	return null;
}


PeriodStmts.prototype.getValues = function(key) {
	var len = this.bal.val[BalanceSheet.TOTAL_ASSETS].length;
	var values = new Array();
	var value = null;
	for (var i = 0; i < len; i++) {
		switch (key) {
		case PeriodStmts.RETURN_ON_TOTAL_ASSETS:
			value = this.getReturnOnAssets(i);
			break;
		case PeriodStmts.RECEIVABLE_TURN:
			value = this.getReceivableTurn(i);
			break;
		}
		if (value != null) {
			var valueObj = { /*time*/'t':this.da[i], 'v' : value }
			values.push(valueObj);
		}
	}
	return values;

}

PeriodStmts.prototype.getBalSheet = function() {
	return this.bal;
}
PeriodStmts.prototype.getBalSheetLen = function() {
	return this.bal.val[BalanceSheet.TOTAL_CURRENT_ASSETS].length;
}
PeriodStmts.prototype.getIncStmt = function() {
	return this.inc;
}
PeriodStmts.prototype.getCashFlow = function() {
	return this.cas;
}



PeriodStmts.prototype.getInvTurns = function(index) {
	if (index + 1 <= this.bal.val[BalanceSheet.TOTAL_INVENTORY].length - 1) {
		var costOfRev = this.inc.val[IncomeStatement.TOTAL_COST_OF_REVENUE][index];
		var avgInv = (this.bal.val[BalanceSheet.TOTAL_INVENTORY][index] + this.bal.val[BalanceSheet.TOTAL_INVENTORY][index + 1]) / 2;
		return this.fraction(costOfRev, avgInv);

	}
	return null;
}

PeriodStmts.prototype.getInvTurnsInDays = function(index) {
	var turns = this.getInvTurns(index);
	var avgDays = (this.inc.getNumDays(index) + this.inc.getNumDays(index+1))/2;
	if(turns) {
		return this.fraction(avgDays, turns);
	}
	return null;
}

PeriodStmts.prototype.getReceivableTurns = function(index) {
	if (index + 1 <= this.bal.val[BalanceSheet.TOTAL_RECEIVABLES_NET].length - 1) {
		var totalRev = this.inc.val[IncomeStatement.TOTAL_REVENUE][index];
		var avgReceivables = (this.bal.val[BalanceSheet.TOTAL_RECEIVABLES_NET][index] + this.bal.val[BalanceSheet.TOTAL_RECEIVABLES_NET][index + 1]) / 2;
		var turns = this.fraction(totalRev, avgReceivables);
		return turns;
	}
	return null;
}

PeriodStmts.prototype.getReceivableTurnsInDays = function(index) {
	var turns = this.getReceivableTurns(index);
	var avgDays = (this.inc.getNumDays(index) + this.inc.getNumDays(index+1))/2;
	if(turns) {
		return this.fraction(avgDays, turns);
	}
	return null;
}

PeriodStmts.prototype.getReturnOnTotalAssets = function(index) {
	var ni = this.inc.val[IncomeStatement.NET_INCOME][index];
	var totalAssets = this.bal.val[BalanceSheet.TOTAL_ASSETS][index];
	var perc = this.percent(ni, totalAssets);

	return perc;
}
PeriodStmts.prototype.getReturnOnEquity = function(index) {
	var ni = this.inc.val[IncomeStatement.NET_INCOME][index];
	var eq = this.bal.getEquity(index);
	var perc = this.percent(ni, eq);
	
	return perc;
}

/** operating cash period might be different from revenue period, you would have to normalize **/
PeriodStmts.prototype.getOperatingCashToSales = function(index) {
	var oc = this.cas.getCashFromOperating(index);
	var sales = this.inc.getTotalRevenue(index);
	var ocfToSales = this.fraction(oc, sales);
	return ocfToSales;
}

PeriodStmts.prototype.getFinParamValue = function(key, index) {
	switch (key) {
	
	
		case PeriodStmts.CURRENT_RATIO:
			return this.getBalSheet().getCurrentRatio(index);
			break;
			
		case PeriodStmts.QUICK_TEST_RATIO:
			return this.getBalSheet().getQuickRatio(index);
			break;
			
		case PeriodStmts.INVENTORY_TURNS:
				return this.getInvTurns(index);
			break;
			
		case PeriodStmts.INVENTORY_TURNS_IN_DAYS:
			return this.getInvTurnsInDays(index);
			break;
		case PeriodStmts.RECEIVABLE_TURN:
			return this.getReceivableTurns(index);
			break;
		case PeriodStmts.RECEIVABLE_TURN_IN_DAYS:
			return this.getReceivableTurnsInDays(index);
			break;
			
		case PeriodStmts.RETURN_ON_TOTAL_ASSETS:
			return this.getReturnOnTotalAssets(index);
			break;
		case PeriodStmts.RETURN_ON_EQUITY:
			return this.getReturnOnEquity(index);
			break;
		case IncomeStatement.GROSS_PROFIT_MARGIN:
			return this.getIncStmt().getGrossProfitMargin(index);
			break;
		case IncomeStatement.NET_PROFIT_MARGIN:
			return this.getIncStmt().getNetProfitMargin(index);
			break;
		case PeriodStmts.DEBT_TO_EQUITY_RATIO:
			return this.getBalSheet().getTotalDebtToEquityRatio(index);
			break;
		case PeriodStmts.CASH_TO_TOTAL_DEBT_RATIO:
			return this.getBalSheet().getCashToTotalDebtRatio(index);
			break;
		case PeriodStmts.DEBT_TO_CASH_RATIO:
			return this.getBalSheet().getTotalDebtToCashRatio(index);
			break;
		case PeriodStmts.CASH_TO_CURRENT_LIABILITIES:
			return this.getBalSheet().getCashToCurrLiabilitiesRatio(index);
			break;
		case PeriodStmts.DEBT_RATIO:
			return this.getBalSheet().getTotalDebtRatio(index);
			break;
		case PeriodStmts.OPERATING_CASH_TO_REVENUE:
			return this.getOperatingCashToSales(index);
			break;
		case PeriodStmts.BOOK_VALUE_PER_SHARE:
			return this.getBalSheet().getBookValuePerShare(index);
			break;
			
		default:
			break;
	}

}

PeriodStmts.prototype.getParamXYArray = function(key, sheetType) {
	var fullDateArray = null;
	
	switch (sheetType) {
		case PeriodStmts.BALANCE:
			fullDateArray = this.getBalSheet().fda;
			break;
		case PeriodStmts.INCOME :
			fullDateArray = this.getIncStmt().fda;
			break;
		case PeriodStmts.CASHFLOW:
			fullDateArray = this.getCashFlow().fda;
			break;
		default:
	}
	var values = [];
	for(var index=0; index<fullDateArray.length; index++) {
		var value = this.getFinParamValue(key, index);
		if(value || value==0) {
			values[fullDateArray[index]] = value;
		}
	}
	return values;
}
PeriodStmts.prototype.getFinParamValueArray = function(key, len) {
	var values = new Array();
	for(var index=0; index<len; index++) {
		var value = this.getFinParamValue(key, index);
		if(value) {
			values.push(value);
		}
	}
	return values;
}

PeriodStmts.prototype.getCurrentRatioArray = function() {
	var turns = this.getParamXYArray(PeriodStmts.CURRENT_RATIO, PeriodStmts.BALANCE);
	return turns;
}

PeriodStmts.prototype.getQuickRatioArray = function() {
	var turns = this.getParamXYArray(PeriodStmts.QUICK_TEST_RATIO, PeriodStmts.BALANCE);
	return turns;
}

PeriodStmts.prototype.getInvTurnsArray = function() {
	var turns = this.getParamXYArray(PeriodStmts.INVENTORY_TURNS, PeriodStmts.BALANCE);
	return turns;
}

PeriodStmts.prototype.getInvTurnsInDaysArray = function() {
	var turns = this.getParamXYArray(PeriodStmts.INVENTORY_TURNS_IN_DAYS, PeriodStmts.BALANCE);
	return turns;
}

PeriodStmts.prototype.getReceivableTurnsArray = function() {
	var turns = this.getParamXYArray(PeriodStmts.RECEIVABLE_TURN, PeriodStmts.BALANCE);
	return turns;
}
PeriodStmts.prototype.getReceivableTurnsInDaysArray = function() {
	var turns = this.getParamXYArray(PeriodStmts.RECEIVABLE_TURN_IN_DAYS, PeriodStmts.BALANCE);
	return turns;
}
PeriodStmts.prototype.getReturnOnTotalaAssetsArray = function() {
	var roas = this.getParamXYArray(PeriodStmts.RETURN_ON_TOTAL_ASSETS, PeriodStmts.BALANCE);
	return roas;
}
PeriodStmts.prototype.getReturnOnEquityArray = function() {
	var roas = this.getParamXYArray(PeriodStmts.RETURN_ON_EQUITY, PeriodStmts.BALANCE);
	return roas;
}
PeriodStmts.prototype.getOperatingCashToSalesArray = function() {
	var roas = this.getParamXYArray(PeriodStmts.OPERATING_CASH_TO_REVENUE, PeriodStmts.CASHFLOW);
	return roas;
}
PeriodStmts.prototype.getGrossMarginArray = function() {
	var roas = this.getParamXYArray(IncomeStatement.GROSS_PROFIT_MARGIN, PeriodStmts.INCOME);
	return roas;
}
PeriodStmts.prototype.getNetProfitMarginArray = function() {
	var roas = this.getParamXYArray(IncomeStatement.NET_PROFIT_MARGIN, PeriodStmts.INCOME);
	return roas;
}
PeriodStmts.prototype.getDebtToEquityArray = function() {
	var roas = this.getParamXYArray(PeriodStmts.DEBT_TO_EQUITY_RATIO, PeriodStmts.BALANCE);
	return roas;
}
PeriodStmts.prototype.getDebtRatioArray = function() {
	var roas = this.getParamXYArray(PeriodStmts.DEBT_RATIO, PeriodStmts.BALANCE);
	return roas;
}
PeriodStmts.prototype.getCashToCurrLiabilitiesArray = function() {
	var roas = this.getParamXYArray(PeriodStmts.CASH_TO_CURRENT_LIABILITIES, PeriodStmts.BALANCE);
	return roas;
}
PeriodStmts.prototype.getCashToTotalDebtArray = function() {
	var roas = this.getParamXYArray(PeriodStmts.CASH_TO_TOTAL_DEBT_RATIO, PeriodStmts.BALANCE);
	return roas;
}


/** if you are using cas in this sheet then add the condition for this.cas.isEmpty() **/
PeriodStmts.prototype.isEmpty = function() {
	var empty = this.bal.isEmpty() || this.inc.isEmpty();
}

PeriodStmts.prototype.getGraphsData = function(key) {
	if(!key) return null;
	
	switch (key) {
		case BalanceSheet.INTERIM:
		case BalanceSheet.ANNUAL :
			return this.getBalGraphsData(); 
			
		case IncomeStatement.INTERIM : 
		case IncomeStatement.ANNUAL : 
			return this.getIncGraphsData();
	
		case CashFlow.INTERIM : 
		case CashFlow.ANNUAL :  
			return this.getCasGraphsData();
	}
}



PeriodStmts.prototype.toGraphsArray = function(obj) {
	var a = new Array();
	for(var key in obj) {
		a.push(obj[key]);
	}
	return a;
}
PeriodStmts.prototype.getIncGraphsData = function() {
	var sheet = this;
	var incSheet = this.inc;
	var balSheet = this.bal;
	var incGraphs = {

	margins : function(){
		/** show as a data chart **/
		var len = incSheet.val[IncomeStatement.TOTAL_REVENUE].length;
		var rows = new Array();
		var row = new Array();
		for(var index = 0; index<len; index++) {
			var time = String("(" + incSheet.getMonthsSpan(index) + ") " + incSheet.getDate(index));
			var gpm = incSheet.getGrossProfitMargin(index);
			var om = incSheet.getOperatingMargin(index);
			var npm = incSheet.getNetProfitMargin(index);

			row.push([time, gpm, om, npm]);
		}
		rows.push(row);
		var cols = { "Year": "string", "Gross Margin": "number", "Operating Margin": "number", "Net Margin": "number" };
		var chartOptions = { width:com.fa.utils.ChartData.WIDTH, height:com.fa.utils.ChartData.HEIGHT, 'title' : 'Margins' ,'legend':'right', max:1, 'curveType':'function' };
		return new com.fa.utils.ChartData(rows, cols, "linechart", chartOptions);
	},

	commonSizeStmt2 : function() {
		/** show as a table **/
		var len = incSheet.val[IncomeStatement.TOTAL_REVENUE].length;
		var rows = new Array();
		var row = new Array();
		for(var index = 0; index<len; index++) {
			var time = String("(" + incSheet.getMonthsSpan(index) + ") " + incSheet.getDate(index));
			var rev = 1.0;
			var cor = incSheet.fraction(incSheet.getCostOfRevenue(index), incSheet.val[IncomeStatement.TOTAL_REVENUE][index]);
			var gp = incSheet.getGrossProfitMargin(index);
			var oe = incSheet.getOperatingMargin(index);
			var ni = incSheet.getNetProfitMargin(index);
			row.push([time, rev, cor, gp, oe, ni]);
		}
		rows.push(row);
		var cols = { "Year": "string", "Revenue": "number", "Cost of Revenue": "number", "Gross Income": "number", "Operating Income": "number", "Net Income": "number" };
		var chartOptions = { width:com.fa.utils.ChartData.WIDTH, height:com.fa.utils.ChartData.HEIGHT, 'legend':'right', max:1, 'title' : 'Common Size Inc. Statement', 'curveType':'function' };
		return new com.fa.utils.ChartData(rows, cols, "linechart", chartOptions);
	},
	
	returnOnEquity : function() {
		/** show as a data chart **/
		var len = incSheet.val[IncomeStatement.TOTAL_REVENUE].length;
		var rows = new Array();
		var row = new Array();
		for(var index = 0; index<len; index++) {
			var time = String("(" + incSheet.getMonthsSpan(index) + ") " + incSheet.getDate(index));
			var roe = sheet.getReturnOnEquity(index);
			var doe = sheet.getFinParamValue(PeriodStmts.DEBT_TO_EQUITY_RATIO, index);
			row.push([time, roe, doe]);
		}
		rows.push(row);
		var cols = { "Year": "string", "Return on Equity": "number", "Total Debt to Equity": "number" };
		var chartOptions = { width:com.fa.utils.ChartData.WIDTH, height:com.fa.utils.ChartData.HEIGHT, 'title' : 'Return on Equity' ,'legend':'right', max:1, 'curveType':'function' };
		return new com.fa.utils.ChartData(rows, cols, "linechart", chartOptions);
	}
	}

	return this.toGraphsArray(incGraphs);
}
PeriodStmts.prototype.getCasGraphsData = function() {
	var sheet = this;
	var casSheet = this.cas;
	var incSheet = this.inc;

	var casGraphs = {

	commonSizeStmt : function() {
		/** show as a columnchart**/
		var len = casSheet.val[CashFlow.NET_CHANGE_IN_CASH].length;
		var rows = new Array();
		var row = new Array();
		for(var index = 0; index<len; index++) {
			var time = String("(" + casSheet.getMonthsSpan(index) + ") " + casSheet.getDate(index));
			var coo = casSheet.getCashFromOperating(index);
			var coi = casSheet.getCashFromInvesting(index);
			var cof = casSheet.getCashFromFinancing(index);
			var nc = casSheet.getNetCash(index);
			row.push([time, coo, coi, cof, nc]);
		}
		rows.push(row);
		var cols = { "Year": "string", "Operating Cash": "number", "Investing Cash": "number", "Financing Cash": "number", "Net Cash": "number" };
		var chartOptions = { width:com.fa.utils.ChartData.WIDTH, height:com.fa.utils.ChartData.HEIGHT, title : 'Cash Generation' ,'legend':'right', 'isStacked':true};
		return new com.fa.utils.ChartData(rows, cols, "columnchart", chartOptions);
	},

	ratios : function() {
		var len = casSheet.val[CashFlow.NET_CHANGE_IN_CASH].length;
		var rows = new Array();
		var row = new Array();
		for(var index = 0; index<len; index++) {
			var time = String("(" + casSheet.getMonthsSpan(index) + ") " + casSheet.getDate(index));
			var ocfToSales = casSheet.fraction(casSheet.getCashFromOperating(index), incSheet.getTotalRevenue(index));
			var fcfOcfRatio = casSheet.fraction(casSheet.getFreeCashFlow(index), casSheet.getCashFromOperating(index));
			row.push([time, ocfToSales, fcfOcfRatio]);
		}
		rows.push(row);
		var cols = { "Year": "string", "Operating Cash To Sales": "number", "Free Cash to Operating Cash": "number"};
		var chartOptions = { width:com.fa.utils.ChartData.WIDTH, height:com.fa.utils.ChartData.HEIGHT, title : 'Cash Flow Ratios' ,'legend':'right', 'curveType':'function'};
		return new com.fa.utils.ChartData(rows, cols, "linechart", chartOptions);
	}
	}

	return this.toGraphsArray(casGraphs);
}

PeriodStmts.prototype.getBalGraphsData = function() {
	var sheet = this;
	var balSheet = this.bal;
	var len = balSheet.val[BalanceSheet.TOTAL_CURRENT_ASSETS].length;
	var balGraphs = {

			/** stacked chart**/
			currAssetRatios: function() {
		var rows = new Array();
		var row = new Array();
		
		for(var index = 0; index<len; index++) {
			var time = balSheet.getDate(index);
			var ctca = balSheet.getCashToCurrAssetsRatio(index);
			var rtca = balSheet.getReceivablesToCurrAssetsRatio(index);
			var itca = balSheet.getInvToCurrAssetsRatio(index);
			var otca = balSheet.toFixed(1 - (ctca + rtca + itca)); //others to current ratio
			row.push([time, ctca, rtca, itca, otca]);
		}
		rows.push(row);
		var cols = { "Year": "string", "Cash": "number", "Receivables": "number", "Inventories": "number", "Others": "number" };
		var chartOptions = { width:com.fa.utils.ChartData.WIDTH, height:com.fa.utils.ChartData.HEIGHT, 'title' : 'Current Assets Distribution','legend':'right', 'isStacked':true, min:0, max:1};
		return new com.fa.utils.ChartData(rows, cols, "columnchart", chartOptions);
	},

	currLiabilityRatios: function() {
		var rows = new Array();
		var row = new Array();
		for(var index = 0; index<len; index++) {
			var time = balSheet.getDate(index);
			
			var cl = balSheet.val[BalanceSheet.TOTAL_CURRENT_LIABILITIES][index];
			var ae =  balSheet.fraction(balSheet.val[BalanceSheet.ACCRUED_EXPENSES][index], cl);
			var ap =  balSheet.fraction(balSheet.val[BalanceSheet.ACCOUNTS_PAYABLE][index], cl);
			var np =  balSheet.fraction(balSheet.val[BalanceSheet.NOTES_PAYABLE][index], cl);
			var others = 1 - (ae + ap +np); //others to current ratio
			row.push([time, ae, ap, np, others]);
		}
		rows.push(row);
		var cols = { "Year": "string", "Accrued Expenses": "number", "Accounts Payable": "number", "Notes Payable": "number","Others": "number" };
		var chartOptions = { width:com.fa.utils.ChartData.WIDTH, height:com.fa.utils.ChartData.HEIGHT, 'title' : 'Current Liabilities','legend':'right', 'isStacked':true, min:0, max:1 };
		return new com.fa.utils.ChartData(rows, cols, "columnchart", chartOptions);
	},

	ratios : function(){
		/** show as a line chart **/
		var rows = new Array();
		var row = new Array();
		for(var index = 0; index<len; index++) {
			var time = balSheet.getDate(index);
			var cr = balSheet.getCurrentRatio(index);
			var qr = balSheet.getQuickRatio(index);
			var der = balSheet.getTotalDebtToEquityRatio(index);

			/**
	    			var bvsv = balSheet.getBookValuePerShare(index)/marketShareVal;
			 **/
			row.push([time, cr, qr, der]);
		}
		rows.push(row);
		var cols = { "Year": "string", "Current Ratio": "number", "Quick Ratio":"number", "Debt to Equity": "number" };
		var chartOptions = { width:com.fa.utils.ChartData.WIDTH, height:com.fa.utils.ChartData.HEIGHT, 'title' : 'Liquidity Ratios' ,'legend':'right', max:1, 'curveType':'function' };
		return new com.fa.utils.ChartData(rows, cols, "linechart", chartOptions);
	},

	res : function() {
		var rows = new Array();
		var row = new Array();
		for(var index = 0; index<len; index++) {
			var time = balSheet.getDate(index);
			var re = balSheet.getRetainedEarnings(index);
			var pic = balSheet.getPaidInCapital(index);
			var te = balSheet.getEquity(index);
			var ps = balSheet.getPreferredShares(index);
			var ts = balSheet.getTreasuryStock(index); /** negative **/
			//var others = balSheet.toFixed(te - (re + pic +));
			row.push([time, te, re, pic, ps, ts]);
		}
		rows.push(row);
		var cols = { "Year": "string", "Total Equity": "number" ,"Retained Earnings": "number", "Additional Capital" : "number", "Preferred Stock" : "number", "Treasury Stock" : "number" };
		var chartOptions = { width:com.fa.utils.ChartData.WIDTH, height:com.fa.utils.ChartData.HEIGHT, 'title' : 'Total Equity' ,'legend':'right', 'curveType':'function'};
		return new com.fa.utils.ChartData(rows, cols, "linechart", chartOptions);
	},

	/** show as a line chart **/
	turns : function() {
		var rows = new Array();
		var row = new Array();
		for(var index=0; index<len; index++) {
			var time = balSheet.getDate(index);
			var rt = sheet.getReceivableTurns(index);
			var it = sheet.getInvTurns(index);
			row.push([time, rt, it]);
		}
		rows.push(row);
		var cols = { "Year": "string", "Receivable Turns": "number", "Inventory Turns": "number"};
		var chartOptions = { width:com.fa.utils.ChartData.WIDTH, height:com.fa.utils.ChartData.HEIGHT, 'title' : 'Inventory and Receivable Turns','legend':'right', 'curveType':'function'};
		return new com.fa.utils.ChartData(rows, cols, "linechart", chartOptions);

	},
	
	turnsInDays : function() {
		var rows = new Array();
		var row = new Array();
		for(var index=0; index<len; index++) {
			var time = balSheet.getDate(index);
			var rt = sheet.getReceivableTurnsInDays(index);
			var it = sheet.getInvTurnsInDays(index);
			row.push([time, rt, it]);
		}
		rows.push(row);
		var cols = { "Year": "string", "Receivable Turns": "number", "Inventory Turns": "number"};
		var chartOptions = { width:com.fa.utils.ChartData.WIDTH, height:com.fa.utils.ChartData.HEIGHT, 'title' : 'Inventory and Receivable Turns In Days','legend':'right', 'curveType':'function'};
		return new com.fa.utils.ChartData(rows, cols, "linechart", chartOptions);
		
	}
	}

	return this.toGraphsArray(balGraphs);
}

PeriodStmts.prototype.analyze = function(index) {
	var messages = new Array();
	var sheet = this;
	var analyzer = {
			invTurns : function(index) {
		var x = sheet.getInvTurns(index);
		var y = sheet.getInvTurnsInDays(index);
		var level = Message.LEVEL_NORMAL;
		if(y<30) {
			level = Message.LEVEL_UP;
		} else if(y>90) {
			level = Message.LEVEL_DOWN;
		}
		if(x)messages.push(Message.get("Inventory turn is " + x + " (" + y + " days)", level));
	},

	receivableTurns : function(index) {
		var x = sheet.getReceivableTurns(index);
		var y = sheet.getReceivableTurnsInDays(index);
		var level = Message.LEVEL_NORMAL;
		if(y<30) {
			level = Message.LEVEL_UP;
		} else if(y>90) {
			level = Message.LEVEL_DOWN;
		}
		if(x)messages.push(Message.get("Receivable turn is " + x + " (" + y + " days)", level));
	},

	returnOnTotalAssets : function(index) {
		var x = sheet.getReturnOnTotalAssets(index);
		if(x) {
			var level = Message.LEVEL_NORMAL;
			if(x<0) {
				level = Message.LEVEL_DOWN;
			} else if(x>7) {
				level = Message.LEVEL_UP;
			}
			messages.push(Message.get("Return on Total Assets " + x + "%", level));
		}
	},

	analyze : function(index) {
		this.invTurns(index);
		this.receivableTurns(index);
		this.returnOnTotalAssets(index);
	}
	}
	//populate the messages array;
	if(!this.isEmpty()) {
		analyzer.analyze(index);
	}
	return messages;
}



function BalanceSheet(key){
	/** key is either BalanceSheet.ANNUAL or BalanceSheet.INTERIM **/
	this.key = key;
}
BalanceSheet.prototype = new Sheet();
BalanceSheet.prototype.constructor = Sheet;

BalanceSheet.ANNUAL = 'balannual';
BalanceSheet.INTERIM = 'balinterim';
BalanceSheet.TOTAL_INVENTORY = 'b_ti';
BalanceSheet.TOTAL_CURRENT_ASSETS = 'b_tca';
BalanceSheet.NET_PROPERTY_PLANT_EQUIPMENT = 'b_nppe';
BalanceSheet.TOTAL_ASSETS = 'b_ta';
BalanceSheet.TOTAL_CURRENT_LIABILITIES = 'b_tcl';
BalanceSheet.ACCOUNTS_PAYABLE = 'b_ap';
BalanceSheet.NOTES_PAYABLE = 'b_np';
BalanceSheet.ACCRUED_EXPENSES = 'b_ae';
BalanceSheet.NET_GOODWILL = 'b_gn';
BalanceSheet.INTANGIBLES = 'b_i';
BalanceSheet.TOTAL_LIABILITIES = 'b_tl';
BalanceSheet.RETAINED_EARNINGS = 'b_read';
BalanceSheet.PAID_IN_CAPITAL = 'b_pic';
BalanceSheet.TOTAL_RECEIVABLES_NET = 'b_trn';
BalanceSheet.TOTAL_DEBT = 'b_tb';
BalanceSheet.TOTAL_EQUITY = 'b_te';
BalanceSheet.WORKING_CAPITAL = 'b_wc';
BalanceSheet.MINORITY_INTEREST = 'b_mi';
BalanceSheet.TOTAL_COMMON_SHARES_OUTSTANDING = 'b_tcso';
BalanceSheet.CASH_AND_SHORT_TERM_INVESTMENTS = 'b_cesi';
BalanceSheet.PREFERRED_REDEEMABLE = 'b_pr';
BalanceSheet.PREFERRED_NON_REDEEMABLE = 'b_pnr';
BalanceSheet.TREASURY_STOCK = 'b_ts';

BalanceSheet.getInnerTextMap = function() {
	var map = new Array();

	map['balinterimdiv'] = BalanceSheet.INTERIM;
	map['balannualdiv'] = BalanceSheet.ANNUAL;

	// Balance Sheet
	map['Cash and Short Term Investments'] = BalanceSheet.CASH_AND_SHORT_TERM_INVESTMENTS;
	map['Total Receivables, Net'] = BalanceSheet.TOTAL_RECEIVABLES_NET;
	map['Total Inventory'] = BalanceSheet.TOTAL_INVENTORY;
	map['Prepaid Expenses'] = BalanceSheet.PREPAID_EXPENSES;
	map['Total Current Assets'] = BalanceSheet.TOTAL_CURRENT_ASSETS;
	map['Property/Plant/Equipment, Total - Gross'] = BalanceSheet.NET_PROPERTY_PLANT_EQUIPMENT;
	map['Goodwill, Net'] = BalanceSheet.NET_GOODWILL;
	map['Intangibles, Net'] = BalanceSheet.INTANGIBLES;
	map['Total Assets'] = BalanceSheet.TOTAL_ASSETS;
	map['Accounts Payable'] = BalanceSheet.ACCOUNTS_PAYABLE;
	map['Accrued Expenses'] = BalanceSheet.ACCRUED_EXPENSES;
	map['Current Port. of LT Debt/Capital Leases'] = BalanceSheet.CURRENT_PORTION_LT_DEBT;
	map['Notes Payable/Short Term Debt'] = BalanceSheet.NOTES_PAYABLE;
	map['Total Current Liabilities'] = BalanceSheet.TOTAL_CURRENT_LIABILITIES;
	map['Total Long Term Debt'] = 'tltb';
	map['Total Debt'] = BalanceSheet.TOTAL_DEBT;
	map['Minority Interest'] = BalanceSheet.MINORITY_INTEREST;
	map['Total Liabilities'] = BalanceSheet.TOTAL_LIABILITIES;
	map['Retained Earnings (Accumulated Deficit)'] = BalanceSheet.RETAINED_EARNINGS;
	map['Additional Paid-In Capital'] = BalanceSheet.PAID_IN_CAPITAL;
	map['Total Equity'] = BalanceSheet.TOTAL_EQUITY;
	map['Redeemable Preferred Stock, Total'] = BalanceSheet.PREFERRED_REDEEMABLE;
	map['Preferred Stock - Non Redeemable, Net'] = BalanceSheet.PREFERRED_NON_REDEEMABLE;
	map['Treasury Stock - Common'] = BalanceSheet.TREASURY_STOCK;
	map['Total Liabilities & Shareholders\' Equity'] = 'tlse';
	map['Total Common Shares Outstanding'] = BalanceSheet.TOTAL_COMMON_SHARES_OUTSTANDING;

	return map;
}


BalanceSheet.prototype.parse = function(id, finDiv){
	this.parseHtml(id, finDiv, BalanceSheet.getInnerTextMap() );
}


BalanceSheet.prototype.getReceivablesToCurrAssetsRatio = function(index){
	return this.fraction(this.val[BalanceSheet.TOTAL_RECEIVABLES_NET][index], this.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index]);
}

BalanceSheet.prototype.getInvToCurrAssetsRatio = function(index){
	return this.fraction(this.val[BalanceSheet.TOTAL_INVENTORY][index], this.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index]);
}

BalanceSheet.prototype.getCashToCurrAssetsRatio = function(index){
	return this.fraction(this.val[BalanceSheet.CASH_AND_SHORT_TERM_INVESTMENTS][index], this.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index]);
}

BalanceSheet.prototype.getInvToCurrAssetsRatio = function(index){
	return this.fraction(this.val[BalanceSheet.TOTAL_INVENTORY][index], this.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index]);
}


BalanceSheet.prototype.analyze = function(){
	var sheet = this;
	var index = 0;
	var messages = new Array();
	var analyzer = {

			currentRatio : function(){
		var x = sheet.getCurrentRatio(index);
		var msg = "Current Ratio is " + x;
		var level = Message.LEVEL_NORMAL;
		if(x <1){
			level = Message.LEVEL_DOWN;
		} else if(x>2) {
			level = Message.LEVEL_UP;
		}
		messages.push(Message.get(msg, level, PeriodStmts.CURRENT_RATIO));
	},

	invToCurrAssetsRatio : function() {
		var x = sheet.getInvToCurrAssetsRatio(index);
		var level = Message.LEVEL_NORMAL;
		if(x <0.1){
			level = Message.LEVEL_UP;
		} 
		var msg = "Inventory to Current Assets Ratio is " + x;
		messages.push(Message.get(msg, level));
	},

	totalDebt : function() {
		if (sheet.getTotalDebt(index) == 0) {
			var msg = "Total debt is Zero";
			messages.push(Message.get(msg, Message.LEVEL_UP, BalanceSheet.TOTAL_DEBT));
		}
	},

	debtToEquityRatio : function() {
		var x = sheet.getTotalDebtToEquityRatio(index);
		var msg = "Debt to Equity Ratio is " + x;
		var lvl = Message.LEVEL_NORMAL;
		if (x > 0.45) {
			lvl = Message.LEVEL_DOWN;
		} else if(x==0) {
			lvl = Message.LEVEL_UP;
		}
		messages.push(Message.get(msg, lvl, PeriodStmts.DEBT_TO_EQUITY_RATIO));
	},

	bvps : function() {
		var x = sheet.getBookValuePerShare(index);
		messages.push(Message.get("Book value per share " + x, null, PeriodStmts.BOOK_VALUE_PER_SHARE));
	},

	workingcap : function() {
		var x = sheet.getWorkingCapital(index);
		var y = sheet.getWorkingCapitalToCurrAssets(index);
		var level = Message.NORMAL;
		if(x<0) {
			level = Message.DOWN;
		} 
		messages.push(Message.get("Working capital is " + x + " (" + y+ "% of current assets)", level, BalanceSheet.WORKING_CAPITAL));
	},

	analyze : function() {
		this.currentRatio();
		this.invToCurrAssetsRatio();
		//this.invTurnInDays();
		//this.receivableTurnInDays();
		this.totalDebt();
		this.debtToEquityRatio();
		this.bvps();
		this.workingcap();
		//this.returnOnTotalAssets();
	}

	}
	if(!this.isEmpty()) {
		//populate the messages array;
		analyzer.analyze();
	}

	return messages;
}


BalanceSheet.prototype.getDate = function(index){
	return this.da[index];
}

BalanceSheet.prototype.getTotalDebt = function(index){
	return this.val[BalanceSheet.TOTAL_DEBT][index];
}
BalanceSheet.prototype.getCurrentRatio = function(index){
	return this.fraction(this.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index] , this.val[BalanceSheet.TOTAL_CURRENT_LIABILITIES][index]);
}

BalanceSheet.prototype.getQuickRatio = function(index){
	return this.fraction((this.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index] - this.val[BalanceSheet.TOTAL_INVENTORY][index])  , this.val[BalanceSheet.TOTAL_CURRENT_LIABILITIES][index]);
}

BalanceSheet.prototype.getReceivablesToCurrAssetsRatio = function(index){
	return this.fraction(this.val[BalanceSheet.TOTAL_RECEIVABLES_NET][index] , this.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index]);
}

BalanceSheet.prototype.getInvToCurrAssetsRatio = function(index){
	return this.fraction(this.val[BalanceSheet.TOTAL_INVENTORY][index] , this.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index]);
}

BalanceSheet.prototype.getCashToCurrAssetsRatio = function(index){
	return this.fraction(this.val[BalanceSheet.CASH_AND_SHORT_TERM_INVESTMENTS][index] , this.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index]);
}

BalanceSheet.prototype.getEquity = function(index){
	return this.val[BalanceSheet.TOTAL_EQUITY][index];
}


/**
 * This is also called leverage
 */
BalanceSheet.prototype.getTotalDebtToEquityRatio = function(index){
	return this.fraction(this.getTotalDebt(index), this.getEquity(index));
}
BalanceSheet.prototype.getTotalDebtRatio = function(index){
	return this.fraction(this.getTotalDebt(index), this.val[BalanceSheet.TOTAL_ASSETS][index]);
}
BalanceSheet.prototype.getCashToTotalDebtRatio = function(index){
	return this.fraction(this.val[BalanceSheet.CASH_AND_SHORT_TERM_INVESTMENTS][index], this.getTotalDebt(index));
}
BalanceSheet.prototype.getTotalDebtToCashRatio = function(index){
	return this.fraction(this.getTotalDebt(index), this.val[BalanceSheet.CASH_AND_SHORT_TERM_INVESTMENTS][index]);
}
BalanceSheet.prototype.getCashToCurrLiabilitiesRatio = function(index){
	return this.fraction(this.val[BalanceSheet.CASH_AND_SHORT_TERM_INVESTMENTS][index], this.val[BalanceSheet.TOTAL_CURRENT_LIABILITIES][index]);
}

BalanceSheet.prototype.getWorkingCapital = function(index){
	return this.toFixed(this.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index] - this.val[BalanceSheet.TOTAL_CURRENT_LIABILITIES][index]);
}

BalanceSheet.prototype.getWorkingCapitalToCurrAssets = function(index){
	return this.percent(this.getWorkingCapital(index), this.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index]);
}

BalanceSheet.prototype.getRetainedEarnings = function(index){
	return this.val[BalanceSheet.RETAINED_EARNINGS][index];
}

BalanceSheet.prototype.getPaidInCapital = function(index){
	return this.val[BalanceSheet.PAID_IN_CAPITAL][index];
}
BalanceSheet.prototype.getPreferredShares = function(index){
	return this.val[BalanceSheet.PREFERRED_REDEEMABLE][index] + this.val[BalanceSheet.PREFERRED_NON_REDEEMABLE][index];
}
BalanceSheet.prototype.getTreasuryStock = function(index){
	return this.val[BalanceSheet.TREASURY_STOCK][index];
}



BalanceSheet.prototype.getValues = function(key){
	var len = this.val[BalanceSheet.TOTAL_ASSETS].length;
	var values = new Array();
	var value = null;
	for (var i = 0; i < len; i++) {
		switch (key) {
		case PeriodStmts.BOOK_VALUE_PER_SHARE:
			value = this.getBookValuePerShare(i);
			break;
		case PeriodStmts.CURRENT_RATIO:
			value = this.getCurrentRatio(i);
			break;
		case PeriodStmts.DEBT_TO_EQUITY_RATIO:
			value = this.getTotalDebtToEquityRatio(i);
			break;
		case PeriodStmts.DEBT_RATIO:
			value = this.getTotalDebtRatio(i);
			break;

		case PeriodStmts.INVENTORY_TO_CURRENT_ASSETS_RATIO:
			value = this.getInvToCurrAssetsRatio(i);
			break;
		}
		if (value != null) {
			var valueObj = { /*time*/'t':this.da[i], 'v' : value }
			values.push(valueObj);
		}
	}
	return values;
}

BalanceSheet.prototype.getBookValue = function(index){
	return this.getEquity(index) - this.getPreferredShares(index);
}

BalanceSheet.prototype.getBookValuePerShare = function(index){
	return this.fraction(this.getBookValue(index), this.val[BalanceSheet.TOTAL_COMMON_SHARES_OUTSTANDING][index]);
}



CashFlow.ANNUAL = 'casannual';
CashFlow.INTERIM = 'casinterim';
CashFlow.CHANGES_IN_WORKING_CAPITAL = 'c_cwc';
CashFlow.NET_CHANGE_IN_CASH = 'c_ncc';
CashFlow.OPERATING_CASH = 'c_oc';
CashFlow.CASH_FROM_INVESTING = 'c_cfi';
CashFlow.CASH_FROM_FINANCING = 'c_cff';
CashFlow.EXPENDITURES = 'c_e';
CashFlow.STOCK_ISSUANCE = 'c_si';
CashFlow.DEBT_ISSUANCE = 'c_di';

function CashFlow(key) {
	/** key is either CashFlow.ANNUAL or CashFlow.INTERIM **/
	this.key = key;
}

CashFlow.prototype = new Sheet();
CashFlow.prototype.constructor = CashFlow;

CashFlow.getInnerTextMap = function() {
	var map = new Array();
	map['casinterimdiv'] = CashFlow.INTERIM;
	map['casannualdiv'] = CashFlow.ANNUAL;

	map['Net Income/Starting Line'] = 'c_nisl';
	map['Net Change in Cash'] = CashFlow.NET_CHANGE_IN_CASH;
	map['Issuance (Retirement) of Stock, Net'] = CashFlow.STOCK_ISSUANCE;
	map['Issuance (Retirement) of Debt, Net'] = CashFlow.DEBT_ISSUANCE;
	map['Cash from Operating Activities'] = CashFlow.OPERATING_CASH;
	map['Cash from Investing Activities'] = CashFlow.CASH_FROM_INVESTING;
	map['Cash from Financing Activities'] = CashFlow.CASH_FROM_FINANCING;
	map['Capital Expenditures'] = CashFlow.EXPENDITURES;
	map['Changes in Working Capital'] = CashFlow.CHANGES_IN_WORKING_CAPITAL;
	return map;
}

CashFlow.prototype.parse = function(id, finDiv){
	this.parseHtml(id, finDiv, CashFlow.getInnerTextMap());
}

CashFlow.prototype.getMonthsSpan = function(index){
	return this.nm[index];
}

CashFlow.prototype.getDate = function(index){
	return this.da[index];
}


CashFlow.prototype.analyze = function(){
	var sheet = this;
	var index = 0;

	var messages = new Array();
	var analyzer = {

			netChangeInCash : function(){
		var x = sheet.getNetCash(index);
		var msg = "Net Cash Flow is " + x + ' ' + sheet.getCurrency();
		if(x <0){
			var level = Message.LEVEL_DOWN;
		} else if(x>0) {
			var level = Message.LEVEL_UP;
		}
		messages.push(Message.get(msg, level));
	},

	operatingCash : function() {
		var x = sheet.getCashFromOperating(index);
		var msg = "";
		if(x>0) {
			var level = Message.LEVEL_UP;
			msg = "Cash for core operations: " + x + ' ' + sheet.getCurrency();
		} else {
			var level = Message.LEVEL_DOWN;
			msg = "Cash for core operations: " + x + ' ' + sheet.getCurrency();
		}
		messages.push(Message.get(msg, level));
	},

	stockIssued : function() {
		var x = sheet.getStockIssuance(index);
		var msg = "";
		if(x>0) {
			var level = Message.LEVEL_DOWN;
			if(sheet.getNetCash(index) >0 ) {
				msg = "Net Change in cash might be positive because of issuance of Stock of " + x; /** it could be good thing **/
				level = Message.LEVEL_DOWN;
				messages.push(Message.get(msg, level));
			} else if(sheet.getNetCash(index)<0) {
				msg = "Net Change in cash is negative inspite of issuance of Stock";
				level = Message.LEVEL_DOWN;
				messages.push(Message.get(msg, level));
			}
		} else if(x<0) {
			var level = sheet.LEVEL_UP;
			msg = Math.abs(x) + sheet.getCurrency() + " stock has been retired";
			messages.push(Message.get(msg, level));
		}
	},

	debtIssued : function() {
		var debtissue = sheet.getDebtIssuance(index);
		var msg = "";
		if(debtissue>0) {
			var level = Message.LEVEL_DOWN;
			if(sheet.getNetCash(index) >0 ) {
				msg = "Net Change in cash might be positive because of issuance of debt of " + debtissue; /** this cou;d be good **/
				level = Message.LEVEL_DOWN;
				messages.push(Message.get(msg, level));
			} else if(sheet.getNetCash(index) < 0) {
				msg = "Net Change in cash is negative inspite of the issuance of debt of " + debtissue;
				level = Message.LEVEL_DOWN;
				messages.push(Message.get(msg, level));
			}
		} else if(debtissue<0){
			var level = sheet.LEVEL_UP;
			msg = Math.abs(debtissue) + " Debt has been retired";
			messages.push(Message.get(msg, level));
		}
	},


	analyze : function() {
		this.netChangeInCash();
		this.operatingCash();
		this.stockIssued();
		this.debtIssued();
	}

	}
	if(!this.isEmpty()) {
		//populate the messages array;
		analyzer.analyze();
	}

	return messages;
}

CashFlow.prototype.getNetCash = function(index) {
	return this.val[CashFlow.NET_CHANGE_IN_CASH][index];
}
CashFlow.prototype.getStockIssuance = function(index) {
	return this.val[CashFlow.STOCK_ISSUANCE][index];
}
CashFlow.prototype.getDebtIssuance = function(index) {
	return this.val[CashFlow.DEBT_ISSUANCE][index];
}
CashFlow.prototype.getCashFromOperating = function(index) {
	return this.val[CashFlow.OPERATING_CASH][index];
}
CashFlow.prototype.getCashFromInvesting = function(index) {
	return this.val[CashFlow.CASH_FROM_INVESTING][index];
}
CashFlow.prototype.getCashFromFinancing = function(index) {
	return this.val[CashFlow.CASH_FROM_FINANCING][index];
}

CashFlow.prototype.getCapitalExpenditures = function(index) {
	return this.val[CashFlow.EXPENDITURES][index];
}

CashFlow.prototype.getFreeCashFlow = function(index) {
	return this.toFixed(this.getCashFromOperating(index) - this.getCapitalExpenditures(index));
}


CashFlow.prototype.getValues = function(key){
	var len = this.val[CashFlow.OPERATING_CASH].length;
	var values = new Array();
	var value = null;
	for (var i = 0; i < len; i++) {
		switch (key) {
		case CashFlow.OPERATING_CASH:
			value = this.val[CashFlow.OPERATING_CASH][i];
			break;
		}
		if (value != null) {
			var valueObj = { /*time*/'t':this.da[i], 'v' : value }
			values.push(valueObj);
		}
	}
	return values;
}



IncomeStatement.ANNUAL = 'incannual';
IncomeStatement.INTERIM = 'incinterim';
IncomeStatement.TOTAL_COST_OF_REVENUE = 'i_tcr';
IncomeStatement.TOTAL_REVENUE = 'i_tr';

IncomeStatement.INTEREST_EXPENSE_OR_INCOME = 'i_iei';
IncomeStatement.GROSS_PROFIT = 'i_gp';
IncomeStatement.GROSS_PROFIT_MARGIN = 'i_gpm';
IncomeStatement.NET_PROFIT_MARGIN = 'i_npm';
IncomeStatement.RESEARCH_AND_DEVELOPMENT = 'i_rd';
IncomeStatement.DEPRECIATION_AMORTIZATION = 'i_da'
	IncomeStatement.R_AND_D_TO_EXPENSE_RATIO = 'i_rder';
IncomeStatement.TOTAL_OPERATING_EXPENSES = 'i_toe';
IncomeStatement.OPERATING_INCOME = 'i_oi';
IncomeStatement.OPERATING_MARGIN = 'i_om';
IncomeStatement.UNUSUAL_INCOME_EXPENSE = 'i_uie';

IncomeStatement.ACCOUNTING_CHANGE = 'i_ac';
IncomeStatement.NET_INCOME_BEFORE_EXTRA_ITEMS = 'i_nibei';
IncomeStatement.NET_INCOME = 'i_ni';
IncomeStatement.PREFERRED_DIVIDENDS = 'i_pd';

function IncomeStatement(key){
	/** key is either IncomeStatement.ANNUAL or IncomeStatement.INTERIM **/
	this.key = key;
}

IncomeStatement.prototype = new Sheet();
IncomeStatement.prototype.constructor = IncomeStatement;

IncomeStatement.getInnerTextMap = function() {
	var map = new Array();

	map['incinterimdiv'] = IncomeStatement.INTERIM;
	map['incannualdiv'] = IncomeStatement.ANNUAL;

	map['Total Revenue'] = IncomeStatement.TOTAL_REVENUE;
	map['Cost of Revenue, Total'] = IncomeStatement.TOTAL_COST_OF_REVENUE;
	map['Gross Profit'] = IncomeStatement.GROSS_PROFIT;
	map['Research & Development'] = IncomeStatement.RESEARCH_AND_DEVELOPMENT;
	map['Depreciation/Amortization'] =IncomeStatement.DEPRECIATION_AMORTIZATION;
	map['Total Operating Expense'] = IncomeStatement.TOTAL_OPERATING_EXPENSES;
	map['Operating Income'] = IncomeStatement.OPERATING_INCOME;
	map['Unusual Expense (Income)'] = IncomeStatement.UNUSUAL_INCOME_EXPENSE;
	map['Net Income'] = IncomeStatement.NET_INCOME;
	map['Net Income Before Extra. Items'] = IncomeStatement.NET_INCOME_BEFORE_EXTRA_ITEMS;
	map['Interest Expense(Income) - Net Operating'] = IncomeStatement.INTEREST_EXPENSE_OR_INCOME ;
	return map;
}

IncomeStatement.prototype.parse = function(id, finDiv){
	this.parseHtml(id, finDiv, IncomeStatement.getInnerTextMap());
}


IncomeStatement.prototype.analyze = function(){
	var sheet = this;
	var index = 0;
	var messages = new Array();

	var analyzer = {

			grossProfitMargin : function(){
		var x = sheet.getGrossProfitMargin(index);
		var msg = "Gross Profit Margin is " + x;
		if(x <0){
			var level = Message.LEVEL_DOWN;
		} else if(x>0.45) {
			level = Message.LEVEL_UP;
		}
		messages.push(Message.get(msg, level));
	},

	unusualExpense : function() {
		var x = sheet.getUnusualExpense(index);
		if(x>0) {
			var msg = "There is an unusual expense of " + x;
			messages.push(Message.get(msg));
			var f = sheet.fraction(sheet.getUnusualExpense(index), sheet.getTotalOperatingExpense(index));
			messages.push(Message.get("Unusual Expense is " + f + " % of the total operating expenses"));
		}
	},

	operatingMargin : function() {
		var x = sheet.getOperatingMargin(index);
		var msg = "Operating margin is " + x;
		messages.push(Message.get(msg));
	},

	netIncome : function() {
		var x = sheet.getNetIncome(index);
		var msg = "Net income is " + x;
		if(x<0) {
			var level = Message.LEVEL_DOWN;
		}
		messages.push(Message.get(msg, level));
	},

	extraItemsCharge : function() {
		var x = sheet.getExtraItemsCharge(index);
		if(x>0) {
			var level = Message.LEVEL_DOWN;
			var msg = "There are some charges for Extraordinary Items. These may be one time";
			messages.push(Message.get(msg, level));
		}

	},

	analyze : function() {
		this.grossProfitMargin();
		this.unusualExpense();
		this.operatingMargin();
		this.netIncome();
		this.extraItemsCharge();
	}
	}

	if(!this.isEmpty()) {
		//populate the messages array
		analyzer.analyze();
	}

	return messages;
}

IncomeStatement.prototype.getMonthsSpan = function(index){
	return this.nm[index];
}

IncomeStatement.prototype.getDate = function(index){
	return this.da[index];
}
IncomeStatement.prototype.getTotalRevenue = function(index){
	return this.val[IncomeStatement.TOTAL_REVENUE][index];
}
IncomeStatement.prototype.getCostOfRevenue = function(index){
	return this.val[IncomeStatement.TOTAL_COST_OF_REVENUE][index];
}

IncomeStatement.prototype.getGrossProfit = function(index){
	return this.val[IncomeStatement.GROSS_PROFIT][index];
}

IncomeStatement.prototype.getGrossProfitMargin = function(index){
	return this.fraction(this.getGrossProfit(index), this.getTotalRevenue(index));
}
IncomeStatement.prototype.getUnusualExpense = function(index){
	return this.val[IncomeStatement.UNUSUAL_INCOME_EXPENSE][index];
}

IncomeStatement.prototype.getTotalOperatingExpense = function(index){
	return this.val[IncomeStatement.TOTAL_OPERATING_EXPENSES][index];
}

IncomeStatement.prototype.getOperatingIncome = function(index){
	return this.val[IncomeStatement.OPERATING_INCOME][index];
}

IncomeStatement.prototype.getExtraItemsCharge = function(index) {
	return this.getNetIncome() - this.val[IncomeStatement.NET_INCOME_BEFORE_EXTRA_ITEMS][index];
}

IncomeStatement.prototype.getOperatingMargin = function(index){
	return this.fraction(this.getOperatingIncome(index), this.getTotalRevenue(index));
}

IncomeStatement.prototype.getNetIncome = function(index){
	return this.val[IncomeStatement.NET_INCOME][index];
}

IncomeStatement.prototype.getNetProfitMargin = function(index){
	return this.fraction(this.getNetIncome(index), this.getTotalRevenue(index));
}

IncomeStatement.prototype.getRAndDToExpenseRatio = function(index){
	return this.fraction(this.val[IncomeStatement.RESEARCH_AND_DEVELOPMENT][index], this.getTotalOperatingExpense(index));
}

IncomeStatement.prototype.getValues = function(key){
	var len = this.val[IncomeStatement.TOTAL_REVENUE].length;
	var values = new Array();
	var value = null;
	for (var i = 0; i < len; i++) {
		switch (key) {
		case IncomeStatement.GROSS_PROFIT_MARGIN:
			value = this.getGrossProfitMargin(i);
			break;
		case IncomeStatement.NET_PROFIT_MARGIN:
			value = this.getNetProfitMargin(i);
			break;
		case IncomeStatement.OPERATING_MARGIN:
			value = this.getOperatingMargin(i);
			break;
		case IncomeStatement.R_AND_D_TO_EXPENSE_RATIO:
			value = this.getRAndDToExpenseRatio(i);
			break;
		}
		if (value != null) {
			var valueObj = { /*time*/'t':this.da[i], 'v' : value }
			values.push(valueObj);
		}
	}
	return values;
}


function Analyzer(){
}


Analyzer.getGraphParams = function(key){
	switch (key) {
	case BalanceSheet.INTERIM:
		return [{id : PeriodStmts.CURRENT_RATIO, title : "Current Ratio"},
		        {id : PeriodStmts.DEBT_TO_EQUITY_RATIO, title : "Debt to Equity Ratio"},
		        {id : PeriodStmts.INVENTORY_TO_CURRENT_ASSETS_RATIO, title : "Inv to CAssets Ratio"},
		        {id : PeriodStmts.BOOK_VALUE_PER_SHARE, title : "Book value per share"}/**,
                  {id : PeriodStmts.RECEIVABLE_TURN, title :"Receivable Turns"}**/];
	case BalanceSheet.ANNUAL :
		return [{id:PeriodStmts.CURRENT_RATIO, title:"Current Ratio"},
		        {id:PeriodStmts.DEBT_TO_EQUITY_RATIO, title:"Debt to Equity Ratio"},
		        {id:PeriodStmts.INVENTORY_TO_CURRENT_ASSETS_RATIO, title : "Inv to CAssets Ratio"},
		        {id:PeriodStmts.BOOK_VALUE_PER_SHARE, title : "Book value per share"}/**,
	              {id:PeriodStmts.RETURN_ON_TOTAL_ASSETS, title:"Annual ROA"},
	              {id:PeriodStmts.RECEIVABLE_TURN, title:"Receivable Turns"}**/];
	case IncomeStatement.INTERIM : 
		return [{id:IncomeStatement.GROSS_PROFIT_MARGIN, title:"Gross Profit Margin"},
		        {id:IncomeStatement.NET_PROFIT_MARGIN, title:"Net Profit Margin"},
		        {id:IncomeStatement.OPERATING_MARGIN, title : "Operating Margin"},
		        {id:IncomeStatement.R_AND_D_TO_EXPENSE_RATIO, title : "R&D to Operating Expense"}];

	case IncomeStatement.ANNUAL : 
		return [{id:IncomeStatement.GROSS_PROFIT_MARGIN, title:"Gross Profit Margin"},
		        {id:IncomeStatement.NET_PROFIT_MARGIN, title:"Net Profit Margin"},
		        {id:IncomeStatement.OPERATING_MARGIN, title : "Operating Margin"},
		        {id:IncomeStatement.R_AND_D_TO_EXPENSE_RATIO, title : "R&D to Operating Expense"}];

	case CashFlow.INTERIM : 
		return null;

	case CashFlow.ANNUAL :  
		return [{id:CashFlow.OPERATING_CASH, title:"Operating Cash"},
		        {id:CashFlow.OPERATING_CASH, title:"Operating Cash"},
		        {id:CashFlow.OPERATING_CASH, title:"Operating Cash"},
		        {id:CashFlow.OPERATING_CASH, title:"Operating Cash"}];

	}

}

Message.LEVEL_UP = 1;
Message.LEVEL_DOWN = 2;
Message.LEVEL_NORMAL = 0;

function Message(mesg, level, tooltipKey) {
	this.mesg = mesg;
	if(level)this.level = level;
	this.tk = tooltipKey;
}

Message.get = function(mesg, level, tpKey) {
	var lvl = (level) ? level : Message.LEVEL_NORMAL;
	var tipKey = (tpKey) ? tpKey : "";
	var x = new Message(mesg, lvl, tipKey);
	return x;
}

Message.prototype.getLevel = function() {
	return this.level;
}
Message.prototype.getMesg = function() {
	return this.mesg;
}

Message.prototype.getTooltip = function() {
	return com.fa.getTooltipDescArray()[this.tk];
}

Message.prototype.getTooltipKey = function() {
	return this.tk;
}

Message.prototype.getLevelClass = function() {

	switch (this.level) {
	case Message.LEVEL_UP:
		return "upArrow";
	case Message.LEVEL_DOWN:
		return "downArrow";
	default:
		return "";
	}
}

//(function(){
	var ns = com.fa;
	ns.getTooltipDescArray = function(key) {
		return tooltipDescs[key];
	}

	var tooltipDescs = new Array();

	//Balance Sheet
	tooltipDescs[BalanceSheet.NET_PROPERTY_PLANT_EQUIPMENT] = ['These are the fixed assets which are hard to convert to cash. This should generally include the accumulated depreciation', 'Not too much attention to be paid without ignoring it'];
	tooltipDescs[BalanceSheet.CASH_AND_SHORT_TERM_INVESTMENTS] = ['This represent the cash or the amount of investments that could be converted to cash in the short term', 'This amount could be used to pay dividends, share buybacks or a cushion which would be useful in bad times'];
	tooltipDescs[BalanceSheet.TOTAL_RECEIVABLES_NET] = ['This represent the amount of money the company is going to receive from their customers' , 'When the company sells a product it sets a term (30-60-90 days) by which the customers have to pay without defaulting' , 'Receivables might become bad if the customer files for bankruptcy or does not pay in time', 'The <b>receivable turn</b> should be able give an idea about the time the customers are taking to make their payments' ];
	tooltipDescs[BalanceSheet.TOTAL_EQUITY] = ['<b>Total Equity = Total Assets - Total Liabilities</b>'];
	tooltipDescs[PeriodStmts.CURRENT_RATIO] = ['<b>Current Ratio = Total Current Assets / Current Liabilities</b>','Current Ratio indicates short term liquidity.', 'If the current ratio is lower (~1) and the company has low inventory turns (is not able to convert the inventory into cash), it might be a sign of trouble'];
	tooltipDescs[PeriodStmts.QUICK_TEST_RATIO] = ['<b>Quick Ratio = (Cash and Short Term Investments + Total Receivable) / Current Liabilities</b>','A stringent test that indicates whether a firm has enough short-term assets to cover its immediate liabilities without selling inventory', 'The acid-test ratio is far more strenuous than the working capital ratio, primarily because the working capital ratio allows for the inclusion of inventory assets'];
	tooltipDescs[PeriodStmts.DEBT_TO_EQUITY_RATIO] = ['<b>Debt to Equity Ratio = Total Debt / Total Equity</b>','Company having a debt to equity ratio of over 40 to 50% might have liquidity problems.'];
	tooltipDescs[PeriodStmts.INVENTORY_TO_CURRENT_ASSETS_RATIO] = ['<b>Inv to Assets Ratio = Total Inventory / Total Current Assets</b>', 'Higher number indicates the inventory an important part of current assets and the company should be able to clear it as soon as it can', 'If the company is not able to clear the inventory, it will pile up and eventually the company might have to write it down', '<b>Inventory Turns</b> should be able to tell how often the company is able to clear the inventory'];
	tooltipDescs[BalanceSheet.TOTAL_INVENTORY] = ['The inventory represents the merchandise which is waiting to be sold', 'A huge inventory pile up as compared to current assets and with a low inventory turn rate is a cause of concern', 'See Inv to Assets Ratio for more details'];
	tooltipDescs[BalanceSheet.CURRENT_PORTION_LT_DEBT] = ['If the sum of current portion of long term debt and the notes payable is more than the cash equivalents, that might be a sign of trouble'];
	tooltipDescs[BalanceSheet.ACCOUNTS_PAYABLE] = ['The money which is owed by the company for which the goods/services have been already procured'];
	tooltipDescs[BalanceSheet.ACCRUED_EXPENSES] = ['This usually represents the salary which has not yet been paid'];
	tooltipDescs[BalanceSheet.NOTES_PAYABLE] = ['If the sum of current portion of long term debt and the notes payable is more than the cash equivalents, that might be a sign of trouble'];
	tooltipDescs[BalanceSheet.CURRENT_PORTION_LT_DEBT] = ['If the sum of current portion of long term debt and the notes payable is more than the cash equivalents, that might be a sign of trouble'];
	tooltipDescs[BalanceSheet.PREPAID_EXPENSES] = ['Prepaid Expenses is the expense which is prepaid like rent,taxes', 'The company might have paid the rent for the whole year and might be taking an expense 1/12th of the amount each month', 'Usually this is a small amount in comparision to assets and is generally not taken seriously while analysing a balance sheet'];
	tooltipDescs[PeriodStmts.BOOK_VALUE_PER_SHARE] = ['<b>BVPS = (Total Assets - Total Liabilities) / Total Outstanding Shares</b>'];
    tooltipDescs[BalanceSheet.INTANGIBLES] = ['When analyzing a balance sheet, you might be better off to ignore the intangible assets.  It is the income statement, not the balance sheet, that gives investors insight into the value of these intangible items']
    tooltipDescs[BalanceSheet.NET_GOODWILL] = ['Goodwill in financial statements arises when a company is purchased for more than the book value of the company', '<b>Goodwill = Purchase Price – Fair Market Value of Net Assets</b>', 'Goodwill could be used to inflate the assets value it is better to not include this intangible assets in the analysis', 'If there is a goodwill charge try to see if the company has made any expensive acquisitions in the recent past'];
    tooltipDescs[BalanceSheet.MINORITY_INTEREST] = ['Minority interest is a liability which refers to ownership of a company (subsidiary) that is less than 50% of outstanding shares', 'Example: If a company A owns 95% of a subsidiary company B (a $100 million company), on A\'s balance sheet, there would be a $5 million liability in minority interest as this is not owned by A','Minority interest is also reported on the consolidated <b>income statement</b> as a share of profit belonging to minority shareholders'];
    tooltipDescs[BalanceSheet.WORKING_CAPITAL] = ['<b>Working Capital = Current Assets - Current Liabilities</b>'];

	//Income Statement (my lines)
	tooltipDescs[IncomeStatement.TOTAL_REVENUE] = ['Total Revenue is the total money by selling products. It is not the profit made.'];
	tooltipDescs[IncomeStatement.TOTAL_COST_OF_REVENUE] = ['Cost of Revenue is the amount spent on manufacturing the product, buying raw materials etc.', 'It does not include any other cost such as salaries, admin expenses, taxes.'];
	tooltipDescs[IncomeStatement.GROSS_PROFIT] = ['<b>Gross Profit = Total Sales or Revenue - Cost of Total Sales or Revenue</b>', 'This amount does not include the salaries, admin expenses and the taxes', 'This is used to calculate <b>Gross Profit Margin</b> shown in the graph above.'];
	tooltipDescs[IncomeStatement.GROSS_PROFIT_MARGIN] = ['<b>Gross Profit Margin = Gross Profit / Total Revenue</b>', 'Gross Profit Margin represents the manufacturing and distribution efficiency of a product','This represents the percentage of the revenue that has turned into profit.','Generally this remains about the same. If it changes substantially, please try to look into it'];
	tooltipDescs[IncomeStatement.OPERATING_MARGIN] = ['<b>Operating Margin = Total Operating Income / Total Revenue</b>', 'This tells the percentage of the Operating Income compared to the total Revenue'];
	tooltipDescs[IncomeStatement.TOTAL_OPERATING_EXPENSES] = ['The company should strive to keep the Operating Expenses in control without affecting the underlying business','The Total Operating Expenses also includes the Cost of Revenue.'];
	tooltipDescs[IncomeStatement.OPERATING_INCOME] = ['<b>Operating Income = Total Revenue - Total Operating Expense</b>','Its a measure of the company making money in its core business and is extremely important','It does not include the money the company generates by other resources like investing in other companies', 'This is used to calculate the Operating Margin and Interest Coverage Ratio'];
	tooltipDescs[IncomeStatement.UNUSUAL_INCOME_EXPENSE] = ['The Unusual Expense is a one time charge that the company doesn\'t expect to encounter again', 'This expense could be kept out of the equation because this might not happen again.'];
	tooltipDescs[IncomeStatement.ACCOUNTING_CHANGE] = [];
	tooltipDescs[IncomeStatement.INTEREST_EXPENSE_OR_INCOME] = ['The interest expense would be the interest the company has to pay if it has taken a debt', 'The interest income would be the interest for any investment the company has made', 'Example: If the company borrows 100,000 dollars for buying an equipment, then it has to show this amount as asset on the balance sheet and the interest as expense on the Income Statement', 'It is imporatant to see if the company is paying too much interest as compared to the revenue or the income it is generating (see Interest Coverage Ratio)'];
	tooltipDescs[IncomeStatement.DEPRECIATION_AMORTIZATION] = ['Due to depreciation, the company might have positive net earnings, but still the company might not have generated Cash'];
	tooltipDescs[IncomeStatement.NET_INCOME] = ['Net Income is the net profit made on a business and does not include the preferred dividends','Just because the income statement shows net income of $10 does not means that cash on the balance sheet will increase by $10. Please check the Cash Flow for true cash generation','If the net income consists of Discontinued Operations, Accounting Change and Extraordinary Item, removing this from analysis might give a true picture as this won\'t be there in future'];
	tooltipDescs[IncomeStatement.NET_PROFIT_MARGIN] = ['<b>Net Profit Margin = Net Income/Total Revenue</b>'];
	tooltipDescs[IncomeStatement.PREFERRED_DIVIDENDS] = ['Preferred Dividents is the guaranteed expense which the company has to pay to the preferred shareholders'];

	//cash flow
	tooltipDescs[CashFlow.CHANGES_IN_WORKING_CAPITAL] = ['<b>Changes in Working Capital = Current Assets - Current Liabilities</b>', 'Increases in current assets other than cash, such as inventories and accounts receivable, decrease cash, whereas decreases in this accounts increase cash.'];
    tooltipDescs[CashFlow.NET_CHANGE_IN_CASH] = ['<b>Net Change in Cash = Cash from Operating Activities + Cash from Investing Activities + Cash from Financing Activities</b>','when the bottom of the cash flow statement reads $10 net cash inflow, that\'s exactly what it means. The company has $10 more in cash than at the end of the last financial period.', 'Because it shows how much actual cash a company has generated, the statement of cash flows is critical to understanding a company\'s fundamentals. It shows how the company is able to pay for its operations and future growth', 
                                                 'Just because a company shows a profit on the income statement doesn\'t mean it cannot get into trouble later because of insufficient cash flows', 'Just because the company has positive cash flows, it does not mean the company is healthy. The company might have sold some inventory at low prices but the income might be bad. So it is important to also look at Income Statement'];
    tooltipDescs[CashFlow.OPERATING_CASH] = ['This measures the cash generated by core business','It shows the company\'s ability to generate consistently positive cash flow from operations', 'If the company is not able to generate consisten positive numbers from normal operations, it is not a good sign'];
    tooltipDescs[CashFlow.CASH_FROM_INVESTING] = ['This measures the cash used or generated by buying or selling income producing assets','It could mean selling some equipment, inventory at cheap prices to generate cash, or buying or selling companies'];
    tooltipDescs[CashFlow.CASH_FROM_FINANCING] = ['Negative number might mean repaying the debt, payment of dividends, share buyback which might be good for shareholders', 'Positive values might mean Issuance of Stock or Debt and this might not be good if this is other than the initial IPO'];

//For example, say a manufacturing company is experiencing low product demand and therefore decides to sell off half its factory equipment at liquidation prices. It will receive cash from the buyer for the used equipment, but the manufacturing company is definitely losing money on the sale: it would prefer to use the equipment to manufacture products and earn an operating profit. But since it cannot, the next best option is to sell off the equipment at prices much lower than the company paid for it. In the year that it sold the equipment, the company would end up with a strong positive cash flow, but its current and future earnings potential would be fairly bleak. Because cash flow can be positive while profitability is negative, investors should analyze income statements as well as cash flow statements, not just one or the other.

//})();
