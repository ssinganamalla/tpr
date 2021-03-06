<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>
<html>
<head>
<link type="text/css" rel="stylesheet" href="stylesheets/start.css"/>
<script type="text/javascript" src="js/lib/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="js/lib/jquery-ui-1.8.7.custom.min.js"></script>
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
		</div>
		<div>
			<h3>Stock Screener</h3>
			<div><a href="http://caps.fool.com/Screener.aspx" target="_blank">Fool.com stock screener</a></div>
			<div><a href="http://www.google.com/finance/stockscreener" target="_blank">Google stock screener</a></div>
			<div><a href="http://www.dailyfinance.com" target="_blank">Daily Finance</a></div>
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