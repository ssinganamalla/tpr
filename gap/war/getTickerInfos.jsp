<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s" %>   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>


<script type="text/javascript" src="js/lib/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="js/lib/jquery-ui-1.7.2.custom.min.js"></script>
<script type="text/javascript" src="js/initNamespace.min.js"></script>
<script type="text/javascript" src="js/utils.min.js"></script>
 
 
<script type="text/javascript" >

$(document).ready(function() {
	$.post("/struts/watchlist/getTickerInfos", {},
			function(responseJson) {
				var ticker = eval( '(' + responseJson + ')' );
				console.log(ticker);										
			}
	);
});

</script>
</body>
</html>