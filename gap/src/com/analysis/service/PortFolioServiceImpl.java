package com.analysis.service;

import java.util.Collection;
import java.util.List;

import com.analysis.dao.PortFolioDAO;
import com.analysis.dao.PortFolioDAOImpl;
import com.analysis.dao.TickersDAO;
import com.analysis.domain.PortfolioTicker;
import com.analysis.vo.UserTicker;

public class PortFolioServiceImpl implements PortFolioService{

	PortFolioDAO portfolioDAO = null;
	private TickersDAO tickersDAO;
	
	@Override
	public void updateSectorTickers(String email, int sectorId, List<UserTicker> info) {
		PortFolioDAO dao = getPortfolioDAO();
		dao.updateSectorTickerInfos(email, sectorId, info);
	}
	
	@Override
	public void addUserTickers(List<UserTicker> info) {
		// TODO Auto-generated method stub
		
	}
	
	

	@Override
	public void updateUserTickers(String email, List<UserTicker> info) {
		PortFolioDAO dao = getPortfolioDAO();
		dao.updateUserTickerInfos(email, info);
	}

	
	public void setPortfolioDAO(PortFolioDAO portfolioDAO) {
		this.portfolioDAO = portfolioDAO;
	}

	protected PortFolioDAO getPortfolioDAO() {
		return portfolioDAO;
	}
	
	

	public TickersDAO getTickersDAO() {
		return tickersDAO;
	}

	public void setTickersDAO(TickersDAO tickersDAO) {
		this.tickersDAO = tickersDAO;
	}

	@Override
	public Collection<UserTicker> getUserTickerInfos(String email) {
		return getPortfolioDAO().getUserTickerInfos(email);
		
	}

	@Override
	public void create(PortfolioTicker pt) {
		portfolioDAO.createPortFolioTicker(pt);
	}

	@Override
	public void delete(long theTransId) {
		portfolioDAO.delete(theTransId);
	}

	@Override
	public Collection<PortfolioTicker> getPortFolioTickers(String email) {
		return portfolioDAO.readPortFolioTickers(email, null, null);
	}

	@Override
	public void update(Collection<PortfolioTicker> ptc) {
		for(PortfolioTicker ticker : ptc) {
			portfolioDAO.update(ticker);
		}
	}
	
}
