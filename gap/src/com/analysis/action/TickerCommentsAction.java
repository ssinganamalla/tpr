package com.analysis.action;

import java.io.StringBufferInputStream;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.StrutsException;

import com.analysis.action.basic.BasicActionSupport;
import com.analysis.action.basic.BasicAjaxActionSupport;
import com.analysis.domain.TickerComment;
import com.analysis.enums.EnumJsonIds;
import com.analysis.enums.EnumStrutsMethodType;
import com.analysis.service.TickerCommentsService;
import com.utils.json.JSONArray;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

public class TickerCommentsAction extends BasicAjaxActionSupport {
	private TickerCommentsService commentsService;

	private String ticker;
	private String comments;
	
	public String getTicker() {
		return ticker;
	}

	public void setTicker(String ticker) {
		this.ticker = ticker;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public TickerCommentsService getCommentsService() {
		return commentsService;
	}

	public void setCommentsService(TickerCommentsService commentsService) {
		this.commentsService = commentsService;
	}

	@Override
	public String populateInputString() throws StrutsException {
		Collection<TickerComment> tickerComments = commentsService.getComments(getEmail(), ticker);
		JSONArray jo = new JSONArray();
		for(TickerComment tickerComment : tickerComments) {
			try {
				jo.put(tickerComment.toJSONObject());
			} catch (JSONException e) {
				e.printStackTrace();
				throw new StrutsException(e);
			}			
		}
		
		return jo.toString();
	}
	
	public String getTickerResearchComments() throws JSONException {
		try{
			this.inputStream = new StringBufferInputStream(populateInputString());
		} catch(StrutsException e) {
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String addTickerComments() {
		commentsService.addTickerComments(getEmail(), comments, ticker);
		this.inputStream = new StringBufferInputStream("OK");
		return SUCCESS;
	}
	
	public String getTickers() throws JSONException {
		List<String> tickers = commentsService.getTickers(getEmail());
		JSONObject jo = new JSONObject();
		jo.put(EnumJsonIds.TICKER_ARRAY, StringUtils.join(tickers, ","));
		this.inputStream = new StringBufferInputStream(jo.toString());
		return SUCCESS;
	}
}
