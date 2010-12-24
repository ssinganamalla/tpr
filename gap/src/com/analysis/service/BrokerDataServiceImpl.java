package com.analysis.service;

import com.analysis.dao.BrokerDataDAO;

public class BrokerDataServiceImpl implements BrokerDataService {
	private BrokerDataDAO brokerDataDAO;

	public BrokerDataDAO getBrokerDataDAO() {
		return brokerDataDAO;
	}

	public void setBrokerDataDAO(BrokerDataDAO brokerDataDAO) {
		this.brokerDataDAO = brokerDataDAO;
	}
	
}
