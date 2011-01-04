package com.analysis.dao;

import java.util.Collection;
import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import org.apache.commons.lang.StringUtils;

import com.analysis.PMF;
import com.analysis.domain.NullTickerInfo;
import com.analysis.domain.RelatedTickers;
import com.analysis.domain.TickerInfo;
import com.analysis.domain.UserComparisonTickers;
import com.analysis.vo.UserTicker;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;


public class TickersDAOImpl implements TickersDAO {
	private static final Logger log = Logger.getLogger(TickersDAOImpl.class.getName());
	
	@Override
	public String getRelatedTickers(String ticker) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RelatedTickers getRelatedTickers(Key key) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			RelatedTickers e = pm.getObjectById(RelatedTickers.class, key);
			RelatedTickers detachedResults = (RelatedTickers)pm.detachCopy(e);
			return detachedResults;
		} finally {
			pm.close();
		}
	}

	@Override
	public void addRelatedTickers(RelatedTickers rt) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			pm.makePersistent(rt);
		} finally {
			pm.close();
		}
		
	}

	@Override
	public void updateRelatedTickers(RelatedTickers rt) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			pm.makePersistent(rt);
		} finally {
			pm.close();
		}		
	}
	
	@Override
	public void updateSectorId(String tickerId, int sectorId, String industry) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
	    try {
	    	TickerInfo e = pm.getObjectById(TickerInfo.class, tickerId);
	        e.setSectorId(sectorId);
	        if(StringUtils.isNotEmpty(industry)) {
	        	e.setIndustry(industry);
	        }
	    } finally {
	        pm.close();
	    }
	}
	
	@Override
	public TickerInfo getTickers(String ticker) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			TickerInfo e = pm.getObjectById(TickerInfo.class, ticker);
			TickerInfo detachedResults = (TickerInfo)pm.detachCopy(e);
			return detachedResults;
		} catch(javax.jdo.JDOObjectNotFoundException e){
			log.severe("Could not get " + TickerInfo.class.getName() + " for ticker: " + ticker);
			//TODO log the exception
			return null;
		} finally {
			pm.close();
		}
	}
	
	@Override
	public List<TickerInfo> getAllTickers() {
		// TODO Auto-generated method stub
		return null;
	}
	

}
