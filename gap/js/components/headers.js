//headers to be included in every page

function setupHeadersFeature() {
		
		var menuSectionsStr = "<div id=\"menuSections\">\n" + 
				"		<span><a href=\"finStockResearch.jsp\">Research</a> |</span>\n" + 
				"		<span><a href=\"finStockPerformance.jsp\">Diversified?</a> |</span>\n" + 
				"		<span><a href=\"finWatchList.jsp\">Compare</a> |</span> \r\n" +
				"		<span><a href=\"finAnalyzer.jsp?stockTickerSymbol=GOOG\">Statement Analysis</a> |</span> \n" +
				"		<span><a href=\"finOtherSites.jsp\">Popular Finance Sites</a>|</span>\n" + 
				"	</div>"; 
		
		$("#header").append(menuSectionsStr);
}
$(document).ready(function() {	
	setupHeadersFeature();
});