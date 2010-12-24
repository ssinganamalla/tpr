package com.analysis.domain.financialratios;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;

import com.analysis.enums.Enums;
import com.analysis.enums.Enums.FinancialRatio;

@PersistenceCapable(identityType=IdentityType.APPLICATION, detachable="true")
public class DebtToEquity extends Ratio {

	
	public DebtToEquity(double val, double min, double max) {
		super(val, min, max);
		// TODO Auto-generated constructor stub
	}

	@Override
	public String getBasicLabel() {
		// TODO Auto-generated method stub
		return "Debt to Equity";
	}

	@Override
	public boolean isReverse() {
		// TODO Auto-generated method stub
		return true;
	}
	
	@Override
	public double getStep() {
		// TODO Auto-generated method stub
		return 0.2;
	}
	
	@Override
	public FinancialRatio getEnum() {
		// TODO Auto-generated method stub
		return Enums.FinancialRatio.DEBT_TO_EQUITY;
	}

	@Override
	public String getShortId() {
		// TODO Auto-generated method stub
		return "der";
	}

}
