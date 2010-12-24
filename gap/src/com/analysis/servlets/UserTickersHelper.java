package com.analysis.servlets;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;

import org.apache.commons.lang.StringUtils;

import com.analysis.Sector;
import com.analysis.vo.UserTicker;
import com.utils.json.JSONArray;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

public class UserTickersHelper {
	/**
	 * Reads the tokenized tickers <code>tokenizedSectorsTicker</code> for a sector and returns a list of <code>UserTicker</code>
	 * Each company's ticker information is separated by a new line. and each company's information is tokenized by a space 
	 * ABCO 40 10 
	 * YHOO 50 10 
	 * CSCO 70 10
	 * 
	 * @param tokenizedSectorsTicker
	 * @return
	 */

	public static List<UserTicker> getSectorUserTickers(String email, String tokenizedSectorsTicker) {
		if(StringUtils.isNotEmpty(tokenizedSectorsTicker)) {
			String[] tokenesizedTickers = tokenizedSectorsTicker.split("\n");
			LinkedList<UserTicker> list = new LinkedList<UserTicker>();
			for(int i=0; i<tokenesizedTickers.length; i++) {
				if(StringUtils.isNotEmpty(tokenesizedTickers[i])) {
					Scanner scanner = new Scanner(tokenesizedTickers[i]);
					UserTicker info = new UserTicker();
					while(scanner.hasNext()) {
						info.setTickerSymbol(scanner.next());
						info.setAvgCost(Integer.parseInt(scanner.next()));
						info.setNumShares((Integer.parseInt(scanner.next())));
						info.setEmail(email);
					}
					list.add(info);
				}
			}
			return list;
		}
		return null;
	}
	
	
	/**
	 * Gets the List containing collection of <code>UserTicker</code>. The index of the List is the sectorIndex.
	 * 
	 * The collection in the list could be null.
	 * @param userTickers
	 * @return a list which is never null
	 * @deprecated
	 */
	public static List<Collection<UserTicker>> getCollectionBySectorIndex1(Collection<UserTicker> userTickers) {
		
		//initialize a list<Collection<tickerInfo>> with size sectors.length, sectorIndex as index
		List<Collection<UserTicker>> list = new ArrayList<Collection<UserTicker>>(Sector.NUM_SECTORS);
		
		//for each userTickers
		for (UserTicker userTickersInfo : userTickers) {
			if(userTickersInfo == null) continue;
			
			//get the collection at sector index
			int userTickerSectorIndex = userTickersInfo.getSectorID();
			Collection<UserTicker> collectionAtSectorIndex = list.get(userTickerSectorIndex);
			//create if empty and add it to the collection
			if(collectionAtSectorIndex == null) {
				collectionAtSectorIndex = new LinkedList<UserTicker>();
				collectionAtSectorIndex.add(userTickersInfo);
				list.add(userTickerSectorIndex, collectionAtSectorIndex);
			}
		}
		return list;
	}
	public static Map<Integer, Collection<UserTicker>> getCollectionBySectorIndex(Collection<UserTicker> userTickers) {
		
		//initialize a list<Collection<tickerInfo>> with size sectors.length, sectorIndex as index
		HashMap<Integer, Collection<UserTicker>> map = new HashMap<Integer, Collection<UserTicker>>(Sector.NUM_SECTORS);
		
		//for each userTickers
		for (UserTicker userTickersInfo : userTickers) {
			if(userTickersInfo == null) continue;
			
			//get the collection at sector index
			int userTickerSectorIndex = userTickersInfo.getSectorID();
			Collection<UserTicker> collectionAtSectorIndex = map.get(userTickerSectorIndex);
			//create if empty and add it to the collection
			if(collectionAtSectorIndex == null) {
				collectionAtSectorIndex = new LinkedList<UserTicker>();
				map.put(userTickerSectorIndex, collectionAtSectorIndex);
			}
			collectionAtSectorIndex.add(userTickersInfo);
		}
		return map;
	}
	
	/**
	 * Returns a json of type
	 * {"1":[{"cb":10,"t":"BAC","n":10},{"cb":5,"t":"C","n":10},{"cb":80,"t":"H","n":10}],
	 *  "0":[{"cb":40,"t":"ABCO","n":10},{"cb":50,"t":"YHOO","n":10},{"cb":70,"t":"CSCO","n":10}]}
	 *  
	 *  If there are no <code>UserTicker</code> in the list, then it won't be present in the json
	 *  
	 * @param list
	 * @return
	 * @throws JSONException 
	 */
	private static String getJson(Map<Integer, Collection<UserTicker>> list) throws JSONException {
		JSONObject ojo = new JSONObject();

		if(list == null) return ojo.toString();

		for(Integer sectorIndex:list.keySet()) {
			if(list.get(sectorIndex) != null || list.get(sectorIndex).size()>=0) {
				//tickers for a particular sectorIndex
				JSONArray jarrayOfTickers = new JSONArray();
				ojo.put("" +sectorIndex, jarrayOfTickers);
				Collection<UserTicker> userInfos = list.get(sectorIndex);
				for (Iterator iterator = userInfos.iterator(); iterator.hasNext();) {
					UserTicker userTickersInfo = (UserTicker) iterator.next();
					JSONObject jo = new JSONObject();
					jo.put(Sector.JSON_KEY_TICKER, userTickersInfo.getTickerSymbol());
					jo.put(Sector.JSON_KEY_COST_BASIS, userTickersInfo.getAvgCost());
					jo.put(Sector.JSON_KEY_NUM_SHARES, userTickersInfo.getNumShares());
					jarrayOfTickers.put(jo);
				}
			}
		}
		return ojo.toString();
	}
	
	public static String getJson(Collection<UserTicker> tickers) throws JSONException {
		
		return getJson(getCollectionBySectorIndex(tickers));
	}
}
