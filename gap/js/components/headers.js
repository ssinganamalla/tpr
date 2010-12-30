//headers to be included in every page

function setupHeadersFeature() {
		
		var menuSectionsStr = "<div id=\"menuSections\">\r\n" + 
				"		<span><a href=\"finStockResearch.jsp\">Research</a> |</span> \r\n" + 
				"		<span><a href=\"finStockPerformance.jsp\">Stock Performance</a> |</span> \r\n" + 
				"		<span><a href=\"finWatchList.jsp\">Watch List</a> |</span> \r\n" +
				"		<span><a href=\"finAnalyzer.jsp?stockTickerSymbol=GOOG\">Statement Analysis</a> |</span> \r\n" +
				"		<span>Popular Finance Sites|</span> \r\n" + 
				"	</div>"; 
		
		$("#header").append(menuSectionsStr);
}
$(document).ready(function() {	
	setupHeadersFeature();
});