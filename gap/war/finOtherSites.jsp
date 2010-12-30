<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>
<html>
<head>
<link type="text/css" rel="stylesheet" href="stylesheets/start.css"/>
<script type="text/javascript" src="js/components/headers.min.js"></script>

</head>

<body id="dbody">
<jsp:include page="include.jsp"></jsp:include>
<!-- insert menusections here -->
<div id="header">
</div>

	<center>

<div id="page">
	
	<div id="main">
		<div id="header">
			<h1>Other Finance Sites</h1>
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
	</div>
	
	
	
	
	
</div>

<div id="footer">
	 Graphs and the statements are provided solely for informational purposes, not for trading purposes or advice.<br/>
	 For suggestions please send an email to <a href="mailto:finsheetanalyzer@gmail.com">finsheetanalyzer</a>
</div>
</center>
</body>
</html>