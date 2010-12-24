package com.analysis;

public interface Sector {
	public static final int RESERVED= -1;
	public static final int BASIC_MATERIALS = 0;
	public static final int CAPITAL_GOODS = 1;
	public static final int CONGLOMERATES= 2;
	public static final int CONSUMER_CYCLICAL = 3;
	public static final int CONSUMER_NON_CYCLICAL = 4;
	public static final int ENERGY= 5;
	public static final int FINANCIAL= 6;
	public static final int HEALTHCARE= 7;
	public static final int SERVICES= 8;
	public static final int TECHNOLOGY= 9;
	public static final int TRANSPORATION= 10;
	public static final int UTILITIES= 11;
	/** INCREMENT THIS value when you add a sector **/
	public static final int NUM_SECTORS = 12;
	
	public static final String JSON_KEY_COST_BASIS = "cb";
	public static final String JSON_KEY_NUM_SHARES = "n";
	public static final String JSON_KEY_TICKER = "t";
	
}
