package com.analysis.service;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.analysis.dao.TickerInfoDAO;
import com.analysis.domain.NonMutableTickerInfo;

public class TickerInfoServiceImpl implements TickerInfoService {
	TickerInfoDAO tickerInfoDAO = null;			
	
	public TickerInfoDAO getTickerInfoDAO() {
		return tickerInfoDAO;
	}

	public void setTickerInfoDAO(TickerInfoDAO infoService) {
		this.tickerInfoDAO = infoService;
	}

	@Override
	public void addTickerInfoIfNotExists(NonMutableTickerInfo info) {
		tickerInfoDAO.addTickerInfoIfNotExists(info);		
	}

	@Override
	public NonMutableTickerInfo getTickerInfo(String tickerId) {
		// TODO Auto-generated method stub
		return tickerInfoDAO.getTickerInfo(tickerId);
	}
	
	@Override
	public void loadTickersIntoDb(List<String> tickers, HashMap<String, NonMutableTickerInfo> map) {		
		throw new RuntimeException("Implement this method");
	}
	
	public Collection<NonMutableTickerInfo> getTickerInfos() {
		return tickerInfoDAO.getTickerInfos();
	}

}
