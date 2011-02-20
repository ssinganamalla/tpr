package com.analysis.dao;

import java.util.Collection;
import java.util.List;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import java.util.Date;
import com.analysis.PMF;
import com.analysis.domain.NonMutableTickerInfo;
import com.analysis.domain.UserComparisonTickers;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

public class TickerInfoDAOImpl implements TickerInfoDAO {	
	
	public void addTickerInfoIfNotExists(NonMutableTickerInfo info) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		
		try {
			NonMutableTickerInfo e = pm.getObjectById(NonMutableTickerInfo.class, info.getTicker());
		} catch(JDOObjectNotFoundException e){
			pm.makePersistent(info);			
		} finally {
			pm.close();
		}
	}
	
	
	@Override
	public NonMutableTickerInfo getTickerInfo(String tickerId) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Key k = KeyFactory.createKey(NonMutableTickerInfo.class.getSimpleName(), tickerId);
			return pm.getObjectById(NonMutableTickerInfo.class, k);
		} finally {
			pm.close();
		}		
	}
	
	@Override
	public int countTickerInfos() {
		// TODO Auto-generated method stub
		PersistenceManager pm = PMF.get().getPersistenceManager();
		
		Query query = pm.newQuery("javax.jdo.query.GQL", "SELECT count(this) FROM NonMutableTickerInfo");
		List results = (List) query.execute();
		Integer tableSize = (Integer) results.iterator().next();
		
		return tableSize;
	}
	
	@Override
	public Collection<NonMutableTickerInfo> getTickerInfos() {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Query query = pm.newQuery(NonMutableTickerInfo.class);
			Collection<NonMutableTickerInfo> results = (Collection<NonMutableTickerInfo>) query.execute();
			Collection<NonMutableTickerInfo> list = pm.detachCopyAll(results);
			return list;
		} finally {
			pm.close();
		}
	}
	
	@Override
	public void updateLastTickerPrice(String ticker, Double price, Date date) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Key k = KeyFactory.createKey(NonMutableTickerInfo.class.getSimpleName(), ticker);
			NonMutableTickerInfo ntickerInfo = pm.getObjectById(NonMutableTickerInfo.class, k);
			
			if(ntickerInfo != null) {
				ntickerInfo.setLastStockPrice(price);
				ntickerInfo.setLastStockPriceDate(date);
			}
		} finally {
			pm.close();
		}
	}
	
	@Override
	public List<NonMutableTickerInfo> getMatchedTickers(String arg) {
		//first bring the tickers whose arg matches the ticker id. or if the ticker id starts with the id.
		//then bring the ticker whose description contains the srg
			
		return null;
	}

}
