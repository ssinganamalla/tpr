package com.analysis.dao;

import java.util.Collection;

import com.analysis.domain.TickerComments;

public interface TickerCommentsDAO {
	
	void createTickerComments(String email, String comments, String ticker);
	
	Collection<TickerComments> getComments(String email);
	
	Collection<TickerComments> getComments(String email, String ticker);
}
