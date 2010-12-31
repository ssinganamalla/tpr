<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html>
<head>
<title>Compare Financial Metrics of Companies</title>
<link type="text/css" rel="stylesheet" href="stylesheets/main.css"/>
<link type="text/css" rel="stylesheet" href="stylesheets/start.css"/>
<link type="text/css" rel="stylesheet" href="stylesheets/jquery-ui-1.8.7.custom.css"/>
</head>

<body id="dbody">
<jsp:include page="include.jsp"></jsp:include>
<!-- insert menusections here -->
<div id="header">
</div>

	<center>

<div id="page">

	<div id="topheader" class="topheader">
	</div>
	<div id="main">
		
		
		<div id="diverseContent" class="bg ui-corner-all">
			
			<div>
				<div>
					<div id="header" class="section_hdr"><span class="f3">Compare Financial Performance of Companies</span></div>
<!--					<div id="mainHeader">-->
<!--						<div class="leftElement"></div>-->
<!--						<div class="rightElement"></div>-->
<!--						<div class="clearBothElement"></div>-->
<!--					</div>-->
					<div id="errors"></div>
					</div>
<!--					<div id="progressbar"></div>-->
				<div id="tickerInputRow">
					<table border="0">
						<tr>
							<td>
							<span style="">
							<label><b>Add to Comparable List:</b></label> 
								<input name="stockTickerSymbol" id="stockTickerSymbol" type="text" value="" size="40" maxlength="120" /> 
								<input type="button" id="addComparableBtn" title="Add to comparable tickers list" value="Add"/>
								<br/><span style="font-size: 0.7em; color:#676767">Example: CSCO</span>
							</span>
							</td>
						</tr>
					</table>
				</div>
				<div id="suggestList" class="container"></div>
				<div class="f3 mt mb">
					Tickers:
					<span id="enterPreferredTickersDiv1" class="f2">
					</span>
					<span>&nbsp;&nbsp;<input type="button" id="submitCompare" title="Compare the tickers" value="Compare"/>&nbsp;&nbsp;<img id="loading" alt="Loading..." src="images/loading.gif" style="display:none"/></span>
<!--					<span><input type="button" id="clearCompare" title="Clear the list" value="Clear"/></span>-->
					<br/>
<!--					<span style="font-size: 0.7em; color: rgb(103, 103, 103);">Its advisable to compare less than 4 tickers at a time and add </span>-->
				</div>
			</div>
		<div id="results">	
			<div class="">
				<div id="savedTickersDiv"></div><!--				<div id="criteriaSections">-->
<!--				</div>-->
			</div>
			<div class="tp" id="chart_div">
				<div class="section_hdr" style="margin-bottom:20px;">Charts for Ratio Analysis</div>
				<div id="criteriaSelectionsDiv">
					<h4>Sectors</h4>
				</div>
				<div id="selectedCriteriaGraphDiv">
					<div id="selectedCriteriaGraphHeader">
					</div>
					<h4></h4>
					<div id="selectedCriteriaChartDiv">
					
					</div>
				</div>
			<div class="clearBothElement"></div>
			</div>
			
			
			<div id="ratioAnalysisDiv" class="">
				
			</div>
			<div class="mt top">
				<a href="#top"><img border="0" alt="Jump to the top of the page." src="images/arrow_top.gif"/></a>
			</div>
			
			
			
			<div id="listOfComparisionTickers" style="display: none;"> 
			<p>This table consists of the history of stock tickers you have picked in the past and compared</p>
				<div id="recentTickersDiv">
				<table border="1">
					<tr>
						<th>Short Desc</th>
						<th>Tickers for comparision</th>
						<th><button>Load Graphs</button></th>
						<th><button>Delete</button></th>
					</tr>
					<tr>
						<td>Healthcare smallcap</td>
						<td>PFE WMT</td>
						<td><input type="radio" name="selectRadio"></td>
						<td><input type="checkbox" name="deleteHistCheck"></td>
					</tr>
				</table>
				</div>
			</div>
			</div> 
			
		</div>
	</div>
	
</div>
<div id="footer">
	 Graphs and the statements are provided solely for informational purposes, not for trading purposes or advice.<br/>
	 For suggestions please send an email to <a href="mailto:finsheetanalyzer@gmail.com">finsheetanalyzer</a>
</div>
</center>
<script type="text/javascript" src="js/lib/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="js/lib/jquery-ui-1.8.7.custom.min.js"></script>
<script type="text/javascript" src="js/initNamespace.min.js"></script>
<script type="text/javascript" src="js/utils.min.js"></script>

<script type="text/javascript" src="js/lib/uicontrols.min.js"></script>
<script type="text/javascript" src="js/ui/ui.min.js"></script>
<script type="text/javascript" src="js/ui/models.min.js"></script>
<script type="text/javascript" src="js/ui/events.min.js"></script>
<script type="text/javascript" src="js/browser.min.js"></script>
<script type="text/javascript" src="js/finSheets.min.js"></script>
<script type="text/javascript" src="js/parser.min.js"></script>
<script type="text/javascript" src="js/finGraphs.min.js"></script>
<script type="text/javascript" src="js/ajax.min.js"></script>
<script type="text/javascript" src="js/page/watchlist.min.js"></script>
<script type="text/javascript" src="js/components/headers.min.js"></script>
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
 <script>
 google.load("visualization", "1", {packages:["corechart", "table"]});
 </script>
 
 
<script type="text/javascript" >

$(document).ready(function() {
	com.fa.PreferredTickersSection.init();
	var tickers = $('#enterPreferredTickersDiv1').labeltextfield('option', 'dataArray');
	com.fa.PreferredTickersSection.loadPrefTickersData(tickers);
});
</script>
			<div id="dialog">
			</div>

</body>
</html>