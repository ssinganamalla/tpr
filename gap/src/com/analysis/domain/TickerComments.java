package com.analysis.domain;


import java.text.DateFormat;
import java.util.Date;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.NotPersistent;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import org.apache.commons.lang.StringEscapeUtils;

import com.analysis.enums.EnumJsonIds;
import com.google.appengine.api.users.User;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class TickerComments {
    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Long id;

    @Persistent
    private String email;

    @Persistent
    private String content;

    @Persistent
    private Date date;
    
    @Persistent
    private String ticker;
    
    public String getTicker() {
		return ticker;
	}

	public void setTicker(String ticker) {
		this.ticker = ticker;
	}

	@NotPersistent
    private Boolean isPublic;

	public TickerComments(String author, String content, Date date, boolean isPublic, String ticker) {
        this.email = author;
        this.content = content;
        this.date = date;
        this.isPublic = author == null ? true : isPublic;
        this.ticker = ticker;
    }
	
	public TickerComments() {
		super();
	}
	
	public TickerComments(String content, Date date, String ticker) {
		this(null, content, date, true, ticker);
	}

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getContent() {
        return content;
    }

    public Date getDate() {
        return date;
    }
    
    public String getMediumFormatDate() {
    	return date != null ? DateFormat.getDateInstance(DateFormat.MEDIUM).format(date) : "";
    }

    public void setEmail(String author) {
        this.email = author;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
    public Boolean getIsPublic() {
		return isPublic;
	}

	public void setIsPublic(Boolean isPublic) {
		this.isPublic = isPublic;
	}
	
	public JSONObject toJSONObject() throws JSONException {
		TickerComments note = this;
		JSONObject jo = new JSONObject();
		jo.put(EnumJsonIds.CONTENT, StringEscapeUtils.escapeHtml(note.getContent()));
		jo.put(EnumJsonIds.USER_EMAIL, note.getEmail() != null ? note.getEmail() : "");
		jo.put(EnumJsonIds.MEDIUM_FORMAT_DATE, note.getMediumFormatDate());
		jo.put(EnumJsonIds.COMMENTS_IS_PUBLIC, note.getIsPublic());
		return jo;
	}
}