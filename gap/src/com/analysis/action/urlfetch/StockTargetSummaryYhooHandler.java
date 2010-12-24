package com.analysis.action.urlfetch;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class StockTargetSummaryYhooHandler extends DefaultHandler {
	
	@Override
	public void startElement(String uri, String localName, String name,
			Attributes attributes) throws SAXException {
		if(localName.equals("td") && "yfnc_tablehead1".equals(attributes.getValue(uri, "class"))) {
			System.out.println("found mean recommendation");
		}
	}
	
	@Override
	public void endElement(String uri, String localName, String name)
			throws SAXException {
	}
}
