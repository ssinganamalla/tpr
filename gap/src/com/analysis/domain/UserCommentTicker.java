package com.analysis.domain;

import java.util.Date;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
/**
 * Used for inverse relationship of TickerComments.
 * 
 * This is helpful when you want tickers for a user who have added comments.
 * 
 * When you add a comment in the TickerComments, add a ticker in this table for that user if that does not exist.
 * 
 * @author Srinivas Singanamalla
 *
 */
@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class UserCommentTicker {

	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Long id;

    @Persistent
    private String email;
    
    @Persistent
    private String ticker;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTicker() {
		return ticker;
	}

	public void setTicker(String ticker) {
		this.ticker = ticker;
	}
}
