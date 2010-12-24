<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="stylesheets/start.css"/>
	<link type="text/css" rel="stylesheet" href="stylesheets/main.css"/>
	<script type="text/javascript" src="js/initNamespace.min.js"></script>
	<script type="text/javascript" src="js/utils.min.js"></script>
    <script type="text/javascript" src="http://www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Task');
        data.addColumn('number', 'Hours per Day');
        data.addRows(5);
        data.setValue(0, 0, 'Technology');
        data.setValue(0, 1, 11);
        data.setValue(1, 0, 'Healthcare');
        data.setValue(1, 1, 2);
        data.setValue(2, 0, 'Conglomerates');
        data.setValue(2, 1, 2);
        data.setValue(3, 0, 'Financial');
        data.setValue(3, 1, 2);
        data.setValue(4, 0, 'Energy');
        data.setValue(4, 1, 7);

        var chart = new google.visualization.PieChart(document.getElementById('sectorChart'));
        chart.draw(data, {width: 450, height: 300, title: 'Sector Allocation'});
      }
    </script>
  </head>


<body id="dbody">
	<center>
<div id="header">
	<%
    UserService userService = UserServiceFactory.getUserService();
    User user = userService.getCurrentUser();
    if (user != null) {
%>
<p>Hello, <%= user.getNickname() %>! (You can
<a href="<%= userService.createLogoutURL(request.getRequestURI()) %>">sign out</a>.)</p>
<%
    } else {
%>
<p>Hello!
<a href="<%= userService.createLoginURL(request.getRequestURI()) %>">Sign in</a>
</p>
<%
    }
%>
</div>	

<div id="page">

	<div id="menuSections">
		<span><a href="finStart.jsp">Am I Diversified?</a> |</span> 
		<span><b>Stock Performance</b> |</span> 
		<span><a href="finWatchList.jsp">Watch List</a> |</span> 
		<span><a href="finOtherSites.jsp">Popular Finance Sites</a> |</span> 
	</div>
	
	<div id="main" class="bg">
		<div id="header">
			<h1>Stock Performance</h1>
			sit amet, consectetur adipiscing elit. In consectetur blandit felis, eget porttitor elit congue vel. Suspendisse tristique mi eu turpis ornare accumsan dignissim dui consectetur. Fusce ut lorem sit amet magna sollicitudin porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
		</div>
		<div id="mainHeader">
		
			<div class="leftElement">
			
			</div>
			<div class="rightElement">
				<input type="button" title="Show data in absolute terms" value="Absolute Units" id="absUnits"/>
				<input type="button" title="Sync information with the latest market data" value="Refresh" id="refresh"/>
			</div>
			<div class="clearBothElement"></div>
		</div>
			
		<div id="commentsSection">
			<div id="expandBrokerStockData">
				<div id="addComment">Update the Broker Stock Data<a href="#">here</a></div>
				<div id="commentDiv">
					<textarea id="brokerStockDataTxtArea" name="comments" rows="4" cols="100"></textarea><br/>
					<input type="button" id="updateBrokerStockDataBtn" value="Update" />
					<input type="button" id="cancelNote" value="Cancel" />
				</div>
			</div>
		</div>	
		
		<div id="tickersData" style="">
		
		</div>
		
		<div id="renderChartsHeader">
			<div class="leftElement">	
			</div>
			<div class="rightElement">
				<input type="button" class="updateSectorIds" title="Update Sector values" value="Update Sectors"/>
				<input type="button" class="renderSectorDistribution" title="Click to see the sectors visualization" value="Render Charts"/>
			</div>
			<div class="clearBothElement"></div>
		</div>
		<div id="pf-view-table">
			
		</div>

<div class="basics purchase" id="add-trans-t">
	<div>
		<input name="stockTickerSymbol" id="stockTickerSymbol" type="text" value="" size="40" maxlength="120" />
	</div>
	<div id="suggestList" class="container"></div>
	<div class="pf-add-trans-row pf-add-trans-detailed">
		<table id="pf-add-trans-table">
			<thead>
				<tr>
					<th>Type</th>
					<th class="bottom-header">Date</th>
					<th>Shares</th>
					<th>Price</th>
					<th>Commission</th>
					<th>Notes</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input type="hidden" value="transaction" name="menu_type"
						id="transaction_menu" /> <select class="no_multi"
						onchange="_pfAddTransactionMenuOnchange();" name="add_ttype_1"
						id="add_ttype">
						<option selected="" value="BUY">Buy</option>
						<option value="SELL">Sell</option>
						<option value="BUY_COVER">Buy to Cover</option>
						<option value="SELL_SHORT">Sell Short</option>
					</select></td>
					<td><input class="no_multi" autocomplete="off" name="add_date_1"
						size="15" id="add_date" /></td>
					<td><input class="no_multi" size="9" name="add_shares_1"
						id="add_shares" /></td>
					<td><input class="no_multi" size="9" name="add_price_1"
						id="add_price" /></td>
					<td><input class="no_multi" size="10" name="add_commission_1"
						id="add_commission" /></td>
					<td width="100%"><input maxlength="100" class="no_multi"
						size="45" name="add_notes_1" id="add_notes" /></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="pf-add-trans-row pf-add-trans-detailed">
		<div class="g-unit"><input type="submit" value="Add to portfolio"
					id="addStockTrans" /></div>
	</div>
</div>

<div id="renderChartsHeader">
			<div class="leftElement">	
			</div>
			<div class="rightElement">
				<input type="button" class="updateSectorIds" title="Update Sector values" value="Update Sectors" id="updateSectors"/>
				<input type="button" class="renderSectorDistribution" title="Click to see the sectors visualization" value="Render Charts"/>
			</div>
			<div class="clearBothElement"></div>
		</div>
		
		<div id="diverseContent">
			<p>	
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur blandit felis, eget porttitor elit congue vel. Suspendisse tristique mi eu turpis ornare accumsan dignissim dui consectetur. Fusce ut lorem sit amet magna sollicitudin porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec molestie, metus posuere ornare venenatis, purus magna facilisis enim, euismod facilisis purus enim a tortor. Duis gravida, sem mollis consequat fringilla, libero mauris blandit est, nec sodales nisl dui sit amet nunc. Morbi nisi lectus, imperdiet pulvinar laoreet et, fermentum eu quam. In vitae odio ut enim molestie vestibulum. Suspendisse iaculis, arcu et porta tincidunt, lectus eros pretium augue, eu rhoncus nunc lacus a tellus. Proin tincidunt pretium consequat. Proin id libero et elit fringilla venenatis. Nulla sagittis commodo magna, in ultrices libero blandit vel. Suspendisse at sem et risus imperdiet blandit vitae eget libero. Pellentesque mi leo, convallis vel aliquam quis, imperdiet eget justo.
			</p>
			
			<div id="sectorList" class="sectorStockList">
				<select id='sectorOption'>
					<option value='0'>Cost Basis</option>
					<option value='1'>Market Value</option>
					<option value='2'>Gain Loss</option>
				</select>
				<div id="sectorChart"></div>
			</div>
			<div id="sectorStockGraph" class="sectorStockGraph">
				<div id="dissectSectorChart"></div>
			</div>
			<div class="clearBothElement"></div>
			
			<p id="notes">
				<h4>Notes:</h4>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur blandit felis, eget porttitor elit congue vel. Suspendisse tristique mi eu turpis ornare accumsan dignissim dui consectetur. Fusce ut lorem sit amet magna sollicitudin porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec molestie, metus posuere ornare venenatis, purus magna facilisis enim, euismod facilisis purus enim a tortor. Duis gravida, sem mollis consequat fringilla, libero mauris blandit est, nec sodales nisl dui sit amet nunc. Morbi nisi lectus, imperdiet pulvinar laoreet et, fermentum eu quam. In vitae odio ut enim molestie vestibulum. Suspendisse iaculis, arcu et porta tincidunt, lectus eros pretium augue, eu rhoncus nunc lacus a tellus. Proin tincidunt pretium consequat. Proin id libero et elit fringilla venenatis. Nulla sagittis commodo magna, in ultrices libero blandit vel. Suspendisse at sem et risus imperdiet blandit vitae eget libero. Pellentesque mi leo, convallis vel aliquam quis, imperdiet eget justo.
			</p>

<div id="pf-view-table121">
<table class="gf-table">
	<thead>
		<tr class="portfolio-header-row">
			<th class="">Name</th>
			<th class="">Symbol</th>
			<th class="">Sector</th>
			<th class="">Change</th>
			<th class="">Shares</th>
			<th class="">Cost basis</th>
			<th class="">Mkt value</th>
			<th class="">Gain</th>
			<th class="">Gain %</th>
			<th class="">Day's gain</th>
			<th class="">Overall return</th>
		</tr>
	</thead>
	
	<tbody>
		<tr>
			<td class=""><a
				title="Microsoft Corporation" href="/finance?q=NASDAQ:MSFT">Microsoft
			Corporation</a></td>
			<td class=""><a
				title="Microsoft Corporation" href="/finance?q=NASDAQ:MSFT">MSFT</a></td>
			<td class="">
				<select id='sector'>
					<option value='0'>Cost Basis</option>
					<option value='1'>Market Value</option>
					<option value='2'>Gain Loss</option>
				</select>	
			</td>
			<td class=""><span class="chr" id="ref_358464_c">-0.20</span> <span class="chr" id="ref_358464_cp">(-0.77%)</span></td>
			<td class="">38.00</td>
			<td class="">807.12</td>
			<td class="">980.40</td>
			<td class=""><span class="chg">+173.28</span></td>
			<td class=""><span class="chg">+21.47%</span></td>
			<td class=""><span class="chr">-7.60</span></td>
			<td class="">0.00%</td>
		</tr>
	</tbody>
	
</table>
</div>
</div>
</div>
	
	
	
	
	
</div>

<div id="footer">
	 Graphs and the statements are provided solely for informational purposes, not for trading purposes or advice.<br/>
	 For suggestions please send an email to <a href="mailto:finsheetanalyzer@gmail.com">finsheetanalyzer</a>
</div>
</center>

<script type="text/javascript" src="js/lib/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="js/lib/jquery-ui-1.7.2.custom.min.js"></script>
<script type="text/javascript" src="js/page/constants.min.js"></script>
<script type="text/javascript" src="js/ui/ui.min.js"></script>
<script type="text/javascript" src="js/lib/uicontrols.min.js"></script>
<script type="text/javascript" src="js/browser.min.js"></script>
<script type="text/javascript" src="js/page/performance.min.js"></script>
<script type="text/javascript" src="js/finGraphs.min.js"></script>
<script type="text/javascript" src="js/ajax.min.js"></script>
</body>
</html>