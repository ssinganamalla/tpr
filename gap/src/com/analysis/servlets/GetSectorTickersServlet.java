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

import org.apache.commons.lang.StringEscapeUtils;

import com.analysis.PMF;
import com.analysis.Sector;
import com.analysis.domain.TickerComments;
import com.analysis.domain.PreferredTickers;
import com.analysis.service.PortFolioService;
import com.analysis.service.PortFolioServiceImpl;
import com.analysis.vo.UserTicker;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.utils.json.JSONArray;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

@Deprecated
public class GetSectorTickersServlet extends HttpServlet{
	private static final Logger log = Logger.getLogger(GetSectorTickersServlet.class.getName());
	private PortFolioService _saveTickerService;
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		//get the tickerStr
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		
		
		//get the user and check for non null
		if(user != null) {
			
			Collection<UserTicker>userTickers = getSectorTickersService().getUserTickerInfos(user.getEmail());
			String responseText = "";
			try {
				responseText = UserTickersHelper.getJson(userTickers);
				//responseText = sampleJson();
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			resp.getWriter().write(responseText);
		}
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}
	
	private String sampleJson() throws JSONException {
		
		String[][] tickerSymbols = { { "ABCO", "YHOO", "CSCO" },
				{ "BAC", "C", "H" } };
		int[][] costBasis = { { 40, 50, 70 }, { 10, 5, 80 } };
		int[][] numShares = { { 10, 10, 10 }, { 10, 10, 10 } };
		JSONObject ojo = new JSONObject();
		try {
		for (int i = 0; i < tickerSymbols.length; i++) {
			JSONArray ja = new JSONArray();
			ojo.put(""+i, ja);
			for (int j = 0; j < tickerSymbols[0].length; j++) {
				JSONObject jo = new JSONObject();
				jo.put(Sector.JSON_KEY_TICKER, tickerSymbols[i][j]);
				jo.put(Sector.JSON_KEY_COST_BASIS, costBasis[i][j]);
				jo.put(Sector.JSON_KEY_NUM_SHARES, numShares[i][j]);
				// System.out.println("printing note " +
				// StringEscapeUtils.escapeHtml(note.getContent()));
				ja.put(jo);
			}
		}
		System.out.println(ojo.toString());
		} catch(JSONException e) {
			log.logp(Level.SEVERE, SavePreferredTickersServlet.class.getName(), "method", "preferredTickers could not be added to persistence storage", e);
			throw e;
		}
		return ojo.toString(); 
	}
	
	private PortFolioService getSectorTickersService() {
		if (_saveTickerService == null) {
			_saveTickerService = new PortFolioServiceImpl();
		}
		return _saveTickerService;
	}
	
	public static void main(String[] args) {
		GetSectorTickersServlet s = new GetSectorTickersServlet();
		try {
			s.sampleJson();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
