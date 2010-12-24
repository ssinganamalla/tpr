<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>
<html>
<head>
<link type="text/css" rel="stylesheet" href="stylesheets/start.css"/>
<script type="text/javascript" src="js/initNamespace.js"></script>
<script type="text/javascript" src="js/utils.js"></script>
<script type="text/javascript" src="js/lib/jquery1.3.2.js"></script>
<script type="text/javascript" src="js/ui/ui.js"></script>


<script type="text/javascript" >
$(document).ready(function() {
	$("#inputSectorStocks").css("display", "none");
	com.fa.controller.ajax.getSectorTickers();
	$("#editviewBtn").toggle(
		function(){
			$(this).val("View");
			$("#inputSectorStocks").css("display", "block");
			$("#diverseContent").css("display", "none");
		},
		function(){
			$(this).val("Edit");
			$("#inputSectorStocks").css("display", "none");
			$("#diverseContent").css("display", "block");
		}
	);

	$("#saveSectorTickers").click(
			function() {
				com.fa.controller.ajax.saveSectorTickers();
			}

			);
	$("#currSectorTickers").data("currentTickerId", 0);
	$("#seltickers").change(function(){
		var newTickerId = Number($(this).val());
		var oldTickerId = $("#currSectorTickers").data("currentTickerId");
		com.fa.controller.changeSector(oldTickerId, newTickerId);
		//set the new tickerId as current
		$("#currSectorTickers").data("currentTickerId", newTickerId);
	})
});
</script>
</head>

<body id="dbody">
	<center>
<div id="header">
	<%
    UserService userService = UserServiceFactory.getUserService();
    User user = userService.getCurrentUser();
    System.out.println("dsadadadadadadadada" + request.getAttribute("stockTickerSymbol")); 
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
		<span><b>Am I Diversified?</b> |</span> 
		<span><a href="finStockPerformance.jsp">Stock Performance</a> |</span> 
		<span><a href="finWatchList.jsp">Watch List</a> |</span> 
		<span><a href="finOtherSites.jsp">Popular Finance Sites</a> |</span> 
	</div>
	<div id="main">
		<div id="header">
			<h1>Lorem ipsum</h1>
			sit amet, consectetur adipiscing elit. In consectetur blandit felis, eget porttitor elit congue vel. Suspendisse tristique mi eu turpis ornare accumsan dignissim dui consectetur. Fusce ut lorem sit amet magna sollicitudin porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
		</div>
		<div id="mainHeader">
		
			<div class="leftElement">
				<input type="button" title="Click to Edit" value="Edit" id="editviewBtn"/>
			</div>
			<div class="rightElement">
				<input type="button" title="Show data in absolute terms" value="Absolute Units" id="absUnits"/>
				<input type="button" title="Sync information with the latest market data" value="Refresh" id="refresh"/>
			</div>
			<div class="clearBothElement"></div>
		</div>
		<div id="diverseContent">
			<p>	
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur blandit felis, eget porttitor elit congue vel. Suspendisse tristique mi eu turpis ornare accumsan dignissim dui consectetur. Fusce ut lorem sit amet magna sollicitudin porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec molestie, metus posuere ornare venenatis, purus magna facilisis enim, euismod facilisis purus enim a tortor. Duis gravida, sem mollis consequat fringilla, libero mauris blandit est, nec sodales nisl dui sit amet nunc. Morbi nisi lectus, imperdiet pulvinar laoreet et, fermentum eu quam. In vitae odio ut enim molestie vestibulum. Suspendisse iaculis, arcu et porta tincidunt, lectus eros pretium augue, eu rhoncus nunc lacus a tellus. Proin tincidunt pretium consequat. Proin id libero et elit fringilla venenatis. Nulla sagittis commodo magna, in ultrices libero blandit vel. Suspendisse at sem et risus imperdiet blandit vitae eget libero. Pellentesque mi leo, convallis vel aliquam quis, imperdiet eget justo.
			</p>
			
			<div id="sectorGraphBoughtPrice">
				<h4>Sector Distribution (Bought Price)</h4>
				<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur blandit felis, eget porttitor elit congue vel. Suspendisse tristique mi eu turpis ornare accumsan dignissim dui consectetur. Fusce ut lorem sit amet magna sollicitudin porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec molestie, metus posuere ornare venenatis, purus magna facilisis enim, euismod facilisis purus enim a tortor. Duis gravida, sem mollis consequat fringilla, libero mauris blandit est, nec sodales nisl dui sit amet nunc. Morbi nisi lectus, imperdiet pulvinar laoreet et, fermentum eu quam. In vitae odio ut enim molestie vestibulum. Suspendisse iaculis, arcu et porta tincidunt, lectus eros pretium augue, eu rhoncus nunc lacus a tellus. Proin tincidunt pretium consequat. Proin id libero et elit fringilla venenatis. Nulla sagittis commodo magna, in ultrices libero blandit vel. Suspendisse at sem et risus imperdiet blandit vitae eget libero. Pellentesque mi leo, convallis vel aliquam quis, imperdiet eget justo.
				</div>
			</div>
			<div id="sectorGraphCurrentPrice">
				<h4>Sector Distribution (Current Market Price)</h4>
				<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur blandit felis, eget porttitor elit congue vel. Suspendisse tristique mi eu turpis ornare accumsan dignissim dui consectetur. Fusce ut lorem sit amet magna sollicitudin porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec molestie, metus posuere ornare venenatis, purus magna facilisis enim, euismod facilisis purus enim a tortor. Duis gravida, sem mollis consequat fringilla, libero mauris blandit est, nec sodales nisl dui sit amet nunc. Morbi nisi lectus, imperdiet pulvinar laoreet et, fermentum eu quam. In vitae odio ut enim molestie vestibulum. Suspendisse iaculis, arcu et porta tincidunt, lectus eros pretium augue, eu rhoncus nunc lacus a tellus. Proin tincidunt pretium consequat. Proin id libero et elit fringilla venenatis. Nulla sagittis commodo magna, in ultrices libero blandit vel. Suspendisse at sem et risus imperdiet blandit vitae eget libero. Pellentesque mi leo, convallis vel aliquam quis, imperdiet eget justo.
				</div>
			</div>
			<div class="clearBothElement"></div>
			
			<p id="notes">
				<h4>Notes:</h4>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur blandit felis, eget porttitor elit congue vel. Suspendisse tristique mi eu turpis ornare accumsan dignissim dui consectetur. Fusce ut lorem sit amet magna sollicitudin porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec molestie, metus posuere ornare venenatis, purus magna facilisis enim, euismod facilisis purus enim a tortor. Duis gravida, sem mollis consequat fringilla, libero mauris blandit est, nec sodales nisl dui sit amet nunc. Morbi nisi lectus, imperdiet pulvinar laoreet et, fermentum eu quam. In vitae odio ut enim molestie vestibulum. Suspendisse iaculis, arcu et porta tincidunt, lectus eros pretium augue, eu rhoncus nunc lacus a tellus. Proin tincidunt pretium consequat. Proin id libero et elit fringilla venenatis. Nulla sagittis commodo magna, in ultrices libero blandit vel. Suspendisse at sem et risus imperdiet blandit vitae eget libero. Pellentesque mi leo, convallis vel aliquam quis, imperdiet eget justo.
			</p>
		</div>
		<div id="inputSectorStocks">
			<label>Enter Sector Stocks:</label>
			<br/>
			<label>Example: CSCO 30.6 60</label>
			<br/>
			Sector
			<div>	
				<select id="seltickers" size="12">
				<option value="0" selected="selected">Basic Materials</option>
				<option value="1">Capital Goods</option>
				<option value="2">Conglomerates</option>
				<option value="3">Cons. Cyclical</option>
				<option value="4">Cons. Non-Cyclical</option>
				<option value="5">Energy</option>
				<option value="6">Financial</option>
				<option value="7">Healthcare</option>
				<option value="8">Services</option>
				<option value="9">Technology</option>
				<option value="10">Transportation</option>
				<option value="11">Utilities</option>
				</select>
				<textarea id="currSectorTickers" cols="18" rows="10" style="overflow: visible"></textarea>
			</div>
			<div>
				<input type="button" id="saveSectorTickers" value="Save"/>
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
</body>
</html>