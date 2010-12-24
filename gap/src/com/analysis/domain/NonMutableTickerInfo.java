package com.analysis.domain;

import java.util.List;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import org.apache.commons.lang.StringUtils;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

@PersistenceCapable
public class NonMutableTickerInfo {
	
	@PrimaryKey
	@Persistent
	private Key key;
	
	@Persistent
	private String ticker;
	
	@Persistent
	private String name;
	
	@Persistent
	private String sector;
	
	@Persistent
	private String industry;
	
	@Persistent
	private String relatedTickers;
	
	private String exchange;
	
	public NonMutableTickerInfo(String ticker, String name, String sector,
			String industry, String relatedTickers) {
		super();
		this.ticker = ticker;
		this.name = name;
		this.sector = sector;
		this.industry = industry;
		this.relatedTickers = relatedTickers;
		this.key = KeyFactory.createKey(NonMutableTickerInfo.class.getSimpleName(), ticker);
	}
	
	public NonMutableTickerInfo(String ticker, String name, String sector,
			String industry, String relatedTickers, String exchange) {
		super();
		this.ticker = ticker;
		this.name = name;
		this.sector = sector;
		this.industry = industry;
		this.relatedTickers = relatedTickers;
		this.exchange = exchange;
		this.key = KeyFactory.createKey(NonMutableTickerInfo.class.getSimpleName(), ticker);
	}

	
	public String getExchange() {
		return exchange;
	}

	public void setExchange(String exchange) {
		this.exchange = exchange;
	}

	public String getTicker() {
		return ticker;
	}

	public String getName() {
		return name;
	}

	public String getSector() {
		return sector;
	}

	public String getIndustry() {
		return industry;
	}

	public String getRelatedTickers() {
		return relatedTickers;
	}
	
	public static NonMutableTickerInfo newNonMutableTickerInfo(String ticker, List<String>list, String exchange) {
		return new NonMutableTickerInfo(ticker, list.get(0), list.get(1), list.get(2), list.get(3), exchange);
	}
	
	
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof NonMutableTickerInfo) {
			NonMutableTickerInfo compareTo = (NonMutableTickerInfo)obj;
			
			return name.equals(compareTo.name) && 
				   sector.equals(compareTo.sector) &&
				   industry.equals(compareTo.industry) &&
				   relatedTickers.equals(compareTo.relatedTickers) &&
				   exchange.equals(compareTo.exchange) &&
				   ticker.equals(compareTo.ticker);
			
		}
		return false;
	}
	
	@Override
	public String toString() {
		return  getExchange() + "," + getTicker() + "," + getName() + "," + getSector() + "," + getIndustry() + "," + getRelatedTickers(); 
	}
	
	@Override
	public int hashCode() {
		return this.ticker.hashCode();
	}
}
