package com.analysis.service;

import java.util.logging.Logger;

import javax.jdo.JDOObjectNotFoundException;

import com.analysis.dao.RatioThresholdsDAO;
import com.analysis.domain.financialratios.AvgCollectionPeriod;
import com.analysis.domain.financialratios.CashToCurrLiabilities;
import com.analysis.domain.financialratios.CashToDebt;
import com.analysis.domain.financialratios.CurrentRatio;
import com.analysis.domain.financialratios.DebtToAssets;
import com.analysis.domain.financialratios.DebtToCash;
import com.analysis.domain.financialratios.DebtToCurrLiabilities;
import com.analysis.domain.financialratios.DebtToEquity;
import com.analysis.domain.financialratios.GrossMargin;
import com.analysis.domain.financialratios.InventoryTurns;
import com.analysis.domain.financialratios.NetProfitMargin;
import com.analysis.domain.financialratios.QuickRatio;
import com.analysis.domain.financialratios.RatioThresholdsPrefs;
import com.analysis.domain.financialratios.ReturnOnAssets;
import com.analysis.domain.financialratios.ReturnOnEquity;

public class RatioControlPrefsServiceImpl implements RatioControlPrefsService{
	private RatioThresholdsDAO ratioThresholdsDAO;
	private static final Logger log = Logger.getLogger(RatioControlPrefsServiceImpl.class.getName());

	/**
	 * Some non existent default gmail id. Hopefully. If the guest signs in, we use this default gmail
	 */
	//public static String defaultEmail = "default7427_61839_5538858103@gmailyyy.com";
	public static String defaultEmail = "srinivas.singanamalla@gmail.com";
	
	@Override
	public RatioThresholdsPrefs getRatioThresholds(String email) {
		RatioThresholdsPrefs vo = null;
		//email null, return the default
		if(email == null) {
			return getDefaultRatioThresholdsPrefsDO(defaultEmail);
		} else {
		
			try {
				//else try to get it from db
				vo = getRatioThresholdsDAO().getRatioThresholds(email);
				//still could not get it, return the default
			} catch(JDOObjectNotFoundException e) {
				e.printStackTrace();
			}
			if(vo==null) {
				vo = getDefaultRatioThresholdsPrefsDO(email);
			}
		}
		return vo;
	}
	
	@Override
	public RatioThresholdsPrefs getLiquidRatioThresholds(String email) {
		RatioThresholdsPrefs vo = getRatioThresholds(email);
		vo.getCurrentRatio().setVisible(true);
		vo.getQuickRatio().setVisible(true);
		vo.getCashToDebt().setVisible(true);
		vo.getCashToCurrLiabilities().setVisible(true);
		return vo;
	}
	
	@Override
	public RatioThresholdsPrefs getAssetMgmtRatioPrefs(String email) {
		RatioThresholdsPrefs vo = getRatioThresholds(email);
		vo.getInvTurns().setVisible(true);
		vo.getAvgCollectionPeriod().setVisible(true);
		return vo;
	}
	
	@Override
	public RatioThresholdsPrefs getLeverageRatioPrefs(String email) {
		RatioThresholdsPrefs vo = getRatioThresholds(email);
		vo.getDebtToEquity().setVisible(true);
		vo.getDebtToAssets().setVisible(true);
		vo.getDebtToCash().setVisible(true);
		return vo;
	}
	
	@Override
	public RatioThresholdsPrefs getProfitbailityRatioPrefs(String email) {
		RatioThresholdsPrefs vo = getRatioThresholds(email);
		vo.getReturnOnAssets().setVisible(true);
		vo.getReturnOnEquity().setVisible(true);
		vo.getGrossMargin().setVisible(true);
		vo.getNetProfitMargin().setVisible(true);
		return vo;
	}
	
	
	@Override
	public void addOrUpdateRatioThresholds(RatioThresholdsPrefs prefs) {
		// TODO Auto-generated method stub
		ratioThresholdsDAO.updateRatioThresholds(prefs);
	}
	


	public RatioThresholdsPrefs getDefaultRatioThresholdsPrefsDO(String email) {
		RatioThresholdsPrefs vo = new RatioThresholdsPrefs(email);
		vo.putRatio(new AvgCollectionPeriod(45, 0, 200));
		vo.putRatio(new CurrentRatio(1.5, 0, 10));
		vo.putRatio(new CashToDebt(0.5, 0, 3));
		vo.putRatio(new CashToCurrLiabilities(0.5, 0, 3));
		vo.putRatio(new CurrentRatio(1.5, 0, 10));
		vo.putRatio(new CurrentRatio(1.5, 0, 10));
		vo.putRatio(new GrossMargin(0.5, 0, 1.0));
		vo.putRatio(new DebtToAssets(0.5, 0, 5));
		vo.putRatio(new DebtToCash(0.5, 0, 5));
		vo.putRatio(new DebtToEquity(0.5, 0, 5));
		vo.putRatio(new DebtToCurrLiabilities(0.5, 0, 5));
		vo.putRatio(new InventoryTurns(5, 0, 15));
		vo.putRatio(new NetProfitMargin(0.3, 0, 1.0));
		vo.putRatio(new QuickRatio(1.0, 0, 10));
		vo.putRatio(new ReturnOnAssets(0.3, 0, 1.0));
		vo.putRatio(new ReturnOnEquity(0.3, 0, 1.0));
		return vo;
	}



	public void setRatioThresholdsDAO(RatioThresholdsDAO ratioThresholdsDAO) {
		this.ratioThresholdsDAO = ratioThresholdsDAO;
	}



	public RatioThresholdsDAO getRatioThresholdsDAO() {
		return ratioThresholdsDAO;
	}
}
