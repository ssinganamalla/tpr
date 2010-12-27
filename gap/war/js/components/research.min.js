//setup : converts the innertext to the links to display comments



function setup() {
	//set up the links for fetching comments
	$('li[name="getTickerResearchComments"]').live('click',
				function() {
					$.getJSON(com.fa.Global.prefixPath + "/comments/getTickerResearchComments", {"ticker":$(this).text()},
							function(jsonArray) {
								$('#allCommentsTable').empty();
								$('#allCommentsTable').append("<thead>\r\n" + 
										"		<tr>\r\n" + 
										"			<th>Date</th>\r\n" + 
										"			<th>Research Comments</th>\r\n" + 
										"		</tr>\r\n" + 
										"	</thead>")
								
								var tbody = $("<tbody></tbody>");
								$('#allCommentsTable').append(tbody);
								for(var i in jsonArray) {
									var tr =$("<tr></tr>");
									var tdDate = $("<td>" + jsonArray[i].da + "</td>");
									var tdComment = $("<td>" + jsonArray[i].co + "</td>");
									tr.append(tdDate);
									tr.append(tdComment);
									tbody.append(tr);
								}
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
	
	$.getJSON(com.fa.Global.prefixPath + "/comments/getCommentTickers", {},
			function(jsonObj) {
				var tickersStr = jsonObj.ta;
				var tickerArray = tickersStr.split(",");
				$('#myStockResearchList').tabularlist({nameAttr:"getTickerResearchComments", list:tickerArray});
			}
			
	);
}


//post a comment

