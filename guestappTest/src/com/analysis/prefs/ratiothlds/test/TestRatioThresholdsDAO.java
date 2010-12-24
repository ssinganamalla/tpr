package com.analysis.prefs.ratiothlds.test;

import static org.junit.Assert.assertEquals;

import com.analysis.common.LocalDatastoreTest;
import com.analysis.dao.RatioThresholdsDAO;
import com.analysis.dao.RatioThresholdsDAOImpl;
import com.analysis.domain.financialratios.AvgCollectionPeriod;
import com.analysis.domain.financialratios.CurrentRatio;
import com.analysis.domain.financialratios.GrossMargin;
import com.analysis.domain.financialratios.InventoryTurns;
import com.analysis.domain.financialratios.NetProfitMargin;
import com.analysis.domain.financialratios.QuickRatio;
import com.analysis.domain.financialratios.Ratio;
import com.analysis.domain.financialratios.RatioThresholdsPrefs;
import com.analysis.domain.financialratios.ReturnOnAssets;
import com.analysis.domain.financialratios.ReturnOnEquity;


public class TestRatioThresholdsDAO extends LocalDatastoreTest {
	private RatioThresholdsDAO dao = new RatioThresholdsDAOImpl();
	
	public void testAddRatioThresholds() {
		String email = "user1@gmail.com";
		double crVal = 1.2;
		double qrVal = 1.5;
		double invTurnsVal = 5;

		RatioThresholdsPrefs vo = new RatioThresholdsPrefs(email);
		vo.putRatio(new CurrentRatio(crVal, 0, 10));
		vo.putRatio(new QuickRatio(qrVal, 0, 10));
		vo.putRatio(new AvgCollectionPeriod(45, 0, 200));
		vo.putRatio(new GrossMargin(0.5, 0, 1.0));
		vo.putRatio(new InventoryTurns(invTurnsVal, 0, 15));
		vo.putRatio(new NetProfitMargin(0.3, 0, 1.0));
		vo.putRatio(new ReturnOnAssets(0.3, 0, 1.0));
		vo.putRatio(new ReturnOnEquity(0.3, 0, 1.0));
		
		
		dao.addRatioThresholds(vo);
        RatioThresholdsPrefs results = dao.getRatioThresholds(email);
        Ratio cr = results.getCurrentRatio();
        assertEquals(crVal, cr.getVal());
        
        Ratio quickRatio = results.getQuickRatio();
        assertEquals(qrVal, quickRatio.getVal());
        
        Ratio invTurns = results.getInvTurns();
        assertEquals(invTurnsVal, invTurns.getVal());
        
	}
	
	public void testUpdateRatioThresholds() {
		
	}
	
	public void testAddOrUpdateRatioThresholds() {
		String email = "user1@gmail.com";
		double crVal = 1.2;
		double crVal2 = 1.8;
		double qrVal = 1.5;
		double qrVal2 = 1.8;
		double invTurnsVal = 5;
		double invTurnsVal2 = 6;

		RatioThresholdsPrefs vo = new RatioThresholdsPrefs(email);
		
		vo.putRatio(new CurrentRatio(crVal, 0, 10));
		vo.putRatio(new QuickRatio(qrVal, 0, 10));
		vo.putRatio(new InventoryTurns(invTurnsVal, 0, 15));
		
		dao.addOrUpdateRatioThresholds(vo);
        RatioThresholdsPrefs results = dao.getRatioThresholds(email);
        assertEquals(crVal, results.getCurrentRatio().getVal());
        assertEquals(qrVal, results.getQuickRatio().getVal());
        assertEquals(invTurnsVal, results.getInvTurns().getVal());
        
        vo.putRatio(new CurrentRatio(crVal2, 0, 10));
        vo.putRatio(new QuickRatio(qrVal2, 0, 10));
        vo.putRatio(new InventoryTurns(invTurnsVal2, 0, 10));
        dao.addOrUpdateRatioThresholds(vo);
        
        RatioThresholdsPrefs results2 = dao.getRatioThresholds(email);
        assertEquals(invTurnsVal2, results2.getInvTurns().getVal());
        assertEquals(crVal2, results2.getCurrentRatio().getVal());
        assertEquals(qrVal2, results2.getQuickRatio().getVal());
	}

	/**
	 * For updating the current ratio
	 */
	public void testApplyCurrentRatio() {
		String email = "user1@gmail.com";
		double crVal = 1.2;
		double crVal2 = 1.8;
		double qrVal = 1.5;

		RatioThresholdsPrefs vo = new RatioThresholdsPrefs(email);
		vo.putRatio(new CurrentRatio(crVal, 0, 10));
		vo.putRatio(new QuickRatio(qrVal, 0, 10));
		
		dao.addOrUpdateRatioThresholds(vo);
        RatioThresholdsPrefs results = dao.getRatioThresholds(email);
        assertEquals(crVal, results.getCurrentRatio().getVal());
        
        //updated the value of current ratio
        vo.getCurrentRatio().setVal(crVal2);
        dao.addOrUpdateRatioThresholds(vo);
        
        RatioThresholdsPrefs results2 = dao.getRatioThresholds(email);
        assertEquals(crVal2, results2.getCurrentRatio().getVal());
        assertEquals(qrVal, results2.getQuickRatio().getVal());
        
	}
}
