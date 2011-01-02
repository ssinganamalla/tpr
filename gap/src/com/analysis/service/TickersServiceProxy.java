package com.analysis.service;

import java.util.HashMap;

import com.analysis.domain.RelatedTickers;
import com.analysis.domain.TickerInfo;

public class TickersServiceProxy implements TickersService {

	TickersService realService;	
	
	private HashMap<String, TickerInfo> tickersMap = new HashMap<String, TickerInfo>();
	public TickersService getRealService() {
		return realService;
	}

	public void setRealService(TickersService realService) {
		this.realService = realService;
	}
	
	

	@Override
	public void addOrUpdateRelatedTickers(RelatedTickers tickers) {
		realService.addOrUpdateRelatedTickers(tickers);
		
	}

	@Override
	public String getRelatedTickers(String ticker) {
		TickerInfo tickerInfo = tickersMap.get(ticker);	
		return tickerInfo != null ? tickerInfo.getRelatedTickers() : "";
	}

	@Override
	public TickerInfo getTicker(String ticker) {
		if(tickersMap != null) {
			TickerInfo tickerInfo = tickersMap.get(ticker);
			if(tickerInfo == null) {
				tickerInfo = realService.getTicker(ticker);
				tickersMap.put(ticker, tickerInfo);
			}
		}
		return tickersMap.get(ticker);
	}

}
