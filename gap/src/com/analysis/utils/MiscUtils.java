package com.analysis.utils;

public class MiscUtils {
	public static String convertJsDatePickerFormatToJavaFormat(String input) {
		return input.replaceAll("mm", "MM");
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
		} else if("Consumer Non cyclical".equalsIgnoreCase(name)) {
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
		} else {
			return -1;
		}
	}
}
