package com.analysis.action;

import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.analysis.action.basic.BasicActionSupport;
import com.analysis.brokerdata.BrokerData;
import com.analysis.brokerdata.BrokerDataFactory;
import com.analysis.brokerdata.TradeKingBrokerData;
import com.analysis.domain.PortfolioTicker;
import com.analysis.domain.financialratios.Ratio;
import com.analysis.domain.financialratios.RatioThresholdsPrefs;
import com.analysis.enums.Enums;
import com.analysis.service.BrokerDataService;
import com.utils.json.JSONArray;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

public class BrokerDataAction extends BasicActionSupport {
	private static final Logger log = Logger.getLogger(BrokerDataAction.class.getName());
	
	private BrokerDataService brokerDataService;
	
	private InputStream inputStream;
    
	public BrokerDataService getBrokerDataService() {
		return brokerDataService;
	}
	public void setBrokerDataService(BrokerDataService brokerDataService) {
		this.brokerDataService = brokerDataService;
	}
	
	public InputStream getInputStream() {
        return inputStream;
    }
	
	public void setInputStream(InputStream inputStream) {
		this.inputStream = inputStream;
	}
	
	@Override
    public String input() throws Exception {
    	// TODO Auto-generated method stub
    	return super.input();
    }
    
    public String execute() throws Exception {
        return getBrokerDataInJsonFormat();
    }
    
    public String updateBrokerData() throws Exception {
    	return getBrokerDataInJsonFormat();
    }
    
    public String getBrokerDataInJsonFormat() {
    	
    	try {
			inputStream = new StringBufferInputStream(createJson());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			inputStream = new StringBufferInputStream("NODATA");
			e.printStackTrace();
			log.logp(Level.SEVERE, this.getClass().getName(), "getThresholdPrefs", "Could not get data for the threshold ratio prefs");
			return ERROR;
		}
    	return SUCCESS;
    }

    private String createJson() throws JSONException {
		// TODO Auto-generated method stub
    	
    	BrokerData brokerData = BrokerDataFactory.getBrokerData(Enums.BrokerId.TRADE_KING);
    	
    	brokerData.setBrokerData(this.getBrokerStockData());
    	List<PortfolioTicker> tickers = brokerData.createTickersList();
    	
		
		JSONArray ja = new JSONArray();
		for(int i=0; i<tickers.size(); i++) {
			if(tickers.get(i) == null) {
				continue;
			}
			ja.put(tickers.get(i).toJSONObject());
		}
		return ja.toString();
	}
	
	
	//Form Variables
	private String brokerStockData;
	
	//Enums.BrokerId
	private int brokerId;
	
	public String getBrokerStockData() {
		return brokerStockData;
	}
	public void setBrokerStockData(String brokerStockData) {
		this.brokerStockData = brokerStockData;
	}
	public void setBrokerId(int brokerId) {
		this.brokerId = brokerId;
	}
	public int getBrokerId() {
		return brokerId;
	}
	
	
	
    
    
}
