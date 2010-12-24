package com.analysis.dao;

import java.util.Collection;
import java.util.Date;

import com.analysis.domain.TickerComments;

public interface TickerCommentsDAO {
	
	/**
	 * @deprecated Use {@link #createTickerComments(String,String,String,Date)} instead
	 */
	void createTickerComments(String email, String comments, String ticker);

	void createTickerComments(String email, String comments, String ticker, Date date);
	
	Collection<TickerComments> getComments(String email);
	
	Collection<TickerComments> getComments(String email, String ticker);
}
