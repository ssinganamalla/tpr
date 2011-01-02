package com.analysis.domain;

import static com.analysis.enums.EnumJsonIds.*;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.utils.json.JSONException;
import com.utils.json.JSONObject;

@PersistenceCapable(identityType=IdentityType.APPLICATION, objectIdClass=javax.jdo.identity.StringIdentity.class)
public class TickerInfo {
	
	@PrimaryKey
	@Persistent
	private String symbol;
	
	@Persistent
	private String companyName;
	
	@Persistent
	private String exchange;
	
	@Persistent
	private int sectorId;
	
	@Persistent
	private String industryId;
	
	@Persistent
	private String relatedTickers;

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getExchange() {
		return exchange;
	}

	public void setExchange(String exchange) {
		this.exchange = exchange;
	}

	public int getSectorId() {
		return sectorId;
	}

	public void setSectorId(int sectorId) {
		this.sectorId = sectorId;
	}

	public String getIndustry() {
		return industryId;
	}

	public void setIndustry(String industry) {
		this.industryId = industry;
	}	
	
	
	
	public String getIndustryId() {
		return industryId;
	}

	public void setIndustryId(String industryId) {
		this.industryId = industryId;
	}

	public String getRelatedTickers() {
		return relatedTickers;
	}

	public void setRelatedTickers(String relatedTickers) {
		this.relatedTickers = relatedTickers;
	}

	public JSONObject toJSONObject() throws JSONException {
		JSONObject jo = new JSONObject();
		TickerInfo ticker = this;
		jo.put(SECTOR_ID, ticker.getSectorId());
		jo.put(SYMBOL, ticker.getSymbol());
		jo.put(INDUSTRY_ID, ticker.getIndustryId());
		jo.put(EXCHANGE, ticker.getExchange());
		jo.put(COMPANY_NAME, ticker.getCompanyName());	
		
		return jo;
	}
	
	public boolean isNull() {
		return false;
	}
}
