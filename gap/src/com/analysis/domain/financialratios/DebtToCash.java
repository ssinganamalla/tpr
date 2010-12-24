package com.analysis.domain.financialratios;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;

import com.analysis.enums.Enums;


@PersistenceCapable(identityType=IdentityType.APPLICATION, detachable="true")
public class DebtToCash extends Ratio {
	
	
	public DebtToCash(double val, double min, double max) {
		super(val, min, max);
		// TODO Auto-generated constructor stub
	}

	public String getBasicLabel() {
		return "Debt to Cash";
	}
	
	@Override
	public boolean isReverse() {
		return true;
	}
	
	@Override
	public double getStep() {
		// TODO Auto-generated method stub
		return 0.2;
	}
	
	@Override
	public Enums.FinancialRatio getEnum() {
		return Enums.FinancialRatio.DEBT_TO_CASH;
	}
	
	@Override
	public String getShortId() {
		// TODO Auto-generated method stub
		return "dtc";
	}
}
