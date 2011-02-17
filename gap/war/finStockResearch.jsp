<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="stylesheets/start.css"/>
	<link type="text/css" rel="stylesheet" href="stylesheets/main.css"/>
	<link type="text/css" rel="stylesheet" href="stylesheets/tablesorter.css"/>
	<link type="text/css" rel="stylesheet" href="stylesheets/jquery-ui_local.css"/>	
	<script type="text/javascript" src="js/lib/jquery-1.4.4.min.js"></script>
	<script type="text/javascript" src="js/lib/jquery-ui-1.8.7.custom.min.js"></script>
	<script type="text/javascript" src="js/initNamespace.min.js"></script>
	<script type="text/javascript" src="js/utils.min.js"></script>
	<script type="text/javascript" src="js/browser.min.js"></script>
	<script type="text/javascript" src="js/lib/uicontrols.min.js"></script>
	<script type="text/javascript" src="js/lib/jquery.tablesorter.min.js"></script>
	<script type="text/javascript" src="js/components/research.min.js"></script>
	<script type="text/javascript" src="js/components/headers.min.js"></script>
  </head>

<body>
<jsp:include page="include.jsp"></jsp:include>
<!-- insert menusections here -->
<div id="header">
</div>
<center>

<div id="page">
	<div class="section_hdr" id="header"><span class="f3">Stock Research</span></div>
	<div>
		<div>
			Add a comment for:
			<input name="tickerSymbolForComments" id="tickerSymbolForComments" type="text" value="" size="40" maxlength="120" />
			<select id="commentsReason">
				<option value="0">Research</option>
				<option value="1">Buy</option>
	  			<option value="2">Sell</option>
	  			<option value="3">Long term buy</option>
	  			<option value="4">Short term buy</option>
			</select>
		</div>
		<div id="suggestList" class="container"></div>
	</div>
	
	<textarea cols="100" rows="4" name="comments" id="addCommentsTxtArea"></textarea>
	<br/>
	<input type="button" id="addTickerComment" value="Post Tweet"/>
	<span>Text should be less than 500 characters</span>
	
	<div>
	<h3>Select a ticker to see your research comments:</h3>
	<div id="myStockResearchList">
	
	</div>
	</div>
	<div id="allComments">
	</div>
</div>
<div id="footer">
	 Graphs and the statements are provided solely for informational purposes, not for trading purposes or advice.<br/>
	 For suggestions please send an email to <a href="mailto:finsheetanalyzer@gmail.com">finsheetanalyzer</a>
</div>
</center>
<script type="text/javascript">
$(document).ready(function() {
	setupCommentsFeature();
});
</script>


</body>
</html>