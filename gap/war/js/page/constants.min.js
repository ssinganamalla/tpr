
com.fa.Constants = (function(){
	
	return {
		
		COST_BASIS: 0,		
		MARKET_VALUE:1,
		GAIN_LOSS: 2,
		
		toBrokerName: function(id) {
			switch (id) {
			case 0:
			case '0':
				return 'Trade King';
				break;
			case 1:
			case '1':
				return 'Zecco';
				break;
				
			default:
				break;
			}
			return 'Undefined';
		}
		
	}
	
})();


