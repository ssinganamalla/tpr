package com.analysis.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.junit.Test;

import com.analysis.Sector;
import com.analysis.common.LocalDatastoreTest;
import com.analysis.domain.PortfolioTicker;
import com.analysis.vo.UserTicker;

public class TestPortFolioDAO extends LocalDatastoreTest {
	private String email = "user1@gmail.com";
	
	private PortFolioDAO dao = new PortFolioDAOImpl();
	private List<UserTicker> getTickersList() {
		List<UserTicker> userTickerInfoList = new ArrayList<UserTicker>();
		userTickerInfoList.add(new UserTicker("ABCD", Sector.BASIC_MATERIALS, 30.2, 100, email));
		userTickerInfoList.add(new UserTicker("GHIJ", Sector.BASIC_MATERIALS, 10.3, 100, email));
		userTickerInfoList.add(new UserTicker("GHIJ", Sector.CAPITAL_GOODS, 10.6, 100, email));
		userTickerInfoList.add(new UserTicker("F", Sector.CONGLOMERATES, 10.6, 100, email));
		userTickerInfoList.add(new UserTicker("GE", Sector.CONGLOMERATES, 10.2, 100, email));
		userTickerInfoList.add(new UserTicker("GR", Sector.BASIC_MATERIALS, 110.5, 100, email));
		return userTickerInfoList;
	}
	
	/**
	 * List contains basic material sector
	 * @return
	 */
	private List<UserTicker> getBasicMatlTickersListToUpdate() {
		List<UserTicker> userTickerInfoList = new ArrayList<UserTicker>();
		userTickerInfoList.add(new UserTicker("ABCD", Sector.BASIC_MATERIALS, 30.5, 100, email));
		userTickerInfoList.add(new UserTicker("GHIJ", Sector.BASIC_MATERIALS, 10.8, 100, email));
		return userTickerInfoList;
	}
	
	/**
	 * List contains any sector
	 * @return
	 */
	private List<UserTicker> getTickersListToUpdate() {
		List<UserTicker> userTickerInfoList = new ArrayList<UserTicker>();
		userTickerInfoList.add(new UserTicker("ABCD", Sector.BASIC_MATERIALS, 30, 100, email));
		userTickerInfoList.add(new UserTicker("GHIJ", Sector.BASIC_MATERIALS, 10.8, 100, email));
		userTickerInfoList.add(new UserTicker("GHIE", Sector.CONSUMER_CYCLICAL, 10, 100, email));
		userTickerInfoList.add(new UserTicker("GHIHE", Sector.ENERGY, 10, 100, email));
		return userTickerInfoList;
	}
	
	@Test
	public void testAddUserTickerInfos() {
		
		//cannot use a transaction since adding a number of root elements
		List<UserTicker> userTickerInfoList = getTickersList();
		
		dao.addUserTickerInfos(userTickerInfoList);
        Collection<UserTicker> results = dao.getUserTickerInfos(email);
        assertEquals(6, results.size());
	}

	@Test
	public void testGetSectorUserTickerInfos() {
		//cannot use a transaction since adding a number of root elements
		List<UserTicker> userTickerInfoList = getTickersList();
		dao.addUserTickerInfos(userTickerInfoList);
        Collection<UserTicker> results = dao.getUserTickerInfos(email, Sector.BASIC_MATERIALS);
        assertEquals(3, results.size());
        results = dao.getUserTickerInfos(email, Sector.CAPITAL_GOODS);
        assertEquals(1, results.size());
        results = dao.getUserTickerInfos(email, Sector.CONGLOMERATES);
        assertEquals(2, results.size());
	}
	
	@Test
	public void testUpdateSectorUserTickerInfos() {
		//cannot use a transaction since adding a number of root elements
		List<UserTicker> userTickerInfoList = getTickersList();
		dao.addUserTickerInfos(userTickerInfoList);
		Collection<UserTicker> results = dao.getUserTickerInfos(email);
        assertEquals(6, results.size());
		
        Collection<UserTicker> newList = getBasicMatlTickersListToUpdate();
		dao.updateSectorTickerInfos(email, Sector.BASIC_MATERIALS, newList);
		
		results = dao.getUserTickerInfos(email, Sector.BASIC_MATERIALS);
		assertEquals(2, results.size());
		
		results = dao.getUserTickerInfos(email, Sector.CAPITAL_GOODS);
		assertEquals(1, results.size());
		results = dao.getUserTickerInfos(email, Sector.CONGLOMERATES);
		assertEquals(2, results.size());
	}
	
	/**
	 * update list of any user ticker for a user
	 */
	@Test
	public void testUpdateUserTickerInfos() {
		//cannot use a transaction since adding a number of root elements
		List<UserTicker> userTickerInfoList = getTickersList();
		dao.addUserTickerInfos(userTickerInfoList);
		Collection<UserTicker> results = dao.getUserTickerInfos(email);
		assertEquals(6, results.size());
		
		Collection<UserTicker> newList = getTickersListToUpdate();
		dao.updateUserTickerInfos(email, newList);
		
		results = dao.getUserTickerInfos(email, Sector.BASIC_MATERIALS);
		assertEquals(2, results.size());
		results = dao.getUserTickerInfos(email, Sector.ENERGY);
		assertEquals(1, results.size());
		results = dao.getUserTickerInfos(email, Sector.CONSUMER_CYCLICAL);
		assertEquals(1, results.size());
		results = dao.getUserTickerInfos(email, Sector.CONSUMER_NON_CYCLICAL);
		assertEquals(0, results.size());
		results = dao.getUserTickerInfos(email, Sector.CAPITAL_GOODS);
		assertEquals(0, results.size());
		results = dao.getUserTickerInfos(email, Sector.CONGLOMERATES);
		assertEquals(0, results.size());
	}

	
	
	@Test
	public void testRemoveUserTickerInfos() {
		List<UserTicker> userTickerInfoList = getTickersList();
		dao.addUserTickerInfos(userTickerInfoList);
        Collection<UserTicker> results = dao.getUserTickerInfos(email);
        //added
        assertEquals(6, results.size());
	     
        //now remove the added results
        dao.removeUserTickerInfos(email);
	    
        //check if it is removed
	     results = dao.getUserTickerInfos(email);
	     assertEquals(0, results.size());
	}
	
	private List<PortfolioTicker> getPortfolioTickerList() {
		List<PortfolioTicker> userTickerInfoList = new ArrayList<PortfolioTicker>();
		PortfolioTicker a = new PortfolioTicker(email, "ABCD", "TRADEKING");
		a.setCostBasis(23.6);
		a.setQuantity(5);
		PortfolioTicker b = new PortfolioTicker(email, "MLFD", "TRADEKING");
		b.setCostBasis(300.6);
		b.setQuantity(10);
		PortfolioTicker c = new PortfolioTicker(email, "AUIBCD", "ZECCO");
		c.setCostBasis(70.6);
		c.setQuantity(250);
		
		userTickerInfoList.add(a);
		userTickerInfoList.add(b);
		userTickerInfoList.add(c);
		
		return userTickerInfoList;
	}
	
	@Test
	public void testCreatePortFolioTicker() {
		List<PortfolioTicker> list = getPortfolioTickerList();
		for(PortfolioTicker ticker : list) {
			PortfolioTicker detached = dao.createPortFolioTicker(ticker);
			assertNotNull(detached.getTransactionId());
			assert(detached.getTransactionId() > 0);
		}
		
		Collection<PortfolioTicker> results = dao.readPortFolioTickers(email, null, null);
        assertEquals(list.size(), results.size());
	}
	
	@Test
	public void testReadPortFolioTickers() {
		List<PortfolioTicker> list = getPortfolioTickerList();
		for(PortfolioTicker ticker : list) {
			dao.createPortFolioTicker(ticker);
		}
		
		Collection<PortfolioTicker> results = dao.readPortFolioTickers(email, null, null);
        assertEquals(list.size(), results.size());
        
        results = dao.readPortFolioTickers(email, "ABCD", null);
        assertEquals(1, results.size());
        
        results = dao.readPortFolioTickers(email, null, "TRADEKING");
        assertEquals(2, results.size());
        
        results = dao.readPortFolioTickers(email, null, "ZECCO");
        assertEquals(1, results.size());
	}
	
	public void testUpdatePortfolioTicker() {
		List<PortfolioTicker> list = getPortfolioTickerList();
		for(PortfolioTicker ticker : list) {
			dao.createPortFolioTicker(ticker);
		}
		Collection<PortfolioTicker> results = dao.readPortFolioTickers(email, null, null);
		
		
	}
	
	public void testDeletePortfolioTicker() {
		List<PortfolioTicker> list = getPortfolioTickerList();
		List<Long> ids = new ArrayList<Long>();
		for(PortfolioTicker ticker : list) {
			PortfolioTicker detached = dao.createPortFolioTicker(ticker);
			ids.add(detached.getTransactionId());
		}
		
		for(Long id : ids) {
			dao.delete(id);
		}
		Collection<PortfolioTicker> results = dao.readPortFolioTickers(email, null, null);
		assertEquals(0, results.size());
	}
	
}
