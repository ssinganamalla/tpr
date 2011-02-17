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

	public void loadTickersPrice() throws ServletException, IOException {
		try {
			
			// Check that we have a file upload request
			boolean isMultipart = ServletFileUpload.isMultipartContent(this.getServletRequest());
			
			ServletFileUpload upload = new ServletFileUpload();

			FileItemIterator iterator = upload.getItemIterator(this.getServletRequest());
			
			
			while (iterator.hasNext()) {
				FileItemStream item = iterator.next();
				InputStream stream = item.openStream();
				BufferedReader reader = new BufferedReader(
						new InputStreamReader(stream));

				if (item.isFormField()) {
					log.warning("Got a form field: " + item.getFieldName());
				} else {
					log.warning("Got an uploaded file: " + item.getFieldName()
							+ ", name = " + item.getName());

					// You now have the filename (item.getName() and the
					// contents (which you can read from stream). Here we just
					// print them back out to the servlet output stream, but you
					// will probably want to do something more interesting (for
					// example, wrap them in a Blob and commit them to the
					// datastore).
					int len;
					/**
					 * byte[] buffer = new byte[8192]; StringBuilder builder
					 * =new StringBuilder(); while ((len = stream.read(buffer,
					 * 0, buffer.length)) != -1) { builder.append(new
					 * String(buffer, 0, len)); }
					 **/

					String filename = item.getFieldName();
					String date = filename.split("_")[1];
					SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
					Date da = new Date();
					Calendar cal = Calendar.getInstance();
					cal.setTime(da);
					cal.set(Calendar.HOUR_OF_DAY, 16);
					
					String line = null;
					while ((line = reader.readLine()) != null) {
						Scanner scanner = new Scanner(line);
						scanner.useDelimiter(",");
						String ticker = scanner.next();
						scanner.next();
						scanner.next();
						scanner.next();
						scanner.next();
						String lastStockPrice = scanner.next();

						tickerInfoService.updateLastTickerPrice(ticker, Double.valueOf(lastStockPrice), cal.getTime());
						System.out.println(line.toString());
					}
				}
			}
		} catch (Exception ex) {
			throw new ServletException(ex);
		}
	}

	public HttpServletRequest getServletRequest() {
		return this.req;
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		this.req = arg0;
	}

}
