package com.analysis.domain;

import java.text.DateFormat;
import java.util.Date;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import org.apache.commons.lang.StringEscapeUtils;

import com.analysis.enums.EnumJsonIds;
import com.analysis.enums.Enums;
import com.utils.json.JSONException;
import com.utils.json.JSONObject;

/**
 * 
 * This class is used to store comments for a financial statement
 * @author Srinivas Singanamalla
 *
 */
@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class TickerStmtComment {

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
    
    @Persistent
    private int period;
    
    @Persistent
    private int stmtType;
    
    

	public TickerStmtComment(String email, String content, String ticker,
			int period, int stmtType) {
		super();
		this.email = email;
		this.content = content;
		this.ticker = ticker;
		this.period = period;
		this.stmtType = stmtType;
		this.date = new Date();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getDate() {
		return date;
	}
	
	 public String getMediumFormatDate() {
    	return date != null ? DateFormat.getDateInstance(DateFormat.MEDIUM).format(date) : "";
    }

	public void setDate(Date date) {
		this.date = date;
	}

	public String getTicker() {
		return ticker;
	}

	public void setTicker(String ticker) {
		this.ticker = ticker;
	}

	/**
	 * 
	 * @return  {@link Enums.PeriodType}
	 */
	public int getPeriod() {
		return period;
	}

	/**
	 * @param period. The {@link Enums.PeriodType}
	 */
	public void setPeriod(int period) {
		this.period = period;
	}

	/**
	 * @return the {@link Enums.StatementType}
	 */
	public int getStmtType() {
		return stmtType;
	}

	public String getStmtTypeString() {
		if(Enums.StatementType.BALANCE_SHEET.ordinal() == stmtType) {
			return Enums.StatementType.BALANCE_SHEET.toString();
		} else if(Enums.StatementType.INCOME_STATEMENT.ordinal() == stmtType) {
			return Enums.StatementType.INCOME_STATEMENT.toString();
		} else {
			return Enums.StatementType.CASH_FLOW.toString();
		} 
	}
	
	public String getPeriodString() {
		if(Enums.PeriodType.INTERIM.ordinal() == period) {
			return Enums.PeriodType.INTERIM.toString();
		} else {
			return Enums.PeriodType.YEARLY.toString();
		} 
	}
	/**
	 * @param stmtType {@link Enums.StatementType}
	 */
	public void setStmtType(int stmtType) {
		this.stmtType = stmtType;
	}
    
	public JSONObject toJSONObject() throws JSONException {
		TickerStmtComment note = this;
		JSONObject jo = new JSONObject();
		jo.put(EnumJsonIds.CONTENT, StringEscapeUtils.escapeHtml(note.getContent()));
		jo.put(EnumJsonIds.PERIOD_TYPE, note.getPeriod());
		jo.put(EnumJsonIds.PERIOD_TYPE_STRING, note.getPeriodString());
		jo.put(EnumJsonIds.MEDIUM_FORMAT_DATE, note.getMediumFormatDate());
		jo.put(EnumJsonIds.STMT_TYPE, note.getStmtType());
		jo.put(EnumJsonIds.STMT_TYPE_STRING, note.getStmtTypeString());
		jo.put(EnumJsonIds.SYMBOL, note.getTicker());
		return jo;
	}
    
}
