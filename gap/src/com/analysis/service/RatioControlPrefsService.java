package com.analysis.service;

import com.analysis.domain.financialratios.RatioThresholdsPrefs;

public interface RatioControlPrefsService {
	
	/**
	 * Gets the Ratio Threshold values
	 * @param email
	 * @return
	 */
	public RatioThresholdsPrefs getRatioThresholds(String email);
	
	/**
	 * Returns the preferences for the liquid ratios. 
	 * This method returns all the thereshold preferences with the one for liquid ratios as visible.
	 * 
	 * @param email
	 * @return
	 */
	public RatioThresholdsPrefs getLiquidRatioThresholds(String email);
	
	/**
	 * Returns the preferences for the asset management ratios. 
	 * This method returns all the thereshold preferences with the one for liquid ratios as visible.
	 * @param email
	 * @return
	 */
	public RatioThresholdsPrefs getAssetMgmtRatioPrefs(String email);
	
	/**
	 * Returns the preferences for the profitability ratios. 
	 *  This method returns all the thereshold preferences with the one for liquid ratios as visible.
	 * @param email
	 * @return
	 */
	public RatioThresholdsPrefs getProfitbailityRatioPrefs(String email);
	
	/**
	 * Returns the preferences for the leverage ratios. 
	 *  This method returns all the thereshold preferences with the one for liquid ratios as visible.
	 * @param email
	 * @return
	 */
	public RatioThresholdsPrefs getLeverageRatioPrefs(String email);

	
	/**
	 * 
	 * @param email
	 * @param vo
	 */
	void addOrUpdateRatioThresholds(RatioThresholdsPrefs prefs);
	
	
	/**
	 * Gets the default preference
	 * Not a DB call
	 * @param email TODO
	 * @return
	 */
	public RatioThresholdsPrefs getDefaultRatioThresholdsPrefsDO(String email);
	
}
