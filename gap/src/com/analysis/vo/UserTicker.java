package com.analysis.vo;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.NotPersistent;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@Deprecated
@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable="true")
public class UserTicker {
	
	public UserTicker(){ 
		super(); 
	}
	
	public UserTicker(String tickerSymbol, int sectorID,
			double costBasis, int numShares) {
		super();
		this.tickerSymbol = tickerSymbol;
		this.sectorID = sectorID;
		this.avgCost = costBasis;
		this.numShares = numShares;
	}
	public UserTicker(String tickerSymbol, int sectorID,
			double costBasis, int numShares, String email) {
		super();
		this.tickerSymbol = tickerSymbol;
		this.sectorID = sectorID;
		this.avgCost = costBasis;
		this.numShares = numShares;
		this.email = email;
	}
	
	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
	@PrimaryKey
	private Long userTickerId;
	
	@Persistent
	private String email;
	
	@NotPersistent
	private UserT userT;
	
	@Persistent
	private String tickerSymbol;
	
	@Persistent
	private int sectorID;
	
	@Persistent
	private double avgCost;
	
	@Persistent
	private int numShares;
	
	public String getTickerSymbol() {
		return tickerSymbol;
	}
	public void setTickerSymbol(String tickerSymbol) {
		this.tickerSymbol = tickerSymbol;
	}
	public int getSectorID() {
		return sectorID;
	}
	public void setSectorID(int sectorID) {
		this.sectorID = sectorID;
	}
	public double getAvgCost() {
		return avgCost;
	}
	public void setAvgCost(double costBasis) {
		this.avgCost = costBasis;
	}
	public int getNumShares() {
		return numShares;
	}
	public void setNumShares(int numShares) {
		this.numShares = numShares;
	}
	
	public void setUserT(UserT userT) {
		this.userT = userT;
	}

	public UserT getUserT() {
		return userT;
	}

	public void setUserTickerId(Long userTickerId) {
		this.userTickerId = userTickerId;
	}

	public Long getUserTickerId() {
		return userTickerId;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	@Override
	protected Object clone() throws CloneNotSupportedException {
		// TODO Auto-generated method stub
		return super.clone();
	}
	
	@Override
	public boolean equals(Object obj) {
		if(this == obj) return true;
		
		if(obj instanceof UserTicker) {
			UserTicker that = (UserTicker)obj;
			
			return this.tickerSymbol.equals(that.tickerSymbol) && 
					this.avgCost == that.avgCost && 
					this.numShares == that.numShares && 
					this.sectorID == that.sectorID;
		}
		return false;
	}
	
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		throw new RuntimeException("hashcode implementation necessary for UserTickerInfo");
		//return super.hashCode();
	}
	
}
