package com.analysis.service;

import java.util.Collection;

import com.analysis.domain.UserComparisonTickers;
import com.utils.json.JSONException;

public interface ComparisonTickersService {
	Collection<UserComparisonTickers> getComparisonTickers(String email);
	
	/**
	 * Does not access the database for this call
	 * @param list
	 * @return
	 * @throws JSONException
	 */
	String getJson(Collection<UserComparisonTickers> list);
}
