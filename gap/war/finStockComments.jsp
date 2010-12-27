<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<link type="text/css" rel="stylesheet" href="stylesheets/start.css"/>
	<link type="text/css" rel="stylesheet" href="stylesheets/main.css"/>
	<script type="text/javascript" src="js/lib/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/lib/jquery-ui-1.7.2.custom.min.js"></script>
	<script type="text/javascript" src="js/initNamespace.min.js"></script>
	<script type="text/javascript" src="js/utils.min.js"></script>

	<script type="text/javascript" src="js/lib/uicontrols.min.js"></script>
  </head>

<body>
<div>
	<div>
		<input name="stockTickerSymbol" id="stockTickerSymbol" type="text" value="" size="40" maxlength="120" />
		<input type="button" id="getAllComments" value="Fetch Comments">
	</div>
	<div id="suggestList" class="container"></div>
</div>


<textarea cols="100" rows="4" name="comments" id="addCommentsDiv"></textarea>

<div >

</div>

<script type="text/javascript">
$(document).ready(function() {
	$('#stockTickerSymbol').finsearchbox();
});
</script>
</body>
</html>