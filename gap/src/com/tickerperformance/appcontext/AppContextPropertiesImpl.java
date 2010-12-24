package com.tickerperformance.appcontext;

import java.util.Collection;
import java.util.HashMap;

import com.analysis.domain.NonMutableTickerInfo;
import com.analysis.service.TickerInfoService;

public class AppContextPropertiesImpl implements AppContextProperties {
	private static HashMap<String, NonMutableTickerInfo> tickersMap = new HashMap<String, NonMutableTickerInfo>();
	private TickerInfoService tickerInfoService;
	
	public TickerInfoService getTickerInfoService() {
		return tickerInfoService;
	}

	public void setTickerInfoService(TickerInfoService tickerInfoService) {
		this.tickerInfoService = tickerInfoService;
	}

	@Override
	public NonMutableTickerInfo getTickerInfo(String tickerId) {
		return tickersMap.get(tickerId);
	}
	
	public void loadTickers() {
		Collection<NonMutableTickerInfo>infos = tickerInfoService.getTickerInfos();
		for(NonMutableTickerInfo info : infos) {
			tickersMap.put(info.getTicker(), info);
		}
	}

}
