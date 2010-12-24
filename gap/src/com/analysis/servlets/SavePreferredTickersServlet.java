package com.analysis.servlets;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.JDOUserException;
import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

import com.analysis.PMF;
import com.analysis.domain.PreferredTickers;
import com.analysis.domain.UserComparisonTickers;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

public class SavePreferredTickersServlet extends HttpServlet{
	private static final Logger log = Logger.getLogger(SavePreferredTickersServlet.class.getName());

	/**
	 * 
	 */
	private static final long serialVersionUID = -4411439020793060277L;
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String preferredTickers = req.getParameter("preferredTickers");
		if(StringUtils.isEmpty(preferredTickers)) {
			log.severe("preferredTickers is empty");
			return;
		}
		
		//get the tickerStr
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		
		
		//get the user and check for non null
		if(user != null) {
            PersistenceManager pm = PMF.get().getPersistenceManager();
            PreferredTickers pt = new PreferredTickers(user, preferredTickers); 
            PreferredTickers savedTickers = null; 
            UserComparisonTickers recentComparisonTickers = new UserComparisonTickers(user.getEmail(), preferredTickers);
            try {
            	savedTickers = pm.makePersistent(pt);
            	//recentComparisonTickers = pm.makePersistent(recentComparisonTickers);
            } catch(Exception e){ 
            	log.logp(Level.SEVERE, SavePreferredTickersServlet.class.getName(), "method", "preferredTickers could not be added to persistence storage", e);
            } finally {
                pm.close();
            }
            if(savedTickers != null) {
            	resp.getWriter().write(savedTickers.getTickersString());
            }
            
		}
		
	}
/*	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
	throws ServletException, IOException {
		String preferredTickers = req.getParameter("preferredTickers");
		if(StringUtils.isEmpty(preferredTickers)) {
			log.severe("preferredTickers is empty");
			return;
		}
		
		//get the tickerStr
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		
		
		//get the user and check for non null
		if(user != null) {
			PersistenceManager pm = PMF.get().getPersistenceManager();
			PreferredTickers pt = new PreferredTickers(user, preferredTickers); 
			PreferredTickers savedTickers = null; 
			try {
				savedTickers = pm.makePersistent(pt);
			} catch(Exception e){ 
				log.logp(Level.SEVERE, SavePreferredTickersServlet.class.getName(), "method", "preferredTickers could not be added to persistence storage", e);
			} finally {
				pm.close();
			}
			if(savedTickers != null) {
				resp.getWriter().write(savedTickers.getTickersString());
			}
			
		}
		
	}
*/	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}

}
