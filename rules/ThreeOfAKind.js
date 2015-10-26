
var threeOfAKindRule = function(req, res, next){
	console.log("I'm the threeOfAKindRule middleWare");	
	
	var hands = req.body
	
	if(doIHaveAThreeOfAKind(hands)){
		res.json({result: 'You have a three of a kind'});
	}else{
		next();
	}
	
};

var doIHaveAThreeOfAKind = function(hands){
	
	var pairCount = 0;

	for(var i = 0; i < hands.length ; i++){
		for(var j = i+1; j < hands.length; j++){
			var firstCard = hands[i];
			var secondCard = hands[j];
			if(firstCard.number == secondCard.number){
				pairCount++;
				if (pairCount >= 3){
					return true;
				}
			}
		}
	}
	return false;
}

exports.threeOfAKindRule = threeOfAKindRule;
