package com.analysis.utils;

import javax.servlet.ServletContext;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.*;
import com.analysis.service.TickersService;

public class ServiceUtils {
	
	//BAD, AVOID. NOT USED
	public static TickersService getTickerService(ServletContext sc) {
		WebApplicationContext wac = WebApplicationContextUtils.getWebApplicationContext(sc);
		TickersService service = (TickersService)wac.getBean("tickerServiceProxy");
		return service;
	}
}
