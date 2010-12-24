package com.analysis.servlets;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public abstract class AbstractInfoServlet extends HttpServlet {
	private static final long serialVersionUID = 3280096994754952617L;
	private static final Logger log = Logger.getLogger(AbstractInfoServlet.class.getName());

    /**
     * InputStreamReader in2 = new
InputStreamReader(method.getResponseBodyAsStream(), "UTF-8");
        StringWriter sw = new StringWriter();
        int x;
        while((x = in2.read()) != -1){
            sw.write(x);
        }
        in2.close();
        String responseAsString = sw.toString(); 
     */
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    	
    	try {
    		
    		req.setCharacterEncoding("UTF-8");
    		resp.setContentType("text/html; charset=UTF-8");
    		URL url = getUrl(req);
    		HttpURLConnection connection = (HttpURLConnection)url.openConnection();
    		
    		System.out.println("connection content length " + connection.getRequestProperty("Content-Length"));
    		System.out.println("connection Content type " + connection.getContentType());
    		System.out.println("resp Content type " + resp.getContentType());
            BufferedInputStream instream = new BufferedInputStream(connection.getInputStream());
            BufferedOutputStream outstream = new BufferedOutputStream(resp.getOutputStream());
            StringBuilder stringBuilder = new StringBuilder();
            
            
            int len = Math.max(10948, connection.getContentLength());
            byte[] buffer = new byte[len];
            int r = 0;
            while ((r = instream.read()) != -1) {
            	outstream.write(r);
            	//System.out.print(r);
            }
            
            outstream.flush();
            outstream.close();
            instream.close();
            
            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                // OK
            } else {
                // Server returned HTTP error code.
            }

            
        } catch (MalformedURLException e) {
            log.severe("URL might be malformed " + log.getName());
        } catch (IOException e) {
        	log.severe("IOEXception in " + log.getName());
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
    		throws ServletException, IOException {
    	doPost(req, resp);
    }
    
    protected abstract URL getUrl(HttpServletRequest req) throws MalformedURLException;
}
