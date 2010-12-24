package com.analysis.service;

import java.util.HashMap;

import com.analysis.domain.RelatedTickers;
import com.analysis.domain.TickerSymbol;

public class TickersServiceProxy implements TickersService {

	TickersService realService;	
	
	private HashMap<String, TickerSymbol> tickersMap = new HashMap<String, TickerSymbol>();
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
		TickerSymbol tickerInfo = tickersMap.get(ticker);	
		return tickerInfo != null ? tickerInfo.getRelatedTickers() : "";
	}

	@Override
	public TickerSymbol getTicker(String ticker) {
		if(tickersMap != null) {
			TickerSymbol tickerInfo = tickersMap.get(ticker);
			if(tickerInfo == null) {
				tickerInfo = realService.getTicker(ticker);
				tickersMap.put(ticker, tickerInfo);
			}
		}
		return tickersMap.get(ticker);
	}

}
