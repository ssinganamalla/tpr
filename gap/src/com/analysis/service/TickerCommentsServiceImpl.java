package com.analysis.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.datanucleus.util.StringUtils;

import com.analysis.dao.TickerCommentsDAO;
import com.analysis.domain.TickerComment;
import com.analysis.domain.UserCommentTicker;

public class TickerCommentsServiceImpl implements TickerCommentsService {

	private TickerCommentsDAO commentsDAO;
	
	public TickerCommentsDAO getCommentsDAO() {
		return commentsDAO;
	}

	public void setCommentsDAO(TickerCommentsDAO commentsDAO) {
		this.commentsDAO = commentsDAO;
	}

	/**
	 * @deprecated Use {@link #addTickerComments(String,String,String,int)} instead
	 */
	@Override
	public void addTickerComments(String email, String comments, String ticker) {
		addTickerComments(email, comments, ticker, 0);
	}

	@Override
	public void addTickerComments(String email, String comments, String ticker, int reason) {
		
		this.commentsDAO.createTickerComments(email, comments, ticker, new Date(), reason);
	}

	@Override
	public List<String> getTickers(String email) {
		Collection<UserCommentTicker> tickers = this.commentsDAO.getTickers(email);
		List<String> list = new ArrayList<String>();
		for(UserCommentTicker ticker: tickers) {
			list.add(ticker.getTicker());
		}
		return list;
	}
	
	@Override
	public Collection<TickerComment> getComments(String email) {
		return this.getComments(email, null);
	}

	@Override
	public Collection<TickerComment> getComments(String email, String ticker) {
		if(StringUtils.isEmpty(ticker)) {
			return this.commentsDAO.getComments(email);
		}
		return this.commentsDAO.getComments(email, ticker);
	}

}
