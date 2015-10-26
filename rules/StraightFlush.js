
var straightFlushRule = function(req, res, next){
	console.log("I'm the StraightFlushRules middleWare");	
	
	var cards = req.body;
	
	if(straightFlushFunction(cards)){
		res.json({result: 'You have a straight flush'});
	}else{
		next();
	}
	
};


//Very nice code !!
//I will inspire myself with this one to create the 3 other rules.
var straightFlushFunction = function(cards){

//console.log(cards);
 	//var copy = cards;
	cards.sort(function(a, b) {
	    return Number(b.number) - Number(a.number);
	});

	if( Number(cards[0].number) === Number(cards[1].number) + 1 && 
		Number(cards[1].number) === Number(cards[2].number) + 1 && 
		Number(cards[2].number) === Number(cards[3].number) + 1 && 
		Number(cards[3].number) === Number(cards[4].number) + 1 && 
		Number(cards[0].type) === Number(cards[1].type) &&
		Number(cards[1].type) === Number(cards[2].type) &&
		Number(cards[2].type) === Number(cards[3].type) &&
		Number(cards[3].type) === Number(cards[4].type) ){
		return true;
	} else {
			//console.log(true);
		return false;
	}


}

exports.StraightFlushRule = straightFlushRule;
