//headers to be included in every page

function setupHeadersFeature() {
		/**
		var menuSectionsStr = "<div id=\"menuSections\">\n" + 
				"		<span><a href=\"finStockResearch.jsp\">Research</a> |</span>\n" + 
				"		<span><a href=\"finStockPerformance.jsp\">Diversified?</a> |</span>\n" + 
				"		<span><a href=\"finWatchList.jsp\">Compare</a> |</span> \r\n" +
				"		<span><a href=\"finAnalyzer.jsp?stockTickerSymbol=GOOG\">Statement Analysis</a> |</span> \n" +
				"		<span><a href=\"finStockMerge.jsp\">Merge of Research and Performance</a> |</span> \r\n" +
				"		<span><a href=\"finOtherSites.jsp\">Popular Finance Sites</a>|</span>\n" + 
				"	</div>"; 
		**/
		
		var researchAnchor = $("<span class='lk'>Research | </span>");
		researchAnchor.click(function(){
			$("#pageResearch").css('display', 'block');
			$("#pageDiversified").css('display', 'none');
			$("#pageCompareAnalysis").css('display', 'none');
			$("#pageStmtAnalysis").css('display', 'none');
			$("#pageOtherSites").css('display', 'none');
		});
		
		var diversifiedAnchor = $("<span class='lk'>Diversified? |  </span>");
		diversifiedAnchor.click(function(){
			$("#pageResearch").css('display', 'none');
			$("#pageDiversified").css('display', 'block');
			$("#pageCompareAnalysis").css('display', 'none');
			$("#pageStmtAnalysis").css('display', 'none');
			$("#pageOtherSites").css('display', 'none');
		});
		
		var compareAnchor = $("<span class='lk'>Compare | </span>");
		compareAnchor.click(function(){
			$("#pageResearch").css('display', 'none');
			$("#pageDiversified").css('display', 'none');
			$("#pageCompareAnalysis").css('display', 'block');
			$("#pageStmtAnalysis").css('display', 'none');
			$("#pageOtherSites").css('display', 'none');
		});
		
		var stmtAnalysisAnchor = $("<span class='lk'>Statement Analysis | </span>");
		stmtAnalysisAnchor.click(function(){
			$("#pageResearch").css('display', 'none');
			$("#pageDiversified").css('display', 'none');
			$("#pageCompareAnalysis").css('display', 'none');
			$("#pageStmtAnalysis").css('display', 'block');
			$("#pageOtherSites").css('display', 'none');
			
			
			com.fa.controller.loadBtnClicked();
		});
		
		var otherSitesAnchor = $("<span class='lk'>Popular Finance Sites | </span>");
		otherSitesAnchor.click(function(){
			$("#pageResearch").css('display', 'none');
			$("#pageDiversified").css('display', 'none');
			$("#pageCompareAnalysis").css('display', 'none');
			$("#pageStmtAnalysis").css('display', 'none');
			$("#pageOtherSites").css('display', 'block');
		});
		
		var menuSectionsDiv = $("<div id=\"menuSections\"></div>");
		menuSectionsDiv.append(researchAnchor);
		menuSectionsDiv.append(diversifiedAnchor);
		menuSectionsDiv.append(compareAnchor);
		menuSectionsDiv.append(stmtAnalysisAnchor);
		menuSectionsDiv.append(otherSitesAnchor);
		
		$("#header").append(menuSectionsDiv);
		researchAnchor.click();
}
$(document).ready(function() {	
	setupHeadersFeature();
});