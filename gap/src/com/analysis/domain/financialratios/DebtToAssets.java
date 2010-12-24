package com.analysis.domain.financialratios;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;

import com.analysis.enums.Enums;
import com.analysis.enums.Enums.FinancialRatio;

@PersistenceCapable(identityType=IdentityType.APPLICATION, detachable="true")
public class DebtToAssets extends Ratio {

	
	public DebtToAssets(double val, double min, double max) {
		super(val, min, max);
	}

	@Override
	public String getBasicLabel() {
		// TODO Auto-generated method stub
		return "Debt to Assets";
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
	public FinancialRatio getEnum() {
		// TODO Auto-generated method stub
		return Enums.FinancialRatio.DEBT_TO_ASSETS;
	}

	@Override
	public String getShortId() {
		// TODO Auto-generated method stub
		return "dr";
	}

}
