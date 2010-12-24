package com.analysis.dao;

import java.util.Collection;

import com.analysis.domain.UserComparisonTickers;
import com.analysis.vo.UserTicker;

public interface UserComparisonTickersDAO {
	Collection<UserComparisonTickers> getComparisonTickers(String email);
	void addComparisionTickers(UserComparisonTickers comparisonTickers);
}
