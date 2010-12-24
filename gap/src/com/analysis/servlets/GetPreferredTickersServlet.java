package com.analysis.servlets;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.analysis.PMF;
import com.analysis.domain.PreferredTickers;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

public class GetPreferredTickersServlet extends HttpServlet{
	private static final long serialVersionUID = -2515977217783183769L;
	private static final Logger log = Logger.getLogger(GetPreferredTickersServlet.class.getName());
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		//get the tickerStr
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		
		
		//get the user and check for non null
		if(user != null) {
            PersistenceManager pm = PMF.get().getPersistenceManager();
            PreferredTickers savedTickers = null; 
            System.out.println(req.getContextPath());
            try {
            	savedTickers = pm.getObjectById(PreferredTickers.class, user.getEmail());
            } catch(Exception e){ 
            	log.logp(Level.SEVERE, GetPreferredTickersServlet.class.getName(), "method", "preferredTickers could not be fetched from persistence storage", e);
            } finally {
                pm.close();
            }
            if(savedTickers != null) {
            	resp.getWriter().write(savedTickers.getTickersString());
            }
		}
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}
	
	
}
