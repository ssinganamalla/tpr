package com.analysis.utils;

import com.analysis.enums.*;
public class MiscUtils {
	public static String convertJsDatePickerFormatToJavaFormat(String input) {
		return input.replaceAll("mm", "MM");
	}
	
	enum Sector {
		//0				1				2					3								4	  5			6			7			8			9				10     11		 12		13                  14
		BASIC_MATERIALS, CAPITAL_GOODS, CONGLOMERATES, CONSUMER_CYCLICAL, CONSUMER_NON_CYCLICAL, ENERGY, FINANCIAL, HEALTHCARE, SERVICES, TECHNOLOGY, TRANSPORTATION, UTILITIES, SOLAR, CHINESE_SMALLCAP, INDIAN
	}
	public static int getSectorIndex(String name) {
		
		if("Basic Materials".equalsIgnoreCase(name)) {
			return 0;
		} else if("Capital Goods".equalsIgnoreCase(name)) {
			return 1;
		} else if("Conglomerates".equalsIgnoreCase(name)) {
			return 2;
		} else if("Consumer Cyclical".equalsIgnoreCase(name)) {
			return 3;
		} else if("Consumer/Non-Cyclical".equalsIgnoreCase(name)) {
			return 4;
		} else if("Energy".equalsIgnoreCase(name)) {
			return 5;
		} else if("Financial".equalsIgnoreCase(name)) {
			return 6;
		} else if("Healthcare".equalsIgnoreCase(name)) {
			return 7;
		} else if("Services".equalsIgnoreCase(name)) {
			return 8;
		} else if("Technology".equalsIgnoreCase(name)) {
			return 9;
		} else if("Transportation".equalsIgnoreCase(name)) {
			return 10;
		} else if("Utilities".equalsIgnoreCase(name)) {
			return 11;
		} else if("Solar".equalsIgnoreCase(name)) {
			return 12;
		} else if("Chinese Smallcap".equalsIgnoreCase(name)) {
			return 13;
		} else if("Indian".equalsIgnoreCase(name)) {
			return 14;
		} else {
			return -1;
		}
	}
}
