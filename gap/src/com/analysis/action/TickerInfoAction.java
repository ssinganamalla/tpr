package com.analysis.action;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.Collection;
import java.util.Iterator;
import java.util.StringTokenizer;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.analysis.Sector;
import com.analysis.action.basic.BasicActionSupport;
import com.analysis.domain.NonMutableTickerInfo;
import com.analysis.service.TickerInfoService;
import com.analysis.vo.UserTicker;
import com.utils.json.JSONArray;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;
import static com.analysis.enums.EnumJsonIds.*;

public class TickerInfoAction extends BasicActionSupport {
	private static final Logger log = Logger.getLogger(TickerInfoAction.class.getName());
	
	private TickerInfoService tickerInfoService;
	private String message;
	
	private String ticker;
	public String getTicker() {
		return ticker;
	}


	public void setTicker(String ticker) {
		this.ticker = ticker;
	}
	private InputStream inputStream;
    public InputStream getInputStream() {
        return inputStream;
    }
	
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public TickerInfoService getTickerInfoService() {
		return tickerInfoService;
	}

	public void setTickerInfoService(TickerInfoService tickerInfoService) {
		this.tickerInfoService = tickerInfoService;
	}
	
	public void addTickerInfo() {
		// TODO Auto-generated method stub

	}
	
	@Override
    public String input() throws Exception {
    	// TODO Auto-generated method stub
    	return super.input();
    }
    
	private JSONObject createTickerInfoJson(NonMutableTickerInfo info) throws JSONException {
		JSONObject tickerInfo = new JSONObject();
		tickerInfo.put(NAME, info.getName());
		tickerInfo.put(INDUSTRY_ID, info.getIndustry());
		tickerInfo.put(SECTOR_ID, info.getSector());
		tickerInfo.put(RELATED_TICKERS, info.getRelatedTickers());
		tickerInfo.put(EXCHANGE, info.getExchange());
		return tickerInfo;
	}
	
	public String getTickerInfo() {
		try {
			NonMutableTickerInfo tickerInfo = tickerInfoService.getTickerInfo(ticker);
			JSONObject jo = createTickerInfoJson(tickerInfo);
			inputStream = new StringBufferInputStream(jo.toString());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			inputStream = new StringBufferInputStream("NODATA");
			e.printStackTrace();
			log.logp(Level.SEVERE, this.getClass().getName(), "tickerInfoService.getTickerInfos", "Could not get data");
			return ERROR;
		}
		
        return SUCCESS;
	}
	
	private String convert(Collection<NonMutableTickerInfo> tickerInfos) throws JSONException {
		// TODO Auto-generated method stub
		JSONArray jarrayOfTickers = new JSONArray();
		for(NonMutableTickerInfo info : tickerInfos) {			
			JSONObject ojo = new JSONObject();
			ojo.put("t", createTickerInfoJson(info));
			jarrayOfTickers.put(ojo);
		}
		return jarrayOfTickers.toString();
	}
	@Override
    public String execute() throws Exception {
		
		Collection<NonMutableTickerInfo> tickerInfos = tickerInfoService.getTickerInfos();
		
		try {
			inputStream = new StringBufferInputStream(convert(tickerInfos));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			inputStream = new StringBufferInputStream("NODATA");
			e.printStackTrace();
			log.logp(Level.SEVERE, this.getClass().getName(), "tickerInfoService.getTickerInfos", "Could not get data");
			return ERROR;
		}
		
        return SUCCESS;
    }
}
