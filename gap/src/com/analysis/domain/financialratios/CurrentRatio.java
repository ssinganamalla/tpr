package com.analysis.domain.financialratios;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.Inheritance;
import javax.jdo.annotations.InheritanceStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.analysis.enums.Enums;
import com.google.appengine.api.datastore.Key;

@PersistenceCapable(identityType=IdentityType.APPLICATION, detachable="true")
public class CurrentRatio extends Ratio {
	
	public CurrentRatio() {
		super();
	}
	
	public CurrentRatio(double val, double min, double max) {
		super(val, min, max);
	}

	public String getBasicLabel() {
		return "Current Ratio";
	}
	
	@Override
	public double getStep() {
		// TODO Auto-generated method stub
		return 0.5;
	}

	@Override
	public Enums.FinancialRatio getEnum() {
		return Enums.FinancialRatio.CURRENT_RATIO;
	}
	
	public String getShortId() {
		return String.valueOf(Enums.FinancialRatio.CURRENT_RATIO.ordinal());
	}
}
