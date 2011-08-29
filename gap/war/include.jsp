<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>

<div id="topheader" class="topheader">
	</div>
	<div id="topheader1" class="topheader" style="display:block">
	
		<div class="leftElement"></div>
		<div class="rightElement">
		<%
	    UserService userService = UserServiceFactory.getUserService();
	    User user = userService.getCurrentUser();
	    boolean userLoggedIn = user != null;
	    if (user != null) {
	%>
	<span>Hello, <%= user.getNickname() %>! (You can
	<a href="<%= userService.createLogoutURL(request.getRequestURI()) %>">sign out</a>.)</span>
	<%
	    } else {
	%>
	<span>Hello!
	<a href="<%= userService.createLoginURL(request.getRequestURI()) %>">Sign in</a>
	</span>
	<%
	    }
	%>
		</div>
		<div class="clearBothElement"></div>
	<%
	    if (!userLoggedIn) {
	%>	
		<div style="text-align:center;"><h1>Please log in!!!</h1>
		</div>	
	<%
	    }	    	
	%>	
		
	</div>	