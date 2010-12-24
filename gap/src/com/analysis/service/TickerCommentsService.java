package com.analysis.service;

import java.util.Collection;
import java.util.Date;

import javax.jdo.PersistenceManager;

import com.analysis.PMF;
import com.analysis.domain.TickerComments;
import com.google.appengine.api.users.User;

public interface TickerCommentsService {
	void addTickerComments(String email, String comments, String ticker, Date date);
	
	Collection<TickerComments> getComments(String email);
	
	Collection<TickerComments> getComments(String email, String ticker);
}
