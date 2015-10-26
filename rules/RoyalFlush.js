
var royalFlushRule = function(req, res, next){
	console.log("I'm the StraightFlushRules middleWare");	
	
	var cards = req.body;
	
	if(royalFlushFunction(cards)){
		res.json({result: 'You have a royal pair'});
	}else{
		next();
	}
	
};


//Very nice code !!
//I will inspire myself with this one to create the 3 other rules.
var royalFlushFunction = function(cards){

console.log(cards);
 	//var copy = cards;
	cards.sort(function(a, b) {
	    return Number(a.number) - Number(b.number);
	});

	if(cards[0].number == 13 && cards[1].number == 12 && cards[2].number == 11 && cards[3].number == 10 && cards[4].number == 1){
		if( cards[0].type == cards[1].type &&
			cards[1].type == cards[2].type &&
			cards[2].type == cards[3].type &&
			cards[3].type == cards[4].type){
			//console.log(true);
			return true;
		} else {
			//console.log(true);
			return false;
		}
	} else {
			//console.log(true);
		return false;
	}


}

exports.RoyalFlushRule = royalFlushRule;
