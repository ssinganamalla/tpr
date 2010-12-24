package com.analysis.servlets;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Deprecated
public class CompanyInfoServlet extends AbstractInfoServlet{
	protected URL getUrl(HttpServletRequest req) throws MalformedURLException {
    	String stockTickerSymbol = req.getParameter("ticker");
		if(stockTickerSymbol != null) {
			//System.out.println(stockTickerSymbol);
		}
		//System.out.println("http://www.google.com/finance?fstype=bi&q=" + stockTickerSymbol);
        URL url = new URL("http://www.google.com/finance?fstype=bi&q=" + stockTickerSymbol);
        return url;
    }
}
