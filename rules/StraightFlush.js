
var straightFlushRule = function(req, res, next){
	console.log("I'm the StraightFlushRules middleWare");	
	next();
};

var orderCards = function(cards){
	for(var i = 0; i < cards.length; i++){
		var cardWhichWillSwitchPosition = cards[i];
		for(var j = i ; j < cards.length; j++){
			var cardWhichWillBeCompared = cards[j];
			if(cardWhichWillSwitchPosition.number > cardWhichWillBeCompared.number){
				var temp = cardWhichWillSwitchPosition ;
				cardWhichWillSwitchPosition = cardWhichWillBeCompared;
				cardWhichWillBeCompared = temp;
			}
		}
	}
	return cards;
}

exports.StraightFlushRule = straightFlushRule;

//console.log(orderCards([{number:1, color:"heart"},{number:3, color:"heart"},{number:2, color:"heart"}]));