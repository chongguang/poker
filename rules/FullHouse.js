
var fullHouseRule = function(req, res, next){
	console.log("I'm the full house middleWare");	
	
	var cards = req.body;
	
	if(fullHouseFunction(cards)){
		res.json({result: 'You have a full house'});
	}else{
		next();
	}
	
};


var fullHouseFunction = function(cards){


	var array = [0,0,0,0,0,0,0,0,0,0,0,0,0];

	cards.forEach(function(hand){
		array[Number(hand.number)] ++;
	});

	if(array.indexOf(3)>=0 && array.indexOf(2)>=0){
		return true;
	} else {
		return false;
	}


}

exports.FullHouseRule = fullHouseRule;
