package com.analysis.vo;

import javax.jdo.annotations.EmbeddedOnly;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.NotPersistent;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

public class UserTickers {
	
	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
	@PrimaryKey
	private String email;

	@EmbeddedOnly
	public static class Ticker {
		@Persistent
		private String tickerSymbol;
		
		@Persistent
		private int sectorID;
		
		@Persistent
		private int costBasis;
		
		@Persistent
		private int numShares;
	}
}
