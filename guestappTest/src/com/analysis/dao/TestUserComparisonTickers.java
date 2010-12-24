package com.analysis.dao;

import java.util.Collection;

import org.junit.Test;

import com.analysis.common.LocalDatastoreTest;
import com.analysis.domain.UserComparisonTickers;
import static org.junit.Assert.*;

public class TestUserComparisonTickers extends LocalDatastoreTest {
	
	private UserComparisonTickersDAO dao = new UserComparisonTickersDAOImpl();
	
	@Test
	public void testAddUserComparisonTicker() {
		
		String email = "user1@gmail.com";
		//cannot use a transaction since adding a number of root elements
		UserComparisonTickers userComparisonTickers = new UserComparisonTickers();
		userComparisonTickers.setEmail(email);
		userComparisonTickers.setShortDetails("Short details desc");
		userComparisonTickers.setComparisionTickers("CSCO MITS KGH");
		userComparisonTickers.setLongDetails("Long details desc");
		
		dao.addComparisionTickers(userComparisonTickers);
        Collection<UserComparisonTickers> results = dao.getComparisonTickers(email);
        assertEquals(1, results.size());
        
        userComparisonTickers = new UserComparisonTickers();
        userComparisonTickers.setEmail(email);
		userComparisonTickers.setShortDetails("Short details desc2");
		userComparisonTickers.setComparisionTickers("CSCO1 MITS KGH");
		userComparisonTickers.setLongDetails("Long details desc2");
		dao.addComparisionTickers(userComparisonTickers);
		results = dao.getComparisonTickers(email);
		
		assertEquals(2, results.size());
	}

	

}
