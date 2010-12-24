package com.analysis.utils;

import java.util.Iterator;

import com.utils.json.JSONException;
import com.utils.json.JSONObject;

public class JSONObjectUtils {
	public static JSONObject add(JSONObject obj1, JSONObject obj2) throws JSONException {
		JSONObject result = new JSONObject();
		if(obj1 == null && obj2 == null) {
			return null;
		}
		
		if(obj1 == null) {
			return obj2;
		}
		
		if(obj2 == null) {
			return obj1;
		}
		
		//add all key pairs which are in obj1 and not in obj2
		Iterator iter = obj1.keys();
		while(iter.hasNext()) {
			String key = (String)iter.next();
			if(!obj2.has(key)) {
				result.put(key, obj1.get(key));
			}
		}
		
		//add all key pairs which are in obj2
		Iterator iter2 = obj2.keys();
		while(iter2.hasNext()) {
			String key = (String)iter2.next();
			result.put(key, obj2.get(key));
		}
		
		
		return result; 
	}
}
