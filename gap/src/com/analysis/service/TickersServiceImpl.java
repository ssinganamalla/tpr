package com.analysis.service;
import java.util.List;

import com.analysis.dao.TickersDAO;
import com.analysis.domain.RelatedTickers;
import com.analysis.domain.TickerInfo;
import com.analysis.service.TickersService;
import com.google.appengine.api.datastore.Key;

public class TickersServiceImpl implements TickersService {
	private TickersDAO tickersDAO;
	private static List<TickerInfo> cachedTickers;

	public TickersDAO getTickersDAO() {
		return tickersDAO;
	}

	public void setTickersDAO(TickersDAO tickersDAO) {
		this.tickersDAO = tickersDAO;
	}

	@Override
	public void addOrUpdateRelatedTickers(RelatedTickers tickers) {
		
		tickers.setKey();
		tickersDAO.updateRelatedTickers(tickers);
		
	}

	@Override
	public String getRelatedTickers(String ticker) {
		return tickersDAO.getRelatedTickers(ticker);
	}
	
	@Override
	public TickerInfo getTicker(String ticker) {
		return tickersDAO.getTickers(ticker);
	}
}
