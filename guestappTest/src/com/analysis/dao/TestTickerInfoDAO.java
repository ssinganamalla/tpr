package com.analysis.dao;

import org.junit.Assert;
import org.junit.Test;

import com.analysis.common.LocalDatastoreTest;
import com.analysis.domain.NonMutableTickerInfo;
import com.analysis.enums.Enums;

public class TestTickerInfoDAO extends LocalDatastoreTest {
	
	private TickerInfoDAO dao = new TickerInfoDAOImpl();
	
	private NonMutableTickerInfo getTickerInfo1() {
		return new NonMutableTickerInfo("CHK", "Chesapeake Energy Corporation", "Energy", "Oil and Gas Operations",
								"DVN APC HK SWN GST EOG NFX RRC CKGRQ DPTR");		
	}
	
	
	@Test
	public void testAddTickerInfo() {		
		NonMutableTickerInfo info = getTickerInfo1();
		dao.addTickerInfoIfNotExists(info);		
		NonMutableTickerInfo info_db = dao.getTickerInfo(info.getTicker());
		Assert.assertEquals(info, info_db);				
	}	
	
	@Test
	public void testCountTickerInfo() {		
		NonMutableTickerInfo info = getTickerInfo1();
		dao.addTickerInfoIfNotExists(info);		
		NonMutableTickerInfo info_db = dao.getTickerInfo(info.getTicker());
		Assert.assertEquals(info, info_db);	
		//int x = dao.countTickerInfos();
		//Assert.assertEquals(1, x);
	}	
}
