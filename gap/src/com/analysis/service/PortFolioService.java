package com.analysis.service;

import java.util.Collection;
import java.util.List;

import com.analysis.domain.PortfolioTicker;
import com.analysis.vo.UserTicker;

public interface PortFolioService {
	
	@Deprecated
	void updateSectorTickers(String email, int sectorId, List<UserTicker> info);
	
	@Deprecated
	void updateUserTickers(String email, List<UserTicker> info);
	
	@Deprecated
	void addUserTickers(List<UserTicker> info);
	
	@Deprecated
	Collection<UserTicker> getUserTickerInfos(String email);
	
	PortfolioTicker create(PortfolioTicker pt);
	
	Collection<PortfolioTicker> getPortFolioTickers(String email);
	
	void update(Collection<PortfolioTicker> ptc);
	
	void delete(Long transactionId);
	
}
