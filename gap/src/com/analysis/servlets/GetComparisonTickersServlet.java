package com.analysis.servlets;

import java.io.IOException;
import java.util.Collection;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.analysis.PMF;
import com.analysis.domain.UserComparisonTickers;
import com.analysis.service.ComparisonTickersService;
import com.analysis.service.ComparisonTickersServiceImpl;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

public class GetComparisonTickersServlet extends HttpServlet{
	private static final Logger log = Logger.getLogger(GetComparisonTickersServlet.class.getName());

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		//get the tickerStr
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		
		//get the user and check for non null
		if(user != null) {
            PersistenceManager pm = PMF.get().getPersistenceManager();
            Collection<UserComparisonTickers> comparisonTickersCollection = null; 
            try {
            	comparisonTickersCollection = getComparisonTickersService().getComparisonTickers(user.getEmail());
            } catch(Exception e){ 
            	log.logp(Level.SEVERE, GetComparisonTickersServlet.class.getName(), "method", "UserComparisonTickers could not be fetched from persistence storage", e);
            } finally {
                pm.close();
            }
            if(comparisonTickersCollection != null) {
            	resp.getWriter().write(getComparisonTickersService().getJson(comparisonTickersCollection));
            }
		}
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}

	private ComparisonTickersService comparisonTickersService;
	private ComparisonTickersService getComparisonTickersService() {
		if (comparisonTickersService == null) {
			comparisonTickersService = new ComparisonTickersServiceImpl();
		}
		return comparisonTickersService;
	}
}
