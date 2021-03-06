package com.analysis.service;

import java.util.Collection;
import java.util.List;

import com.analysis.domain.TickerComment;
import com.analysis.enums.EnumTickerCommentReason;

public interface TickerCommentsService {
	/**
	 * @deprecated Use {@link #addTickerComments(String,String,String,int)} instead
	 */
	void addTickerComments(String email, String comments, String ticker);

	/**
	 * 
	 * @param email
	 * @param comments
	 * @param ticker
	 * @param reason {@link EnumTickerCommentReason}
	 */
	void addTickerComments(String email, String comments, String ticker, int reason);
	
	List<String> getTickers(String email);
	
	Collection<TickerComment> getComments(String email);
	
	Collection<TickerComment> getComments(String email, String ticker);
	
	/**
	 * Gets comments order by ticker. The comments are fetched in desc date.
	 * You can specify the max which specifies the maximum comments fetched for a ticker.
	 * @param email
	 * @param max
	 * @return
	 */
	Collection<TickerComment> getCommentsByTicker(String email, int max);
}
