package com.tickerperformance.appcontext;

import com.analysis.domain.NonMutableTickerInfo;

public interface AppContextProperties {
	public NonMutableTickerInfo getTickerInfo(String tickerId);
}
