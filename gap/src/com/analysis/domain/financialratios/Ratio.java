package com.analysis.domain.financialratios;

import java.io.Serializable;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.Inheritance;
import javax.jdo.annotations.InheritanceStrategy;
import javax.jdo.annotations.NotPersistent;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.analysis.domain.ContainerKeyable;
import com.analysis.enums.Enums.FinancialRatio;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;


@PersistenceCapable
@Inheritance(strategy = InheritanceStrategy.SUBCLASS_TABLE)
public abstract class Ratio implements Serializable{
	
	@Persistent
	@PrimaryKey
	private Key key;
	
	@NotPersistent
	private ContainerKeyable parent;
	
	@NotPersistent
	private String email;
	
	@Persistent
	private double min;
	
	@Persistent
	private double max;
	
	@Persistent 
	private double val;
	
	@NotPersistent
	private boolean visible;
	
	/**
	 * By default returns true.
	 * 
	 * @return
	 */
	public boolean isVisible() {
		return visible;
	}

	public void setVisible(boolean visible) {
		this.visible = visible;
	}

	public Ratio() {
		super();
	}

	public Ratio(double val, double min, double max) {
		super();
		this.min = min;
		this.max = max;
		this.val = val;
		this.visible = false;
	}

	public abstract String getBasicLabel();
	
	public abstract String getShortId();
	
	public abstract double getStep();

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public double getMin() {
		return min;
	}

	public void setMin(double min) {
		this.min = min;
	}

	public double getMax() {
		return max;
	}

	public void setMax(double max) {
		this.max = max;
	}

	public double getVal() {
		return val;
	}
	
	public void setVal(double val) {
		this.val = val;
	}

	public void setKey(Key key) {
		//check if the key is already assigned, then don't do anything
		if(this.key == null) {
			this.key = key;
		}
	}

	public Key getKey() {
		return key;
	}


	public abstract FinancialRatio getEnum();
	
	/**
	 * This method returns false by default. 
	 * The subclass should return true if the real value of the ratio becomes worse if the ratio increases. 
	 * Example: DebtToEquity ratio. For debt to equity, the lower the value the better, so it would return false in its implementation 
	 * @return
	 */
	public boolean isReverse() {
		return false;
	}

	public void setParent(ContainerKeyable parent) {
		this.parent = parent;
		
		if(this.parent == null) {
			throw new RuntimeException("Key cannot be created since the parent is not assigned. Key is dependent on parent's key");
		}
		Key theKey = new KeyFactory.Builder(this.parent.getKey()).addChild(this.getClass().getSimpleName(), this.getBasicLabel()).getKey();
		this.setKey(theKey);
	}

	public Object getParent() {
		return parent;
	}
}
