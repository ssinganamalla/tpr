package com.analysis.domain;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable="true")
public class UserComparisonTickers {

	public UserComparisonTickers() {
		super();
	}
	
	public UserComparisonTickers(String email, String comparisionTickers) {
		super();
		this.email = email;
		this.comparisionTickers = comparisionTickers;
		this.longDetails = "";
		this.shortDetails = "";
	}

	public UserComparisonTickers(String email, String comparisionTickers,
			String shortDetails, String longDetails) {
		super();
		this.email = email;
		this.comparisionTickers = comparisionTickers;
		this.shortDetails = shortDetails;
		this.longDetails = longDetails;
	}



	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
	@PrimaryKey
	private Long id;
	
	@Persistent
	private String email;
	
	@Persistent
	private String comparisionTickers;
	
	@Persistent
	private String shortDetails;
	
	@Persistent
	private String longDetails;

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

	public String getComparisionTickers() {
		return comparisionTickers;
	}

	public void setComparisionTickers(String comparisionTickers) {
		this.comparisionTickers = comparisionTickers;
	}

	public String getShortDetails() {
		return shortDetails;
	}

	public void setShortDetails(String shortDetails) {
		this.shortDetails = shortDetails;
	}

	public String getLongDetails() {
		return longDetails;
	}

	public void setLongDetails(String longDetails) {
		this.longDetails = longDetails;
	}

}
