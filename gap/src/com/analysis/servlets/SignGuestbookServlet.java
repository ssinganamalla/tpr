package com.analysis.servlets;

import java.io.IOException;
import java.util.Date;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.jdo.PersistenceManager;

import com.analysis.Greeting;
import com.analysis.PMF;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@Deprecated
public class SignGuestbookServlet extends HttpServlet {
    private static final Logger log = Logger.getLogger(SignGuestbookServlet.class.getName());

    public void doPost(HttpServletRequest req, HttpServletResponse resp)
                throws IOException {
        UserService userService = UserServiceFactory.getUserService();
        User user = userService.getCurrentUser();

        String content = req.getParameter("content");
        if (content == null) {
            content = "(No greeting)";
        }
        if (user != null) {
        	Date date = new Date();
            Greeting greeting = new Greeting(user, content, date);

            PersistenceManager pm = PMF.get().getPersistenceManager();
            try {
                pm.makePersistent(greeting);
            } finally {
                pm.close();
            }
        } else {
            log.info("Greeting posted anonymously: " + content);
        }
        resp.sendRedirect("/finAnalyzer.jsp");
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
    		throws ServletException, IOException {
    	doPost(req, resp);
    }
}