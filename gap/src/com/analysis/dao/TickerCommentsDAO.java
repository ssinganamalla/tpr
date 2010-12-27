package com.analysis.dao;

import java.util.Collection;
import java.util.Date;

import com.analysis.domain.TickerComment;
import com.analysis.domain.UserCommentTicker;

public interface TickerCommentsDAO {
	
	/**
	 * @deprecated Use {@link #createTickerComments(String,String,String,Date, int)} instead
	 */
	void createTickerComments(String email, String comments, String ticker);

	void createTickerComments(String email, String comments, String ticker, Date date, int reason);
	
	Collection<UserCommentTicker> getTickers(String email);
	
	Collection<TickerComment> getComments(String email);
	
	Collection<TickerComment> getComments(String email, String ticker);
}
