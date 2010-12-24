package com.analysis.vo;

import java.util.List;

import javax.jdo.annotations.EmbeddedOnly;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.Join;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@Deprecated
@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class UserT {
	
	
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private String email;
	
	@Persistent(mappedBy = "userT")
    private List<UserTicker> listOfUserTickers;
	

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<UserTicker> getListOfUserTickers() {
		return listOfUserTickers;
	}

	public void setListOfUserTickers(List<UserTicker> contactInfoSets) {
		this.listOfUserTickers = contactInfoSets;
	}
}

