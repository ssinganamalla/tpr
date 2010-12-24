package com.analysis.action;

import com.opensymphony.xwork2.ActionSupport;

public class LoginAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private String username;
	private String password;

	public String login(){
		if(username.equals("whyjava") && password.equals("password")){
			addActionMessage("You are successfully logged in.");
			return SUCCESS;
		}
		addActionError("Username and Password Combination doesnot match.");
		return INPUT;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}