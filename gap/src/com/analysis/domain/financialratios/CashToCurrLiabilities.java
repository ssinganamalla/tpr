package com.analysis.domain.financialratios;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;

@PersistenceCapable(identityType=IdentityType.APPLICATION, detachable="true")
public class CashToCurrLiabilities extends Ratio {

	public CashToCurrLiabilities(double val, double min, double max) {
		super(val, min, max);
		// TODO Auto-generated constructor stub
	}

	@Override
	public String getBasicLabel() {
		return "Cash to Curr Liabilities";
	}
	
	@Override
	public double getStep() {
		// TODO Auto-generated method stub
		return 0.2;
	}

	@Override
	public com.analysis.enums.Enums.FinancialRatio getEnum() {
		return com.analysis.enums.Enums.FinancialRatio.CASH_TO_CURR_LIABILITIES;
	}

	@Override
	public String getShortId() {
		return "ctcl";
	}

}
