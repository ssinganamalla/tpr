package com.analysis.domain.financialratios;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.Inheritance;
import javax.jdo.annotations.InheritanceStrategy;
import javax.jdo.annotations.PersistenceCapable;

import com.analysis.enums.Enums;
import com.analysis.enums.Enums.FinancialRatio;

@PersistenceCapable(identityType=IdentityType.APPLICATION, detachable="true")
public class QuickRatio extends Ratio {

	
	public QuickRatio() {
		super();
	}

	public QuickRatio(double val, double min, double max) {
		super(val, min, max);
	}

	@Override
	public String getBasicLabel() {
		return "Quick Ratio";
	}
	
	@Override
	public double getStep() {
		// TODO Auto-generated method stub
		return 0.2;
	}
	
	@Override
	public FinancialRatio getEnum() {
		// TODO Auto-generated method stub
		return Enums.FinancialRatio.QUICK_RATIO;
	}
	
	@Override
	public String getShortId() {
		// TODO Auto-generated method stub
		return "qtr";
	}

}
