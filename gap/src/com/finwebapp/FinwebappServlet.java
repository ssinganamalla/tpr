package com.finwebapp;
import java.io.IOException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
@Deprecated
public class FinwebappServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Hello, world");
	}
}
