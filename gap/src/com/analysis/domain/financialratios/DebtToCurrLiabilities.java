package com.analysis.domain.financialratios;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;

import com.analysis.enums.Enums;
import com.analysis.enums.Enums.FinancialRatio;

@PersistenceCapable(identityType=IdentityType.APPLICATION, detachable="true")
public class DebtToCurrLiabilities extends Ratio {
	
	public DebtToCurrLiabilities(double val, double min, double max) {
		super(val, min, max);
		// TODO Auto-generated constructor stub
	}

	@Override
	public String getBasicLabel() {
		return "Debt to Current Liabilities";
	}
	
	@Override
	public double getStep() {
		// TODO Auto-generated method stub
		return 0.2;
	}
	
	@Override
	public FinancialRatio getEnum() {
		// TODO Auto-generated method stub
		return Enums.FinancialRatio.DEBT_TO_CURRENT_LIABILITIES;
	}
	
	@Override
	public String getShortId() {
		// TODO Auto-generated method stub
		return "dtcl";
	}
}
