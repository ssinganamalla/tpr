package com.analysis.loading;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

public class LoadNonMutableTickers {
	
	
	public void tickers() {
		URL url;
		try {
			url = new URL("http://companiesinsight.appspot.com/struts/urlfetch/addTickerInfos");
			URLConnection connection= url.openConnection();
			
			BufferedReader in = new BufferedReader(
                    new InputStreamReader(
                    connection.getInputStream()));
				String inputLine;
				
				while ((inputLine = in.readLine()) != null) 
				System.out.println(inputLine);
				in.close();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		LoadNonMutableTickers lnmt = new LoadNonMutableTickers();
		
		for(int i=0; i<1000; i++) {
			lnmt.tickers();
			System.out.println(i);
		}
	}
}
