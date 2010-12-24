package com.analysis.brokerdata;

import com.analysis.enums.Enums;

public class BrokerDataFactory {
	public static BrokerData getBrokerData(Enums.BrokerId index) {
		BrokerData data = null;
		switch (index) {
		case TRADE_KING:
			data = new TradeKingBrokerData();
			break;

		default:
			break;
		}
		return data;
	}
}
