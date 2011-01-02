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
	
	@Persistent
	private int transactionType;
	
	private double commission;
	
	
	@NotPersistent
	private double gainLoss;	
	
	@NotPersistent
	private double marketValue;
	
	@NotPersistent
	private NonMutableTickerInfo info;
	
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

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
	public int getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(int type) {
		this.transactionType = type;
	}

	public double getCommission() {
		return commission;
	}

	public void setCommission(double commission) {
		this.commission = commission;
	}

	public NonMutableTickerInfo getInfo() {
		return info;
	}

	public void setInfo(NonMutableTickerInfo info) {
		this.info = info;
	}

	public void copyRelevantFrom(PortfolioTicker dest) {
		 this.setBrokerId(dest.brokerId);
		 this.setCostBasis(dest.costBasis);
		 this.setDescription(dest.description);
		 this.setQuantity(dest.quantity);
		 this.setInfo(dest.info);
		 this.setDate(dest.date);
	}
	
	public JSONObject toJSONObject() throws JSONException {
		JSONObject jo = new JSONObject();
		PortfolioTicker ticker = this;
		jo.put(BROKER_ID, ticker.getBrokerId());
		jo.put(COST_BASIS, ticker.getCostBasis());
		jo.put(GAIN_LOSS, ticker.getGainLoss());
		jo.put(MARKET_VALUE, ticker.getMarketValue());
		jo.put(QUANTITY, ticker.getQuantity());
		jo.put(DESCRIPTION, ticker.getDescription());
		jo.put(COMMISSION, ticker.getCommission());
		jo.put(TRANSACTION_TYPE, ticker.getTransactionType());
		jo.put(SYMBOL, ticker.getSymbol());
		jo.put(SHORT_DATE, DateFormat.getInstance().format(ticker.getDate()));
		if(info != null) {
			jo.put(TICKER_INFO, info.toJSONObject());
		}
		return jo;
	}
	
	
}
