//setup : converts the innertext to the links to display comments
function setupCommentsFeature() {
	
	$('#tickerSymbolForComments').finsearchbox({});
	
	//set up the links for fetching comments
	$('li[name="getTickerResearchComments"]').live('click',
				function() {
					
					var loadingDiv = $("#loading").css('display', 'block');
					//position the loadingDiv
					$.getJSON(com.fa.Global.prefixPath + "/comments/getTickerResearchComments", {"ticker":$(this).text()},
							function(json) {
						 		$("#loading").css('display', 'none');
								$('#allComments').empty();
								$('#allComments').append("<table id=\"allCommentsTable\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"tablesorter\">\r\n" + 
										"</table>\r\n	");
								$('#allCommentsTable').append("<thead>\r\n" + 
										"		<tr>\r\n" + 
										"			<th style='width:150px'>Date</th>\r\n" + 
										"			<th>Research Comments</th>\r\n" + 
										"		</tr>\r\n" + 
										"	</thead>")
								
								var tbody = $("<tbody></tbody>");
								$('#allCommentsTable').append(tbody);
								var jsonArray = json.tca;
								var tickerText = json.e + ':' + json.sb;
								$("#tickerSymbolForComments").finsearchbox('option', 'longVal', tickerText);
								for(var i in jsonArray) {
									var tr =$("<tr></tr>");
									var tdDate = $("<td>" + jsonArray[i].da + "</td>");
									var tdComment = $("<td>" + jsonArray[i].co + "</td>");
									tr.append(tdDate);
									tr.append(tdComment);
									tbody.append(tr);
								}
								
								//create meta info for the selected ticker 
								var commentHeader = $("<div></div>");
								commentHeader.append('<h3>Researched Comments for: ' + (json.cn ? json.cn : json.sb) + '</h3>');
								var metaInfo = $("<ul></ul>");
								commentHeader.append(metaInfo);
								metaInfo.append("<li>Sector: " + (json.sn ? json.sn : "") + "</li>");
								metaInfo.append("<li>Industry: " + (json.ii ? json.ii : "") + "</li>");
								metaInfo.append("<li>Related Tickers: " + (json.rt ? json.rt : "") + "</li>");
								$('#allComments').prepend(commentHeader);
								$('#allCommentsTable').tablesorter();
							}
					);
				}
			);
	//set up the link for adding a comment
	
	
	$("#addTickerComment").click(function(){
		var comments = $('#addCommentsTxtArea').val();
		
		var val = $('#tickerSymbolForComments').finsearchbox("option", "shortVal");
		
		if(val != null && comments != null) {
			$.getJSON(com.fa.Global.prefixPath + "/comments/addTickerResearchComments", {"ticker":val, "comments": comments},
					function(jsonObj) {
						alert(jsonObj);
					}
			);
		}
	});
	
	$("#addCommentsTxtArea").keyup(function(event){
		var txt = this.value;
		$("#charsLen").empty();
		$("#charsLen").append(txt.length);
	});
	
	$.getJSON(com.fa.Global.prefixPath + "/comments/getCommentTickers", {},
			function(jsonObj) {
				var tickersStr = jsonObj.ta;
				var tickerArray = tickersStr.split(",");
				$('#myStockResearchList').tabularlist({nameAttr:"getTickerResearchComments", list:tickerArray});
			}
			
	);
}


//post a comment

