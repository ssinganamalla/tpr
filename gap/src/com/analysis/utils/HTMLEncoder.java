package com.analysis.utils;

import org.apache.commons.lang.StringEscapeUtils;

public class HTMLEncoder {
	public static String encode(String val) {
		return StringEscapeUtils.escapeHtml(val);
	}
}
