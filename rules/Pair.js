
var pairRule = function(req, res, next){
	console.log("I'm the PairRule middleWare");	
	
	var hands = JSON.parse = req.body.hands;
	
	next();
};

var doIHaveAPair = function(hands){
	for(var i = 0; i < hands.length ; i++){
		for(var j = i+1; j < hands.length; j++){
			var firstCard = hands[i];
			var secondCard = hands[j];
			if(firstCard.number == secondCard.number){
				return true;
			}
		}
	}
	return false;
}

exports.pairRule = pairRule;

console.log(doIHaveAPair([{number:3, color:"heart"},{number:3, color:"heart"},{number:2, color:"heart"}]));