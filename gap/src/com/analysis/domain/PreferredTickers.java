package com.analysis.domain;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.users.User;

@PersistenceCapable(identityType=IdentityType.APPLICATION)
public class PreferredTickers {
	
	@Persistent
	private User user; 
	
	@PrimaryKey
	@Persistent
	private String email;
	
	@Persistent
	private String tickersString;
	
	public PreferredTickers(User user, String tickersString) {
		super();
		this.user = user;
		this.tickersString = tickersString;
		this.email = user.getEmail();
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTickersString() {
		return tickersString;
	}

	public void setTickersString(String tickersString) {
		this.tickersString = tickersString;
	}
	
	
}
