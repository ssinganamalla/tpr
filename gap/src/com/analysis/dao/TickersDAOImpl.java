package com.analysis.dao;

import java.util.Collection;
import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import org.apache.commons.lang.StringUtils;

import com.analysis.PMF;
import com.analysis.domain.NullTickerSymbol;
import com.analysis.domain.RelatedTickers;
import com.analysis.domain.TickerSymbol;
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
	    	TickerSymbol e = pm.getObjectById(TickerSymbol.class, tickerId);
	        e.setSectorId(sectorId);
	        if(StringUtils.isNotEmpty(industry)) {
	        	e.setIndustry(industry);
	        }
	    } finally {
	        pm.close();
	    }
	}
	
	@Override
	public TickerSymbol getTickers(String ticker) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			TickerSymbol e = pm.getObjectById(TickerSymbol.class, ticker);
			TickerSymbol detachedResults = (TickerSymbol)pm.detachCopy(e);
			return detachedResults;
		} catch(javax.jdo.JDOObjectNotFoundException e){
			log.severe("Could not get " + TickerSymbol.class.getName() + " for ticker: " + ticker);
			//TODO log the exception
			return NullTickerSymbol.nullObject();
		} finally {
			pm.close();
		}
	}
	
	@Override
	public List<TickerSymbol> getAllTickers() {
		// TODO Auto-generated method stub
		return null;
	}
	

}
