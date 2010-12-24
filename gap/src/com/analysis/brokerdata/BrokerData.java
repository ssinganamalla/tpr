package com.analysis.brokerdata;

import java.util.List;

import com.analysis.domain.PortfolioTicker;

public abstract class BrokerData {
private String brokerData;		
	
	public String getBrokerData() {
		return brokerData;
	}

	public void setBrokerData(String brokerData) {
		this.brokerData = brokerData;
	}
	
	public abstract List<PortfolioTicker> createTickersList();

}
