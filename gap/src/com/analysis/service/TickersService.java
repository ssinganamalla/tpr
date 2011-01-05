package com.analysis.service;

import com.analysis.domain.RelatedTickers;
import com.analysis.domain.TickerInfo;

/**
 * 
 * @author ssinganamalla
 * @Deprecated, use {@link TickerInfoService}
 *
 */
public interface TickersService {
	
	/**
	 * The email could be null.
	 * The ticker cannot be null.
	 * @param email
	 * @param ticker
	 * @return
	 */
	public String getRelatedTickers(String ticker);
	
	/**
	 * The user should not set the Key of the <code>tickers</code>
	 * @param tickers
	 */
	@Deprecated
	public void addOrUpdateRelatedTickers(RelatedTickers tickers);
	
	public TickerInfo getTicker(String ticker);
	
	
}
