package com.analysis.action.basic;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.opensymphony.xwork2.ActionSupport;

public class BasicActionSupport extends ActionSupport{
	
	public String getEmail() {
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		if(user != null) {
			return user.getEmail();
		} else {
//			return  "guest81mda931032odal@ghuiew.com";
			return  "srinivas.singanamalla@gmail.com";
		}
	}

}
