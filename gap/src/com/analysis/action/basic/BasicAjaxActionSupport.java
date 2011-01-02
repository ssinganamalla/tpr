package com.analysis.action.basic;

import java.io.InputStream;
import java.io.StringBufferInputStream;

import org.apache.struts2.StrutsException;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.tickerperformance.exceptions.StrutsExecuteException;

public abstract class BasicAjaxActionSupport extends BasicActionSupport {

	protected InputStream inputStream;

	public InputStream getInputStream() {
		return inputStream;
	}

	public void setInputStream(InputStream inputStream) {
		this.inputStream = inputStream;
	}

	public String execute() throws Exception {
		try{
			this.inputStream = new StringBufferInputStream(populateInputString());
			System.out.println("testing");
		} catch(StrutsException e) {
			return ERROR;
		}
		return SUCCESS;
	}
	
	/**
	 * Returns a populated string to be sent as inpurstream
	 * @return a String
	 * @throws StrutsException
	 */
	public abstract String populateInputString() throws StrutsException;
	
}
