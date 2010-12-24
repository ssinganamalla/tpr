package com.analysis.domain.financialratios;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;

import com.analysis.enums.Enums;
import com.analysis.enums.Enums.FinancialRatio;

@PersistenceCapable(identityType=IdentityType.APPLICATION, detachable="true")
public class AvgCollectionPeriod extends Ratio {

	public AvgCollectionPeriod(double val, double min, double max) {
		super(val, min, max);
	}
	
	@Override
	public String getBasicLabel() {
		// TODO Auto-generated method stub
		return "Avg Collection Period";
	}

	@Override
	public FinancialRatio getEnum() {
		// TODO Auto-generated method stub
		return Enums.FinancialRatio.AVG_COLLECTION_PERIOD;
	}
	
	@Override
	public double getStep() {
		// TODO Auto-generated method stub
		return 1.0;
	}

	@Override
	public String getShortId() {
		// TODO Auto-generated method stub
		return "rtd";
	}
	
	@Override
	public boolean isReverse() {
		return true;
	}

}
