package com.analysis.enums;

public interface Enums {
	enum FinancialRatio{ RESERVED, DEBT_TO_CASH, CURRENT_RATIO, QUICK_RATIO, DEBT_TO_CURRENT_LIABILITIES, INVENTORY_TURNS,
						 AVG_COLLECTION_PERIOD, RETURN_ON_ASSETS, RETURN_ON_EQUITY, GROSS_MARGIN, NET_PROFIT_MARGIN, DEBT_TO_EQUITY, DEBT_TO_ASSETS,
						 CASH_TO_DEBT, CASH_TO_CURR_LIABILITIES};
						 
	enum BrokerId {
		RESERVED, TRADE_KING, ZECCO
	}
	
	enum Sector {
		//0				1				2					3								4	  5			6			7			8			9				10     11
		BASIC_MATERIALS, CAPITAL_GOODS, CONGLOMERATES, CONSUMER_CYCLICAL, CONSUMER_NON_CYCLICAL, ENERGY, FINANCIAL, HEALTHCARE, SERVICES, TECHNOLOGY, TRANSPORTATION, UTILITIES
	}
	
	enum Industry {
		
	}

	enum TransactionType {
		BUY, SELL
	}
	
	enum StatementType {
		BALANCE_SHEET {
			public String toString(){
				return "Balance Sheet";
			}
		}, INCOME_STATEMENT {
			public String toString(){
				return "Income Statement";
			}
		}, CASH_FLOW {
			public String toString(){
				return "Cash Flow";
			}
		};
	}
	
	enum PeriodType {
		INTERIM {
			public String toString(){
				return "Interim";
			}
		}, YEARLY {
			public String toString(){
				return "Yearly";
			}
		}
	}
	
	enum CommentRating {
		ONE, TWO, THREE, FOUR, FIVE
	}
}
