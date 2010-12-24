package com.analysis.servlets;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

import com.analysis.Sector;
import com.analysis.service.PortFolioService;
import com.analysis.service.PortFolioServiceImpl;
import com.analysis.vo.UserTicker;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@Deprecated
public class SaveSectorTickersServlet extends HttpServlet {
	private static final Logger log = Logger
			.getLogger(SaveSectorTickersServlet.class.getName());

	private static final long serialVersionUID = -4411439020793060277L;
	private PortFolioService _sectorTickerService;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		List<UserTicker> list = new LinkedList<UserTicker>();

		// get the tickerStr
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();

		// get the user and check for non null
		if (user != null) {
			for (int sectorId = 0; sectorId < Sector.NUM_SECTORS; sectorId++) {
				// i is the sector id
				String sectorInfo = req.getParameter(String.valueOf(sectorId));
				List<UserTicker> sectorList = getSectorUserTickers(user.getEmail(), sectorInfo, sectorId);
				if(sectorList != null) {
					list.addAll(sectorList);
				}
			}
			getSectorTickersService().updateUserTickers(user.getEmail(), list);
			resp.getWriter().write("{}");

		}
	}

	/**
	 * ABCO 40 10 
	 * YHOO 50 10 
	 * CSCO 70 10
	 * @param tokenizedSectorsTicker
	 * @param sectorId TODO
	 * 
	 * @return
	 */
	private List<UserTicker> getSectorUserTickers(String email, String tokenizedSectorsTicker, int sectorId) {
		if(StringUtils.isNotEmpty(tokenizedSectorsTicker)) {
			String[] tokenesizedTickers = tokenizedSectorsTicker.split("\n");
			LinkedList<UserTicker> list = new LinkedList<UserTicker>();
			for(int i=0; i<tokenesizedTickers.length; i++) {
				if(StringUtils.isNotEmpty(tokenesizedTickers[i])) {
					Scanner scanner = new Scanner(tokenesizedTickers[i]);
					UserTicker info = new UserTicker();
					while(scanner.hasNext()) {
						info.setTickerSymbol(scanner.next());
						info.setAvgCost((Double.parseDouble(scanner.next())));
						info.setNumShares(Integer.parseInt(scanner.next()));
						info.setEmail(email);
						info.setSectorID(sectorId);
					}
					list.add(info);
				}
			}
			return list;
		}
		return null;
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}

	private PortFolioService getSectorTickersService() {
		if (_sectorTickerService == null) {
			_sectorTickerService = new PortFolioServiceImpl();
		}
		return _sectorTickerService;
	}

}
