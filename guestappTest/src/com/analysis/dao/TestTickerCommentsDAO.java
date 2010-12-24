package com.analysis.dao;

import static org.junit.Assert.assertTrue;

import java.util.Collection;
import java.util.Date;

import org.junit.Test;

import com.analysis.common.LocalDatastoreTest;
import com.analysis.domain.TickerComments;
import static org.junit.Assert.*;

public class TestTickerCommentsDAO extends LocalDatastoreTest {

	private TickerCommentsDAO tickersDAO = new TickerCommentsDAOImpl();
	
	private TickerComments getTickerCommentsSample1() {
		String ticker = "GOOG";
		String email = "user1@gmail.com";
		String comments = "Comments 1";
		TickerComments rt = new TickerComments();
		rt.setEmail(email);
		rt.setTicker(ticker);
		rt.setContent("Initial Comments 1");
		rt.setDate(new Date());
		rt.setIsPublic(true);
		return rt;
	}
	
	
	private TickerComments getTickerCommentsSample2() {
		String ticker = "GOOG";
		String email = "user1@gmail.com";
		String comments = "Comments 2";
		
		TickerComments rt = new TickerComments();
		rt.setEmail(email);
		rt.setTicker(ticker);
		rt.setContent("Initial Comments 2");
		rt.setDate(new Date());
		rt.setIsPublic(true);
		return rt;
	}
	
	private TickerComments getTickerCommentsSample3() {
		String ticker = "GOOG";
		String email = "user1@gmail.com";;
		String comments = "Comments 3";
		
		TickerComments rt = new TickerComments();
		rt.setEmail(email);
		rt.setTicker(ticker);
		rt.setContent("Initial Comments 3");
		rt.setDate(new Date());
		rt.setIsPublic(true);
		return rt;
	}
	
	private TickerComments getTickerCommentsSample4() {
		String ticker = "YHOO";
		String email = "user1@gmail.com";;
		String comments = "Comments 1";
		
		TickerComments rt = new TickerComments();
		rt.setEmail(email);
		rt.setTicker(ticker);
		rt.setContent(comments);
		rt.setDate(new Date());
		rt.setIsPublic(true);
		return rt;
	}
	
	@Test
	public void testCreateAndTickerComments() {
		//first add a related ticker before adding.
		TickerComments rt = getTickerCommentsSample1();
		TickerComments rt2 = getTickerCommentsSample2();
		TickerComments rt3 = getTickerCommentsSample3();
		TickerComments rt4 = getTickerCommentsSample4();
		
		//first add
		tickersDAO.createTickerComments(rt.getEmail(), rt.getContent(), rt.getTicker(), new Date(10000));		
		tickersDAO.createTickerComments(rt2.getEmail(), rt2.getContent(), rt2.getTicker(), new Date(10001));		
		tickersDAO.createTickerComments(rt3.getEmail(), rt3.getContent(), rt3.getTicker(), new Date(10002));		
		tickersDAO.createTickerComments(rt4.getEmail(), rt4.getContent(), rt4.getTicker(), new Date(10003));		
			
		Collection<TickerComments>results = tickersDAO.getComments(rt.getEmail());
		assertEquals(4, results.size());
		
		Collection<TickerComments>results2 = tickersDAO.getComments(rt.getEmail(), "GOOG");
		assertEquals(3, results2.size());
		
		//check the descending order
		int i = 0;
		for(TickerComments comment : results2) {
			if(i == 0) {
				assertEquals(rt3.getContent(), comment.getContent());
			} else if(i == 1) {
				assertEquals(rt2.getContent(), comment.getContent());
			} else if(i==2) {
				assertEquals(rt.getContent(), comment.getContent());
			}
			i++;
		}
		
		
		Collection<TickerComments>results3 = tickersDAO.getComments(rt.getEmail(), "YHOO");
		assertEquals(1, results3.size());
	}
	
}
