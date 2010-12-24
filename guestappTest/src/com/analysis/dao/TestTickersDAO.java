package com.analysis.dao;

import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.analysis.common.LocalDatastoreTest;
import com.analysis.dao.TickersDAO;
import com.analysis.dao.TickersDAOImpl;
import com.analysis.domain.RelatedTickers;

public class TestTickersDAO extends LocalDatastoreTest {

	private TickersDAO tickersDAO = new TickersDAOImpl();
	
	private RelatedTickers getRelatedTickersSample() {
		String ticker = "GOOG";
		String email = "user1@gmail.com";
		String relatedTickers = "MSFT CSCO HP";
		
		RelatedTickers rt = new RelatedTickers();			
		rt.setEmail(email);
		rt.setTicker(ticker);
		rt.setKey();
		rt.setRelatedTickers(relatedTickers);
		return rt;
	}
	
	
	private RelatedTickers getRelatedTickersSample2() {
		String ticker = "GOOG";
		String email = "user1@gmail.com";
		String relatedTickers = "MSFT CSCO STV";
		
		RelatedTickers rt = new RelatedTickers();			
		rt.setEmail(email);
		rt.setTicker(ticker);
		rt.setKey();
		rt.setRelatedTickers(relatedTickers);
		return rt;
	}
	
	private RelatedTickers getRelatedTickersSample3WithNullEmail() {
		String ticker = "GOOG";
		String email = null;
		String relatedTickers = "MSFT CSCO STV";
		
		RelatedTickers rt = new RelatedTickers();			
		rt.setEmail(email);
		rt.setTicker(ticker);
		rt.setKey();
		rt.setRelatedTickers(relatedTickers);
		return rt;
	}
	
	
	@Test
	public void testUpdateRelatedTickers() {
		//first add a related ticker before adding.
		RelatedTickers rt = getRelatedTickersSample();
		
		//first add
		tickersDAO.addRelatedTickers(rt);		
		RelatedTickers rt1 = tickersDAO.getRelatedTickers(rt.getKey());
		assertTrue("added and fetched tickers are equal", rt1.equals(rt));
		
		//cerate a sample 2
		rt1 = this.getRelatedTickersSample2();
		rt1.setKey(rt.getKey());
		
		tickersDAO.updateRelatedTickers(rt1);		
		RelatedTickers updatedTicker = tickersDAO.getRelatedTickers(rt1.getKey());			
		assertTrue(updatedTicker.getRelatedTickers().equals(rt1.getRelatedTickers()));	
		
	}
	
	@Test
	public void testAddRelatedTickers() {
		
		RelatedTickers rt = getRelatedTickersSample();		
		tickersDAO.addRelatedTickers(rt);				
		RelatedTickers rt1 = tickersDAO.getRelatedTickers(rt.getKey());				
		
		assertTrue("added and fetched tickers are equal", rt1.equals(rt));					
		
	}
	
	@Test
	public void testAddRelatedTickersWithNullEmail() {
		
		RelatedTickers rt = getRelatedTickersSample3WithNullEmail();		
		tickersDAO.addRelatedTickers(rt);				
		RelatedTickers rt1 = tickersDAO.getRelatedTickers(rt.getKey());				
		
		assertTrue("added and fetched tickers are equal", rt1.equals(rt));					
		
	}
	
}
