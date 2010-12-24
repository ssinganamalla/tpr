package com.analysis.dao;

import java.util.Collection;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.analysis.PMF;
import com.analysis.domain.UserComparisonTickers;

public class UserComparisonTickersDAOImpl implements UserComparisonTickersDAO {
	
	@Override
	public Collection<UserComparisonTickers> getComparisonTickers(String email) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Query query = pm.newQuery(UserComparisonTickers.class);
			query.setFilter("email == emailParam");
			query.declareParameters("String emailParam");
			Collection<UserComparisonTickers> results = (Collection<UserComparisonTickers>) query.execute(email);
			Collection<UserComparisonTickers> list = pm.detachCopyAll(results);
			return list;
		} finally {
			pm.close();
		}
	}
	
	@Override
	public void addComparisionTickers(UserComparisonTickers comparisonTickers) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			pm.makePersistent(comparisonTickers);
		} finally {
			pm.close();
		}
		
	}
}
