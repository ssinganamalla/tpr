<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="stylesheets/start.css"/>
	<link type="text/css" rel="stylesheet" href="stylesheets/main.css"/>
	<link type="text/css" rel="stylesheet" href="stylesheets/tablesorter.css"/>
	<link type="text/css" rel="stylesheet" href="stylesheets/jquery-ui-1.8.7.custom.css"/>
	<script type="text/javascript" src="js/initNamespace.min.js"></script>
	<script type="text/javascript" src="js/page/constants.min.js"></script>
	<script type="text/javascript" src="js/utils.min.js"></script>
   <script type="text/javascript" src="http://www.google.com/jsapi"></script>
   <script type="text/javascript">
     google.load("visualization", "1", {packages:["corechart"]});
   </script>
</head>


<body id="dbody">
<jsp:include page="include.jsp"></jsp:include>
<!-- insert menusections here -->
<div id="header">
</div>

	<center>

<div id="page">
	
	<div id="main">
		<div class="section_hdr" id="header"><span class="f3">Diversified Stock Portfolio</span></div>
		<div id="mainHeader">
		
			<div class="leftElement">
				<span class="f4">Select Broker:</span>
				<select id='selectbrokerId'>
					<option value='-1'>All</option>
					<option value='0'>TradeKing</option>
					<option value='1'>Zecco</option>
					<option value='2'>Ameritrade</option>
					<option value='3'>Sharebuilder</option>
				</select>
			</div>
			<div class="rightElement">
			
			</div>
			<div class="clearBothElement"></div>
		</div>
		
		<div id="renderChartsHeader">
			<div class="leftElement">	
			</div>
			<div class="rightElement">
<!--				<input type="button" class="renderSectorDistribution" title="Click to see the sectors visualization" value="Render Charts"/>-->
			</div>
			<div class="clearBothElement"></div>
		</div>
				<select id='sectorOption' style="display:none">
					<option value='0'>Cost Basis</option>
				  	<option value='1'>Market Value</option>
					<option value='2'>Gain Loss</option>
				</select>
		
		<div id="diverseContent">
			<div id="sectorList" class="sectorStockList">
				<div id="sectorChart"></div>
			</div>
			<div id="sectorStockGraph" class="sectorStockGraph">
				<div id="dissectSectorChart"></div>
			</div>
			<div class="clearBothElement"></div>
		</div>
			
		<div id="tickersData" style="">
		
		</div>
		
		<div id="pf-view-table">
			
		</div>

<div class="basics purchase" id="add-trans-t">
	
	
	<div id="commentsSection_perf">
		<div id="expandBrokerStockData">
			<div id="addTransaction" class="f4">Add a Transaction <a href="#">here</a></div>
			<div id="transactionDiv">
			
				<div>
					<input name="stockTickerSymbol_addTrans" id="stockTickerSymbol_addTrans" type="text" value="" size="40" maxlength="120" />
				</div>
				
<!--				There should be only one id for this. this info should be helpful in the merge-->
				<div id="suggestList" class="container"></div>
			<!--  
				<textarea id="brokerStockDataTxtArea" name="comments" rows="4" cols="100"></textarea><br/>
				<input type="button" id="updateBrokerStockDataBtn" value="Update" />
				<input type="button" id="cancelNote" value="Cancel" />
			-->
				<div class="pf-add-trans-row pf-add-trans-detailed">
					<table id="pf-add-trans-table">
						<thead>
							<tr>
								<th>Type</th>
								<th class="bottom-header">Date</th>
								<th>Shares</th>
								<th>Price</th>
								<th>Commission</th>
								<th>Broker</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><select class="no_multi"	
									id="add_ttype">
									<option selected="" value="0">Buy</option>
									<option value="1">Sell</option>
								</select></td>
								<td><input class="no_multi" autocomplete="off" name="add_date_1"
									size="15" id="add_date" /></td>
								<td><input class="no_multi" size="9" name="add_shares_1"
									id="add_shares" /></td>
								<td><input class="no_multi" size="9" name="add_price_1"
									id="add_price" /></td>
								<td><input class="no_multi" size="10" name="add_commission_1"
									id="add_commission" /></td>
								<td class="">
									<select id='brokerId'>
										<option value='0'>TradeKing</option>
										<option value='1'>Zecco</option>
										<option value='2'>Ameritrade</option>
										<option value='3'>Sharebuilder</option>
									</select>	
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				
				<div class="pf-add-trans-row pf-add-trans-detailed">
					<div class="g-unit"><input type="submit" value="Add to portfolio"
								id="addStockTrans" /></div>
				</div>
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
<script type="text/javascript" src="js/page/constants.min.js"></script>
<script type="text/javascript" src="js/ui/ui.min.js"></script>
<script type="text/javascript" src="js/ui/models.min.js"></script>
<script type="text/javascript" src="js/lib/uicontrols.min.js"></script>
<script type="text/javascript" src="js/browser.min.js"></script>
<script type="text/javascript" src="js/page/performance.min.js"></script>
<script type="text/javascript" src="js/finGraphs.min.js"></script>
<script type="text/javascript" src="js/ajax.min.js"></script>
<script type="text/javascript" src="js/lib/jquery.tablesorter.min.js"></script>
<script type="text/javascript" src="js/components/headers.min.js"></script>

<script>
$(document).ready(function() {
		$( "#add_date" ).datepicker();
		com.fa.controller.performance.getPortfolioTickers();
});
</script>
</body>
</html>