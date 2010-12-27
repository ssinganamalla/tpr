package com.analysis.dao;

import static org.junit.Assert.assertTrue;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.junit.Test;

import com.analysis.common.LocalDatastoreTest;
import com.analysis.domain.TickerComment;
import com.analysis.domain.UserCommentTicker;
import com.analysis.enums.EnumTickerCommentReason;

import static org.junit.Assert.*;

public class TestTickerCommentsDAO extends LocalDatastoreTest {

	private TickerCommentsDAO tickersDAO = new TickerCommentsDAOImpl();
	
	private TickerComment getTickerCommentsSample1() {
		String ticker = "GOOG";
		String email = "user1@gmail.com";
		String comments = "Comments 1";
		TickerComment rt = new TickerComment();
		rt.setEmail(email);
		rt.setTicker(ticker);
		rt.setContent(comments);
		rt.setDate(new Date());
		rt.setIsPublic(true);
		rt.setReason(EnumTickerCommentReason.BUY);
		return rt;
	}
	
	
	private TickerComment getTickerCommentsSample2() {
		String ticker = "GOOG";
		String email = "user1@gmail.com";
		String comments = "Comments 2";
		
		TickerComment rt = new TickerComment();
		rt.setEmail(email);
		rt.setTicker(ticker);
		rt.setContent(comments);
		rt.setDate(new Date());
		rt.setIsPublic(true);
		rt.setReason(EnumTickerCommentReason.SELL);
		return rt;
	}
	
	private TickerComment getTickerCommentsSample3() {
		String ticker = "GOOG";
		String email = "user1@gmail.com";;
		String comments = "Comments 3";
		
		TickerComment rt = new TickerComment();
		rt.setEmail(email);
		rt.setTicker(ticker);
		rt.setContent(comments);
		rt.setDate(new Date());
		rt.setIsPublic(true);
		rt.setReason(EnumTickerCommentReason.BUY);
		return rt;
	}
	
	private TickerComment getTickerCommentsSample4() {
		String ticker = "YHOO";
		String email = "user1@gmail.com";;
		String comments = "Comments 1";
		
		TickerComment rt = new TickerComment();
		rt.setEmail(email);
		rt.setTicker(ticker);
		rt.setContent(comments);
		rt.setDate(new Date());
		rt.setIsPublic(true);
		rt.setReason(EnumTickerCommentReason.OTHER);
		return rt;
	}
	
	@Test
	public void testCreateAndTickerComments() {
		//first add a related ticker before adding.
		TickerComment rt = getTickerCommentsSample1();
		TickerComment rt2 = getTickerCommentsSample2();
		TickerComment rt3 = getTickerCommentsSample3();
		TickerComment rt4 = getTickerCommentsSample4();
		
		//first add
		tickersDAO.createTickerComments(rt.getEmail(), rt.getContent(), rt.getTicker(), new Date(10000), 0);		
		tickersDAO.createTickerComments(rt2.getEmail(), rt2.getContent(), rt2.getTicker(), new Date(10001), 0);		
		tickersDAO.createTickerComments(rt3.getEmail(), rt3.getContent(), rt3.getTicker(), new Date(10002), 0);		
		tickersDAO.createTickerComments(rt4.getEmail(), rt4.getContent(), rt4.getTicker(), new Date(10003), 0);		
			
		Collection<TickerComment>results = tickersDAO.getComments(rt.getEmail());
		assertEquals(4, results.size());
		
		Collection<TickerComment>results2 = tickersDAO.getComments(rt.getEmail(), "GOOG");
		assertEquals(3, results2.size());
		
		//check the descending order
		int i = 0;
		for(TickerComment comment : results2) {
			if(i == 0) {
				assertEquals(rt3.getContent(), comment.getContent());
			} else if(i == 1) {
				assertEquals(rt2.getContent(), comment.getContent());
			} else if(i==2) {
				assertEquals(rt.getContent(), comment.getContent());
			}
			i++;
		}
		
		
		Collection<TickerComment>results3 = tickersDAO.getComments(rt.getEmail(), "YHOO");
		assertEquals(1, results3.size());
	}
	
	@Test
	public void testGetTickers() {
		//first add a related ticker before adding.
		TickerComment rt = getTickerCommentsSample1();
		TickerComment rt2 = getTickerCommentsSample2();
		TickerComment rt3 = getTickerCommentsSample3();
		TickerComment rt4 = getTickerCommentsSample4();
		
		//first add
		tickersDAO.createTickerComments(rt.getEmail(), rt.getContent(), rt.getTicker(), new Date(10000), 0);		
		tickersDAO.createTickerComments(rt2.getEmail(), rt2.getContent(), rt2.getTicker(), new Date(10001), 0);		
		tickersDAO.createTickerComments(rt3.getEmail(), rt3.getContent(), rt3.getTicker(), new Date(10002), 0);		
		tickersDAO.createTickerComments(rt4.getEmail(), rt4.getContent(), rt4.getTicker(), new Date(10003), 0);
		
		Collection<UserCommentTicker> result = tickersDAO.getTickers("user1@gmail.com");
		assertEquals(2, result.size());
		
		StringBuilder builder = new StringBuilder();
		for(UserCommentTicker userTicker: result) {
			builder.append(userTicker.getTicker());
		}
		
		assertTrue("GOOGYHOO".equals(builder.toString()) || "YHOOGOOG".equals(builder.toString()));
	}
	
}
