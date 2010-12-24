package com.analysis.servlets;

import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;

public class TickerMatcherServlet extends AbstractInfoServlet{
	protected URL getUrl(HttpServletRequest req) throws MalformedURLException {
    	String ticker = req.getParameter("ticker");
		if(ticker != null) {
			System.out.println(ticker);
		}
        URL url = new URL("http://www.google.com/finance/match?matchtype=matchall&q=" + ticker);
        return url;
    }
}
