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

// console.log(cards);
// console.log(cards[0]);
// console.log

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

// console.log(cards);

// changing cardValue of A to 11, later ACE will be treated as 11 
//until hand is over 21 and then it'll become 1
for (var i = 0; i < cards.length; i += 13) {
	cards[i].cardValue = 11
}

// console.log(cards);

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
		currentIndex -= 1 //remove 1 from the current index

		// swap it with the current element 
		tempValue = array[currentIndex]; // storing the current index as temp value
		array[currentIndex] = array[randomIndex]; // changing the current index to random index
		array[randomIndex] = tempValue; // store the temporary value as the random index
	} // closes while loop
 return array;
} // closes shuffleArr function

shuffleArr(cards);

// console.log(cards);

var player = {
	money: 500,
	currentBet: 0,
	currentHand: [],
	handTotal: function(array) {
		for (i = 0; i < currentHand.length; i++) {
		currentHand += i
		}
	}
}

var dealer = {
	currentHand: [],
	handTotal: function(array) {
		for (i = 0; i < currentHand.length; i++) {
		currentHand += i
		}
	}
}

// dealer.currentHand.push(2)
// console.log(dealer.currentHand)
// console.log(player.money)
var $bankRoll = $('#current-bankroll')
// console.log($bankRoll);
$bankRoll.text(player.money);

var $currentBet = $('#current-bet');
// $currentBet.text("");
console.log($currentBet);

var $betButton = $('.bet');
// console.log($betButton);

//establish the betting logic
$betButton.click(function() {
	var $betChoice = $(this).text().replace(/\$/g, '');
	var $betNum = parseInt($betChoice)
	return player.money - $betNum
	console.log(player.money)
	// this.parseInt($betChoice.text)
	console.log($betNum)
	console.log(typeof $betNum)
})

// deal cards will make a player place a bet before cards are dealt so IF current bet = 0, alert player
// set up to intially deal the cards - should give 2 cards to dealer, 2 to player
// both player cards will be visible but the dealer cards wtil only have the second one visible.

var $playerHand = $('#player-hand')
// console.log($playerHand)
var $dealCards = $('#deal-cards');
// console.log($dealCards);

var $alertCenter = $('#alert-center');
// console.log($alertCenter.text);


$dealCards.click(function() {
	if ($currentBet.is(':empty')) {
		$alertCenter.text("You must place bet before cards are dealt");
	} //closes if check for bet
	else {
	var $dealerCard = $('<div>');
	$dealerCard.addClass("face-down-card");
	$dealerCard.appendTo($('#dealer-hand'));
	
	var $dealerShowCard = $('<div>')
	$dealerShowCard.attr("id", "current-card")
	$dealerShowCard.addClass("card");
	$dealerShowCard.appendTo($('#dealer-hand'));
	// var hand = $('cards[0]')
	// console.log(hand);
	var $initialPlayerCard = $('<div>');
	$initialPlayerCard.attr("id", "player-current-card");
	$initialPlayerCard.addClass("card");
	$initialPlayerCard.appendTo($('#player-hand'));

var $PlayerCard = $('<div>');
	$PlayerCard.attr("id", "player-current-card");
	$PlayerCard.addClass("card");
	$PlayerCard.appendTo($('#player-hand'));

} //close else
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

// stand should ALLOW dealer to play and THEN check win conditions


// Write out win conditions


// NOTE: set Ace to 11 until hand count hits over 21 and then it comes 1


// ===========
// 1:1
// ==========
// MVP
// - Shopwcase some form of responseive as pure MVP

// Logicside
// - createa flag: a booly value which if true allows the deal buttonm if false doesnt
// - when u deal change the flag

// player
// - bet
// - money
// - handvalue = []
// - totalhand = function that returns the card values

// dealer
// - handvalue = []
// - totalhand = function that returns the card values

// hit

// User


