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
import com.analysis.enums.EnumTickerCommentReason;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class TickerComment {
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
    
    /**
     * @see EnumTickerCommentReason
     */
    @Persistent
    private int reason;
    
    public String getTicker() {
		return ticker;
	}

	public int getReason() {
		return reason;
	}

	public void setReason(int reason) {
		this.reason = reason;
	}

	public void setTicker(String ticker) {
		this.ticker = ticker;
	}

	@NotPersistent
    private Boolean isPublic;

	public TickerComment(String author, String content, Date date, boolean isPublic, String ticker) {
        this.email = author;
        this.content = content;
        this.date = date;
        this.isPublic = author == null ? true : isPublic;
        this.ticker = ticker;
    }
	
	public TickerComment() {
		super();
	}
	
	public TickerComment(String content, Date date, String ticker) {
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
		TickerComment note = this;
		JSONObject jo = new JSONObject();
		jo.put(EnumJsonIds.CONTENT, StringEscapeUtils.escapeHtml(note.getContent()));
		jo.put(EnumJsonIds.MEDIUM_FORMAT_DATE, note.getMediumFormatDate());
		jo.put(EnumJsonIds.SYMBOL, note.getTicker());
		jo.put(EnumJsonIds.COMMENTS_IS_PUBLIC, note.getIsPublic());
		jo.put(EnumJsonIds.COMMENT_REASON, note.getReason());
		return jo;
	}
}