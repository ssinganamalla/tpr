package com.analysis.dao;

import java.util.Collection;

import com.analysis.domain.NonMutableTickerInfo;

public interface TickerInfoDAO {
	
	void addTickerInfoIfNotExists(NonMutableTickerInfo info);
	
	NonMutableTickerInfo getTickerInfo(String tickerId);
	
	int countTickerInfos();
	
	public Collection<NonMutableTickerInfo> getTickerInfos();
}
