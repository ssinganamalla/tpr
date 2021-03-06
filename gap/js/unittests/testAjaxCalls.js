var fileName = 'testAjaxCalls.js';
function testGetQuote() {
	var ticker = 'GE';
	var url = com.fa.Global.prefixPath + "/quoteInfo?ticker="+ HTTP.encode(ticker);
	com.fa.utils.log("info", fileName +' ' + methodName + 'getting quote info for ' + url);
	HTTP.getText(url, testQuoteCallback, com.fa.Utils.errorHandler);
}

function testQuoteCallback(innerText) {
	var methodName = 'testQuoteCallback';
	if(innerText) {
		//first two characters should be '//'
		var firstChar = innerText.charAt(1);
		var secondChar = innerText.charAt(2);
		if(firstChar != '/' || secondChar != '/') {
			com.fa.utils.log("info", fileName +' ' + methodName + ' innerText does not start with a line comment //')
		}
	} else {
		com.fa.utils.log("info", fileName +' ' + methodName + 'innerText should not be empty');
	}
	
}

function testMain() {
	testGetQuote();
}	