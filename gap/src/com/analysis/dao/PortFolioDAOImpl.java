package com.analysis.dao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import org.apache.commons.lang.StringUtils;

import com.analysis.PMF;
import com.analysis.domain.PortfolioTicker;
import com.analysis.vo.UserTicker;

public class PortFolioDAOImpl implements PortFolioDAO {


	@Override
	public void addUserTickerInfos(Collection<UserTicker> list) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			pm.makePersistentAll(list);
		} finally {
			pm.close();
		}
	}

	@Override
	public void removeUserTickerInfo(UserTicker info) {
		// TODO Auto-generated method stub

	}

	@Override
	public void removeUserTickerInfos(String email) {
		PersistenceManager pm = PMF.get().getPersistenceManager();

		try {
			Collection<UserTicker> results = getUserTickerInfos(email);
			pm.deletePersistentAll(results);
		} finally {
			pm.close();
		}
	}

	@Override
	public void removeUserTickerInfos(String email, int sectorId) {
		PersistenceManager pm = PMF.get().getPersistenceManager();

		try {
			Collection<UserTicker> results = getUserTickerInfos(email, sectorId);
			pm.deletePersistentAll(results);
		} finally {
			pm.close();
		}
	}

	@Override
	public void updateUserTickerInfos(String email, Collection<UserTicker> list) {
		removeUserTickerInfos(email);
		addUserTickerInfos(list);
	}

	@Override
	public void updateSectorTickerInfos(String email, int sectorID, Collection<UserTicker> list) {
		removeUserTickerInfos(email, sectorID);
		addUserTickerInfos(list);
	}

	@Override
	public Collection<UserTicker> getUserTickerInfos(String email) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Query query = pm.newQuery(UserTicker.class);
			query.setFilter("email == emailParam");
			query.declareParameters("String emailParam");
			Collection<UserTicker> results = (Collection<UserTicker>) query.execute(email);
			Collection<UserTicker> list = pm.detachCopyAll(results);
			return list;
		} finally {
			pm.close();
		}
	}
	
	public Collection<UserTicker> getUserTickerInfos(String email, int sectorId) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Query query = pm.newQuery(UserTicker.class);
			query.setFilter("email == emailParam");
			query.setFilter("sectorID == sectorIdParam");
			query.declareParameters("String emailParam, int sectorIdParam");
			Collection<UserTicker> results = (Collection<UserTicker>) query.execute(email, sectorId);
			Collection<UserTicker> list = pm.detachCopyAll(results);
			return list;
		} finally {
			pm.close();
		}
	}

	@Override
	public void createPortFolioTicker(PortfolioTicker info) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			pm.makePersistent(info);
		} finally {
			pm.close();
		}
		
	}

	@Override
	public void delete(long theTransId) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Query query = pm.newQuery(PortfolioTicker.class);
			query.setFilter("transactionId == transactionIdParam");
		    query.declareParameters("long transactionIdParam");
			pm.deletePersistentAll(theTransId);
		} finally {
			pm.close();
		}
	}

	@Override
	public Collection<PortfolioTicker> readPortFolioTickers(String email,
			String tickerSymbol, String brokerId) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Query query = pm.newQuery(PortfolioTicker.class);
			StringBuilder builder = new StringBuilder();
			HashMap<String, String> map = new HashMap<String, String>();
			if(StringUtils.isNotEmpty(email)) {
				query.setFilter("email == emailParam");
				String emailParam = "emailParam";
				builder.append("String ").append(emailParam);
				map.put(emailParam, email);
			}
			if(StringUtils.isNotEmpty(tickerSymbol)) {
				query.setFilter("symbol == tickerSymbolParam");
				if(builder.length()>0) {
					builder.append(",");
				}
				String symbolParam = "symbolParam";
				builder.append("String ").append(symbolParam);
				map.put(symbolParam, tickerSymbol);
			}
			if(StringUtils.isNotEmpty(brokerId)) {
				query.setFilter("brokerId == brokerIdParam");
				if(builder.length()>0) {
					builder.append(",");
				}
				String brokerIdParam = "brokerIdParam";
				builder.append("String brokerIdParam");
				map.put(brokerIdParam, brokerId);
			}
			if(builder.length()>0) {
				query.declareParameters("String emailParam, int sectorIdParam");
			}
			
			Collection<PortfolioTicker> results = (Collection<PortfolioTicker>) query.executeWithMap(map);
			Collection<PortfolioTicker> list = pm.detachCopyAll(results);
			return list;
		} finally {
			pm.close();
		}
	}

	@Override
	public void update(PortfolioTicker theTicker) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			PortfolioTicker ticker = (PortfolioTicker) pm.getObjectById(theTicker.getTransactionId());
			ticker.copyRelevantFrom(theTicker);
			
		} finally {
			pm.close();
		}
	}

}
