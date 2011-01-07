// ==UserScript==
// @name          Google Financial Statement Analyzer
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Analyzes Google Finance Balance Sheet and Income Statement
// @include       http://www.google.com/finance?fstype*
// @require       http://www.google.com/jsapi
// @author        Srinivas Singanamalla
// ==/UserScript==

// callback for mouseover

var com;
if (!com)
    com = {};
if (!com.fa)
    com.fa = {};
if (!com.fa.Parser)
    com.fa.Parser = {};

if (!com.fa.Utils)
    com.fa.Utils = {};

if (!com.fa.svg)
    com.fa.svg = {};

if(!com.fa.finSheet)
	com.fa.finSheet = {};


(function(){
	var ns = com.fa.Utils;
    ns.getTooltippedIcon = function(tooltipKey) {
    	var a = document.createElement('a');
        a.setAttribute('class', 'infoIcon');
        //a.setAttribute('name', i);
        a.setAttribute('tk', tooltipKey);
        a.setAttribute('href', 'javascript:void(0)');
        a.style.display = 'inline';
        a.style.visibility = 'hidden';

        a.addEventListener("click", function(evt){
    		console.log(evt);
            var x = evt.pageX + 20;
            var y = evt.pageY + 20;
            tooltip.extractKeyAndShow(this.getAttribute('tk'), 500, x, y);
        }, false);

        a.addEventListener("mouseout", function(){
            tooltip.hide();
        }, false);
        return a;
    }


})();

function Finance(){
}

Finance.BOOK_VALUE_PER_SHARE = 'bvps';
Finance.CURRENT_RATIO = 'cr';
Finance.QUICK_TEST_RATIO = 'qtr';
Finance.DEBT_TO_EQUITY_RATIO = 'der';
Finance.EQUITY_TO_DEB_RATIO = 'ebr';
Finance.INVENTORY_TO_CURRENT_ASSETS_RATIO = 'icar';
Finance.RETURN_ON_TOTAL_ASSETS = 'rta';
Finance.RECEIVABLE_TURN_IN_DAYS = 'rtd';
Finance.RECEIVABLE_TURN = 'rt';

function Analyzer(){
}

Analyzer.analyzeInterimBalanceSheet = function(sheet){

	var params = [{key:Finance.CURRENT_RATIO, title:"Current Ratio"},
	              {key:Finance.DEBT_TO_EQUITY_RATIO, title:"Debt to Equity Ratio"},
	              {key:Finance.INVENTORY_TO_CURRENT_ASSETS_RATIO, title : "Inv to CAssets Ratio"},
	              {key:Finance.BOOK_VALUE_PER_SHARE, title : "Book value per share"},
                  {key:Finance.RECEIVABLE_TURN, title:"Receivable Turns"}];

	var bs = new BalanceSheet(sheet);
	var messages = bs.analyze();
	for(var i=0; i<params.length;i++) {
		com.fa.svg.drawChartInSvgDiv(bs.getValues(params[i].key), params[i].title, params[i].key);
	}

    return messages;
}

Analyzer.analyzeAnnualBalanceSheet = function(sheet){

	var params = [{key:Finance.CURRENT_RATIO, title:"Current Ratio"},
	              {key:Finance.DEBT_TO_EQUITY_RATIO, title:"Debt to Equity Ratio"},
	              {key:Finance.INVENTORY_TO_CURRENT_ASSETS_RATIO, title : "Inv to CAssets Ratio"},
	              {key:Finance.BOOK_VALUE_PER_SHARE, title : "Book value per share"},
	              {key:Finance.RETURN_ON_TOTAL_ASSETS, title:"Annual ROA"},
	              {key:Finance.RECEIVABLE_TURN, title:"Receivable Turns"}];

    var bs = new BalanceSheet(sheet);
    var messages = bs.analyze();
    for(var i=0; i<params.length;i++) {
		com.fa.svg.drawChartInSvgDiv(bs.getValues(params[i].key), params[i].title, params[i].key);
	}
    return messages;
}

Analyzer.analyzeInterimIncomeStatement = function(sheet){

	var params = [{key:IncomeStatement.GROSS_PROFIT_MARGIN, title:"Gross Profit Margin"},
	              {key:IncomeStatement.NET_PROFIT_MARGIN, title:"Net Profit Margin"},
	              {key:IncomeStatement.OPERATING_MARGIN, title : "Operating Margin"},
	              {key:IncomeStatement.R_AND_D_TO_EXPENSE_RATIO, title : "R&D to Operating Expense"}]

    var inc = new IncomeStatement(sheet);
    var messages = inc.analyze();
    for(var i=0; i<params.length;i++) {
		com.fa.svg.drawChartInSvgDiv(inc.getValues(params[i].key), params[i].title, params[i].key);
	}

    return messages;
}

Analyzer.analyzeAnnualIncomeStatement = function(sheet){
	var params = [{key:IncomeStatement.GROSS_PROFIT_MARGIN, title:"Gross Profit Margin"},
	              {key:IncomeStatement.NET_PROFIT_MARGIN, title:"Net Profit Margin"},
	              {key:IncomeStatement.OPERATING_MARGIN, title : "Operating Margin"},
	              {key:IncomeStatement.R_AND_D_TO_EXPENSE_RATIO, title : "R&D to Operating Expense"}]

    var inc = new IncomeStatement(sheet);
    var messages = inc.analyze();
    for(var i=0; i<params.length;i++) {
		com.fa.svg.drawChartInSvgDiv(inc.getValues(params[i].key), params[i].title, params[i].key);
	}
    return messages;
}


Analyzer.analyzeInterimCashFlow = function(sheet){
    return null;
}

Analyzer.analyzeAnnualCashFlow = function(sheet){
    var params = [{key:CashFlow.OPERATING_CASH, title:"Operating Cash"}];

    var cashflow = new CashFlow(sheet);
    var messages = cashflow.analyze();
    for(var i=0; i<params.length;i++) {
		com.fa.svg.drawChartInSvgDiv(cashflow.getValues(params[i].key), params[i].title, params[i].key);
	}

    return messages;
}

function BalanceSheet(sheet){
    this.sheet = sheet;
}

BalanceSheet.TOTAL_INVENTORY = 'b_ti';
BalanceSheet.TOTAL_CURRENT_ASSETS = 'b_tca';
BalanceSheet.NET_PROPERTY_PLANT_EQUIPMENT = 'b_nppe';
BalanceSheet.TOTAL_ASSETS = 'b_ta';
BalanceSheet.TOTAL_CURRENT_LIABILITIES = 'b_tcl';
BalanceSheet.ACCOUNTS_PAYABLE = 'b_ap';
BalanceSheet.ACCRUED_EXPENSES = 'b_ae';
BalanceSheet.NET_GOODWILL = 'b_gn';
BalanceSheet.INTANGIBLES = 'b_i';
BalanceSheet.TOTAL_LIABILITIES = 'b_tl';
BalanceSheet.TOTAL_RECEIVABLES_NET = 'b_trn';
BalanceSheet.TOTAL_DEBT = 'b_db';
BalanceSheet.TOTAL_EQUITY = 'b_te';
BalanceSheet.TOTAL_COMMON_SHARES_OUTSTANDING = 'b_tcso';
BalanceSheet.CASH_AND_SHORT_TERM_INVESTMENTS = 'b_cesi';

BalanceSheet.prototype.analyze = function(){
    var messages = new Array();
    var index = 0;
    // CURRENT RATIO
    var currentRatio = this.getCurrentRatio(index);
    var crMessage = "Current Ratio is " + currentRatio;//+ ". Current Ratio less than 1 may not be good";
    /**
     if (currentRatio > 4) {
     crMessage += "\nA number this high means that management has so much cash on hand, they may be doing a poor job of investing it.  This is one of the reasons it is important to read the annual report, 10k and 10q of a company.  Most of the time, the executives will discuss their plans in these reports.  If you notice a large pile of cash building up and the debt has not increased at the same rate (meaning the money is not borrowed), you may want to try to find out what is going on";
     }**/
    messages.push(crMessage);

    // Analyzing inventory to Current Assets If 70% of a company's current
    // assets are tied up in inventory and the business does not have a
    // relatively low turn rate (less than 30 days), it may be a signal that
    // something is seriously wrong and an inventory write-down is unavoidable.
    // calculating inventory turn rate current years cost of goods sold/avg.
    // inventory for the period


    var invToCurrAssetsRatio = this.getInvToCurrAssetsRatio(index);
    messages.push("Inventory to Current Assets Ratio is " + invToCurrAssetsRatio);
    if (invToCurrAssetsRatio > 0) {
        messages.push("Inventory Turn is " + getInventoryTurnInDays(index) + " days");
    }
    messages.push("Receivable Turn is " + getReceivableTurnInDays(index) + " days");
    if (invToCurrAssetsRatio > 0.7) {
        if (getInventoryTurnInDays(index) > 30) {
            messages.push("More than 70% of a company\'s current assets are tied up in inventory and the business has a relatively high inventory turn rate (>30) ");
        }
    }

    if (this.getTotalDebt(index) == 0) {
        messages.push("Total debt is Zero");
    }

    //DEBT TO EQUITY RATIO
    var debtEquityRatio = this.getTotalDebtToEquityRatio(index);
    crMessage = "Debt to Equity Ratio is " + debtEquityRatio;
    if (debtEquityRatio > 0.45) {
        //crMessage += "Company having a debt to equity ratio of over 40 to 50% should be looked at more carefully looked upon for any liquidity problems";
    }
    messages.push(crMessage);

    // Book Value per share
    messages.push("Book value per share " + this.getBookValuePerShare(index));

    // Return on Total Assets
    messages.push("Return on Total Assets " + getReturnOnAssets(index));
    // ". Companies like MSFT have high ROA, and its book value is much lower than the market price");
    
    

    return messages;
}


BalanceSheet.prototype.getTotalDebt = function(index){
    return parseInt(this.sheet.val[BalanceSheet.TOTAL_DEBT][index]);
}
BalanceSheet.prototype.getCurrentRatio = function(index){
    var currentRatio = parseInt(this.sheet.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index]) / parseInt(this.sheet.val[BalanceSheet.TOTAL_CURRENT_LIABILITIES][index]);
    return currentRatio.toFixed(2);
}

BalanceSheet.prototype.getInvToCurrAssetsRatio = function(index){
    var invToCurrAssetsRatio = parseInt(this.sheet.val[BalanceSheet.TOTAL_INVENTORY][index]) / parseInt(this.sheet.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index]);
    return invToCurrAssetsRatio.toFixed(2);
}

BalanceSheet.prototype.getEquity = function(index){
    return parseInt(this.sheet.val[BalanceSheet.TOTAL_EQUITY][index]);
}


BalanceSheet.prototype.getTotalDebtToEquityRatio = function(index){
    var ratio = this.getTotalDebt(index) / this.getEquity(index);
    return ratio.toFixed(2);
}

BalanceSheet.prototype.getBookValue = function(index){
    var bv = parseInt(this.sheet.val[BalanceSheet.TOTAL_ASSETS][index]) - parseInt(this.sheet.val[BalanceSheet.TOTAL_LIABILITIES][index]);
    return bv;
}

BalanceSheet.prototype.getValues = function(key){
    var len = this.sheet.val[BalanceSheet.TOTAL_ASSETS].length;
    var values = new Array();
    var value = null;
    for (var i = 0; i < len; i++) {
        switch (key) {
            case Finance.BOOK_VALUE_PER_SHARE:
                value = this.getBookValuePerShare(i);
                break;
            case Finance.CURRENT_RATIO:
                value = this.getCurrentRatio(i);
                break;
            case Finance.DEBT_TO_EQUITY_RATIO:
                value = this.getTotalDebtToEquityRatio(i);
                break;
            case Finance.INVENTORY_TO_CURRENT_ASSETS_RATIO:
                value = this.getInvToCurrAssetsRatio(i);
                break;
            case Finance.RETURN_ON_TOTAL_ASSETS:
                value = getReturnOnAssets(i);
                break;
            case Finance.RECEIVABLE_TURN:
                value = getReceivableTurn(i);
                break;
        }
        if (value != null) {
            values.push(value);
        }
    }
    return values;
}



BalanceSheet.prototype.getBookValuePerShare = function(index){
    var bvps = this.getBookValue(index) / parseInt(this.sheet.val[BalanceSheet.TOTAL_COMMON_SHARES_OUTSTANDING][index]);
    return bvps.toFixed(2);
}

CashFlow.CHANGES_IN_WORKING_CAPITAL = 'c_cwc';
CashFlow.NET_CHANGE_IN_CASH = 'c_ncc';
CashFlow.OPERATING_CASH = 'c_oc';
CashFlow.CASH_FROM_INVESTING = 'c_cfi';
CashFlow.CASH_FROM_FINANCING = 'c_cff';

CashFlow.prototype.analyze = function() {
    
}
CashFlow.prototype.getValues = function(key){
    var len = this.sheet.val[CashFlow.OPERATING_CASH].length;
    var values = new Array();
    var value = null;
    for (var i = 0; i < len; i++) {
        switch (key) {
            case CashFlow.OPERATING_CASH:
                value = this.sheet.val[CashFlow.OPERATING_CASH][i];
                break;
        }
        if (value != null) {
            values.push(value);
        }
    }
    return values;
}

function CashFlow(sheet) {
    this.sheet = sheet;
}


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

IncomeStatement.prototype.analyze = function(){
    var messages = new Array();
    var index = 0;

    // Gross Profit Margin
    var gpm = this.getGrossProfitMargin(index);
    messages.push("Gross Profit Margin is " + gpm);
    //If there is an unusual expense, report it.
    if (this.getUnusualExpense(index) > 0) {
        var unusualFactor = (this.getUnusualExpense(index) / this.getTotalOperatingExpense(index)).toFixed(2);
        messages.push("The Unusual Expense is " + (unusualFactor*100).toFixed(2) + " % of the total operating expenses" );
        //If the unusual expenses were not present, the Operating income would have been increased to " + parseFloat(this.getUnusualExpense(index) + this.getOperatingIncome(index))
    }

    if (this.getNetIncome() - this.sheet.val[IncomeStatement.NET_INCOME_BEFORE_EXTRA_ITEMS][index] > 0) {
        messages.push("There are some expenses for Accounting Charge, Discontinued Operations or Extraordinary. These may be one time. Please investigate.")
    }
    messages.push("Operating Margin is " + this.getOperatingMargin(index))

    //Interest Coverage Ratio
    return messages;
}

IncomeStatement.prototype.getTotalRevenue = function(index){
    return this.sheet.val[IncomeStatement.TOTAL_REVENUE][index];
}

IncomeStatement.prototype.getGrossProfit = function(index){
    return this.sheet.val[IncomeStatement.GROSS_PROFIT][index];
}

IncomeStatement.prototype.getGrossProfitMargin = function(index){
    var gpm = this.getGrossProfit(index) / this.getTotalRevenue(index)
    return gpm.toFixed(2);
}
IncomeStatement.prototype.getUnusualExpense = function(index){
    return this.sheet.val[IncomeStatement.UNUSUAL_INCOME_EXPENSE][index];
}

IncomeStatement.prototype.getTotalOperatingExpense = function(index){
    return this.sheet.val[IncomeStatement.TOTAL_OPERATING_EXPENSES][index];
}

IncomeStatement.prototype.getOperatingIncome = function(index){
    return this.sheet.val[IncomeStatement.OPERATING_INCOME][index];
}

IncomeStatement.prototype.getOperatingMargin = function(index){
    return (this.getOperatingIncome(index) / this.getTotalRevenue(index)).toFixed(2);
}

IncomeStatement.prototype.getNetIncome = function(index){
    return this.sheet.val[IncomeStatement.NET_INCOME][index];
}

IncomeStatement.prototype.getNetProfitMargin = function(index){
    return (this.getNetIncome(index) / this.getTotalRevenue(index)).toFixed(2);
}

IncomeStatement.prototype.getRAndDToExpenseRatio = function(index){
    return (this.sheet.val[IncomeStatement.RESEARCH_AND_DEVELOPMENT][index] / this.getTotalOperatingExpense(index)).toFixed(2);
}

IncomeStatement.prototype.getValues = function(key){
    var len = this.sheet.val[IncomeStatement.TOTAL_REVENUE].length;
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
            values.push(value);
        }
    }
    return values;
}

function IncomeStatement(sheet){
    this.sheet = sheet;
}

function getReturnOnAssets(index){
    var ni = parseInt(com.fa.annualInc.val[IncomeStatement.NET_INCOME][index]);
    var totalAssets = parseInt(com.fa.annualBal.val[BalanceSheet.TOTAL_ASSETS][index]);
    var perc = (ni / totalAssets) * 100;
    return perc.toFixed(2);
}

function getInventoryTurnInDays(index){
    if (index + 1 > com.fa.annualBal.val[BalanceSheet.TOTAL_INVENTORY].length - 1) {
        return -9999;
    }
    else {
        var costOfRev = parseInt(com.fa.annualInc.val[IncomeStatement.TOTAL_COST_OF_REVENUE][index]);
        var avgInv = (parseInt(com.fa.annualBal.val[BalanceSheet.TOTAL_INVENTORY][index]) + parseInt(com.fa.annualBal.val[BalanceSheet.TOTAL_INVENTORY][index + 1])) / 2;
        var turns = 365 * avgInv / costOfRev
        return turns.toFixed(2);
    }
}

function getReceivableTurn(index){
    if("annual" == GM_getValue("periodType")) {
        var incSheet = com.fa.annualInc;
        var balSheet = com.fa.annualBal;
    } else {
        var incSheet = com.fa.interimInc;
        var balSheet = com.fa.interimBal;
    }
    if (index + 1 > balSheet.val[BalanceSheet.TOTAL_RECEIVABLES_NET].length - 1) {
        return null;
    }
    else {
        var totalRev = parseInt(incSheet.val[IncomeStatement.TOTAL_REVENUE][index]);
        var avgReceivables = (parseInt(balSheet.val[BalanceSheet.TOTAL_RECEIVABLES_NET][index]) + parseInt(balSheet.val[BalanceSheet.TOTAL_RECEIVABLES_NET][index + 1])) / 2;
        var turns = totalRev/avgReceivables;
        return turns.toFixed(2);
    }
}

function getReceivableTurnInDays(index){
    if (index + 1 > com.fa.annualBal.val[BalanceSheet.TOTAL_RECEIVABLES_NET].length - 1) {
        return null;
    }
    else {
        var turnsInDays = 365 / getReceivableTurn(index);
        return turnsInDays.toFixed(2);
    }
}


com.fa.Utils.trim = function(str){
    var lIndex = 0;
    var rIndex = str.length - 1;

    while (lIndex < str.length) {
        if (String(str.charAt(lIndex)).search(/\s/) == 0) {
            lIndex++;

        }
        else {
            break;
        }
    }

    if (lIndex == str.length)
        return '';

    while (rIndex > 0) {
        if (String(str.charAt(rIndex)).search(/\s/) == 0) {
            rIndex--;
        }
        else {
            break;
        }
    }
    return str.substring(lIndex, rIndex + 1);
}


com.fa.Utils.getInnerRect = function(rect, dx, dy){
    var left = right = rect.w * dx;
    var top = bottom = rect.h * dy;
    return new com.fa.Utils.Rect(rect.x + left, rect.y + top, (rect.w - left - right), rect.h - top - bottom);
}

com.fa.Utils.getTransformedPoint = function(dataPoint, srcRect, destRect){
    var scaleX = destRect.w / srcRect.w;
    var scaleY = destRect.h / srcRect.h;

    var xdash = destRect.x + (dataPoint.x - srcRect.x) * scaleX;
    var ydash = destRect.y + destRect.h - (dataPoint.y - srcRect.y) * scaleY;

    return new com.fa.Utils.Point(xdash, ydash);
}

com.fa.svg.BasicStyle = (function(){

    function BS(fillColor, filled, strokeColor, stroked, strokeWeight){
        this.fillColor = fillColor;
        this.filled = filled;
        this.strokeColor = strokeColor;
        this.stroked = stroked;
        this.strokeWeight = strokeWeight;
    };

    return BS;
})();

// SVG
/** creational methods */
com.fa.VGFactory = (function(){
    var F = {};
    var SVG_NS = 'http://www.w3.org/2000/svg';
    /* properties & methods go here */

    F.setupVGHookInBrowser = function setupVGHookInBrowser(){
        // Add xml namespace definition:
        document.documentElement.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    }


    F.createSVGElement = function(tagName, id){
        var element = document.createElementNS('http://www.w3.org/2000/svg', tagName);
        if (id != null) {
            element.setAttributeNS(null, 'id', id);
        }
        return element;
    }
    /**
     * @param basicStyle {com.fa.svg.BasicStyle}
     */
    F.setBasicStyle = function(element, basicStyle){
        if (basicStyle.filled) {
            element.setAttributeNS(null, 'fill', basicStyle.fillColor);
        }
        else {
            element.setAttributeNS(null, 'fill', 'none');
        }

        if (basicStyle.stroked) {
            element.setAttributeNS(null, 'stroke', basicStyle.strokeColor);
        }
        else {
            element.setAttributeNS(null, 'stroke', 'none');
        }
        if (basicStyle.strokeWeight) {
            element.setAttributeNS(null, 'stroke-width', basicStyle.strokeWeight);
        }
    }


    F.setBounds = function(element, rect){
        element.setAttributeNS(null, 'x', rect.x);
        element.setAttributeNS(null, 'y', rect.y);
        element.setAttributeNS(null, 'width', rect.w);
        element.setAttributeNS(null, 'height', rect.h);
    }

    F.setCoords = function(element, coordRect){
        if (coordRect == null) {
            alert('coordRect cannot be null in the com.fa.VGFactory : setCoords');
            return;
        }
        var coordStr = coordRect.x + ' ' + coordRect.y + ' ' + coordRect.w + ' ' + coordRect.h;
        element.setAttributeNS(null, 'viewBox', coordStr);
        return element;
    }

    F.createRectangleElement = function createRectangleElement(id, rectStyle, styleBoundary){
        var element = F.createSVGElement('rect', id);
        F.setBasicStyle(element, rectStyle);
        F.setBounds(element, styleBoundary)
        return element;
    }

    F.createCircleElement = function(id, datapointStyle, center, radius){
        var element = F.createSVGElement('circle', id);
        F.setBasicStyle(element, datapointStyle);
        element.setAttributeNS(null, "cx", center.getX());
        element.setAttributeNS(null, "cy", center.getY());
        element.setAttributeNS(null, "r", radius);

        return element;
    }

    F.createLineElement = function createLineElement(id, lineStyle, line){
        var element = F.createSVGElement('line', id);
        F.setBasicStyle(element, lineStyle);
        element.setAttributeNS(null, "y2", line.y2);
        element.setAttributeNS(null, "x2", line.x2);
        element.setAttributeNS(null, "y1", line.y1);
        element.setAttributeNS(null, "x1", line.x1);
        return element;
    }

    F.createTextElement = function(id, text, textStyle){
        var element = F.createSVGElement('text', id);
        F.setBasicStyle(element, textStyle);
        text != null ? element.appendChild(document.createTextNode(text)) : "";
        return element;
    }

    F.createFitTextPathElement = function(id, text, textpathStyle, styleBoundary, pathFitLine){
        var element = F.createSVGElement('text', id);
        F.setBasicStyle(element, textpathStyle);

        var x = 0.5 * (pathFitLine.x1 + pathFitLine.x2);
        var y = 0.5 * (pathFitLine.y1 + pathFitLine.y2);

        element.setAttributeNS(null, 'x', x);
        element.setAttributeNS(null, 'y', y);
        element.setAttributeNS(null, 'text-anchor', 'middle');

        if (textpathStyle.getFontSize() != null) {
            element.setAttributeNS(null, 'font-size', textpathStyle.getFontSize());
        }
        text != null ? element.appendChild(document.createTextNode(text)) : "";
        return element;
    }
    /**
     * creates a group element. ignores styleBoundary and coordRect property
     */
    F.createGroupElement = function createGroupElement(id, styleBoundary, coordRect){
        var element = F.createSVGElement('g', id);
        return element;
    }

    /**
     * donot preserve the aspect ratio
     */
    F.createRootElement = function createRootElement(id, styleBoundary, coordRect){
        var element = F.createSVGElement('svg', id);
        element.setAttributeNS(null, 'preserveAspectRatio', 'none');
        F.setBounds(element, styleBoundary);
        F.setCoords(element, coordRect);
        return element;
    }

    F.createPolyline = function(id, datapointStyle, ptsArray){
        var element = F.createSVGElement('polyline', id);
        F.setBasicStyle(element, datapointStyle);
        var polyStr = '';

        for (var i = 0; i < ptsArray.length; i++) {
            polyStr += ptsArray[i].x + ',' + ptsArray[i].y + ' ';
        }
        element.setAttributeNS(null, "points", polyStr);
        return element;
    }

    return F;
})();



com.fa.Utils.Rect = (function(){

    function Rect(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    Rect.prototype.toString = function(){
        var str = 'x, y: (' + this.x + ',' + this.y + ') w, h : (' + this.w + ', ' + this.h + ')';
        return str;
    }

    Rect.prototype.clone = function(){
        return new Rect(this.x, this.y, this.w, this.h);
    }

    return Rect;
})();

com.fa.Utils.Point = (function(){
    function Point(x, y){ /* this is the class constructor */
        this.x = x;
        this.y = y;
    }

    Point.prototype.getX = function(){
        return this.x;
    }
    Point.prototype.getY = function(){
        return this.y;
    }
    return Point;
})();

com.fa.Utils.Line = (function(){
    function Line(x1, y1, x2, y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    Line.prototype.toString = function toString(){
        var str = 'from: ' + this.x1 + ',' + this.y1 + ' to: ' + this.x2 + ', ' + this.y2;
        return str;
    }
    return Line;
})();


(function(){
    var ns = com.fa.svg;

    function drawChartInSvgDiv(dataArray, title, titleTipKey){
        drawSVGChart(com.fa.getSvgDiv(), dataArray, title, titleTipKey);
    }

    ns.drawChartInSvgDiv = drawChartInSvgDiv;

    function drawSVGChart(insertChartHere, dataArray, title, titleTipKey){
        var max = Math.max.apply(null, dataArray);
        var min = Math.min.apply(null, dataArray);
        var dataRangeText = '[' + min + ' - ' + max + ']';

        //setup svg coordinates
        var divRect = new com.fa.Utils.Rect(0, 0, 150, 75);
        var vgCoordRect = divRect.clone();
        com.fa.VGFactory.setupVGHookInBrowser();
        var datapointsGroup = null;
        if (divRect != null) {
            var plotDiv = document.createElement('div');
            plotDiv.setAttribute('name', 'plotDiv');
            //var newTitle = title + ' ' + Math.min.apply(null, dataArray) + ', ' + Math.max.apply.(null, dataArray);
            var rootGroupElement = createSVGShellAndGetRoot(insertChartHere, plotDiv, divRect, 'root', vgCoordRect, title, titleTipKey, dataRangeText);
            datapointsGroup = com.fa.VGFactory.createGroupElement('datapoints', vgCoordRect, null);
            rootGroupElement.appendChild(datapointsGroup);
        }

        //BACKGROUND RECTANGLE
        var rectStyle = new com.fa.svg.BasicStyle('rgb(250, 250, 250)', true, '#000000', false, 4);
        datapointsGroup.appendChild(com.fa.VGFactory.createRectangleElement('boundary', rectStyle, vgCoordRect));

        // MEDIAN LINE
        var medianStyle = new com.fa.svg.BasicStyle('rgb(255, 0, 0)', false, 'rgb(255, 0, 0)', true, 1);
        var medianLine = new com.fa.Utils.Line(vgCoordRect.x, vgCoordRect.y + vgCoordRect.h / 2, vgCoordRect.x + vgCoordRect.w, vgCoordRect.y + vgCoordRect.h / 2);
        datapointsGroup.appendChild(com.fa.VGFactory.createLineElement('median', medianStyle, medianLine));

        //ADD DATAPOINTS
        var dataRect = ((max - min) > 0) ? new com.fa.Utils.Rect(0, min, dataArray.length - 1, max - min) : new com.fa.Utils.Rect(0, min - 100, dataArray.length - 1, min + 200)
        var svgPlotRect = com.fa.Utils.getInnerRect(vgCoordRect, 0.1, 0.2);

        var ptsArray = new Array();
        for (var i = 0; i < dataArray.length; i++) {
            var svgPoint = com.fa.Utils.getTransformedPoint(new com.fa.Utils.Point(i, dataArray[i]), dataRect, svgPlotRect);
            ptsArray.push(svgPoint);
        }

        //polyline connecting the points
        var polyStyle = new com.fa.svg.BasicStyle('rgb(0, 0, 0)', false, '#000000', true, 1);
        datapointsGroup.appendChild(com.fa.VGFactory.createPolyline('poly', polyStyle, ptsArray));

        for (i = 0; i < ptsArray.length; i++) {
            var datapointStyle = new com.fa.svg.BasicStyle('rgb(0, 0, 0)', true, '#000000', false, 4);
            var pointElem = com.fa.VGFactory.createCircleElement(null, datapointStyle, ptsArray[i], 3 /** DIAMETER* */);
            pointElem.setAttribute("tp_y", dataArray[i]);

            pointElem.addEventListener("mouseover", function(){
                plotDiv.childNodes[0].innerHTML = this.getAttribute("tp_y");
            }, false);

            pointElem.addEventListener("mouseout", function(){
                plotDiv.childNodes[0].innerHTML = "&nbsp;&nbsp;"
            }, false);

            datapointsGroup.appendChild(pointElem);
        }
    }

    function createSVGShellAndGetRoot(chartParentDiv, div, divRect, rootID, vgCoordRect, title, chartDescKey, dataRangeText){
        chartParentDiv.appendChild(div);
        // add style
        div.style.top = divRect.y;
        div.style.left = divRect.x;
        div.style.width = divRect.w;
        div.style.height = divRect.h;

        div.style.padding = '10px';
        div.style.cssFloat = "left" // IE has styleFloat property
        if (title) {
            var tooltipDiv = document.createElement('div');
            tooltipDiv.style.cssFloat = 'none';
            tooltipDiv.innerHTML = "&nbsp;&nbsp;";
            div.appendChild(tooltipDiv);
        }
        var rootGroupElement = com.fa.VGFactory.createRootElement(rootID, divRect, vgCoordRect);
        div.appendChild(rootGroupElement);
        if (title) {
            var titleDiv = document.createElement('div');
            titleDiv.style.cssFloat = 'none';
            titleDiv.appendChild(document.createTextNode(title));
           	var infoAnchor = com.fa.Utils.getTooltippedIcon(chartDescKey);
            titleDiv.appendChild(infoAnchor);
            //titleDiv.appendChild(document.createElement('br'));
            var dataRangeDiv = document.createElement('div');
            dataRangeDiv.appendChild(document.createTextNode(dataRangeText))
            div.appendChild(titleDiv);
            div.appendChild(dataRangeDiv);


            titleDiv.addEventListener("mouseover", function(evt){
                this.lastChild.style.display = 'inline';
                this.lastChild.style.visibility = 'visible';
            }, false);

            titleDiv.addEventListener("mouseout", function(){
                this.lastChild.style.display = 'none';
            }, false);
        }

        return rootGroupElement;
    }

})();

var tooltip = function(){
    var id = 'tt';
    var top = 3;
    var left = 3;
    var maxw = 800;
    var speed = 10;
    var timer = 20;
    var endalpha = 100;
    var alpha = 0;
    var tt, t, c, b, h;
    var ie = document.all ? true : false;
    return {
        show: function(v, w, u, l){
            if (!tt || tt == null) {
                tt = document.createElement('div');
                tt.setAttribute('id', id);
                t = document.createElement('div');
                t.setAttribute('id', id + 'top');
                c = document.createElement('div');
                c.setAttribute('id', id + 'cont');
                b = document.createElement('div');
                b.setAttribute('id', id + 'bot');
                tt.appendChild(t);
                tt.appendChild(c);
                tt.appendChild(b);
                document.body.appendChild(tt);
                tt.style.opacity = 0;
                tt.style.filter = 'alpha(opacity=0)';
                //document.onmousemove = this.pos;
            }
            tt.style.display = 'block';
            c.innerHTML = v;
            tt.style.width = w ? w + 'px' : 'auto';
            if (!w && ie) {
                t.style.display = 'none';
                b.style.display = 'none';
                tt.style.width = tt.offsetWidth;
                t.style.display = 'block';
                b.style.display = 'block';
            }
            //if (tt.offsetWidth > maxw) {
            //    tt.style.width = maxw + 'px'
            //}
            h = parseInt(tt.offsetHeight) + top;
            clearInterval(tt.timer);
            tt.timer = setInterval(function(){
                tooltip.fade(1)
            }, timer);
			console.log(" u is " + u + " l " + l);
			tooltip.pos(u, l);
        },

        extractKeyAndShow:function(key, w, u, l){
        	var descs = com.fa.finSheet.getTooltipDescArray(key);
        	var innerHtml = 'unimplemented';
        	if(descs) {
        		innerHtml = '<ul>'
        		 for(var i=0; i<descs.length; i++) {
        			 innerHtml += '<li>' + descs[i] + '</li>';
        		 }
        		innerHtml += '</ul>';
        	}
        	//console.log("tiip " + tip);
        	tooltip.show( innerHtml, w, u, l);
        },
        pos1: function(e){
            var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
            var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
            tt.style.top = (u - h) + 'px';
            tt.style.left = (l + left) + 'px';
        },
        pos: function(u, l){
        	tt.style.left = (u) + 'px';
            tt.style.top = (l) + 'px';
        },
        fade: function(d){
            var a = alpha;
            if ((a != endalpha && d == 1) || (a != 0 && d == -1)) {
                var i = speed;
                if (endalpha - a < speed && d == 1) {
                    i = endalpha - a;
                }
                else
                    if (alpha < speed && d == -1) {
                        i = a;
                    }
                alpha = a + (i * d);
                tt.style.opacity = alpha * .01;
                tt.style.filter = 'alpha(opacity=' + alpha + ')';
            }
            else {
                clearInterval(tt.timer);
                if (d == -1) {
                    tt.style.display = 'none'
                }
            }
        },
        hide: function(){
            clearInterval(tt.timer);
            tt.timer = setInterval(function(){
                tooltip.fade(-1)
            }, timer);
        }
    };
}();


(function(){
    var ns = com.fa;
    function addGlobalStyle(css){
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function addStyles(){
        addGlobalStyle('#tt {position:absolute; display:block; border: 2px solid rgb(0, 0, 0);background-color: white;}');
        addGlobalStyle('#tttop {display:block;height:5px;margin-left:5px;overflow:hidden;}');
        addGlobalStyle('#ttcont {display:block;padding:2px 5px 3px 2px;margin-left:0px;}');
        addGlobalStyle('#ttbot {display:block;height:5px;margin-left:5px;overflow:hidden;}');
        addGlobalStyle('.infoIcon { outline:none; background:transparent url(http://i40.tinypic.com/10sak47.png) no-repeat 0 2px;margin-left:5px; padding:0px 13px 0 0;}');
        //addGlobalStyle('.infoIcon { background:transparent url(http://i43.tinypic.com/2ahh101.png) no-repeat 0 0px; margin-left:5px; padding:0 16px 0 0;}');
    }

    function setStatementAndPeriodType(){
        var ids = ["inc", "bal", "cas"];
        for (var i = 0; i < ids.length; i++) {
            var elem = document.getElementById(ids[i]);
            if ("ac" == elem.getAttribute("class")) {
                GM_setValue("statementType", ids[i]);
                break;
            }
        }

        ids = ["interim", "annual"];
        for (var i = 0; i < ids.length; i++) {
            var elem = document.getElementById(ids[i]);
            if ("ac" == elem.getAttribute("class")) {
                GM_setValue("periodType", ids[i]);
                break;
            }
        }

    }

    function addAnalyzeAndClearBtn(){
        var divs = document.body.getElementsByTagName('div');
        var heading = null;
        for (var i = 0; i < divs.length; i++) {
            if ("hdg" == divs[i].getAttribute('class')) {
                heading = divs[i];
                break;
            }
        }
        heading.style.position = 'relative';

        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.right = 0;
        div.style.top = 0;
        heading.appendChild(div);

        var analyzeBtn = document.createElement('button');
        analyzeBtn.setAttribute("id", "analyzeBtn");
        analyzeBtn.appendChild(document.createTextNode("Analyze"));
        analyzeBtn.addEventListener("click", analyze, false);
        div.appendChild(analyzeBtn);

        var clearBtn = document.createElement('button');
        clearBtn.appendChild(document.createTextNode("Clear"));
        clearBtn.style.marginLeft = '3px';
        clearBtn.addEventListener("click", clear, false);
        div.appendChild(clearBtn);
    }

    function addAlertsAndSvgDiv(){
        var divs = document.body.getElementsByTagName('div');
        var insertBeforeThisDiv = null;
        var dbody = null;
        for (var i = 0; i < divs.length; i++) {
            if ("dbody" == divs[i].getAttribute('class')) {
                dbody = divs[i];
                continue;
            }
            if ("incinterimdiv" == divs[i].getAttribute('id')) {
                insertBeforeThisDiv = divs[i];
                break;
            }
        }

        var svgDiv = window.document.createElement('div');
        svgDiv.setAttribute("id", "svgDiv");
        dbody.insertBefore(svgDiv, insertBeforeThisDiv);

        var alertsDiv = window.document.createElement('div');
        alertsDiv.setAttribute("id", "alerts");
        alertsDiv.style.clear = "both";
        dbody.insertBefore(alertsDiv, insertBeforeThisDiv);
    }

    function attachListenerToStatementLinks(){
        var inc = document.getElementById("inc");
        inc.addEventListener("click", function(event){
            GM_setValue("statementType", "inc");
            showMessages();
        }, false);
        var bal = document.getElementById("bal");
        bal.addEventListener("click", function(){
            GM_setValue("statementType", "bal");
            showMessages();
        }, false);

        var cas = document.getElementById("cas");
        cas.addEventListener("click", function(){
            GM_setValue("statementType", "cas");
            showMessages();
        }, false);

        var annual = document.getElementById("annual");
        annual.addEventListener("click", function(){
            GM_setValue("periodType", "annual");
            showMessages();
        }, false);
        var interim = document.getElementById("interim");
        interim.addEventListener("click", function(){
            GM_setValue("periodType", "interim");
            showMessages();
        }, false);
    }

    var _domParsed = false;
    var analyze = function(){
        var x = com.fa.Parser.parseDom();
        setupSheets(x);
        _domParsed = true;
        showMessages();
    }

    var annualBal = null;
    var interimBal = null;
    var annualInc = null;
    var interimInc = null;
    var annualCas = null;
    var interimCas = null;
    function setupSheets(x){
        for (var i = 0; i < x.length; i++) {
            switch (x[i].n) {
                case 'balannual':
                    ns.annualBal = x[i];
                    annualBal = x[i];
                    break;
                case 'balinterim':
                    ns.interimBal = x[i];
                    interimBal = x[i];
                    break;
                case 'incannual':
                    ns.annualInc = x[i];
                    annualInc = x[i];
                    break;
                case 'incinterim':
                    ns.interimInc = x[i];
                    interimInc = x[i];
                    break;
                case 'casannual':
                    ns.annualCas = x[i];
                    annualCas = x[i];
                    break;
                case 'casinterim':
                    ns.interimCas = x[i];
                    interimCas = x[i];
                    break;
            }
        }
    }


    var clear = function(){
        clearSvgAlertsDiv();
        _domParsed = false;
    }

    function showMessages(){
        if (!_domParsed)
            return;

        clearSvgAlertsDiv();
        var liContents = '';
        var title = "Alerts for ";
        var statementType = GM_getValue("statementType");
        var periodType = GM_getValue("periodType");
        var messages = null;
        switch (statementType) {
            case 'inc':
                if (periodType == 'annual') {
                    messages = Analyzer.analyzeAnnualIncomeStatement(annualInc);
                }
                else
                    if (periodType == 'interim') {
                        messages = Analyzer.analyzeInterimIncomeStatement(interimInc);
                    }
                title += "Income Statement";
                break;
            case 'cas':
                if (periodType == 'annual') {
                    messages = Analyzer.analyzeAnnualCashFlow(annualCas);
                }
                else
                    if (periodType == 'interim') {
                        messages = Analyzer.analyzeInterimCashFlow(interimCas);
                    }
                title += "Cash Flow";
                break;
            case 'bal':
                if (periodType == 'annual') {
                    messages = Analyzer.analyzeAnnualBalanceSheet(annualBal);
                }
                else
                    if (periodType == 'interim') {
                        messages = Analyzer.analyzeInterimBalanceSheet(interimBal);
                    }
                title += "Balance Sheet";
                break;
            default:
                break;
        }

        if (messages) {
            for (var i in messages) {
                liContents = liContents.concat('<li>' + messages[i] + '</li>\r\n');
            }
        }
        if (messages && messages.length > 0) {
            title += " (recent period) "
            getAlertsDiv().innerHTML = "<h3 style=\"color:black;\">" + title + "</h3>" +
            "<ul style=\"color:black; text-font:bold\">\r\n" +
            liContents +
            "</ul>\r\n";
        }
    }

    function clearSvgAlertsDiv(){
        getAlertsDiv().innerHTML = "";
        getSvgDiv().innerHTML = "";
    }

    function getAlertsDiv(){
        return document.getElementById("alerts");
    }

    function getSvgDiv(){
        return document.getElementById("svgDiv");
    }

    ns.getSvgDiv = getSvgDiv;

    addStyles();
    setStatementAndPeriodType();
    addAnalyzeAndClearBtn();
    addAlertsAndSvgDiv();
    attachListenerToStatementLinks();

    google.load("visualization", "1", {packages:["barchart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Year');
    data.addColumn('number', 'Sales');
    data.addColumn('number', 'Expenses');
    data.addRows(4);
    data.setValue(0, 0, '2004');
    data.setValue(0, 1, 1000);
    data.setValue(0, 2, 400);
    data.setValue(1, 0, '2005');
    data.setValue(1, 1, 1170);
    data.setValue(1, 2, 460);
    data.setValue(2, 0, '2006');
    data.setValue(2, 1, 660);
    data.setValue(2, 2, 1120);
    data.setValue(3, 0, '2007');
    data.setValue(3, 1, 1030);
    data.setValue(3, 2, 540);

    var chart = new google.visualization.BarChart(com.fa.getSvgDiv());
    chart.draw(data, {width: 300, height: 150, is3D: true, isStacked:true, title: 'Company Performance'});
}

})();

(function(){
	var ns = com.fa.finSheet;
	ns.getTooltipDescArray = function(key) {
		return tooltipDescs[key];
	}

	var tooltipDescs = new Array();

	//Balance Sheet
	tooltipDescs[BalanceSheet.NET_PROPERTY_PLANT_EQUIPMENT] = ['These are the fixed assets which are hard to convert to cash. This should generally include the accumulated depreciation', 'Not too much attention to be paid without ignoring it'];
	tooltipDescs[BalanceSheet.CASH_AND_SHORT_TERM_INVESTMENTS] = ['This represent the cash or the amount of investments that could be converted to cash in the short term', 'This amount could be used to pay dividends, share buybacks or a cushion which would be useful in bad times'];
	tooltipDescs[BalanceSheet.TOTAL_RECEIVABLES_NET] = ['This represent the amount of money the company is going to receive from their customers' , 'When the company sells a product it sets a term (30-60-90 days) by which the customers have to pay without defaulting' , 'Receivables might become bad if the customer files for bankruptcy or does not pay in time', 'The <b>receivable turn</b> should be able give an idea about the time the customers are taking to make their payments' ];
	tooltipDescs[BalanceSheet.TOTAL_EQUITY] = ['<b>Total Equity = Total Assets - Total Liabilities</b>'];
	tooltipDescs[Finance.CURRENT_RATIO] = ['<b>Current Ratio = Total Current Assets / Current Liabilities</b>','Current Ratio indicates short term liquidity.', 'If the current ratio is lower (~1) and the company has low inventory turns (is not able to convert the inventory into cash), it might be a sign of trouble'];
	tooltipDescs[Finance.QUICK_TEST_RATIO] = ['<b>Quick Ratio = (Cash and Short Term Investments + Total Receivable) / Current Liabilities</b>','A stringent test that indicates whether a firm has enough short-term assets to cover its immediate liabilities without selling inventory', 'The acid-test ratio is far more strenuous than the working capital ratio, primarily because the working capital ratio allows for the inclusion of inventory assets'];
	tooltipDescs[Finance.DEBT_TO_EQUITY_RATIO] = ['<b>Debt to Equity Ratio = Total Debt / Total Equity</b>','Company having a debt to equity ratio of over 40 to 50% might have liquidity problems.'];
	tooltipDescs[Finance.INVENTORY_TO_CURRENT_ASSETS_RATIO] = ['<b>Inv to Assets Ratio = Total Inventory / Total Current Assets</b>', 'Higher number indicates the inventory an important part of current assets and the company should be able to clear it as soon as it can', 'If the company is not able to clear the inventory, it will pile up and eventually the company might have to write it down', '<b>Inventory Turns</b> should be able to tell how often the company is able to clear the inventory'];
	tooltipDescs[BalanceSheet.TOTAL_INVENTORY] = ['The inventory represents the merchandise which is waiting to be sold', 'A huge inventory pile up as compared to current assets and with a low inventory turn rate is a cause of concern', 'See Inv to Assets Ratio for more details'];
	tooltipDescs[BalanceSheet.CURRENT_PORTION_LT_DEBT] = ['If the sum of current portion of long term debt and the notes payable is more than the cash equivalents, that might be a sign of trouble'];
	tooltipDescs[BalanceSheet.ACCOUNTS_PAYABLE] = ['The money which is owed by the company for which the goods/services have been already procured'];
	tooltipDescs[BalanceSheet.ACCRUED_EXPENSES] = ['This usually represents the salary which has not yet been paid'];
	tooltipDescs[BalanceSheet.NOTES_PAYABLE] = ['If the sum of current portion of long term debt and the notes payable is more than the cash equivalents, that might be a sign of trouble'];
	tooltipDescs[BalanceSheet.CURRENT_PORTION_LT_DEBT] = ['If the sum of current portion of long term debt and the notes payable is more than the cash equivalents, that might be a sign of trouble'];
	tooltipDescs[BalanceSheet.PREPAID_EXPENSES] = ['Prepaid Expenses is the expense which is prepaid like rent,taxes', 'The company might have paid the rent for the whole year and might be taking an expense 1/12th of the amount each month', 'Usually this is a small amount in comparision to assets and is generally not taken seriously while analysing a balance sheet'];
	tooltipDescs[Finance.BOOK_VALUE_PER_SHARE] = ['<b>BVPS = (Total Assets - Total Liabilities) / Total Outstanding Shares</b>'];
    tooltipDescs[BalanceSheet.INTANGIBLES] = ['When analyzing a balance sheet, you might be better off to ignore the intangible assets.  It is the income statement, not the balance sheet, that gives investors insight into the value of these intangible items']
    tooltipDescs[BalanceSheet.NET_GOODWILL] = ['Goodwill in financial statements arises when a company is purchased for more than the book value of the company', '<b>Goodwill = Purchase Price – Fair Market Value of Net Assets</b>', 'Goodwill could be used to inflate the assets value it is better to not include this intangible assets in the analysis', 'If there is a goodwill charge try to see if the company has made any expensive acquisitions in the recent past'];
    tooltipDescs[BalanceSheet.MINORITY_INTEREST] = ['Minority interest is a liability which refers to ownership of a company (subsidiary) that is less than 50% of outstanding shares', 'Example: If a company A owns 95% of a subsidiary company B (a $100 million company), on A\'s balance sheet, there would be a $5 million liability in minority interest as this is not owned by A','Minority interest is also reported on the consolidated <b>income statement</b> as a share of profit belonging to minority shareholders'];

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

})();

(function(){
    var ns = com.fa.Parser;
    var GFinanceDomParser = {};
    var map = new Array();

    map['incinterimdiv'] = 'incinterim';
    map['casinterimdiv'] = 'casinterim';
    map['balinterimdiv'] = 'balinterim';
    map['incannualdiv'] = 'incannual';
    map['casannualdiv'] = 'casannual';
    map['balannualdiv'] = 'balannual';

    // Income Statement
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
    map['Retained Earnings (Accumulated Deficit)'] = 'read';
    map['Total Equity'] = BalanceSheet.TOTAL_EQUITY;
    map['Total Liabilities & Shareholders\' Equity'] = 'tlse';
    map['Total Common Shares Outstanding'] = BalanceSheet.TOTAL_COMMON_SHARES_OUTSTANDING;

    // CASH FLOW
    map['Net Income/Starting Line'] = 'c_nisl';
    map['Cash from Operating Activities'] = 'c_coa';
    map['Cash from Investing Activities'] = 'c_cia';
    map['Cash from Financing Activities'] = 'c_cfa';
    map['Net Change in Cash'] = CashFlow.NET_CHANGE_IN_CASH;
    map['Cash from Operating Activities'] = CashFlow.OPERATING_CASH;
    map['Cash from Investing Activities'] = CashFlow.CASH_FROM_INVESTING;
    map['Cash from Financing Activities'] = CashFlow.CASH_FROM_FINANCING;
    map['Changes in Working Capital'] = CashFlow.CHANGES_IN_WORKING_CAPITAL;


    GFinanceDomParser.getBrowserIndependentMap = function(id){
        return map[id];
    }

    var _getTableRows = function(id){
        var div = window.document.getElementById(id);
        var tables = div && div.getElementsByTagName('table');
        return tables && tables[0].rows;
    }

    var _extractDates = function(row){
        var colsLen = row.cells.length;
        var colsArray = new Array();
        for (var j = 1; j < colsLen; j++) {
            colsArray.push(com.fa.Utils.trim(row.cells[j].textContent));
        }
        return colsArray;
    }

    var _parseDomRowsAndCreateJson = function(id){

        var rows = _getTableRows(id);
        if (!rows)
            return null;

        var fin = {};
        fin.n = GFinanceDomParser.getBrowserIndependentMap(id);
        fin.val = new Array();
        var setDates = true;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].cells.length > 1) {

                var textContent = com.fa.Utils.trim(rows[i].cells[0].textContent);
                if (setDates && textContent.search(/except for per share items/)) {
                    fin.da = _extractDates(rows[i]);
                    setDates = false;
                }
                else {
                    var implIndependentKey = GFinanceDomParser.getBrowserIndependentMap(textContent);
                    fin.name = textContent;
                    if (implIndependentKey) {
                        var colsLen = rows[i].cells.length;
                        var colsArray = [];
                        for (var j = 1; j < colsLen; j++) {
                            var val = com.fa.Utils.trim(rows[i].cells[j].textContent).replace(/,/g, '');
                            if (isNaN(val)) {
                                colsArray.push(0.00);
                            }
                            else {
                                colsArray.push((parseInt(val)));
                            }

                        }
                        fin.val[implIndependentKey] = colsArray;
                        var infoAnchor = com.fa.Utils.getTooltippedIcon(implIndependentKey);
                        rows[i].cells[0].appendChild(infoAnchor);

                        rows[i].cells[0].addEventListener("mouseover", function(evt){
                            this.lastChild.style.display = 'inline';
                            this.lastChild.style.visibility = 'visible';
                        }, false);

                        rows[i].cells[0].addEventListener("mouseout", function(){
                            this.lastChild.style.display = 'none';
                        }, false);
                    }
                }
            }
        }
        return fin;
    }

    var parseDom = function(){
        var divIds = ['incinterimdiv', 'incannualdiv', 'balinterimdiv', 'balannualdiv', 'casinterimdiv', 'casannualdiv']

        var x = new Array();
        for (var id in divIds) {
            var fin = _parseDomRowsAndCreateJson(divIds[id]);
            x.push(fin);
        }
        
        return x;
    }
    ns.parseDom = parseDom;
})();


