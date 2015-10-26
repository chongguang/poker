
var fourOfAKindRule = function(req, res, next){
	console.log("I'm the four of a kind middleWare");	
	
	var cards = req.body;
	
	if(fourOfAKindFunction(cards)){
		res.json({result: 'You have a four of a kind'});
	}else{
		next();
	}
	
};


var fourOfAKindFunction = function(cards){


	var array = [0,0,0,0];

	cards.forEach(function(hand){
		array[Number(hand.type)] ++;
	});

	cards.sort(function(a, b) {
	    return Number(b.number) - Number(a.number);
	});

	if(array.indexOf(4)>=0){
		return true;
	} else {
		return false;
	}


}

exports.FourOfAKindRule = fourOfAKindRule;
