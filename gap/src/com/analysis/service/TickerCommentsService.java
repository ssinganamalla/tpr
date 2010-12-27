package com.analysis.service;

import java.util.Collection;
import java.util.List;

import com.analysis.domain.TickerComment;

public interface TickerCommentsService {
	void addTickerComments(String email, String comments, String ticker);
	
	List<String> getTickers(String email);
	
	Collection<TickerComment> getComments(String email);
	
	Collection<TickerComment> getComments(String email, String ticker);
}
