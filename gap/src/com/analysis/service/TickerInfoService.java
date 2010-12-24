package com.analysis.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.analysis.domain.NonMutableTickerInfo;

public interface TickerInfoService {
	
	void addTickerInfoIfNotExists(NonMutableTickerInfo info);
	
	NonMutableTickerInfo getTickerInfo(String tickerId);
	
	void loadTickersIntoDb(List<String> tickers, HashMap<String, NonMutableTickerInfo> map);
	
	public Collection<NonMutableTickerInfo> getTickerInfos();
	
}
