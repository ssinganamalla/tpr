package com.analysis.dao;

import java.util.Collection;
import java.util.Date;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.analysis.PMF;
import com.analysis.domain.TickerComment;
import com.analysis.domain.UserCommentTicker;
import com.analysis.vo.UserTicker;

public class TickerCommentsDAOImpl implements TickerCommentsDAO {

	/**
	 * @deprecated Use {@link #createTickerComments(String,String,String,Date, int)} instead
	 */
	@Override
	public void createTickerComments(String email, String comments, String ticker) {
		createTickerComments(email, comments, ticker, new Date(), 0);
	}

	@Override
	public void createTickerComments(String email, String comments, String ticker, Date date, int reason) {
		TickerComment note = new TickerComment(email, comments, date, false, ticker);
		note.setReason(reason);
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			pm.makePersistent(note);
			
			//add to UserCommentTicker if a ticker does not exist
			Query query = pm.newQuery(UserCommentTicker.class);
			query.setFilter("email == emailParam && ticker == tickerParam");
			query.declareParameters("String emailParam, String tickerParam");
			Collection<TickerComment> results = (Collection<TickerComment>) query.execute(email, ticker);
			
			if(results == null || results.size()== 0) {
				this.createUserCommentTicker(email, ticker);
			}
		} finally {
			pm.close();
		}
		
		
		
	}

	public void createUserCommentTicker(String email, String ticker) {
		UserCommentTicker note = new UserCommentTicker();
		note.setEmail(email);
		note.setTicker(ticker);
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			pm.makePersistent(note);
		} finally {
			pm.close();
		}
	}
	
	@Override
	public Collection<TickerComment> getComments(String email) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Query query = pm.newQuery(TickerComment.class);
			query.setFilter("email == emailParam");
			query.declareParameters("String emailParam");
			query.setOrdering("date desc");
			Collection<TickerComment> results = (Collection<TickerComment>) query.execute(email);
			Collection<TickerComment> list = pm.detachCopyAll(results);
			return list;
		} finally {
			pm.close();
		}
		
	}
	
	@Override
	public Collection<UserCommentTicker> getTickers(String email) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Query query = pm.newQuery(UserCommentTicker.class);
			query.setFilter("email == emailParam");
			query.declareParameters("String emailParam");
			Collection<UserCommentTicker> results = (Collection<UserCommentTicker>) query.execute(email);
			Collection<UserCommentTicker> list = pm.detachCopyAll(results);
			return list;
		} finally {
			pm.close();
		}
	}

	@Override
	public Collection<TickerComment> getComments(String email, String ticker) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Query query = pm.newQuery(TickerComment.class);
			query.setFilter("email == emailParam && ticker == tickerParam");
			query.declareParameters("String emailParam, String tickerParam");
			query.setOrdering("date desc");
			Collection<TickerComment> results = (Collection<TickerComment>) query.execute(email, ticker);
			Collection<TickerComment> list = pm.detachCopyAll(results);
			return list;
		} finally {
			pm.close();
		}
		
	}

}
