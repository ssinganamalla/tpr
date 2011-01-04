package com.analysis.domain;

import com.analysis.enums.Enums;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;


public class NullTickerInfo extends NonMutableTickerInfo {
	
	
	public NullTickerInfo(String ticker, String name, String sector,
			String industry, String relatedTickers, String exchange) {
		super(ticker, name, sector, industry, relatedTickers, exchange);
		// TODO Auto-generated constructor stub
	}

	public NullTickerInfo(String ticker, String name, String sector,
			String industry, String relatedTickers) {
		super(ticker, name, sector, industry, relatedTickers);
		// TODO Auto-generated constructor stub
	}

	public boolean isNull() {
		return true;
	}
	
	@Override
	public JSONObject toJSONObject() throws JSONException {
		return super.toJSONObject();
	}
	
	public static NullTickerInfo nullObject(String ticker) {
		return new NullTickerInfo(ticker, ticker, "Undefined", "Undefined", ticker, "Undefined");
	}
}
