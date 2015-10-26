
var pairRule = function(req, res, next){
	console.log("I'm the PairRule middleWare");	
	
	var hands = req.body
	
	if(doIHaveAPair(hands)){
		res.json({result: 'You have a pair'});
	}else{
		next();
	}
	
};

var doIHaveAPair = function(hands){
	console.log(hands.length);
	for(var i = 0; i < hands.length ; i++){
		for(var j = i+1; j < hands.length; j++){
			var firstCard = hands[i];
			var secondCard = hands[j];
			console.log("Avant le if");
			if(firstCard.number == secondCard.number){
				return true;
			}
		}
	}
	return false;
}

exports.pairRule = pairRule;
