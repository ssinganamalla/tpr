package com.analysis.dao;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.analysis.PMF;
import com.analysis.domain.TickerComments;
import com.analysis.vo.UserTicker;

public class TickerCommentsDAOImpl implements TickerCommentsDAO {

	@Override
	public void createTickerComments(String email, String comments, String ticker) {
		Date date = new Date();
		TickerComments note = new TickerComments(email, comments, date, false, ticker);
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			pm.makePersistent(note);
		} finally {
			pm.close();
		}
	}

	@Override
	public Collection<TickerComments> getComments(String email) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Query query = pm.newQuery(TickerComments.class);
			query.setFilter("email == emailParam");
			query.declareParameters("String emailParam");
			query.setOrdering("date desc");
			Collection<TickerComments> results = (Collection<TickerComments>) query.execute(email);
			Collection<TickerComments> list = pm.detachCopyAll(results);
			return list;
		} finally {
			pm.close();
		}
		
	}

	@Override
	public Collection<TickerComments> getComments(String email, String ticker) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Query query = pm.newQuery(TickerComments.class);
			query.setFilter("email == emailParam && ticker == tickerParam");
			query.declareParameters("String emailParam, String tickerParam");
			query.setOrdering("date desc");
			Collection<TickerComments> results = (Collection<TickerComments>) query.execute(email, ticker);
			Collection<TickerComments> list = pm.detachCopyAll(results);
			return list;
		} finally {
			pm.close();
		}
		
	}

}
