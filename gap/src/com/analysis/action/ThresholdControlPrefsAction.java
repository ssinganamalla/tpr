package com.analysis.action;

import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.EnumMap;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.analysis.action.basic.BasicActionSupport;
import com.analysis.domain.financialratios.Ratio;
import com.analysis.domain.financialratios.RatioThresholdsPrefs;
import com.analysis.enums.Enums;
import com.analysis.service.BasicService;
import com.analysis.service.RatioControlPrefsService;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.utils.json.JSONArray;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

public class ThresholdControlPrefsAction extends BasicActionSupport{
	private static final long serialVersionUID = 7427618395538858103L;

	private static final Logger log = Logger.getLogger(ThresholdControlPrefsAction.class.getName());
	
	private static EnumMap<Enums.FinancialRatio, String> ratioEnumToActionFieldMap = null;
	private static EnumMap<Enums.FinancialRatio, String> ratioEnumToJsonIdMap = null;
	
	private RatioControlPrefsService ratioControlPrefsService = null;
	
	private InputStream inputStream;
    public InputStream getInputStream() {
        return inputStream;
    }

    //Do we move this to the basic action support and initialize externally???
    protected User getUser() {
    	//get the tickerStr
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		return user;
    }
    
    @Override
    public String input() throws Exception {
    	// TODO Auto-generated method stub
    	return super.input();
    }
    
    public String execute() throws Exception {
        return getThresholdsPrefs();
    }
    
    public String getThresholdsPrefs() {
    	String email = getUser()!=null? getUser().getEmail() : null;
    	RatioThresholdsPrefs prefs = ratioControlPrefsService.getRatioThresholds(email);
    	try {
			inputStream = new StringBufferInputStream(createJson(prefs));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			inputStream = new StringBufferInputStream("NODATA");
			e.printStackTrace();
			log.logp(Level.SEVERE, this.getClass().getName(), "getThresholdPrefs", "Could not get data for the threshold ratio prefs");
			return ERROR;
		}
    	return SUCCESS;
    }
    
    public String getLiquidRatioPrefs() {
    	String email = getUser()!=null? getUser().getEmail() : null;
    	RatioThresholdsPrefs prefs = ratioControlPrefsService.getLiquidRatioThresholds(email);
    	try {
			inputStream = new StringBufferInputStream(createJson(prefs));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			inputStream = new StringBufferInputStream("NODATA");
			e.printStackTrace();
			log.logp(Level.SEVERE, this.getClass().getName(), "getLiquidRatioPrefs", "Could not get data for the threshold ratio prefs");
			return ERROR;
		}
    	return SUCCESS;
    }
    
    public String getAssetMgmtRatioPrefs() {
    	String email = getUser()!=null? getUser().getEmail() : null;
    	RatioThresholdsPrefs prefs = ratioControlPrefsService.getAssetMgmtRatioPrefs(email);
    	try {
			inputStream = new StringBufferInputStream(createJson(prefs));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			inputStream = new StringBufferInputStream("NODATA");
			e.printStackTrace();
			log.logp(Level.SEVERE, this.getClass().getName(), "getAssetMgmtRatioPrefs", "Could not get data for the threshold ratio prefs");
			return ERROR;
		}
    	return SUCCESS;
    }
    
    public String getProfitbailityRatioPrefs() {
    	String email = getUser()!=null? getUser().getEmail() : null;
    	RatioThresholdsPrefs prefs = ratioControlPrefsService.getProfitbailityRatioPrefs(email);
    	try {
			inputStream = new StringBufferInputStream(createJson(prefs));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			inputStream = new StringBufferInputStream("NODATA");
			e.printStackTrace();
			log.logp(Level.SEVERE, this.getClass().getName(), "getProfitbailityRatioPrefs", "Could not get data for the threshold ratio prefs");
			return ERROR;
		}
    	return SUCCESS;
    }
    
    public String getLeverageRatioPrefs() {
    	String email = getUser()!=null? getUser().getEmail() : null;
    	RatioThresholdsPrefs prefs = ratioControlPrefsService.getLeverageRatioPrefs(email);
    	try {
			inputStream = new StringBufferInputStream(createJson(prefs));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			inputStream = new StringBufferInputStream("NODATA");
			e.printStackTrace();
			log.logp(Level.SEVERE, this.getClass().getName(), "getLeverageRatioPrefs", "Could not get data for the threshold ratio prefs");
			return ERROR;
		}
    	return SUCCESS;
    }
    
    public String applyThresholdPrefs() {
    	User user = getUser();
    	
    	if(user != null) {
    		RatioThresholdsPrefs prefs = createRatioThresholds(user.getEmail());
    		ratioControlPrefsService.addOrUpdateRatioThresholds(prefs);
    	}
    	inputStream = new StringBufferInputStream("Ok");
    	return SUCCESS;
    }
    
    
    
    
    
    
	private String createJson(RatioThresholdsPrefs prefs) throws JSONException {
		
		List<Ratio> ratios = prefs.getListofRatios();
		
		JSONArray ja = new JSONArray();
		for(int i=0; i<ratios.size(); i++) {
			if(ratios.get(i) == null) {
				continue;
			}
			JSONObject jo = new JSONObject();
			Enums.FinancialRatio enumId = ratios.get(i).getEnum();
			jo.put("id", getRatioEnumToJsonIdMap().get(enumId));
			jo.put("fn", getRatioEnumToActionFieldMap().get(enumId));
			if(ratios.get(i).isReverse()) {
				jo.put("rev", true);
			}
			jo.put("bl", ratios.get(i).getBasicLabel());
			jo.put("mi", ratios.get(i).getMin());
			jo.put("ma", ratios.get(i).getMax());
			jo.put("st", ratios.get(i).getStep());
			jo.put("t", "lslider");
			jo.put("v", ratios.get(i).getVal());
			if(ratios.get(i).isVisible()) {
				jo.put("vi", 1);
			}else {
				jo.put("vi", 0); //not  visible
			}
			ja.put(jo);
		}
		return ja.toString();
	}

	
	
	
	/**
	 * Returns the map containing enums to the action field names. This is used to
	 * send the data from the json when doing a form submission
	 * @return
	 */
	private static EnumMap<Enums.FinancialRatio, String> getRatioEnumToActionFieldMap() {
		if(ratioEnumToActionFieldMap == null) {
			ratioEnumToActionFieldMap = new EnumMap<Enums.FinancialRatio, String>(Enums.FinancialRatio.class);
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.AVG_COLLECTION_PERIOD, "avgCollectPeriod");
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.CURRENT_RATIO, "currentRatio");
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.DEBT_TO_ASSETS, "debtToAssets");
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.DEBT_TO_CASH, "debtToCash");
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.DEBT_TO_CURRENT_LIABILITIES, "debtToCurrLiabilities");
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.DEBT_TO_EQUITY, "debtToEquity");
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.CASH_TO_DEBT, "cashToDebt");
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.CASH_TO_CURR_LIABILITIES, "cashToCurrLiabilities");
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.GROSS_MARGIN, "grossMargin");
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.INVENTORY_TURNS, "invTurns");
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.NET_PROFIT_MARGIN, "netProfitMargin");
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.QUICK_RATIO, "quickRatio");
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.RETURN_ON_ASSETS, "roa");
			ratioEnumToActionFieldMap.put(Enums.FinancialRatio.RETURN_ON_EQUITY, "roe");
		}
		return ratioEnumToActionFieldMap;
	}

	
	/**
	 * Returns the map containing enums to the json id map. 
	 * This should map the javascript constants finSheets.js
	 * @return
	 * The value of the map should match the javascript side 
	 * constants PeriodStmts.CURRENT_RATIO
	 * PeriodStmts.xxxx
	 * 
	 */
	private static EnumMap<Enums.FinancialRatio, String> getRatioEnumToJsonIdMap() {
		if(ratioEnumToJsonIdMap == null) {
			ratioEnumToJsonIdMap = new EnumMap<Enums.FinancialRatio, String>(Enums.FinancialRatio.class);
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.QUICK_RATIO, "qtr");
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.CURRENT_RATIO, "cr");
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.AVG_COLLECTION_PERIOD, "rtd");
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.CASH_TO_DEBT, "ctdr");
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.CASH_TO_CURR_LIABILITIES, "ctcl");
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.GROSS_MARGIN, "i_gpm");
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.INVENTORY_TURNS, "it");
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.NET_PROFIT_MARGIN, "i_npm");
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.RETURN_ON_ASSETS, "rta");
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.RETURN_ON_EQUITY, "roe");
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.DEBT_TO_ASSETS, "dr");
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.DEBT_TO_CASH, "dtc");
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.DEBT_TO_CURRENT_LIABILITIES, "dtcl");
			ratioEnumToJsonIdMap.put(Enums.FinancialRatio.DEBT_TO_EQUITY, "der");
		}
		return ratioEnumToJsonIdMap;
	}
	
	public void setRatioControlPrefsService(RatioControlPrefsService ratioControlPrefsService) {
		this.ratioControlPrefsService = ratioControlPrefsService;
	}
	
	public RatioControlPrefsService getRatioControlPrefsService() {
		return this.ratioControlPrefsService;
	}
	
	private RatioThresholdsPrefs createRatioThresholds(String email){
		RatioThresholdsPrefs ratioThresholds = getRatioControlPrefsService().getDefaultRatioThresholdsPrefsDO(email!=null?email:BasicService.defaultEmail);
		ratioThresholds.getAvgCollectionPeriod().setVal(getAvgCollectPeriod());
		ratioThresholds.getCashToCurrLiabilities().setVal(getCashToCurrLiabilities());
		ratioThresholds.getCashToDebt().setVal(getCashToDebt());
		ratioThresholds.getCurrentRatio().setVal(getCurrentRatio());
		ratioThresholds.getDebtToAssets().setVal(getDebtToAssets());
		ratioThresholds.getDebtToCash().setVal(getDebtToCash());
		ratioThresholds.getDebtToCurrLiabilities().setVal(getDebtToCurrLiabilities());
		ratioThresholds.getDebtToEquity().setVal(getDebtToEquity());
		ratioThresholds.getGrossMargin().setVal(getGrossMargin());
		ratioThresholds.getInvTurns().setVal(getInvTurns());
		ratioThresholds.getNetProfitMargin().setVal(getNetProfitMargin());				
		ratioThresholds.getQuickRatio().setVal(getQuickRatio());
		ratioThresholds.getReturnOnAssets().setVal(getRoa());
		ratioThresholds.getReturnOnEquity().setVal(getRoe());
		
		return ratioThresholds;
	}
	
	//Form parameters
	private double avgCollectPeriod;
	private double debtToAssets;
	private double grossMargin;
	private double invTurns;
	private double debtToCurrLiabilities;
	private double currentRatio;

	private double cashToCurrLiabilities;
	private double cashToDebt;
	private double quickRatio;
	private double debtToCash;
	private double debtToEquity;
	private double roe;
	private double roa;
	private double netProfitMargin;
	public double getAvgCollectPeriod() {
		return avgCollectPeriod;
	}

	public void setAvgCollectPeriod(double avgCollectPeriod) {
		this.avgCollectPeriod = avgCollectPeriod;
	}

	public double getDebtToAssets() {
		return debtToAssets;
	}

	public void setDebtToAssets(double debtToAssets) {
		this.debtToAssets = debtToAssets;
	}

	public double getGrossMargin() {
		return grossMargin;
	}

	public void setGrossMargin(double grossMargin) {
		this.grossMargin = grossMargin;
	}

	public double getInvTurns() {
		return invTurns;
	}

	public void setInvTurns(double invTurns) {
		this.invTurns = invTurns;
	}

	public double getDebtToCurrLiabilities() {
		return debtToCurrLiabilities;
	}

	public void setDebtToCurrLiabilities(double debtToCurrLiabilities) {
		this.debtToCurrLiabilities = debtToCurrLiabilities;
	}

	public double getCurrentRatio() {
		return currentRatio;
	}

	public void setCurrentRatio(double currentRatio) {
		this.currentRatio = currentRatio;
	}

	public double getQuickRatio() {
		return quickRatio;
	}

	public void setQuickRatio(double quickRatio) {
		this.quickRatio = quickRatio;
	}

	public double getDebtToCash() {
		return debtToCash;
	}

	public void setDebtToCash(double debtToCash) {
		this.debtToCash = debtToCash;
	}

	public double getRoe() {
		return roe;
	}

	public void setRoe(double roe) {
		this.roe = roe;
	}

	public double getRoa() {
		return roa;
	}

	public void setRoa(double roa) {
		this.roa = roa;
	}

	public double getNetProfitMargin() {
		return netProfitMargin;
	}

	public void setNetProfitMargin(double netProfitMargin) {
		this.netProfitMargin = netProfitMargin;
	}

	public void setCashToCurrLiabilities(double cashToCurrLiabilities) {
		this.cashToCurrLiabilities = cashToCurrLiabilities;
	}

	public double getCashToCurrLiabilities() {
		return cashToCurrLiabilities;
	}

	public void setCashToDebt(double cashToDebt) {
		this.cashToDebt = cashToDebt;
	}

	public double getCashToDebt() {
		return cashToDebt;
	}

	public void setDebtToEquity(double debtToEquity) {
		this.debtToEquity = debtToEquity;
	}

	public double getDebtToEquity() {
		return debtToEquity;
	}
}