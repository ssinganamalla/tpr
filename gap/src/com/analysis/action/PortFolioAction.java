package com.analysis.action;


import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.logging.Level;

import javax.jdo.annotations.Persistent;

import org.apache.struts2.StrutsException;

import com.analysis.action.basic.BasicActionSupport;
import com.analysis.action.basic.BasicAjaxActionSupport;
import com.analysis.domain.PortfolioTicker;
import com.analysis.domain.TickerSymbol;
import com.analysis.enums.EnumStrutsMethodType;
import com.analysis.service.PortFolioService;
import com.analysis.service.TickersService;
import com.analysis.service.TickersServiceImpl;
import com.analysis.utils.JSONObjectUtils;
import com.tickerperformance.exceptions.StrutsExecuteException;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

public class PortFolioAction extends BasicAjaxActionSupport {

	private PortFolioService folioService;
	private TickersService tickersService;
	
	//FOR THIS TO WORK, USE SINGLETON=FALSE in spring injection
	private int methodType = 0;
	
	public PortFolioService getFolioService() {
		return folioService;
	}
	

	private String symbol;
	
	private double costBasis;

	private int quantity;
	
	private String brokerId;
	
	
	
	public String getSymbol() {
		return symbol;
	}



	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}



	public double getCostBasis() {
		return costBasis;
	}



	public void setCostBasis(double costBasis) {
		this.costBasis = costBasis;
	}



	public int getQuantity() {
		return quantity;
	}



	public void setQuantity(int quantiy) {
		this.quantity = quantiy;
	}



	public String getBrokerId() {
		return brokerId;
	}



	public void setBrokerId(String brokerId) {
		this.brokerId = brokerId;
	}



	public void setFolioService(PortFolioService folioService) {
		this.folioService = folioService;
	}

	
	
	public TickersService getTickersService() {
		return tickersService;
	}

	public void setTickersService(TickersService tickersService) {
		this.tickersService = tickersService;
	}

	@Override
	public String populateInputString() throws StrutsException {
		String x = "{}";

		if(methodType == EnumStrutsMethodType.ADD) {
			return populateAddPortfolioTicker();
		}
		
		return x;
	}
	
	
	private String populateAddPortfolioTicker() {
		String x = "{}";

		//create a portfolio ticker and get the corresponding ticker
		PortfolioTicker po = new PortfolioTicker();
		po.setSymbol(symbol);
		po.setBrokerId(this.getBrokerId());
		po.setCostBasis(costBasis);
		po.setQuantity(quantity);
		po.setEmail(this.getEmail());
		folioService.create(po);
		
		
		try {
			TickerSymbol ticker = tickersService.getTicker(getSymbol());
			x = po.toJSONObject().toString();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			throw new StrutsException(e);
		}
		
		return x;
	}
	
	public String addPortfolioTicker() throws StrutsExecuteException{
		methodType = EnumStrutsMethodType.ADD;
		try {
			return execute();
		} catch (Exception e) {
			throw new StrutsExecuteException(e);
		}
	}
}
