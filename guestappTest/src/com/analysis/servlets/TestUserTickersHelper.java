package com.analysis.servlets;

import java.util.List;

import com.analysis.vo.UserTicker;

import junit.framework.TestCase;

@Deprecated
public class TestUserTickersHelper extends TestCase{
	public void testTokenizedSectorUserTickers() {
		String email = "user1@gmail.com";
		String tokenizedSectorsTicker = "ABCO 10 20\nCSCO 40 60\nfghe 40 10";
		
		List<UserTicker> list = UserTickersHelper.getSectorUserTickers(email, tokenizedSectorsTicker);
		assertEquals(3, list.size());
		assertEquals(email, list.get(2).getEmail());
		assertEquals(10, list.get(0).getAvgCost());
		assertEquals(20, list.get(0).getNumShares());
		
	}
	
}
