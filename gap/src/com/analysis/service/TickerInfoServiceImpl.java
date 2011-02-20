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
import java.util.Date;

import com.analysis.dao.TickerInfoDAO;
import com.analysis.domain.NonMutableTickerInfo;
import com.analysis.domain.NullTickerInfo;

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
		NonMutableTickerInfo info = null;
		try {
			info = tickerInfoDAO.getTickerInfo(tickerId);
		} catch(javax.jdo.JDOObjectNotFoundException e) {
			info = NullTickerInfo.nullObject(tickerId);
		}
		return info;
	}
	
	@Override
	public void loadTickersIntoDb(List<String> tickers, HashMap<String, NonMutableTickerInfo> map) {		
		throw new RuntimeException("Implement this method");
	}
	
	@Override
	public Collection<NonMutableTickerInfo> getTickerInfos() {
		return tickerInfoDAO.getTickerInfos();
	}

	@Override
	public void updateLastTickerPrice(String ticker, Double price, Date date) {
		tickerInfoDAO.updateLastTickerPrice(ticker, price, date);
	}
	
	@Override
	public List<NonMutableTickerInfo> getMatchedTickers(String arg) {
		return null;
	}

}
