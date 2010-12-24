package com.analysis.domain.financialratios;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;

import com.analysis.enums.Enums;


@PersistenceCapable(identityType=IdentityType.APPLICATION, detachable="true")
public class CashToDebt extends Ratio {

	
	public CashToDebt(double val, double min, double max) {
		super(val, min, max);
	}

	@Override
	public String getBasicLabel() {
		return "Cash to Debt";
	}
	
	@Override
	public double getStep() {
		return 0.2;
	}

	@Override
	public Enums.FinancialRatio getEnum() {
		return Enums.FinancialRatio.CASH_TO_DEBT;
	}

	@Override
	public String getShortId() {
		return "ctdr";
	}

}
