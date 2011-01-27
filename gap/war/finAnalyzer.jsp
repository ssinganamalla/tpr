<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html>
<head>
<title>Study Financial Statements of a Company</title>
<link type="text/css" rel="stylesheet" href="stylesheets/main.css"/>
<link type="text/css" rel="stylesheet" href="stylesheets/start.css"/>
<link type="text/css" rel="stylesheet" href="stylesheets/jquery-ui-1.8.7.custom.css"/>
<link type="text/css" rel="stylesheet" href="stylesheets/tablesorter.css"/>
<link type="text/css" rel="stylesheet" href="stylesheets/jquery.ui.stars.css"/>
<script type="text/javascript" src="js/initNamespace.min.js"></script>
<script type="text/javascript" src="js/utils.min.js"></script>
<script src="http://www.google.com/jsapi?key=ABQIAAAAPP7e_w24FQGVrPwul01DTBSKOn6wlytR1vxIW8znD1NsRj_1UxQFDFx7IzlJMzaIRg6Zqq8hC98B8g" type="text/javascript"></script>

<script>google.load("gdata", "1.x");</script>
</head>

<body id="dbody">
<jsp:include page="include.jsp"></jsp:include>
<!-- insert menusections here -->
<div id="header">
</div>

<center>
<div class="page">
<div id="left">

</div>

<div id="right">

</div>

<div id="content" class="bg ui-corner-all">
	<div class="section_hdr" id="header"><span class="f3">Financial Statements Analysis</span></div>
	<div id="tickerInputRow">
<!--		<span style="">-->
			<label><b>Enter the Stock Ticker:</b></label> 
			<input name="stockTickerSymbol" id="stockTickerSymbol" type="text" value="<%=request.getParameter("stockTickerSymbol")%>" size="40" maxlength="120" /> 
			<input type="button" title="load financial statements" value="Load Statements" id="tickInput"/>
			<img id="loading" alt="Loading..." src="images/loading.gif" style="display:none"/><br/><span style="font-size: 1em; color:#676767">Example: CSCO</span>
<!--		</span>-->
	</div>
	<div id="errors"></div>
	<div id="topline"></div>

	<div id="serverContent" style="display: none; text-align:left">
		
	
		<div id="hdg" style="position:relative;">
			<div style="padding:2px;">Financial Statements</div>
			<div class="analyzeBtn">
				<button id="analyzeBtn" title="click to analyze" >Analyze</button>
				<button id="clearBtn">Clear</button>
			</div>
			<span id="quoteArea">
			</span>
		</div>
		<div class="gmContainer" id="gmContainer" style="display: none">
			<div id="msgs" class="msgs"></div>
			
			<div id="graphsAndNavi">
			
			<h3 class="section_hdr">Graphical Analysis</h3>
			<div class="naviDiv" id="naviDiv"> 
				<div name="balNaviDiv" id="balNaviDiv">
					<a name="" class="nlk important" href="#" i="0" k="bal">Current Assets Distribution</a>
					<a name="" class="lk" href="#" i="1" k="bal">Current Liabilities</a>
					<a name="" class="lk" href="#" i="2" k="bal">Liquidity Ratios</a>
					<a name="" class="lk" href="#" i="3" k="bal">Total Equity</a>
					<a name="" class="lk" href="#" i="4" k="bal">Turns</a>
					<a name="" class="lk" href="#" i="5" k="bal">TurnsInDays</a>
				</div>
				<div name="incNaviDiv" id="incNaviDiv">
					<a name="" class="lk" href="#" i="0" k="inc">Margins</a>
					<a name="" class="lk" href="#" i="1" k="inc">Normalized Statement</a>
					<a name="" class="lk" href="#" i="2" k="inc">Return on Equity</a>
				</div>
				<div name="casNaviDiv" id="casNaviDiv">
					<a name="" class="lk" href="#" i="0" k="cas">Cash Flow</a>
					<a name="" class="lk" href="#" i="1" k="cas">Cash Flow Ratios</a>
				</div>
			</div>
			<div name="graphContainer" class="graphContainer">
				<div id="graphs" style="font-size: 8pt"><span class="loading"></span><div id="finGraph" name="finGraph"></div></div>
				
				
			</div>
			<div name="currGraphInfo" id="currGraphInfo" class="currGraphInfo">
				<div name="balInfo" id="balInfo">
					<div name="info" i="0" k="bal">
						<h3>Current Assets Distribution</h3>
						<p>This graph shows the normalized current assets. Current assets are likely to be used up or converted into cash within one business cycle - usually treated as twelve months</p>
						<p><b>Cash</b> is always good and provides cushion during bad times and for future growth. Growing cash reserves often signals strong performance. But if the company is piling up loads of cash, that might also mean, the management doesn't have a clue to use it efficiently</p>
						<p><b>Inventories</b> are finished products that are not sold. To generate cash, the company has to sell the inventories. See if the company is piling up inventories with time as it might not be a good sign if the inventory turn (rate to clear the inventories) is low.</p>
						<p><b>Receivables</b> are uncollected bills. It is important to see how soon the company is collecting its payments (compare receivable turns). The quicker a company gets its customers to make payments, the sooner it has cash to pay for salaries, merchandise, equipment, loans, and best of all, dividends and growth opportunities.</p>
					</div>
					<div name="info" i="1" k="bal">
						<h3>Current Liability Distribution</h3>
						<p>This graph shows the normalized current liability. Current liability is the money the company is obligated to pay in the near term. Investigate whether the company has the money to pay for current liabilities</p>
						<p><b>Accounts Payable</b> or trade credit is the amount of purchases the company (buyer) makes on credit. This amount is recorded as account receivable (part of current assets) by the seller. Accounts payable is the largest single category of short term debt, for small comapnies it could be much larger as they don't qualify for other financing</p>
						<p><b>Accrued Expenses</b> mainly consists of accrued wages being paid to the employees and the accrued taxes which the company owes.</p>
						<p><b>Notes Payable/Short Term Debt</b> is typically for money or loans that you borrowed from a bank and now need to repay. Accounts payable are typically for goods and services you bought from a vendor and need to pay for. The bank's influence could be significant as it provides spontaneous funds.</p>
						<p><b>Other Current liabilities</b> could typically include commercial paper of some other type of liabilities. Commercial paper is typically issued by financially strong corporations to the large firms with exceptional credit ratings and it has interest rate below the prime rate</p>
						<p>If the company's short term cash is more than total current liabilities, then there is no point of concern at all.</p>
					</div>
					<div name="info" i="2" k="bal">
						<h3>Liquidity Ratios</h3>
						<p><b>Current Ratio</b> is calculated by dividing current assets over current liabilities. If this ratio is over 1.5 or 2, the company is liquid. Quick ratio gives more conservative estimate about a company's liquidity. Ratio less than 1 or a falling current ratio could spell trouble</p>
						<p><b>Quick Ratio</b> is calculated by subtracting inventories from current assets and then dividing over current liabilities. If this ratio is over 1, the company has enough cash and liquid assets to cover short term obligations.</p>
						<p><b>Debt Ratio</b> is calculated by dividing debt over total equity. If this ratio is more than 0.4 or 0.5, that might be a cause of concern. It should be accompanied by an examination of the debt interest coverage ratio. An interest coverage ratio below 1 means that the company is not able to meet all of its debt obligations with the period's earnings before interest and tax (operating income), and it's a sign that a company is having difficulty meeting its debt obligations. </p>
					</div>
					<div name="info" i="3" k="bal">
						<h3>Equity Distribution</h3>
						<p><b>Retained earnings</b> or retained profit is the amount of profit which is retained with the company instead of paying it as dividends. Check to see if the company is increasing its retained earnings is able to increase its growth rate. If the company increases its retained earnings over a significant period and is not able to reflect it in the growth rate, it is better for the company to pay dividends than to retain it</p>
						<p><b>Additional capital</b> is the amount of money the investors paid in excess of the par value of the stock (which is independent of the market value). If the company issued 1000 stocks and is worth 10 dollars but the investors paid 100 dollars, then the additonal capital is 1000*90 = 90000 dollars</p>
						<p><b>Treasury stock</b> or reacquired stock is stock which is bought back by the issuing company, reducing the amount of outstanding stock on the open market ("open market" including insiders' holdings).
							Stock repurchases are often used as a tax-efficient method to put cash into shareholders' hands, rather than pay dividends. Sometimes, companies do this when they feel that their stock is undervalued on the open market. Other times, companies do this to provide a "bonus" to incentive compensation plans for employees.</p>
					</div>
					<div name="info" i="4" k="bal">
						<h3>Turns</h3>
						<p><b>Inventory turns</b> represents the number of times the inventory is cleared in a given period. The higher this number the better as it reduces the holding cost of an inventory.</p>
						<p><b>Receivable turns</b> represents the number of times the company receives payments in a given period. The higher the number, as compared to its competitors the sooner it gets money and puts it to use.</p>
						<p>Bottom line: Higher turns are better. Compare it with the competitors</p>
					</div>
					<div name="info" i="5" k="bal">
						<h3>Turns in Days</h3>
						<p><b>Inventory turns in days</b> tells you that the inventory is cleared within these many days. The lower this number the better as it reduces the holding cost of an inventory.</p>
						<p><b>Receivable turns in days</b> tells you that the company receives payments within these many days. The lower the number, the better as it gets money sooner and the company can put it to use.</p>
						<p>Check the company's sales terms; example: If the sales terms call for a payment every 30 days and the receivable turns is more than 30 days, then the customers might not be paying on time.</p>
						<p>Bottom line: Lower turns in days are better. Compare it with the competitors</p>
					</div>
				</div>
				<div name="incInfo" id="incInfo">
					<div name="info" i="0" k="inc">
						<h3>Margins</h3>
						<p><b>Gross profit</b> is the total revenue subtracted by the cost of obtaining that revenue.  It tells you how much money the business would have made if it didn’t pay any other expenses such as salary, income taxes, etc</p>
						<p><b>Operating Income</b> is the total profit or income generated from the core operations before interest deduction and income taxes</p>
						<p><b>Net Income</b>is calculated by taking revenues and adjusting for the cost of doing business, depreciation, interest, taxes and other expenses</p>
					</div>
					<div name="info" i="1" k="inc">
						<h3>Normalized Statement</h3>
						<p>This graph shows the income statement as compared to a unit of revenue</p>
						<p><b>Revenue</b> is the amount of money a business brought in through sales or services.  It is not a profit, but the amount generated through sales. A growing company should increase the revenue with time</p>
						<p><b>Cost of revenue</b> is the amount of money the company had to spend in order to sell the product.  It includes the purchase price for the raw material as well as the expense incurred to manufacture it into a product.</p>
						<p><b>Gross profit</b> is the total revenue subtracted by the cost of obtaining that revenue.  It tells you how much money the business would have made if it didn’t pay any other expenses such as salary, income taxes, etc</p>
						<p><b>Operating Income</b> is the total profit or income generated from the core operations before interest deduction and income taxes</p>
						<p><b>Net Income</b>is calculated by taking revenues and adjusting for the cost of doing business, depreciation, interest, taxes and other expenses</p>
					</div>
					<div name="info" i="2" k="inc">
						<h3>Return on Equity</h3>
						<p><b>Return on Equity</b> is defined as <b>net income</b> over <b>avg share holder equity</b></p>
						<p>Looking at net income on its own does not have much meaning, unless its seen with respect to the amout of capital or equity invested in it</p>
						<p><b>Warning:</b> ROE could also be increased by the company by issuing long term debt and then buying back shares. It is always good to watch out whether the company is increasing the ROE at the expense of increasing 
						long term debt and decreasing the generation of operating cash</p>
						<p>Please see whether ROE is increasing with time and look at the debt and the operating cash, fare in comparision to ROE. If the company's debt is remaining same or decreasing and operating cash is increasing, that's a good sign</p>
					</div>
				</div>
				<div name="casInfo" id="casInfo">
					<div name="info" i="0" k="cas">
						<h3>Cash Flow Bar</h3>
						<p><i><b>Operating Cash:</b></i> The cash generated by core operations. Check if the company is consistently able to increase the operating cash. Deferred taxes and Depreciation should be a small part.</p>
						<p><i><b>Investing Cash:</b></i>The cash needed to pay the property plant expenses, salaries, raw materials etc. A company which has more Operating Cash than Investing Cash is a good sign. The company might not have to raise additional capital to pay expenses</p>
						<p><i><b>Financing Cash:</b></i>The cash is generated by issuing stocks and bonds. It devalues the share value. If a company is retiring its stock or bonds, thats a good sign.</p>
						<p><i><b>Net Cash:</b></i>Positive net cash is good. The net cash could be positive because of financing (which is ok) or because of operating cash (which is a good sign) or a combination of both</p>
					</div>
					<div name="info" i="1" k="cas">
						<h3>Cash Flow Ratios</h3>
						<p><i><b>Operating Cash to Sales Ratio:</b></i>This represents the company's ability to turn sales into cash. The greater the amount of operating cash flow, the better. There is no standard guideline for the operating cash flow/sales ratio, but obviously, the ability to generate consistent and/or improving percentage comparisons are positive investment qualities</p>
					</div>
				</div>
			</div>
			<div style="clear:both;"></div>
			
			
			</div>
<!--			<div id="g_collapsible"></div>-->
		</div>
	  	
		<div id="commentsSection">
		<!--  
			<a id="expandCommentsAnchor" href="#">Expand</a>
			<a id="collpaseCommentsAnchor" href="#">Collapse</a>
		-->
			<div id="expandComments">
				<div id="addedComments">
				</div>
				<div id="addComment">Add a comment <a href="#">here</a></div>
				<div id="commentDiv">
					<div>
					 <span id="stars-cap"></span>
					<span id="stars-wrapper">
						<select name="selrate">
							<option value="1">Very poor</option>
							<option value="2">Not that bad</option>
							<option value="3">Average</option>
							<option value="4" selected="selected">Good</option>
							<option value="5">Perfect</option>
						</select>
					</span>
					</div>
					<div>
						<textarea id="comments" name="comments" rows="4" cols="48"></textarea><br/>
						<input type="button" id="addNote" value="Add a Private Note" />
						<input type="button" id="addPublicNote" value="Public Note" />
						<input type="button" id="cancelNote" value="Cancel" />
					</div>
					
				</div>
			</div>
		</div>
	
		<h3 class="section_hdr">Financial Statements</h3>
		<div id="typprd" style="display:none;word-spacing: 5px;">
			<div style="float:left;">
				<a href="#" class="nlk" id="bal" onMouseover="">BalanceSheet</a>
<!--				<a href="#" class="nlk" id="bal" onMouseover="showhint('Please choose a username. Should consist of alphanumeric characters only.', this, event, '150px')">BalanceSheet</a>-->
				<a href="#" class="lk" id="inc">IncomeStatement</a>
				<a href="#" class="lk" id="cas">CashFlow</a>
			</div>
			<div style="text-align: right" align="right">
				<a href="#" class="nlk" id="interim">InterimData</a>
				<a href="#" class="lk" id="annual">YearlyData</a>
			</div>
		</div>
		<br/>
		<div id="compfin" ></div>
		<div class="mt top">
			<a href="#top"><img border="0" alt="Jump to the top of the page." src="images/arrow_top.gif"/></a>
		</div>
	</div>
	
</div>
</div>
<div id="suggestList" class="container" >
</div>
<div id="footer">
	 Graphs and the statements are provided solely for informational purposes, not for trading purposes or advice.<br/>
	 For suggestions please send an email to <a href="mailto:finsheetanalyzer@gmail.com">finsheetanalyzer</a>
</div>
<script type="text/javascript" src="js/lib/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="js/lib/jquery-ui-1.8.7.custom.min.js"></script>
<script type="text/javascript" src="js/ui/ui.min.js"></script>
<script type="text/javascript" src="js/ui/models.min.js"></script>
<script type="text/javascript" src="js/lib/uicontrols.min.js"></script>
<script type="text/javascript" src="js/browser.min.js"></script>
<script type="text/javascript" src="js/finSheets.min.js"></script>
<script type="text/javascript" src="js/parser.min.js"></script>
<script type="text/javascript" src="js/finGraphs.min.js"></script>
<script type="text/javascript" src="js/ajax.min.js"></script>
<script type="text/javascript" src="js/lib/jquery.tablesorter.min.js"></script>
<script type="text/javascript" src="js/components/headers.min.js"></script>
<script type="text/javascript" src="js/lib/jquery.ui.stars.min.js"></script>
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
 <script>
 google.load("visualization", "1", {packages:["corechart", "table"]});
// google.load("visualization", "1", {packages:["linechart", "piechart", "areachart", "barchart", "columnchart", "table"]});
 </script>
<script type="text/javascript">
/***********************************************
* Show Hint script- © Dynamic Drive (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
***********************************************/
		
var horizontal_offset="9px" //horizontal offset of hint box from anchor link

/////No further editting needed

var vertical_offset="0" //horizontal offset of hint box from anchor link. No need to change.
var ie=document.all
var ns6=document.getElementById&&!document.all

function getposOffset(what, offsettype){
	var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
	var parentEl=what.offsetParent;
	while (parentEl!=null){
		totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
		parentEl=parentEl.offsetParent;
	}
	return totaloffset;
}

function iecompattest(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function clearbrowseredge(obj, whichedge){
	var edgeoffset=(whichedge=="rightedge")? parseInt(horizontal_offset)*-1 : parseInt(vertical_offset)*-1
	if (whichedge=="rightedge"){
		var windowedge=ie && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-30 : window.pageXOffset+window.innerWidth-40
		dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
		if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure)
			edgeoffset=dropmenuobj.contentmeasure+obj.offsetWidth+parseInt(horizontal_offset)
	}
	else{
		var windowedge=ie && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
		dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
		if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure)
			edgeoffset=dropmenuobj.contentmeasure-obj.offsetHeight
	}
	return edgeoffset
}

function showhint(menucontents, obj, e, tipwidth){
	if ((ie||ns6) && document.getElementById("hintbox")){
		dropmenuobj=document.getElementById("hintbox")
		dropmenuobj.innerHTML=menucontents
		dropmenuobj.style.left=dropmenuobj.style.top=-500
		if (!tipwidth){
			//dropmenuobj.widthobj=dropmenuobj.style
			//dropmenuobj.widthobj.width=tipwidth
		}
		dropmenuobj.x=getposOffset(obj, "left")
		dropmenuobj.y=getposOffset(obj, "top")
		dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj, "rightedge")+obj.offsetWidth+"px"
		dropmenuobj.style.top=dropmenuobj.y-clearbrowseredge(obj, "bottomedge")+"px"
		dropmenuobj.style.visibility="visible"
		obj.onmouseout=hidetip
	}
}

function hidetip(e){
	dropmenuobj.style.visibility="hidden"
	dropmenuobj.style.left="-500px"
}

function createhintbox(){
	var divblock=document.createElement("div")
	divblock.setAttribute("id", "hintbox")
	document.body.appendChild(divblock)
}

if (window.addEventListener)
	window.addEventListener("load", createhintbox, false)
else if (window.attachEvent)
	window.attachEvent("onload", createhintbox)
else if (document.getElementById)
	window.onload=createhintbox
</script>
<script type="text/javascript">
$(document).ready(function() {
	//trigger the statement
	var type = "bal";
	var period = "interim";
	com.fa.model.setTypePeriodAndIndex(type, period, 0);
	$('#stockTickerSymbol').finsearchbox();
	com.fa.controller.loadBtnClicked();
});
</script>
</center>
</body>
</html>