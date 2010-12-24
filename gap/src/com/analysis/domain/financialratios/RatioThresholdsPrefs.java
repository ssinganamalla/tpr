package com.analysis.domain.financialratios;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.NotPersistent;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.analysis.domain.ContainerKeyable;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable="true")
public class RatioThresholdsPrefs implements ContainerKeyable, Serializable{ 

	private static final Logger log = Logger.getLogger(RatioThresholdsPrefs.class.getName());
	
	@Persistent
	private String email;  

	@Persistent
	@PrimaryKey
	private Key key;
	
	@Persistent (defaultFetchGroup="true", dependent="true") 
	private CurrentRatio currentRatio; 
	
	@Persistent (defaultFetchGroup="true", dependent="true")
	private QuickRatio quickRatio;        
	
	@Persistent (defaultFetchGroup="true", dependent="true")
	private InventoryTurns invTurns;
	
	@Persistent (defaultFetchGroup="true", dependent="true")
	private CashToDebt cashToDebt;
	
	@Persistent (defaultFetchGroup="true", dependent="true")
	private CashToCurrLiabilities cashToCurrLiabilities;
	
	@Persistent (defaultFetchGroup="true", dependent="true")
	private AvgCollectionPeriod avgCollectionPeriod;
	
	@Persistent (defaultFetchGroup="true", dependent="true")
	private ReturnOnAssets returnOnAssets;
	
	@Persistent (defaultFetchGroup="true", dependent="true")
	private ReturnOnEquity returnOnEquity;
	
	@Persistent (defaultFetchGroup="true", dependent="true")
	private GrossMargin grossMargin;
	
	@Persistent (defaultFetchGroup="true", dependent="true")
	private NetProfitMargin netProfitMargin;
	
	@Persistent (defaultFetchGroup="true", dependent="true")
	private DebtToEquity debtToEquity;
	
	@Persistent (defaultFetchGroup="true", dependent="true")
	private DebtToAssets debtToAssets;

	@Persistent (defaultFetchGroup="true", dependent="true")
	private DebtToCash debtToCash;
	
	@Persistent (defaultFetchGroup="true", dependent="true")
	private DebtToCurrLiabilities debtToCurrLiabilities;

	
	public CurrentRatio getCurrentRatio() {
		return currentRatio;
	}

	protected void setCurrentRatio(CurrentRatio currentRatio) {
		this.currentRatio = currentRatio;
	}

	public QuickRatio getQuickRatio() {
		return quickRatio;
	}

	protected void setQuickRatio(QuickRatio quickRatio) {
		this.quickRatio = quickRatio;
	}

	public InventoryTurns getInvTurns() {
		return invTurns;
	}

	protected void setInvTurns(InventoryTurns invTurns) {
		this.invTurns = invTurns;
	}

	protected void setCashToDebt(CashToDebt cashToDebt) {
		this.cashToDebt = cashToDebt;
	}

	public CashToDebt getCashToDebt() {
		return cashToDebt;
	}

	protected void setCashToCurrLiabilities(CashToCurrLiabilities cashToCurrLiabilities) {
		this.cashToCurrLiabilities = cashToCurrLiabilities;
	}

	public CashToCurrLiabilities getCashToCurrLiabilities() {
		return cashToCurrLiabilities;
	}

	public AvgCollectionPeriod getAvgCollectionPeriod() {
		return avgCollectionPeriod;
	}

	protected void setAvgCollectionPeriod(AvgCollectionPeriod avgCollectionPeriod) {
		this.avgCollectionPeriod = avgCollectionPeriod;
	}

	public ReturnOnAssets getReturnOnAssets() {
		return returnOnAssets;
	}

	protected void setReturnOnAssets(ReturnOnAssets returnOnAssets) {
		this.returnOnAssets = returnOnAssets;
	}

	public ReturnOnEquity getReturnOnEquity() {
		return returnOnEquity;
	}

	protected void setReturnOnEquity(ReturnOnEquity returnOnEquity) {
		this.returnOnEquity = returnOnEquity;
	}

	public GrossMargin getGrossMargin() {
		return grossMargin;
	}

	protected void setGrossMargin(GrossMargin grossMargin) {
		this.grossMargin = grossMargin;
	}

	public NetProfitMargin getNetProfitMargin() {
		return netProfitMargin;
	}

	protected void setNetProfitMargin(NetProfitMargin netProfitMargin) {
		this.netProfitMargin = netProfitMargin;
	}


	
	protected void setDebtToEquity(DebtToEquity debtToEquity) {
		this.debtToEquity = debtToEquity;
	}

	public DebtToEquity getDebtToEquity() {
		return debtToEquity;
	}

	protected void setDebtToAssets(DebtToAssets debtToAssets) {
		this.debtToAssets = debtToAssets;
	}

	public DebtToAssets getDebtToAssets() {
		return debtToAssets;
	}

	protected void setDebtToCash(DebtToCash debtToCash) {
		this.debtToCash = debtToCash;
	}

	public DebtToCash getDebtToCash() {
		return debtToCash;
	}

	protected void setDebtToCurrLiabilities(DebtToCurrLiabilities debtToCurrLiabilities) {
		this.debtToCurrLiabilities = debtToCurrLiabilities;
	}

	public DebtToCurrLiabilities getDebtToCurrLiabilities() {
		return debtToCurrLiabilities;
	}

	public String getEmail() {
		return email;
	}

	public RatioThresholdsPrefs(String email) {
		super();
		this.email = email;
		
		if(email == null) throw new RuntimeException("email being the primary key cannot be null");
		//email should be set before calling the generateKey
		Key key = RatioThresholdsPrefs.generateKey(email);
		this.setKey(key);
	}

	public static Key generateKey(String email) {
		Key key = KeyFactory.createKey(RatioThresholdsPrefs.class.getSimpleName(), email);
		return key;
	}
	
	protected void setEmail(String email) {
		this.email = email;
	}
	
	private void setKey(Key key) {
		this.key = key;
	}

	public Key getKey() {
		return key;
	}
	
	/**
	 * Use addRatio to add the ratio. If you add a ratio which already exists, it replaces the existing ratio
	 * @param ratio
	 */
	public void putRatio(Ratio ratio) {
		ratio.setParent(this);
		if(ratio instanceof AvgCollectionPeriod) {
			this.setAvgCollectionPeriod((AvgCollectionPeriod)ratio);
		} else if(ratio instanceof CashToDebt) {
			this.setCashToDebt((CashToDebt)ratio);
		} else if(ratio instanceof CashToCurrLiabilities) {
			this.setCashToCurrLiabilities((CashToCurrLiabilities)ratio);
		} else if(ratio instanceof CurrentRatio) {
			this.setCurrentRatio((CurrentRatio)ratio);
		} else if(ratio instanceof QuickRatio) {
			this.setQuickRatio((QuickRatio)ratio);
		} else if(ratio instanceof DebtToEquity) {
			this.setDebtToEquity((DebtToEquity)ratio);
		} else if(ratio instanceof DebtToCash) {
			this.setDebtToCash((DebtToCash)ratio);
		} else if(ratio instanceof DebtToAssets) {
			this.setDebtToAssets((DebtToAssets)ratio);
		} else if(ratio instanceof DebtToCurrLiabilities) {
			this.setDebtToCurrLiabilities((DebtToCurrLiabilities)ratio);
		} else if(ratio instanceof GrossMargin) {
			this.setGrossMargin((GrossMargin)ratio);
		} else if(ratio instanceof InventoryTurns) {
			this.setInvTurns((InventoryTurns)ratio);
		} else if(ratio instanceof NetProfitMargin) {
			this.setNetProfitMargin((NetProfitMargin)ratio);
		} else if(ratio instanceof ReturnOnAssets) {
			this.setReturnOnAssets((ReturnOnAssets)ratio);
		} else if(ratio instanceof ReturnOnEquity) {
			this.setReturnOnEquity((ReturnOnEquity)ratio);
		} else {
			Exception e = new RuntimeException("Ratio type is undefined. New Ratio type should be supported");
			log.log(Level.SEVERE, "Ratio type is undefined. New Ratio type should be supported", e);
		}
	}
	
	public List<Ratio> getListofRatios() {
		ArrayList<Ratio> listOfRatios = new ArrayList<Ratio>();
		listOfRatios.add(this.getAvgCollectionPeriod());
		listOfRatios.add(this.getCashToDebt());
		listOfRatios.add(this.getCashToCurrLiabilities());
		listOfRatios.add(this.getCurrentRatio());
		listOfRatios.add(this.getDebtToEquity());
		listOfRatios.add(this.getDebtToAssets());
		listOfRatios.add(this.getDebtToCash());
		listOfRatios.add(this.getDebtToCurrLiabilities());
		listOfRatios.add(this.getGrossMargin());
		listOfRatios.add(this.getInvTurns());
		listOfRatios.add(this.getNetProfitMargin());
		listOfRatios.add(this.getQuickRatio());
		listOfRatios.add(this.getReturnOnAssets());
		listOfRatios.add(this.getReturnOnEquity());
		return listOfRatios;
	}
}
