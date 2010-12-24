package com.analysis.domain.financialratios;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;

import com.analysis.enums.Enums;
import com.analysis.enums.Enums.FinancialRatio;

@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable = "true")
public class NetProfitMargin extends Ratio {

	public NetProfitMargin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public NetProfitMargin(double val, double min, double max) {
		super(val, min, max);
		// TODO Auto-generated constructor stub
	}

	@Override
	public String getBasicLabel() {
		// TODO Auto-generated method stub
		return "Net Profit Margin";
	}

	@Override
	public double getStep() {
		// TODO Auto-generated method stub
		return 0.05;
	}

	@Override
	public FinancialRatio getEnum() {
		// TODO Auto-generated method stub
		return Enums.FinancialRatio.NET_PROFIT_MARGIN;
	}

	@Override
	public String getShortId() {
		// TODO Auto-generated method stub
		return "i_npm";
	}

}
