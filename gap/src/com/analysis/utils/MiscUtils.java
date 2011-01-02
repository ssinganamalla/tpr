package com.analysis.utils;

public class MiscUtils {
	public static String convertJsDatePickerFormatToJavaFormat(String input) {
		return input.replaceAll("mm", "MM");
	}
}
