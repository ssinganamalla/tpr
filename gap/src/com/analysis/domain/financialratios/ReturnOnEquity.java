package com.analysis.domain.financialratios;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;

import com.analysis.enums.Enums;
import com.analysis.enums.Enums.FinancialRatio;

@PersistenceCapable(identityType=IdentityType.APPLICATION, detachable="true")
public class ReturnOnEquity extends Ratio {

	public ReturnOnEquity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ReturnOnEquity(double val, double min, double max) {
		super(val, min, max);
		// TODO Auto-generated constructor stub
	}

	@Override
	public String getBasicLabel() {
		// TODO Auto-generated method stub
		return "Return on Equity";
	}

	@Override
	public double getStep() {
		// TODO Auto-generated method stub
		return 0.05;
	}
	
	@Override
	public FinancialRatio getEnum() {
		// TODO Auto-generated method stub
		return Enums.FinancialRatio.RETURN_ON_EQUITY;
	}

	@Override
	public String getShortId() {
		// TODO Auto-generated method stub
		return "roe";
	}

}
