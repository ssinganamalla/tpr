package com.analysis.action;


import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;

import javax.jdo.annotations.Persistent;

import org.apache.struts2.StrutsException;

import com.analysis.action.basic.BasicActionSupport;
import com.analysis.action.basic.BasicAjaxActionSupport;
import com.analysis.domain.NonMutableTickerInfo;
import com.analysis.domain.PortfolioTicker;
import com.analysis.domain.TickerInfo;
import com.analysis.enums.EnumStrutsMethodType;
import com.analysis.service.PortFolioService;
import com.analysis.service.TickerInfoService;
import com.analysis.service.TickersService;
import com.analysis.service.TickersServiceImpl;
import com.analysis.utils.JSONObjectUtils;
import com.analysis.utils.MiscUtils;
import com.tickerperformance.exceptions.StrutsExecuteException;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

public class PortFolioAction extends BasicAjaxActionSupport {

	private PortFolioService folioService;
	
	@Deprecated
	private TickersService tickersService;
	
	//FOR THIS TO WORK, USE SINGLETON=FALSE in spring injection
	private int methodType = 0;
	
	
	private TickerInfoService tickerInfoService;
	
	
	public TickerInfoService getTickerInfoService() {
		return tickerInfoService;
	}



	public void setTickerInfoService(TickerInfoService tickerInfoService) {
		this.tickerInfoService = tickerInfoService;
	}



	public PortFolioService getFolioService() {
		return folioService;
	}
	

	private String symbol;
	
	private double costBasis;

	private int quantity;
	
	private String brokerId;
	
	private String dateString;
	
	private String datepickerFormat;
	
	
	
	
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


	public String getDateString() {
		return dateString;
	}



	public void setDateString(String dateString) {
		this.dateString = dateString;
	}



	public String getDatepickerFormat() {
		return datepickerFormat;
	}



	public void setDatepickerFormat(String dateFormat) {
		this.datepickerFormat = dateFormat;
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
		SimpleDateFormat format = new SimpleDateFormat(MiscUtils.convertJsDatePickerFormatToJavaFormat(datepickerFormat));
		
		try {
			Date date = format.parse(dateString);
			po.setDate(date);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		po.setSymbol(symbol);
		po.setBrokerId(this.getBrokerId());
		po.setCostBasis(costBasis);
		po.setQuantity(quantity);
		po.setEmail(this.getEmail());
		folioService.create(po);
		
		
		try {
			NonMutableTickerInfo tinfo = tickerInfoService.getTickerInfo(symbol);
			po.setInfo(tinfo);
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
