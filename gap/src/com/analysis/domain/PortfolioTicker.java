package com.analysis.domain;

import java.text.DateFormat;
import java.util.Date;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.NotPersistent;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.analysis.enums.Enums;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

import static com.analysis.enums.EnumJsonIds.*;

@PersistenceCapable(identityType=IdentityType.APPLICATION, detachable="true")
public class PortfolioTicker {
	
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Long transactionId;

	@Persistent
	private String email;
	
	@Persistent
	private String symbol;
	
	@Persistent
	private double costBasis;
	
	@Persistent
	private int quantity;
	
	@Persistent
	private String brokerId;
	
	@Persistent
	private String description;
	
	@Persistent
	private Date date;
	
	@NotPersistent
	private double gainLoss;	
	
	@NotPersistent
	private double marketValue;
	
	@NotPersistent
	private String companyName;
	
	@NotPersistent
	private String exchange;
	
	@NotPersistent
	private String industryId;
	
	@NotPersistent
	private int sectorId;
	
	public PortfolioTicker() {
		// TODO Auto-generated constructor stub
	}
	
	public PortfolioTicker(String email, String symbol, String brokerId) {
		this.email = email;
		this.symbol = symbol;
		this.brokerId = brokerId;
	}
	
	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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


	public double getGainLoss() {
		return gainLoss;
	}

	public void setGainLoss(double gainLoss) {
		this.gainLoss = gainLoss;
	}

	public double getMarketValue() {
		return marketValue;
	}

	public void setMarketValue(double marketValue) {
		this.marketValue = marketValue;
	}

	public String getBrokerId() {
		return brokerId;
	}

	public void setBrokerId(String brokerId) {
		this.brokerId = brokerId;
	}

	/**
	 * returns a sectorId {@link Enums.Sector}
	 * @return
	 */
	public int getSectorId() {
		return sectorId;
	}

	/**
	 * @param sectorId integer corresponding to {@link Enums.Sector}
	 */
	public void setSectorId(int sectorId) {
		this.sectorId = sectorId;
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

	public String getIndustryId() {
		return industryId;
	}

	public void setIndustryId(String industryId) {
		this.industryId = industryId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public void copyRelevantFrom(PortfolioTicker dest) {
		 this.setBrokerId(dest.brokerId);
		 this.setCostBasis(dest.costBasis);
		 this.setDescription(dest.description);
		 this.setQuantity(dest.quantity);
		 this.setSectorId(dest.sectorId);
		 this.setDate(dest.date);
	}
	
	public JSONObject toJSONObject() throws JSONException {
		JSONObject jo = new JSONObject();
		PortfolioTicker ticker = this;
		jo.put(BROKER_ID, ticker.getBrokerId());
		jo.put(SECTOR_ID, ticker.getSectorId());
		jo.put(COST_BASIS, ticker.getCostBasis());
		jo.put(GAIN_LOSS, ticker.getGainLoss());
		jo.put(MARKET_VALUE, ticker.getMarketValue());
		jo.put(QUANTITY, ticker.getQuantity());
		jo.put(DESCRIPTION, ticker.getDescription());
		jo.put(SYMBOL, ticker.getSymbol());
		jo.put(SHORT_DATE, DateFormat.getInstance().format(ticker.getDate()));
		return jo;
	}
	
	
}
