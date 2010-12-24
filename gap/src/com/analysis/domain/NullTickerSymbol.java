package com.analysis.domain;

import com.analysis.enums.Enums;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;


public class NullTickerSymbol extends TickerSymbol {
	public boolean isNull() {
		return true;
	}
	
	@Override
	public JSONObject toJSONObject() throws JSONException {
		return super.toJSONObject();
	}
	
	public static NullTickerSymbol nullObject() {
		NullTickerSymbol nullSymbol = new NullTickerSymbol();
		nullSymbol.setCompanyName("empty");
		nullSymbol.setExchange("nyse");
		//nullSymbol.setIndustry();
		nullSymbol.setSectorId(Enums.Sector.BASIC_MATERIALS.ordinal());
		nullSymbol.setSymbol("empty");
		return new NullTickerSymbol();
	}
}
