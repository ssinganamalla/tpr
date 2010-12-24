package com.analysis.domain;

import javax.jdo.annotations.Column;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.NullValue;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import org.apache.commons.lang.StringUtils;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;


@PersistenceCapable(identityType=IdentityType.APPLICATION, detachable="true")
public class RelatedTickers {

    @Persistent
    @PrimaryKey
    private Key key;

	@Persistent
	private String email;	

	/** ticker cannot be null **/
	@Persistent
	private String ticker;
	
	/**
	 * RelatedTickers string is tokenized by space
	 */
	@Persistent
	private String relatedTickers;

	public Key getKey() {
		return key;
	}

	public void setKey(Key key) {
		this.key = key;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRelatedTickers() {
		return relatedTickers;
	}

	public void setRelatedTickers(String relatedTickers) {
		this.relatedTickers = relatedTickers;
	}

	public String getTicker() {
		return ticker;
	}

	public void setTicker(String ticker) {
		this.ticker = ticker;
	}
	
	//call this only when email and ticker are set. This method generates a key and sets it
	public void setKey() {
		Key k = RelatedTickers.generateKey(this.getEmail(), this.getTicker());
		this.key = k;
	}
	
	@Override
	public boolean equals(Object obj) {
		
		if(!(obj instanceof RelatedTickers)) {
			return false;
		}
		
		RelatedTickers temp = (RelatedTickers)obj;
		return this.email.equals(temp.email) &&
				this.ticker.equals(temp.ticker) &&
				this.relatedTickers.equals(temp.relatedTickers);
	}
	
	@Override
	public int hashCode() {
		
		return this.email.hashCode() + this.ticker.hashCode() + this.relatedTickers.hashCode();
	
	}
	
	/** Generate the key and use it to store the object **/
	public static Key generateKey(String email, String ticker) {
		if(StringUtils.isEmpty(ticker)) {
			throw new RuntimeException("ticker cannot be empty");
		}
		
		String userEmail = StringUtils.isEmpty(email) ? "" : email;
		String keyString = userEmail + ticker;
		
		Key key = KeyFactory.createKey(RelatedTickers.class.getSimpleName(), keyString);
		return key;
	}
}
