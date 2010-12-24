package com.analysis.action;

import java.io.InputStream;
import java.util.logging.Logger;

import com.analysis.action.basic.BasicActionSupport;
import com.analysis.service.TickersService;

public class TickersAction extends BasicActionSupport {
	
	private static final long serialVersionUID = 3325515076062640977L;

	private static final Logger log = Logger.getLogger(TickersAction.class.getName());
	
	private TickersService tickersService = null;
	
	private InputStream inputStream;
    public InputStream getInputStream() {
        return inputStream;
    }
	public TickersService getTickersService() {
		return tickersService;
	}
	public void setTickersService(TickersService tickersService) {
		this.tickersService = tickersService;
	}
    
    
}
