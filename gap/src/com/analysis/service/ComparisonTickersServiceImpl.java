package com.analysis.service;

import java.util.Collection;

import com.analysis.dao.UserComparisonTickersDAO;
import com.analysis.dao.UserComparisonTickersDAOImpl;
import com.analysis.domain.UserComparisonTickers;
import com.utils.json.JSONArray;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

public class ComparisonTickersServiceImpl implements ComparisonTickersService {
	
	public ComparisonTickersServiceImpl() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public Collection<UserComparisonTickers> getComparisonTickers(String email) {
		return getUserComparisonTickersDAO().getComparisonTickers(email);
	}

	UserComparisonTickersDAO _userDao;

	private UserComparisonTickersDAO getUserComparisonTickersDAO() {
		if (_userDao == null) {
			_userDao = new UserComparisonTickersDAOImpl();
		}
		return _userDao;
	}

	/**
	 * Returns a json of type
	 * [{"cb":10,"t":"BAC","n":10},{"cb":5,"t":"C","n":10}
	 * ,{"cb":80,"t":"H","n":10}]
	 * 
	 * @param list
	 * @return
	 * @throws JSONException
	 */
	public String getJson(Collection<UserComparisonTickers> list) {
		try {
			JSONArray jarrayOfTickers = new JSONArray();
			for (UserComparisonTickers userComparisonTickers : list) {
				JSONObject jo = new JSONObject();
				jo.put("t", userComparisonTickers.getComparisionTickers());
				jo.put("sd", userComparisonTickers.getShortDetails());
				jo.put("ld", userComparisonTickers.getLongDetails());
				jo.put("id", userComparisonTickers.getId());
				jarrayOfTickers.put(jo);
			}
			return jarrayOfTickers.toString();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "[]";
		}

	}
}
