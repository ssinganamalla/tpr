package com.analysis.domain;

import java.text.DateFormat;
import java.text.DecimalFormat;
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
	private Double costBasis;
	
	@Persistent
	private Integer quantity;
	
	@Persistent
	private String brokerId;
	
	@Persistent
	private Date date;
	
	@Persistent
	private Integer transactionType;
	
	@Persistent
	private Double commission;
	
	@NotPersistent
	private Double gainLoss;	
	
	@NotPersistent
	private Double marketValue;
	
	@NotPersistent
	private NonMutableTickerInfo info;
	
	public PortfolioTicker() {
		// TODO Auto-generated constructor stub
	}
	
	public PortfolioTicker(String email, String symbol, String brokerId) {
		this.email = email;
		this.symbol = symbol;
		this.brokerId = brokerId;
		transactionType = Enums.TransactionType.BUY.ordinal();
		commission = 0.0;
		date = new Date();
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

	public Double getCostBasis() {
		return costBasis;
	}

	public void setCostBasis(Double costBasis) {
		this.costBasis = costBasis;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantiy) {
		this.quantity = quantiy;
	}


	public Double getGainLoss() {
		return gainLoss;
	}

	public void setGainLoss(Double gainLoss) {
		this.gainLoss = gainLoss;
	}

	public Double getMarketValue() {
		return marketValue;
	}

	public void setMarketValue(Double marketValue) {
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
	
	public Integer getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(Integer type) {
		this.transactionType = type;
	}

	public Double getCommission() {
		return commission;
	}

	public void setCommission(Double commission) {
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
		 this.setQuantity(dest.quantity);
		 this.setInfo(dest.info);
		 this.setDate(dest.date);
		 this.setCommission(dest.commission);
		 this.setEmail(dest.email);
		 this.setGainLoss(dest.gainLoss);
		 this.setSymbol(dest.symbol);
		 this.setTransactionType(dest.transactionType);
	}
	
	public JSONObject toJSONObject() throws JSONException {
		JSONObject jo = new JSONObject();
		DecimalFormat Currency = new DecimalFormat("#0.00");
		PortfolioTicker ticker = this;
		jo.put(BROKER_ID, ticker.getBrokerId());
		jo.put(COST_BASIS, Currency.format(ticker.getCostBasis()));
		if(ticker.getCostBasis()!= null && ticker.getQuantity() != null) {
			double tcb=ticker.getCostBasis()*ticker.getQuantity();
	        
			jo.put(TOTAL_COST_BASIS, Currency.format(tcb));
		} else {
			jo.put(TOTAL_COST_BASIS,0);
		}
		jo.put(GAIN_LOSS, ticker.getGainLoss());
		jo.put(MARKET_VALUE, ticker.getMarketValue());
		jo.put(QUANTITY, ticker.getQuantity());
		jo.put(COMMISSION, ticker.getCommission());
		jo.put(TRANSACTION_TYPE, ticker.getTransactionType());
		jo.put(TRANSACTION_ID, ticker.getTransactionId());
		jo.put(SYMBOL, ticker.getSymbol());
		if(ticker.getDate() != null) {
			jo.put(SHORT_DATE, DateFormat.getInstance().format(ticker.getDate()));
		}
		if(info != null) {
			jo.put(TICKER_INFO, info.toJSONObject());
		}
		return jo;
	}
	
	
}
