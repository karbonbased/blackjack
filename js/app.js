//constructor to build single cards
function card(cardValue, cardName, suit) {
	this.cardValue = cardValue;
	this.cardName = cardName;
	this.suit = suit;
} // close cards function

var cards = [];

function buildDeck() {
	this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suit = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
// nested loop to iterate through and apply the suits and names to the cards array
	for (var i = 0; i < this.suit.length; i++) {
		for (var j = 0; j<this.names.length; j++) {
			cards.push( new card(j+1, this.names[j], this.suit[i]));
		} // closes for name loop

	} // close this suite for loop
} // close deck function

buildDeck();

console.log(cards);
console.log(cards[0]);
console.log

// iterating through cards to change face cards to all have cardValue = 10
//Start with Jacks
for (var i = 10; i < cards.length; i += 13) {
	cards[i].cardValue = 10
}

//iterate to change Queens to 10
for (var i = 11; i < cards.length; i += 13) {
	cards[i].cardValue = 10
}

//iterate to change Kings to 10
for (var i = 12; i < cards.length; i += 13) {
	cards[i].cardValue = 10
}

console.log(cards);

// changing cardValue of A to a boolean, will later use OR logic to determine if 1 or 11
for (var i = 0; i < cards.length; i += 13) {
	cards[i].cardValue = true
}

console.log(cards);

// // check Ace boolean and assign value
// 	if ((cards.cardName = 'A') && (cardValue = true)) {
// 		this.cardValue = 11
// 	}
// 	else if ((cards.cardName = 'A') && (cardValue = false)) {
// 		this.cardValue = 1
// 	}

console.log(cards); // this doesn't work

function shuffleArr(array) {
	var tempValue = 0;
	var randomIndex = 0;
	 currentIndex = array.length

		while (0 != currentIndex) { //while there are remaining elements to shuffle

			//pick a remaining element at random
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1

		// swap it with the current element 
		tempValue = array[currentIndex]; // storing the current index as temp value
		array[currentIndex] = array[randomIndex]; // changing the current index to random index
		array[randomIndex] = tempValue; // store the temporary value as the random index
	} // closes while loop
 return array;
} // closes shuffleArr function

shuffleArr(cards);

console.log(cards);


var $currentBet = $('#current-bet');
// $currentBet.text("");
console.log($currentBet);
var betButton = $('.bet');

// deal cards will make a player place a bet before cards are dealt so IF current bet = 0, alert player
// set up to intially deal the cards - should give 2 cards to dealer, 2 to player
// both player cards will be visible but the dealer cards wtil only have the second one visible.

var $dealCards = $('#deal-cards');
console.log($dealCards);

var $alertCenter = $('#alert-center');
console.log($alertCenter.text);


$dealCards.click(function() {
	if ($currentBet.is(':empty')) {
		$alertCenter.text("You must place bet before cards are dealt");
	} //closes if check for bet
	var $dealerCard = $('<div');
	$dealerCard.addClass("face-down-card");
	$dealerCard.appendTo($('#dealer-hand'));
	var $dealerShowCard = $('<div>')
$currentCards.attr("id", "current-card")
$currentCards.addClass("card");
$currentCards.appendTo($('#dealer-hand'));
	var hand = $('cards[0]')
	console.log(hand);
});


// Hit me button should add 1 card to the player hand

// BUST should be an if that runs inside HIT ME that checks that the card totals are not greater than 21

// After HIT ME, the dealer should decide if it wants another card or not
// can create a simple IF function that says if dealer hand total is >13 , hit dealer
// If dealer HITS, all those cards will have the class "face-down-card"
// var $dealCards = $('#deal-cards')
// console.log($dealCards)


// $dealCards.click(function() {
// 	if 
// 	var $dealerCard = $('<div');
// 	$dealerCard.addClass("face-down-card");
// 	$dealerCard.appendTo($('#dealer-hand'));
// 	var $dealerShowCard = $('<div>')
// $currentCards.attr("id", "current-card")
// $currentCards.addClass("card");
// $currentCards.appendTo($('#dealer-hand'));
// 	var hand = $('cards[0]')
// 	console.log(hand);
// });

// stand should check win conditions


// Write out win conditions


