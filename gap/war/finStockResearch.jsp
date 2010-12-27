<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<link type="text/css" rel="stylesheet" href="stylesheets/start.css"/>
	<link type="text/css" rel="stylesheet" href="stylesheets/main.css"/>
	<link type="text/css" rel="stylesheet" href="stylesheets/tablesorter.css"/>
	<link type="text/css" rel="stylesheet" href="stylesheets/jquery-ui_local.css"/>	
	<script type="text/javascript" src="js/lib/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/lib/jquery-ui-1.7.2.custom.min.js"></script>
	<script type="text/javascript" src="js/initNamespace.min.js"></script>
	<script type="text/javascript" src="js/utils.min.js"></script>
	<script type="text/javascript" src="js/browser.min.js"></script>
	<script type="text/javascript" src="js/lib/uicontrols.min.js"></script>
	<script type="text/javascript" src="js/lib/jquery.tablesorter.min.js"></script>
  </head>

<body>

<div>
<h1>Stock Research</h1>
</div>
<div>
	<div>
		Add a comment for:
		<input name="tickerSymbolForComments" id="tickerSymbolForComments" type="text" value="" size="40" maxlength="120" />
		<select>
			<option value="0">Other</option>
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
<table id="allCommentsTable" cellpadding="0" cellspacing="0" border="0" class="tablesorter">
	<thead>
		<tr>
			<th>Date</th>
			<th>Research Comments</th>
		</tr>
	</thead>
	
	<tbody>
		<tr>
			<td>02/12/2010</td>
			<td>The Boeing Company (NYSE:BA) surged 0.70% to $65.06. The Boeing Company (Boeing) is involved in the design, development, manufacture, sale and support of commercial jetliners, military aircraft, satellites, missile defense, human space flight and launch systems and services.
			</td>	
		</tr>
		<tr>
			<td>01/14/2010</td>
			<td>Republic Services, Inc. (NYSE:RSG) surged 0.47% to $30.16. The 52-week range of the stock is $25.15-$32.95.</td>
		</tr>
		<tr>
			<td>01/14/2010</td>
			<td>Republic Services, Inc. (NYSE:RSG) surged 0.47% to $30.16. The 52-week range of the stock is $25.15-$32.95.</td>
		</tr>
	</tbody>
</table>
</div>

<script type="text/javascript">
$(document).ready(function() {
	//$('#myStockResearchList').tabularlist({nameAttr:"getTickerResearchComments"});
	$('#tickerSymbolForComments').finsearchbox();
	setup();
});
</script>

<script type="text/javascript" src="js/components/research.min.js"></script>

<script type="text/javascript" charset="utf-8">
			$(document).ready(function() {
				$('#allCommentsTable').tablesorter();
			} );
</script>		

</body>
</html>