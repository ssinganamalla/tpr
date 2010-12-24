package com.analysis.servlets;

import java.io.IOException;
import java.util.Date;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.analysis.Greeting;
import com.analysis.PMF;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@Deprecated
public class LoadCompanyInfoServlet extends HttpServlet {
	private static final Logger log = Logger.getLogger(SignGuestbookServlet.class.getName());

    public void doPost(HttpServletRequest req, HttpServletResponse resp)
                throws IOException, ServletException {
    	UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		
        String ticker = req.getParameter("stockTickerSymbol");
        req.setAttribute("stockTickerSymbol", ticker);
        
        if (user != null) {
        } else {
        	resp.sendRedirect(userService.createLoginURL(req.getRequestURI()));
        }
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/finAnalyzer.jsp");
        dispatcher.forward(req, resp);
    }
    
    @Override
    public synchronized void service(ServletRequest arg0, ServletResponse arg1)
    		throws ServletException, IOException {
    	// TODO Auto-generated method stub
    	super.service(arg0, arg1);
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
    		throws ServletException, IOException {
    	doPost(req, resp);
    }
}
