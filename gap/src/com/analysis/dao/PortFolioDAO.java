package com.analysis.dao;

import java.util.Collection;

import com.analysis.domain.PortfolioTicker;
import com.analysis.vo.UserTicker;

public interface PortFolioDAO {
	//deprecated method starts
	void addUserTickerInfos(Collection<UserTicker> list);
	
	Collection<UserTicker> getUserTickerInfos(String email);
	Collection<UserTicker> getUserTickerInfos(String email, int sectorId);
	void removeUserTickerInfo(UserTicker info);
	void removeUserTickerInfos(String email);
	void removeUserTickerInfos(String email, int sectorId);
	void updateUserTickerInfos(String email, Collection<UserTicker> list);
	void updateSectorTickerInfos(String email, int sectorID, Collection<UserTicker> list);
	//deprecated method ends
	
	
	void createPortFolioTicker(PortfolioTicker info);
	
	Collection<PortfolioTicker> readPortFolioTickers(String email, String tickerSymbol, String brokerId);
	
	void update(PortfolioTicker ticker);
	
	void delete(Long theTransId);
	
	
	
}
