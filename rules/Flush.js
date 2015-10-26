
var flushRule = function(req, res, next){
	console.log("I'm the FlushRules middleWare");	
	
	var cards = req.body;
	
	if(flushFunction(cards)){
		res.json({result: 'You have a flush'});
	}else{
		next();
	}
	
};


var flushFunction = function(cards){

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


}

exports.FlushRule = flushRule;
