package com.analysis.servlets;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringEscapeUtils;

import com.analysis.PMF;
import com.analysis.domain.TickerStmtComment;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.utils.json.JSONArray;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

public class AddNoteServlet extends HttpServlet {
	private static final Logger log = Logger
			.getLogger(SignGuestbookServlet.class.getName());

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();

		String content = req.getParameter("note");
		
		String ticker = req.getParameter("ticker");
		String periodType = req.getParameter("period");
		String stmtType = req.getParameter("stmtType");
		
		if(ticker == null) {
			ticker = "null";
		}
		
		if (user != null) {
			
		} else {
			log.info("Greeting posted anonymously: " + content);
		}
		
		if(content != null) {
			persistNote(user, content, ticker, Integer.parseInt(periodType), Integer.parseInt(stmtType));
		}
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
	    String query = "select from " + TickerStmtComment.class.getName();
	    List<TickerStmtComment> notes = (List<TickerStmtComment>) pm.newQuery(query).execute();
	    JSONArray ja = new JSONArray();
	    	try {
	    		for (TickerStmtComment note : notes) {
	    			ja.put(note.toJSONObject());
	    		}
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
				//output to stream
				resp.getWriter().print(ja.toString()); 
				System.out.println(ja.toString());
	}
	
	private String escapeHtml(String value) {
		return StringEscapeUtils.escapeHtml(value);
	}
	
	@Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
    		throws ServletException, IOException {
    	doPost(req, resp);
    }

	private void persistNote(User user, String content, String ticker, int period, int stmtType) {
		TickerStmtComment note = new TickerStmtComment(user != null ?user.getEmail(): "guest81mda931032odal@ghuiew.com", content, ticker,
		period, stmtType, 1);

		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			pm.makePersistent(note);
		} finally {
			pm.close();
		}
	}

}
