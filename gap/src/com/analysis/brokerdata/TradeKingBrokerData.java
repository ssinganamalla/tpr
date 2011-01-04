package com.analysis.brokerdata;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;
import java.util.regex.Pattern;

import com.analysis.domain.PortfolioTicker;

public class TradeKingBrokerData extends BrokerData {
	
	private List<PortfolioTicker> extractTickers(String test) {
		
		//Use a scanner use newline to separeate the Strings array
		Scanner scanner = new Scanner(test);
		String tickerLine = "";
		
		ArrayList<PortfolioTicker> tickers = new ArrayList<PortfolioTicker>();
		int i = 0;
		while(scanner.hasNextLine()) {
			tickerLine = scanner.nextLine();
			if(i == 0) {
				if(!verifyTickerHeaders(tickerLine)) {
					throw new RuntimeException("Error in the ticker headers");
				}
			} else {
				tickers.add(extractTicker(tickerLine));
			}
			i++;
		}
		
		return tickers;		
	}
	
	private boolean verifyTickerHeaders(String headers) {
		return true;
	}
	
	
	private PortfolioTicker extractTicker(String tickerLine) {
		PortfolioTicker ticker = new PortfolioTicker();
		//Pattern skipPattern = Pattern.compile("[$\"]");
		//scanner.skip(skipPattern);
		
		String updatedTickerLine = tickerLine.replaceAll(",", "");
		updatedTickerLine = updatedTickerLine.replaceAll("\\$", "");
		updatedTickerLine = updatedTickerLine.substring(1, updatedTickerLine.length() - 1);
		String[] values = updatedTickerLine.split("\"\"");	
		ticker = createTicker(values);
		
		return ticker;
	}
	
	private PortfolioTicker createTicker(String[] values) {
		PortfolioTicker ticker = new PortfolioTicker();
		if(values == null || values.length < 9) {
			return ticker;
		}		
		ticker.setSymbol(values[0]);
		ticker.setQuantity(Integer.valueOf(values[2]));
		ticker.setCostBasis(Double.valueOf(values[3]));
		//5, 6 price, change
		ticker.setGainLoss(Double.valueOf(values[7]));
		ticker.setMarketValue(Double.valueOf(values[8]));
		
		return ticker;
	}

	@Override
	public List<PortfolioTicker> createTickersList() {
		return extractTickers(this.getBrokerData());
	}

}
