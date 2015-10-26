
var royalFlushRule = function(req, res, next){
	console.log("I'm the StraightFlushRules middleWare");	
	
	var cards = req.body;
	
	if(royalFlushFunction(cards)){
		res.json({result: 'You have a royal flush'});
	}else{
		next();
	}
	
};


//Very nice code !!
//I will inspire myself with this one to create the 3 other rules.
var royalFlushFunction = function(cards){

//console.log(cards);
 	//var copy = cards;
	cards.sort(function(a, b) {
	    return Number(b.number) - Number(a.number);
	});

	if( Number(cards[0].number) === 13 && 
		Number(cards[1].number) === 12 && 
		Number(cards[2].number) === 11 && 
		Number(cards[3].number) === 10 && 
		Number(cards[4].number) === 1){
		if( Number(cards[0].type) === Number(cards[1].type) &&
			Number(cards[1].type) === Number(cards[2].type) &&
			Number(cards[2].type) === Number(cards[3].type) &&
			Number(cards[3].type) === Number(cards[4].type) ){
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
