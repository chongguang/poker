
var twoPairRule = function(req, res, next){
	console.log("I'm the TwoPairRule middleWare");	
	
	var hands = req.body
	
	if(doIHaveATwoPair(hands)){
		res.json({result: 'You have a two pair'});
	}else{
		next();
	}
	
};

var doIHaveATwoPair = function(hands){
	
	var pairCount = 0;

	for(var i = 0; i < hands.length ; i++){
		for(var j = i+1; j < hands.length; j++){
			var firstCard = hands[i];
			var secondCard = hands[j];
			if(firstCard.number == secondCard.number){
				pairCount++;
				if (pairCount >= 2){
					return true;
				}
			}
		}
	}
	return false;
}

exports.twoPairRule = twoPairRule;
