package com.analysis.servlets;

import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Scanner;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FileUploadServlet extends HttpServlet {
  private static final Logger log = Logger.getLogger(FileUploadServlet.class.getName());
  private boolean debug = true;

  public void doPost(HttpServletRequest req, HttpServletResponse res)
      throws ServletException, IOException {
    try {
      ServletFileUpload upload = new ServletFileUpload();
      res.setContentType("text/plain");

      FileItemIterator iterator = upload.getItemIterator(req);
      while (iterator.hasNext()) {
        FileItemStream item = iterator.next();
        InputStream stream = item.openStream();

        if (item.isFormField()) {
          log.warning("Got a form field: " + item.getFieldName());
        } else {
          log.warning("Got an uploaded file: " + item.getFieldName() +
                      ", name = " + item.getName());
          
          loadTickers(item.getName(), stream);
        }
      }
    } catch (Exception ex) {
      throw new ServletException(ex);
    }
  }
  
  
  private void loadTickers(String filename, InputStream instream) throws IOException, ParseException {
		String date = filename.split("_")[1];
		String exchange = filename.split("_")[0];
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		Date da = sdf.parse(date);
		
		sdf.getCalendar();
		Calendar cal = Calendar.getInstance();
		cal.setTime(da);
		cal.set(Calendar.HOUR_OF_DAY, 16);
		
		 BufferedReader reader = new BufferedReader(new InputStreamReader(instream));
		
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
			
			if(debug) {
				System.out.println(exchange + " " + ticker + " " + lastStockPrice + " " + cal.getTime());
			}
			
			//tickerInfoService.updateLastTickerPrice(ticker, Double.valueOf(lastStockPrice), cal.getTime());
			//System.out.println(line.toString());
		}
  }
  
  private byte[] getDataFromInputStream(InputStream stream) throws IOException {
      byte[] rawData;
      int len;
      byte[] buffer = new byte[8192];
      ByteArrayOutputStream output = new ByteArrayOutputStream();

      try {
         while ((len = stream.read(buffer, 0, buffer.length)) != -1) output.write(buffer, 0, len);
         rawData = output.toByteArray();
      } finally {
         output.close();
      }
      return rawData;
   }
  
  @Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.doPost(req, resp);
	}
}