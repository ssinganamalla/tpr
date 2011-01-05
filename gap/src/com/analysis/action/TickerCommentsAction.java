package com.analysis.action;

import java.io.StringBufferInputStream;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.StrutsException;

import com.analysis.action.basic.BasicActionSupport;
import com.analysis.action.basic.BasicAjaxActionSupport;
import com.analysis.domain.NonMutableTickerInfo;
import com.analysis.domain.TickerComment;
import com.analysis.domain.TickerInfo;
import com.analysis.enums.EnumJsonIds;
import com.analysis.enums.EnumStrutsMethodType;
import com.analysis.service.TickerCommentsService;
import com.analysis.service.TickerInfoService;
import com.analysis.service.TickersService;
import com.utils.json.JSONArray;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

public class TickerCommentsAction extends BasicAjaxActionSupport {
	private TickerCommentsService commentsService;
	private TickerInfoService tickerInfoService;

	private String ticker;
	private String comments;
	private int reason;
	
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
	
	public int getReason() {
		return reason;
	}

	public void setReason(int reason) {
		this.reason = reason;
	}

	public TickerCommentsService getCommentsService() {
		return commentsService;
	}

	public void setCommentsService(TickerCommentsService commentsService) {
		this.commentsService = commentsService;
	}

	
	
	public TickerInfoService getTickerInfoService() {
		return tickerInfoService;
	}

	public void setTickerInfoService(TickerInfoService tickerInfoService) {
		this.tickerInfoService = tickerInfoService;
	}

	@Override
	public String populateInputString() throws StrutsException {
		Collection<TickerComment> tickerComments = commentsService.getComments(getEmail(), ticker);
		NonMutableTickerInfo symbol = tickerInfoService.getTickerInfo(ticker);
		
		try {
			JSONObject sym = symbol.toJSONObject();
			JSONArray jo = new JSONArray();
			for(TickerComment tickerComment : tickerComments) {
				jo.put(tickerComment.toJSONObject());
			}
			sym.put(EnumJsonIds.TICKER_COMMENT_ARRAY, jo);
			return sym.toString();
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			throw new StrutsException(e1);
		}
		
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
		commentsService.addTickerComments(getEmail(), comments, ticker, reason);
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
