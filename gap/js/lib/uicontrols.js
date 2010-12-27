com.fa.uicontrols = (function(){
	
	return {
		get$LabelTextField : function(labelTxt, callback){
			var $div = $("<span></span>");
			$div.html(labelTxt);
			$div.mouseover(function(){
				var cssObj = {
						'width' : '40em'
				};	
				$(this).css(cssObj);
			});
			$div.mouseout(function(){
				var cssObj = {
						'width' : '40em'
				};	
				$(this).css(cssObj);
				
			});
			$div.click(function(){
				var cssObj = {
						'background-color' : '#fff',
						'width' : '40em',
						'border' : '1px solid #fff',
						'margin' : '1px'
				};	
				$(this).css(cssObj);
				var val = $(this).text() == "" ? $(this).find('input').val() : $(this).text();
				$(this).empty();
				$input = $('<input type="text"></input>').attr("value", val);
				$(this).append($input);
				$input.css(cssObj);
				$input.focus();
				com.fa.utils.log("info", "div clicked, input should be appended");
				
				var mouseout = function(){
					var cssObj = {
							'width' : '40em'
					};	
					
					com.fa.utils.log("info", $(this).val());
					var val = $(this).val();
					if(val && val.length>0) {
						$(this).parent('span').css(cssObj);
						$(this).parent('span').html(val);
					}
					
					//only call the callback when the new value is changed from the labelTxt
					if(labelTxt != val) {
						labelTxt = val;
						if(callback) callback();
					}
				}
				$input.blur(mouseout);
				$input.mouseout(mouseout);
			});
			
			var cssObj = {
					'width' : '40em'
			};	
			$div.css(cssObj);
			
			return $div;
		}
	}
	
})();


$.widget("ui.labeltextfield", {
	
	_init : function() {
	this._setData("label", this._getData("label"));
		this._buildUI();
	},
	
	edit : function(evt) {
		var cssObj = {
				'background-color' : '#fff',
				'width' : '20em',
				'border' : '1px solid #000'
		};	
		var inputcssObj = {
				'width' : '20em'
		};	
		this.element.css(cssObj);
		var val = this.element.text() == "" ? this.element.find('input').val() : this.element.text();
		this.element.empty();
		var $input = $('<input type="text"></input>').attr("value", val);
		$input.css('border', 'none');
		this.element.append($input);
		$input.css(inputcssObj);
		com.fa.utils.log("info", "div clicked, input should be appended");
		$input.focus();
		var me = this;
		$input.blur(function(evt) {
			var elem = evt.currentTarget;
			me.editComplete(evt, $(elem).val());
		});
		$input.mouseout(function(evt) {
			var elem = evt.currentTarget;
			me.editComplete(evt, $(elem).val());
		});
	},
	
	editComplete : function(evt, newVal) {
		var cssObj = {
				'width' : '20em',
				'border' : 'none'
		};	
		this.element.css(cssObj);
		
		this.setVal(newVal);
		
		//only call the callback when the new value is changed from the labelTxt
		/**
		if(labelTxt != val) {
			labelTxt = val;
			if(callback) callback();
		}**/
	},
	
	focus : function() {
		var cssObj = {
				'width' : '20em',
				'border' : '1px solid #000',
				'display' : 'inline-block'
				
		};	
		this.element.css(cssObj);
	},
	
	_buildUI : function() {
		
		var input = $('<input></input>');
		input.css('min-width', "250px");
		input.css('width', "40%");
		var $elem = this.element;
		if(!$elem.hasClass('f2')) {
			$elem.addClass('f2');
		}
		$elem.append(input);
		this._replaceText();
		var readOnly = this._getData('readOnly');
		if(!readOnly) {
			var me = this;
			var bgColor = input.css('background-color');
			
			input.focus(function(evt){
				$(this).css('border', '1px #000 solid');
				$(this).css('background-color', '#eee');
			});
			input.mouseover(function(evt){
				$(this).css('border', '1px #000 solid');
				$(this).css('background-color', '#eee');
			});
			
			input.click(function(evt){
				$(this).css('border', '1px #000 solid');
				$(this).css('background-color', '#eee');
			});
			
			input.blur(function(evt){
				$(this).css('background-color', bgColor);
				$(this).css('border', 'none');
				me._setData('label', $(this).val());
			});
			
		}
	},
	
	_replaceText : function() {
		var data = this._getData('dataArray');
		if(data) {
			var sep = this._getData('separator');
			var val = data.length>0? data.join(sep) : "";
			this.element.children("input").val(val);
		}
	},
	
	_setData: function(key, value) {
		//call super class implementation
		$.widget.prototype._setData.apply(this, arguments);
		switch (key) {
			case 'label':
				var value = $.trim(this._getData('label'));
				if(value) {
					var sep = this._getData('separator');
					var dataArray = this._getData('label').split(sep);
					this._setData('dataArray', dataArray);
				} else {
					this._setData('dataArray', []);
				}
				this._replaceText();
				break;
		}
	},
	
	getVal : function() {},
	
	setVal : function(value) {
		if(!value) return;
		if($.trim(value) == "") {
			this._setData('dataArray', dataArray);
		} else {
			var sep = this._getData('separator');
			var dataArray = value.split(sep);
			this._setData('dataArray', dataArray);
		}
		this._replaceText();
	},
	
	append : function(val) {
		if(!val) return;
		var data = this._getData('dataArray');
		var found = false;
		for(var i=0; i<data.length; i++) {
			//not found
			if(data[i].length != val.length) continue;
			
			if(data[i].indexOf(val)>-1){
				found = true;
				break;
			}	
		}
		if(!found) {
			data.push(val);
		}
		this._replaceText();
	}
});
$.ui.labeltextfield.getter = "getVal getList"; 
$.ui.labeltextfield.defaults = {
	dataArray : [],
	separator : ' ',
	hasSeparator : true,
	readOnly: true,
	label:""
};

/*$.widget("ui.labeltextfield", {
	
	_init : function() {
	this._setData("label", this._getData("label"));
		this._buildUI();
	},
	
	edit : function(evt) {
		var cssObj = {
				'background-color' : '#fff',
				'width' : '20em',
				'border' : '1px solid #000'
		};	
		var inputcssObj = {
				'width' : '20em'
		};	
		this.element.css(cssObj);
		var val = this.element.text() == "" ? this.element.find('input').val() : this.element.text();
		this.element.empty();
		var $input = $('<input type="text"></input>').attr("value", val);
		$input.css('border', 'none');
		this.element.append($input);
		$input.css(inputcssObj);
		com.fa.utils.log("info", "div clicked, input should be appended");
		$input.focus();
		var me = this;
		$input.blur(function(evt) {
			var elem = evt.currentTarget;
			me.editComplete(evt, $(elem).val());
		});
		$input.mouseout(function(evt) {
			var elem = evt.currentTarget;
			me.editComplete(evt, $(elem).val());
		});
	},
	
	editComplete : function(evt, newVal) {
		var cssObj = {
				'width' : '20em',
				'border' : 'none'
		};	
		this.element.css(cssObj);
		
		this.setVal(newVal);
		
		//only call the callback when the new value is changed from the labelTxt
		*//**
		if(labelTxt != val) {
			labelTxt = val;
			if(callback) callback();
		}**//*
	},
	
	focus : function() {
		var cssObj = {
				'width' : '20em',
				'border' : '1px solid #000',
				'display' : 'inline-block'
				
		};	
		this.element.css(cssObj);
	},
	
	_buildUI : function() {
		var $elem = this.element;
		$elem.css('width', '20em');
		$elem.css('border', '1px solid #aaa');
		$elem.css('padding', '2px');
		if(!$elem.hasClass('f2')) {
			$elem.addClass('f2');
		}
		
		var readOnly = this._getData('readOnly');
		if(!readOnly) {
			var me = this;
			$elem.mouseover(function(evt){
				me.focus(evt);
			});
			$elem.mouseout(function(evt){
				me.editComplete(evt);
			});
			
			$elem.click(function(evt){
				me.edit(evt)
			});
		}
	},
	
	_replaceText : function() {
		var data = this._getData('dataArray');
		if(data) {
			var sep = this._getData('separator');
			var val = data.length>0? data.join(sep) : "";
			this.element.html(val);
		}
	},
	
	_setData: function(key, value) {
		//call super class implementation
		$.widget.prototype._setData.apply(this, arguments);
		switch (key) {
			case 'label':
				var value = $.trim(this._getData('label'));
				if(value) {
					var sep = this._getData('separator');
					var dataArray = this._getData('label').split(sep);
					this._setData('dataArray', dataArray);
				} else {
					this._setData('dataArray', []);
				}
				this._replaceText();
				break;
		}
	},
	
	getVal : function() {},
	
	setVal : function(value) {
		if(!value) return;
		if($.trim(value) == "") {
			this._setData('dataArray', dataArray);
		} else {
			var sep = this._getData('separator');
			var dataArray = value.split(sep);
			this._setData('dataArray', dataArray);
		}
		this._replaceText();
	},
	
	append : function(val) {
		if(!val) return;
		var data = this._getData('dataArray');
		var found = false;
		for(var i=0; i<data.length; i++) {
			//not found
			if(data[i].length != val.length) continue;
			
			if(data[i].indexOf(val)>-1){
				found = true;
				break;
			}	
		}
		if(!found) {
			data.push(val);
		}
		this._replaceText();
	}
});
$.ui.labeltextfield.getter = "getVal getList"; 
$.ui.labeltextfield.defaults = {
	dataArray : [],
	separator : ' ',
	hasSeparator : true,
	readOnly: true,
	label:""
};*/ 


$.widget("ui.controlsdialog", {
	_init: function() {
		if($('#dialog').length == 0) {
			this.$dialog = $("<div id='dialog' class='bg ui-corner-all'></div>");
		} else {
			this.$dialog = $('#dialog');
		}
		
		/** delegate the options to the dialog **/
		var myopts = {};
		for(var id in this.options) {
			myopts[id] = this.options[id];
		}
		
		//@@todo add the myopts to dialog options
		
		var controls = this.options['controls'];
		
		if(controls) {
			for(var i=0; i<controls.length; i++) {
				var control = controls[i];
				if(!control.id) {
					com.fa.utils.log("error", "control " + i + " does not have an @@id@@parameter", "ui.controlsdialog", "_init");
					continue;
				}else if(!control.vi) {
					//not visible
					continue;
				}
				
				
				if(control.t == 'lslider' && control.vi) {
					this._addLabelSliderControl(control);
				}
			}
		}
		
		var instance = this;
		this.$dialog.dialog({ 
			close: function() {
				instance.destroy();
			},
			
			hide: "clip",
			buttons: { 
					"Cancel": function() { $(this).dialog("close"); }, 
					"Ok": function() { 
							var controls = instance.updateControlsFromUI();
							var okEvt = instance.options['okEvt'];
							if(okEvt) {
								okEvt.data = instance.options['controls'];
								okEvt.fire(null, okEvt);
							}
							$(this).dialog("close"); 
						} 
					} 
		});
		
	},
	
	updateControlsFromUI: function() {
		var controls = this.options['controls'];
		if(controls) {
			for(var i=0; i<controls.length; i++) {
				var control = controls[i];
				if(!control.id) {
					continue;
					com.fa.utils.log("error", "control " + i + " does not have an @@id@@parameter", "ui.controlsdialog", "_init");
				} else if(!control.vi) {//if not visible,continue
					continue;
				}
				
				if(control.t == 'lslider') {
					control.v = $('#' + control.id+'_slider').labelslider('option', 'value');
				}
			}
			//com.fa.utils.log('info', controls);
		}
		return controls;
	},
	
	destroy: function() {
		$.widget.prototype.destroy.apply(this, arguments);

		this.$dialog.dialog('destroy');
		var controls = this.options['controls'];
		if(controls) {
			for(var i=0; i<controls.length; i++) {
				var control = controls[i];
				if(control.t == 'lslider') {
					$('#' + control.id + '_slider').labelslider('destroy');
				}
			}
		}
		/**
		$('#crSlider').labelslider('destroy');
		$('#qrSlider').labelslider('destroy');
		$('#ctdSlider').labelslider('destroy');
		$('#ctcSlider').labelslider('destroy');
		**/
		this.$dialog.empty();
	},
	
	_addLabelSliderControl: function(control) {
		if(!control) return;
		
		var opts = {};
		if(control.mi || control.mo ==0) opts.min = control.mi;
		if(control.ma) opts.max = control.ma;
		if(control.bl) opts.base = control.bl;
		if(control.v) opts.value = control.v;
		if(control.st) opts.step = control.st;
		
		var id = control.id + '_slider';
		this.$dialog.append('<div id="' +  id + '"></div>');
		$('#' + id).labelslider(opts);
	}
});

$.widget("ui.labelslider", {
	_init : function() {
		
		/** delegate the options to the slider **/
		var myopts = {};
		for(var id in this.options) {
			myopts[id] = this.options[id];
		}
		
	    this.$slider = $('<div></div>').slider(myopts);

	    var baseVal = this.options['base'];
	    this.$baseLabel = $('<span class="ui-slider-base-label">' + baseVal + '</span>');
	    this.$variableLabel = $('<span class="ui-slider-var-label"></span>');
	    this.$variableLabel.html(' ' + this.options['value']);
	    
	    this.element.append($('<div class="ui-slider-label"></div>').append(this.$baseLabel).append(this.$variableLabel));
	    
		this.element.append(this.$slider);
		
		
//		var instance = this;, investigate: closure, memory leaks????
		this.$slider.data('instance', this);
		this.$slider.bind('slide', function(event, ui) {
			var instance = $(this).data('instance');
			 var base = instance._getData('base');
			 instance.$variableLabel.html(' ' + ui.value);
		});
		
	},

	
	_setData: function(key, value) {
		$.widget.prototype._setData.apply(this, arguments);
		switch (key) {
			case 'base':
				this.$baseLabel.html(value);
				break;
		}
	},
	
	_getData:function(key) {
		switch (key) {
		case 'base':
			return this.$baseLabel.html();
			break;
		default:
			return this.$slider.slider('option', key);
		}	
	},
	
	destroy: function() {
		//investigate what is needed for destroyong????
		$.widget.prototype.destroy.apply(this, arguments);
		this.$slider.empty();
		this.element.empty();
	}
});
$.ui.labelslider.defaults = {
	value : 0, min:0, max : 1
}; 

$.widget("ui.finsearchbox", {
	
	    _getMatchedTickers : function(tickerVal) {
	    	var widgetInstance = this;
	    	
	    	$.ajax({
	    		url : com.fa.Global.prefixPath + "/urlfetch/getTickerMatchInfo",
	    		data : {'ticker': tickerVal},
	    		success : function(htmlText){
	    			var jsonObj = eval('(' + htmlText + ')');
	    			if(jsonObj) {
	    				var $widgetElement = widgetInstance.element;
						var suggestList = document.getElementById("suggestList");
				    	suggestList.style.display = "none";
				    	com.fa.utils.Dom.removeChildren(suggestList);
				    	
				    	$(suggestList).css('left', $widgetElement.position().left);
				    	$(suggestList).css('top', $widgetElement.position().top + $widgetElement.height() + 10);
				    	$(suggestList).css('position', 'absolute');
				    	
				    	if(jsonObj) {
				    		var matches = jsonObj.matches;
				    		if(matches) {
				    			var min = Math.min(15, matches.length);
				    			for(var i=0; i<min; i++) {
				    				if(matches[i].e == "NASDAQ" || matches[i].e == "NYSE" || matches[i].e == "OTC" || matches[i].e == "AMEX") {
				    					
				    					var div = document.createElement("div");
				    			    	div.setAttribute("e", matches[i].e);
				    			    	div.setAttribute("t", matches[i].t);
				    			    	div.setAttribute("name", "ticker");
				    			    	var tickerSpan = document.createElement("span");
				    			    	tickerSpan.className = "ticker";
				    			    	tickerSpan.appendChild(document.createTextNode(matches[i].t));
				    			    	var sname = document.createElement("span");
				    			    	sname.className = "sname";
				    			    	sname.style.whiteSpace = 'nowrap';
				    			    	sname.appendChild(document.createTextNode(matches[i].n));
				    			    	div.appendChild(tickerSpan);
				    			    	div.appendChild(sname);
				    			    	
				    			    	div.onmouseover = function() {
				    			    		this.style.cursor = 'pointer';
				    			    		this.className = "ticker_selected";
				    			    	}
				    			    	
				    			    	div.onmouseout = function() {
				    			    		this.className = "ticker_unselected";
				    			    	}
				    			    	
				    			    	div.onclick = function() {
				    			    		widgetInstance._setMatchedTicker(this);
				    			    	}
				    					suggestList.appendChild(div);
				    				}
				    			}
				    			if(matches.length > 0) {
				    				suggestList.style.display = "block";
				    			}
				    		}
				    	}
	    			}
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					var text = 'Could not get tickermatch info for this ticker uicontrols.js#_getMatchedTickers ' ;
					$('#errors').append("<li>" + text + "</li>");
				}
	    	});
	    	
	    	
			/*$.getJSON(com.fa.Global.prefixPath + "/urlfetch/getTickerMatchInfo", {"ticker":tickerVal},
					
					function(jsonObj) {
						var $widgetElement = widgetInstance.element;
						var suggestList = document.getElementById("suggestList");
				    	suggestList.style.display = "none";
				    	com.fa.utils.Dom.removeChildren(suggestList);
				    	
				    	$(suggestList).css('left', $widgetElement.position().left);
				    	$(suggestList).css('top', $widgetElement.position().top + $widgetElement.height() + 10);
				    	$(suggestList).css('position', 'absolute');
				    	
				    	if(jsonObj) {
				    		var matches = jsonObj.matches;
				    		if(matches) {
				    			var min = Math.min(15, matches.length);
				    			for(var i=0; i<min; i++) {
				    				if(matches[i].e == "NASDAQ" || matches[i].e == "NYSE" || matches[i].e == "OTC" || matches[i].e == "AMEX") {
				    					
				    					var div = document.createElement("div");
				    			    	div.setAttribute("e", matches[i].e);
				    			    	div.setAttribute("t", matches[i].t);
				    			    	div.setAttribute("name", "ticker");
				    			    	var tickerSpan = document.createElement("span");
				    			    	tickerSpan.className = "ticker";
				    			    	tickerSpan.appendChild(document.createTextNode(matches[i].t));
				    			    	var sname = document.createElement("span");
				    			    	sname.className = "sname";
				    			    	sname.style.whiteSpace = 'nowrap';
				    			    	sname.appendChild(document.createTextNode(matches[i].n));
				    			    	div.appendChild(tickerSpan);
				    			    	div.appendChild(sname);
				    			    	
				    			    	div.onmouseover = function() {
				    			    		this.style.cursor = 'pointer';
				    			    		this.className = "ticker_selected";
				    			    	}
				    			    	
				    			    	div.onmouseout = function() {
				    			    		this.className = "ticker_unselected";
				    			    	}
				    			    	
				    			    	div.onclick = function() {
				    			    		widgetInstance._setMatchedTicker(this);
				    			    	}
				    					suggestList.appendChild(div);
				    				}
				    			}
				    			if(matches.length > 0) {
				    				suggestList.style.display = "block";
				    			}
				    		}
				    	}
					}
			);*/
		
		}, 
		
		_enterAndSelect : function() {
			var $widgetElement = this.element;
	    	var suggestList = document.getElementById("suggestList");
			var tickers = com.fa.utils.Dom.getElementsByTagNameAndAtt(suggestList, 'div', "name", "ticker");
	    	//find the selected index
	    	var selectedIndex = -1;
	    	var div;
	    	for(var i=0; i<tickers.length; i++) {
	    		if(tickers[i].className == "ticker_selected") {
	    			div = tickers[i];
	    			break;
	    		}
	    	}
	    	if(div) {
	    		this._setMatchedTicker(div, $widgetElement);
	    	}
	    },
	    
		_moveUpOrDown : function(down) {
	    	var suggestList = document.getElementById("suggestList");
	    	var tickers = com.fa.utils.Dom.getElementsByTagNameAndAtt(suggestList, 'div', "name", "ticker");
	    	//find the selected index
	    	var selectedIndex = -1;
	    	for(var i=0; i<tickers.length; i++) {
	    		if(tickers[i].className == "ticker_selected") {
	    			selectedIndex = i;
	    			break;
	    		}
	    	}
	    	
	    	var newIndex = -1;
	    	if(selectedIndex == -1) {
	    		newIndex = down ? 0 : tickers.length - 1;
	    	} else {
	    		if(down) {
	    			newIndex = (selectedIndex == tickers.length - 1) ? 0 : selectedIndex + 1;
	    		} else {
	    			newIndex = (selectedIndex == 0) ? tickers.length - 1 : selectedIndex - 1;
	    		}
	    	}
	    	
	    	if(selectedIndex > -1) {
	    		tickers[selectedIndex].className = "ticker_unselected";
	    	}
	    	tickers[newIndex].className = "ticker_selected";
	    },
	    
	    _setMatchedTicker : function(div) {
	    	var suggestList = document.getElementById("suggestList");
	    	var e = div.getAttribute("e");
	    	
	    	var tickerElem = com.fa.utils.Dom.getFirstElementByClassName(div, 'span', 'ticker');
	    	var nameElem = com.fa.utils.Dom.getFirstElementByClassName(div, 'span', 'sname');
	    	
	    	var ticker = tickerElem && getInnerText(tickerElem);
	    	var name = nameElem && getInnerText(nameElem);
	    	
	    	var x = e + ":" + ticker;
	    	$(this.element).val(x)
			
			suggestList.style.display = "none";
			$(suggestList).empty();
	    	//com.fa.utils.Dom.removeChildren(suggestList);
	    	com.fa.company.ticker = x;
	    	com.fa.company.tickerSymbol = ticker;
	    	com.fa.company.name = name;
	    	
	    	this._setData('shortVal', ticker);
	    	this._setData('longVal', x);
	    	//loadStatements();
	    },
	    
	    _filter : function (event, widget_instance) {
	    	var e = event;
			if(e.ctrlKey || e.altKey) return true;
			
			var code = e.charCode || e.keyCode;
			var status = 'INVALID';
			if(code <=32 && code != 13 && code != 8) {
				status = 'INVALID';
			}
			
			if(code == 38 || code == 40) {
				status = 'UP_DOWN';
				var key = 0; //up
				if(code ==40) {
					key = 1;//down
				}
			}
			var ticker = widget_instance.element.val();
			if(!ticker) {
				status = 'INVALID';
			}else if(code >=48 && code <= 90) {
				status = 'VALID';
			} else if(code == 8 /* backspace */ && ticker.length > 0 ) {
				status = 'VALID';
			} else if(code == 13) {//enter
				status = 'SELECTED';
			} else if((code == 56 || code == 186) && e.shiftKey) {//NASDAQ:GE is valid so colon is valid, 56 in FF, and 186 in IE/chrome
				status = 'VALID';
			}
			
			switch(status) {
			case 'VALID' :
				widget_instance._getMatchedTickers(ticker);
				break;
			case 'UP_DOWN' :
				widget_instance._moveUpOrDown(key == 1);
				break;
			case 'SELECTED' :
				widget_instance._enterAndSelect(e.originalTarget);
				break;
			case 'INVALID' :
			default:
				var suggestList = document.getElementById("suggestList");
				suggestList.style.display = "none";
				$(suggestList).empty();
			}
		},

	    getShortValue : function() {
			return this._getData('shortVal');
		},
		
		getLongValue : function() {
			return this._getData('longVal');
		},
		
	    _init: function() { 
//			this._setData('shortVal', 'dsds');
			var me = this;
			var val = this.element.val();
			if(val) {
				var index = val.search(':');
				if(index>-1) {
					this._setData('shortVal', val.substring(index+1));
					this._setData('longVal', val);
				}
			}
	    	this.element.keyup(function(event){
	    		me._filter(event, me);
	    	});
	    } 
}); 
$.ui.finsearchbox.getter = "getShortValue getLongValue"; 
$.ui.finsearchbox.defaults = {
}; 

(function($) {

	$.widget("ui.tabularlist", {
		options: {
		  minColumnHeight: 1,
		  maxCols: 10,
		  value: 20,
		  innerHtml:"<span></span>",
		  list:['ABCO', 'HPQ', 'GOOG', 'STV', 'YUM', 'YHOO']
		},
		
		_init: function() {
		     // creation code for mywidget
		     this.element.append('<div id="growingListContainer"></div>');
		     this.render();
		  },
		   
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
	
			var el = this.element,
				cap = el.next(),
				capHeight = cap.outerHeight() - parseInt(cap.css("paddingTop")) + parseInt(cap.css("paddingBottom"));
	
			switch (option) {
				case "minColumnHeight":
				case "maxCols":
				case "value":
					
					break;
				case "innerHtml":
					break;
			}
		},
		
		render: function() {
			var value = this.options.list.length;
			var values = this.options.list;
			var nameAttr = this.options.nameAttr;
			var minColumnHeight = this.options.minColumnHeight;
			var maxCols = this.options.maxCols;
			
			var cols = parseInt((value / minColumnHeight)) > maxCols ? maxCols : parseInt((value / minColumnHeight));
		    cols = Math.max(1, cols);
		    var listItemsCountInEachColumn_Array = new Array(cols);
	
		    var listItemsInEachColumn = parseInt(value / cols);
		    var remainingListItems = value % cols;
	
		    for (var i = 0; i < cols; i++) {
		        listItemsCountInEachColumn_Array[i] = listItemsInEachColumn;
		    }
	
		    for (i = 0; i < cols; i++) {
		        if (remainingListItems == 0) 
		            break;
		        if (listItemsCountInEachColumn_Array[i] > 0) {
		            listItemsCountInEachColumn_Array[i] += 1;
		            remainingListItems--;
		        }
		    }
	
		    var g = 0;
		    for (var j = 0; j < listItemsCountInEachColumn_Array.length; j++) {
		        $('#growingListContainer').append("<ul class='ui-tabularlist_ul' name='commentTicker' id='growList" + j + "'><\/ul>");
		        for (var k = 0; k < listItemsCountInEachColumn_Array[j]; k++) {
		            $('#growList' + j).append("<li class='ui-tabularlist_li' " + "name=" + "'" + nameAttr + "'>" + values[g] + "<\/li>");
		            g++;
		        }
		    }
		    $('#growingListContainer').append('<div class="ui-tabularlist_none"></div>');
			
		},
		
		destroy: function(){
			this.element.empty();
			$.Widget.prototype.destroy.apply(this, arguments); // default destroy
		}
	});
	$.ui.tabularlist.defaults = {
			minColumnHeight: 1,
			  maxCols: 10,
			  value: 20,
			  innerHtml:"<span></span>",
			  list:['ABCO', 'HPQ', 'GOOG', 'STV', 'YUM', 'YHOO'],
			  nameAttr:"nameAttr"
	};
})(jQuery);
