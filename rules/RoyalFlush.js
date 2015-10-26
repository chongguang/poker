
var royalFlushRule = function(req, res, next){
	console.log("I'm the StraightFlushRules middleWare");	
	consol.log(royalFlushFunction());
	next();
};

var royalFlushFunction = function(cardsss){

var cards = [];

var c1 = {};
c1.number = 1;
c1.type = 0;

var c2 = {};
c2.number = 1;
c2.type = 0;

var c3 = {};
c3.number = 1;
c3.type = 0;

var c4 = {};
c4.number = 1;
c4.type = 0;

var c5 = {};
c5.number = 1;
c5.type = 0;

cards.push(c1);
cards.push(c2);
cards.push(c3);
cards.push(c4);
cards.push(c5);

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

console.log(royalFlushFunction());