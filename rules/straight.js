
var straightRule = function(req, res, next){
	console.log("I'm the StraightRule middleWare");	
	
	var hands = req.body
	
	if(doIHaveAStraight(hands)){
		res.json({result: 'You have a Straight'});
	}else{
		next();
	}
	
};

var doIHaveAStraight = function(hands){
	
	hands.sort(function(a, b) {
	    return Number(a.number) - Number(b.number);
	});
	
	for(var i = 0; i < hands.length-1; i ++){
		var firstCard = hands[i];
		var secondCard = hands[i+1];
		if(firstCard.number != (secondCard.number - 1)){
			return false;
		}
	}

	return true;
}

exports.straightRule = straightRule;
