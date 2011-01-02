package com.analysis.action.urlfetch;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.analysis.domain.NonMutableTickerInfo;
import com.analysis.service.TickerInfoService;
import com.analysis.service.TickersService;
import com.opensymphony.xwork2.ActionSupport;

public class UrlFetchCompanyInfoAction extends ActionSupport {
	
	private static final long serialVersionUID = -2404070183150975933L;
	private InputStream inputStream;
	private String ticker;
	private static final int COMPANY_INFO = 0;
	private static final int QUOTE_INFO = 1;
	private static final int TICKER_MATCHER_INFO = 3;
	private static final int TICKER_TARGET_INFO = 4;
	
	private TickerInfoService tickerInfoService;
	
	public TickerInfoService getTickerInfoService() {
		return tickerInfoService;
	}

	public void setTickerInfoService(TickerInfoService tickerInfoService) {
		this.tickerInfoService = tickerInfoService;
	}
	
	/**
	 * Loading TickerInfo ticker, relatedTickers, name, sector, industry
	 */
	private static final int TICKER_INFO = 5;
	
	public String getCompanyInfo() {
		return populateStream(COMPANY_INFO);
	}

	public String getQuoteInfo() {
		return populateStream(QUOTE_INFO);
	}
	
	public String getTickerMatchInfo() {
		return populateStream(TICKER_MATCHER_INFO);
	}
	public String getPriceTargetSummary() {
		return populateStream(TICKER_TARGET_INFO);
	}
	
	public void setInputStream(BufferedInputStream inputStream) {
		this.inputStream = inputStream;
	}
	public InputStream getInputStream() {
		return inputStream;
	}

	public void setTicker(String ticker) {
		this.ticker = ticker;
	}

	public String getTicker() {
		return ticker;
	}
	
	public void addTickerInfos() {
		loadNYSETickers();
	}
	
	private String populateStream(int key) {
		String status = SUCCESS;
		if(StringUtils.isEmpty(this.getTicker())) {
			return ERROR;
		}
		try {
			
			AbstractURLFetchStream stream = createStream(key);
			stream.setTicker(getTicker());
			inputStream = stream.populateStream();
			
		} catch (MalformedURLException e) {
			status = ERROR;
			e.printStackTrace();
		} catch (IOException e) {
			status = ERROR;
			e.printStackTrace();
		}
		return status;
	}
	
	
	public String loadNYSETickers() {		
		try {
			HashMap<String, Boolean> tickerExistsMap = new HashMap<String, Boolean>();
			Collection<NonMutableTickerInfo> tickerInfos = tickerInfoService.getTickerInfos();
			String mesg = "";
			for (Iterator iterator = tickerInfos.iterator(); iterator.hasNext();) {
				NonMutableTickerInfo nonMutableTickerInfo = (NonMutableTickerInfo) iterator.next();
				tickerExistsMap.put(nonMutableTickerInfo.getTicker(), Boolean.TRUE);
			}
			
			String exchange = "";
			String filename = "NYSE_20100827.txt";
			exchange = filename.split("_")[0];
			InputStream instream = this.getServletContext().getResourceAsStream("/WEB-INF/" + filename);
			
			BufferedReader bis = new BufferedReader(new InputStreamReader(instream));
		    String line = null;
		    // dis.available() returns 0 if the file does not have more lines.
		      while ((line = bis.readLine()) != null) {
		    	  		    	  
		    	String l_ticker = line.substring(0, line.indexOf(','));
		    	if(tickerExistsMap.containsKey(l_ticker)) {
		    		continue;
		    	}
		    	
		        System.out.println(l_ticker);		        
		        this.setTicker(l_ticker);
		        populateStream(TICKER_INFO);
		        
		        
		        GoogTickerInfoPopulator infoPopulator = GoogTickerInfoPopulator.getInstance();
				infoPopulator.populateTickerInfo(this.getTicker(), inputStream);
				HashMap<String,List<String>> map = infoPopulator.getTickerInfoMap();
				List<String> list = map.get(this.getTicker());
				System.out.print(this.getTicker()+",");
				for (int i = 0; i < list.size(); i++) {
					System.out.print(list.get(i));
					if(i<list.size()-1) {
						System.out.print(",");
					}			
				}
				System.out.println();		        		        		        
				tickerInfoService.addTickerInfoIfNotExists(NonMutableTickerInfo.newNonMutableTickerInfo(ticker, list, exchange));
		      }
	
		      return SUCCESS;
	    } catch (FileNotFoundException e) {	    	
	      e.printStackTrace();
	      return ERROR;
	    } catch (IOException e) {
	      e.printStackTrace();
	      return ERROR;
	    } catch (Exception e) {
	    	 e.printStackTrace();
	    	 return ERROR;
		}
		
	}
	
	private AbstractURLFetchStream createStream(int key) {
		switch (key) {
		case COMPANY_INFO:
			return new CompanyInfoStream(); 

		case QUOTE_INFO:
			return new QuoteInfoStream();
			
		case TICKER_MATCHER_INFO:
			return new TickerMatcherInfoStream();

		case TICKER_TARGET_INFO:
			return new StockTargetSummaryInfoStream();
		
		case TICKER_INFO:
			return new GoogTickerInfoStream();
			
			
		default:
			throw new RuntimeException("key not supported for URLFetechStream creation");
		}
	}

	
	private HttpServletRequest getServletRequest() {
		return ServletActionContext.getRequest();		
	}
	
	private ServletContext getServletContext() {
		return ServletActionContext.getServletContext();
	}

	
}
