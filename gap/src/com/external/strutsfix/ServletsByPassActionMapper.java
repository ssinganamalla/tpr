package com.external.strutsfix;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.dispatcher.mapper.ActionMapping;
import org.apache.struts2.dispatcher.mapper.DefaultActionMapper;

import com.opensymphony.xwork2.config.ConfigurationManager;

public class ServletsByPassActionMapper extends DefaultActionMapper {
	@Override
	public ActionMapping getMapping(HttpServletRequest request,
			ConfigurationManager configManager) {
		// TODO Auto-generated method stub
		
		ActionMapping mapping = super.getMapping(request, configManager); 
		
		//action name not found, could be a servlet
		if(mapping.getName() == null || mapping.getName().length() == 0) return null;
		
		return mapping;
	}
}
