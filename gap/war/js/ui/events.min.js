com.fa.Event = function(name) {
	//name of the event
	this.eventName = arguments[0];
	var mEventName = this.eventName;

	//function to call on event fire
	var eventAction = null;

	//subscribe a function to the event
	this.subscribe = function(fn) {
		eventAction = fn;
	};

	//fire the event
	this.fire = function(sender, eventArgs) {
		this.eventName = eventName2;
		if(eventAction != null) {
			eventAction(sender, eventArgs);
		}
		else {
			alert('There was no function subscribed to the ' + mEventName + ' event!');
		}
	};
};


if(!com.fa.events) com.fa.events = {};
com.fa.events.Event = (function() {
	
	var subscribedFns = [];
	var fnObjs = []; /* context object of the subscribed function */
	return {
	
		subscribe: function(reg_id, obj, fn) {
			if(reg_id && fn) {
				subscribedFns[reg_id] = fn;
				if(obj) {
					fnObjs[reg_id] = obj;
				} else {
					fnObjs[reg_id] = null;
				}
			}
		},
		
		fire: function(sender, eventArgs) {
			for(var id in subscribedFns) {
				if(fnObjs[id]) {
					subscribedFns[id].apply(fnObjs[id], arguments);
				}
			}
		},
		
		data: null,
		
		evt: null
	}
	
})();

//modify thresholds event
com.fa.events.ModifyThresholdsEvent = {
		getName: function() {
			return 'modify_thresholds';
		}
};

jQuery.extend(com.fa.events.ModifyThresholdsEvent, com.fa.events.Event);

