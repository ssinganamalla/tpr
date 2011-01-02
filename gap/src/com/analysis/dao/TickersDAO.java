package com.analysis.dao;

import java.util.List;

import com.analysis.domain.RelatedTickers;
import com.analysis.domain.TickerInfo;
import com.google.appengine.api.datastore.Key;

public interface TickersDAO {
	
	/**
	 * 
	 * Returns the related tickers for a given ticker
	 * @param ticker
	 * @return
	 */
	public String getRelatedTickers(String ticker);
	
	/**
	 * 
	 * Get the related tickers for a given ticker stored for a user
	 * @param ticker
	 * @param userEmail
	 * @return
	 */
	public RelatedTickers getRelatedTickers(Key key);
	
	public void updateRelatedTickers(RelatedTickers rt);
	
	public void addRelatedTickers(RelatedTickers rt);
	

	TickerInfo getTickers(String ticker);

	void updateSectorId(String tickerId, int sectorId, String industry);
	
	List<TickerInfo> getAllTickers();
	
	
}
