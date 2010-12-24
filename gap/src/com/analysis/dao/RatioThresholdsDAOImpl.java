package com.analysis.dao;

import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.analysis.PMF;
import com.analysis.domain.financialratios.RatioThresholdsPrefs;
import com.google.appengine.api.datastore.Key;

public class RatioThresholdsDAOImpl implements RatioThresholdsDAO{

	@Override
	public void addRatioThresholds(RatioThresholdsPrefs vo) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			pm.makePersistent(vo);
		} finally {
			pm.close();
		}
	}

	@Override
	public void updateRatioThresholds(RatioThresholdsPrefs vo) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			pm.makePersistent(vo);
		} finally {
			pm.close();
		}
	}
	
	@Override
	public void addOrUpdateRatioThresholds(RatioThresholdsPrefs vo) {
		this.addRatioThresholds(vo);
		
	}
	
	@Override
	public RatioThresholdsPrefs getRatioThresholds(String email) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			Key key = RatioThresholdsPrefs.generateKey(email);
			RatioThresholdsPrefs vo = pm.getObjectById(RatioThresholdsPrefs.class, key);
			return vo;
		}finally {
			pm.close();
		}
	}

	@Override
	public RatioThresholdsPrefs getRatioThresholds(Key key) {
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			RatioThresholdsPrefs e = pm.getObjectById(RatioThresholdsPrefs.class, key);
			return e;
		}finally {
			pm.close();
		}
	}
}
