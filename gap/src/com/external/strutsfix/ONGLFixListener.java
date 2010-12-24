package com.external.strutsfix;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import ognl.OgnlRuntime;

public class ONGLFixListener  implements ServletContextListener, HttpSessionListener, HttpSessionAttributeListener {

   public ONGLFixListener()  {
   }

   public void contextInitialized(ServletContextEvent servletContextEvent)  {
       OgnlRuntime.setSecurityManager(null);
   }

@Override
public void contextDestroyed(ServletContextEvent arg0) {
	// TODO Auto-generated method stub
	
}

@Override
public void sessionCreated(HttpSessionEvent arg0) {
	// TODO Auto-generated method stub
	
}

@Override
public void sessionDestroyed(HttpSessionEvent arg0) {
	// TODO Auto-generated method stub
	
}

@Override
public void attributeAdded(HttpSessionBindingEvent arg0) {
	// TODO Auto-generated method stub
	
}

@Override
public void attributeRemoved(HttpSessionBindingEvent arg0) {
	// TODO Auto-generated method stub
	
}

@Override
public void attributeReplaced(HttpSessionBindingEvent arg0) {
	// TODO Auto-generated method stub
	
}
   
}