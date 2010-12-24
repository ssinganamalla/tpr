package com.analysis.action.urlfetch;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.utils.json.JSONArray;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;


public class GoogTickerInfoPopulator {
	private final int INDEX_NAME = 0;
	private final int INDEX_SECTOR = 1;
	private final int INDEX_INDUSTRY = 2;
	private final int INDEX_RELATED = 3;
	private boolean debug = true;	
	private final static GoogTickerInfoPopulator instance = new GoogTickerInfoPopulator(); 	
	private HashMap<String, List<String>> tickerInfoMap = new HashMap<String, List<String>>();
	
	
	

	private GoogTickerInfoPopulator() {
		super();
	}

	public static GoogTickerInfoPopulator getInstance() {
		return instance;		
	}

	public HashMap<String, List<String>> getTickerInfoMap() {
		return tickerInfoMap;
	}
	public HashMap<String, List<String>> populateTickerInfo(String ticker, InputStream instream) {
				
//		InputStream instream = GoogTickerInfoPopulator.class.getResourceAsStream("googfin2.txt");
		BufferedReader reader = new BufferedReader(new InputStreamReader(instream));		
		String input = null;
		
		try {
			//read the stream into the stringbuilder
			while((input = reader.readLine()) != null) {
				if(!relatedExists(ticker)) {
					//System.out.println(input);
					populateNameAndRelatedTickers(ticker, input);
				}
				
				if(!sectorExists(ticker) || !industryExists(ticker)) {
					//System.out.println(input);
					populateSectorAndIndustry(ticker, input);
				}
				
				
				if(sectorExists(ticker) && industryExists(ticker) && relatedExists(ticker)) {
					break;
				}
			}
			reader.close();
			instream.close();
			
//			System.out.println(input);
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return tickerInfoMap;
		
	}
	
	private boolean populateSectorAndIndustry(String ticker, CharSequence input) {
		// TODO Auto-generated method stub
		Pattern p = Pattern.compile("<div class=sfe-section>Sector:.*sector.*?>(.*?)</a>.*Industry:.*>(.*)</a>");
		Matcher m = p.matcher(input);
		
		boolean found = false;
		String sector = "";
		String industry = "";
		
		//break after the first find
		if(m.find()) {
			if(m.groupCount()>0) {
				found = true;
				sector = m.group(1);
				industry = m.group(2);
				if(debug) {
					System.out.format("The captured group sector is %s and the captured group industry is \n", m.group(1), m.group(2));
				}
			}
		}
		
		if(found) {
			insertSectorIntoMap(ticker, sector);
			insertIndustryIntoMap(ticker, industry);
		}
		return found;		
	}
	//
	private boolean populateNameAndRelatedTickers(String ticker, String input) {
		
		if(input.startsWith("google.finance.data =")) {
			if(debug) {
				System.out.println(input);
			}
		}
		
		Pattern p = Pattern.compile("google.finance.data.*rows:(.*),visible");
		Matcher m = p.matcher(input);
		
		String jsonRelatedString = "";
		boolean found = false;
		
		//break after the first find
		if(m.find()) {
			if(m.groupCount()>0) {
				found = true;
				jsonRelatedString = m.group(1);
				if(debug) {
					System.out.format("The captured group jsonRelatedString is %s \n", jsonRelatedString);
				}
			}
		}
		
		if(found) {
			extractNameAndRelatedTickersFromJson(ticker, jsonRelatedString);
		} 
		return found;
	}
	
	private void extractNameAndRelatedTickersFromJson(String ticker, String jsonRelatedString) {
		// TODO Auto-generated method stub
		try {
			
			/*JSONObject jo = new JSONObject(jsonRelatedString);
			JSONObject company = jo.getJSONObject("company");
			JSONObject related = company.getJSONObject("related");
			JSONArray rows = related.getJSONArray("rows");*/
			
			JSONArray rows = new JSONArray(jsonRelatedString);
			
			StringBuilder relatedTickers = new StringBuilder();
			for(int i=0; i< rows.length(); i++) {
				JSONObject row = rows.getJSONObject(i);
				JSONArray values = row.getJSONArray("values");
				String currTicker = values.getString(0);
				String currTickerName = values.getString(1);
				relatedTickers.append(currTicker);
				if(i<rows.length() - 1) {
					relatedTickers.append(",");
				}
				insertNameIntoMap(currTicker, currTickerName);								
			}
			
			insertRelatedIntoMap(ticker, relatedTickers.toString());
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block			
			jsonRelatedString = replaceAll(jsonRelatedString,"\\x26", "&");
			extractNameAndRelatedTickersFromJson(ticker, jsonRelatedString);
			e.printStackTrace();
		}
	}
	
	private String replaceAll(String a, String b, String replace) {
		//char[] b = {'\\', 'x', '2', '6'};
		StringBuilder resultBldr = new StringBuilder(a.length());
		
		int j = 0;
		boolean found = false;
		for(int i=0; i<a.length(); i++) {
			
			if(a.charAt(i) == b.charAt(j)) {
				found = true;
			} else {
				found = false;
			}
			
			
			if(found) {
				j++;
				if(j==b.length()) {
					j = 0;
					//copy the result
					resultBldr.append(replace);
				}					
			} else {
				//copy the substring till j
				if(j>0) {
					for(int k=0; k<j; k++) {
						resultBldr.append(b.charAt(k));
					}
				}
				resultBldr.append(a.charAt(i));
			}			
		}
		return resultBldr.toString();
	}
	
	private void insertNameIntoMap(String ticker, String name) {
		List<String> tickerInfoList = this.getOrCreateTickerInfoList(ticker);
		if(tickerInfoList.get(INDEX_NAME) == null) {
			if(debug) {
				System.out.println("inserting " + name);
			}
			tickerInfoList.set(INDEX_NAME, name);
		}
	}
	
	private void insertSectorIntoMap(String ticker, String sector) {
		List<String> tickerInfoList = this.getOrCreateTickerInfoList(ticker);
		if(debug) {
			System.out.println("inserting " + sector);
		}
		tickerInfoList.set(INDEX_SECTOR, sector);
	}
	
	private void insertIndustryIntoMap(String ticker, String industry) {
		List<String> tickerInfoList = this.getOrCreateTickerInfoList(ticker);
		if(debug) {
			System.out.println("inserting " + industry);
		}
		tickerInfoList.set(INDEX_INDUSTRY, industry);
	}
	
	private void insertRelatedIntoMap(String ticker, String related) {
		List<String> tickerInfoList = this.getOrCreateTickerInfoList(ticker);
		if(debug) {
			System.out.println("inserting " + related);
		}
		tickerInfoList.set(INDEX_RELATED, related);
	}
	
	private boolean sectorExists(String ticker) {
		List<String> tickerInfoList = this.getOrCreateTickerInfoList(ticker);
		return (tickerInfoList.get(INDEX_SECTOR) != null);
	}
	
	private boolean relatedExists(String ticker) {
		List<String> tickerInfoList = this.getOrCreateTickerInfoList(ticker);
		return (tickerInfoList.get(INDEX_RELATED) != null);
	}
	
	private boolean industryExists(String ticker) {
		List<String> tickerInfoList = this.getOrCreateTickerInfoList(ticker);
		return (tickerInfoList.get(INDEX_INDUSTRY) != null);
	}
	
	private List<String> getOrCreateTickerInfoList(String ticker) {
		if(tickerInfoMap.get(ticker) == null) {
			List<String> list = new ArrayList<String>(4);
			list.add(null);
			list.add(null);
			list.add(null);
			list.add(null);
			tickerInfoMap.put(ticker, list);
		}
		List<String> tickerInfoList = tickerInfoMap.get(ticker);
		return tickerInfoList;
	}

	public static void main(String[] args) {
		InputStream instream = GoogTickerInfoPopulator.class.getResourceAsStream("googfin2.txt");
		GoogTickerInfoPopulator infoPopulator = GoogTickerInfoPopulator.getInstance();
		infoPopulator.populateTickerInfo("LDK", instream);
	}
}
