package com.analysis.service;

import java.util.Collection;
import java.util.Date;

import com.analysis.dao.TickerCommentsDAO;
import com.analysis.domain.TickerComments;

public class TickerCommentsServiceImpl implements TickerCommentsService {

	private TickerCommentsDAO commentsDAO;
	
	public TickerCommentsDAO getCommentsDAO() {
		return commentsDAO;
	}

	public void setCommentsDAO(TickerCommentsDAO commentsDAO) {
		this.commentsDAO = commentsDAO;
	}

	@Override
	public void addTickerComments(String email, String comments, String ticker, Date date) {
		this.commentsDAO.createTickerComments(email, comments, ticker, date);
	}

	@Override
	public Collection<TickerComments> getComments(String email) {
		return this.commentsDAO.getComments(email);
	}

	@Override
	public Collection<TickerComments> getComments(String email, String ticker) {
		return this.commentsDAO.getComments(email, ticker);
	}

}
