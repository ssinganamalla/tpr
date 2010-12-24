package com.analysis.dao;

import com.analysis.domain.financialratios.RatioThresholdsPrefs;
import com.google.appengine.api.datastore.Key;

/**
 * Transactions should be part of this DAO. But sometimes you might need the transactions around the service layer.
 * Not sure if the Google JDO would join the service level transaction. So it would be good if it is able to keep the transactions
 * out of the code to some xml configuration, using aspects or a Decorator???
 * @author ssinganamalla
 *
 */

public interface RatioThresholdsDAO {
	void addRatioThresholds(RatioThresholdsPrefs vo);
	
	@Deprecated
	void addOrUpdateRatioThresholds(RatioThresholdsPrefs vo);
	void updateRatioThresholds(RatioThresholdsPrefs vo);
	
	
	RatioThresholdsPrefs getRatioThresholds(String email);
	RatioThresholdsPrefs getRatioThresholds(Key key);
}
