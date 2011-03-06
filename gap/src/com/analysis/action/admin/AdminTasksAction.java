package com.analysis.action.admin;

import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileUpload;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.datanucleus.store.mapped.mapping.BufferedImageMapping;
import org.quartz.xml.CalendarBundle;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.logging.Logger;
import java.util.Date;
import java.util.*;

import java.util.Scanner;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import com.analysis.service.TickerInfoService;
import com.opensymphony.xwork2.ActionSupport;

import java.text.SimpleDateFormat;

public class AdminTasksAction extends ActionSupport implements
		ServletRequestAware {

	private InputStream inputStream;

	private HttpServletRequest req;
	private TickerInfoService tickerInfoService;

	public InputStream getInputStream() {
		return inputStream;
	}

	public void setInputStream(InputStream inputStream) {
		this.inputStream = inputStream;
	}

	public TickerInfoService getTickerInfoService() {
		return tickerInfoService;
	}

	public void setTickerInfoService(TickerInfoService tickerInfoService) {
		this.tickerInfoService = tickerInfoService;
	}

	private static final Logger log = Logger.getLogger(AdminTasksAction.class
			.getName());

	public HttpServletRequest getServletRequest() {
		return this.req;
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		this.req = arg0;
	}

}
