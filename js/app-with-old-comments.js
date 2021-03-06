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
	handTotal: 0,
	wins: 0
}

var dealer = {
	currentHand: [],
	handTotal: 0,
}

console.log(cards);
var gameInProgress = false;
var gameCounter = 0;

function checkTotal(array) {
		for (i = 0; i < array.length; i++) {
		array += i
	}
}
// dealer.currentHand.push(2)
var usedCards = [];

var $bankRoll = $('#current-bankroll')
// console.log($bankRoll);
$bankRoll.text(player.money);

var $currentBet = $('#current-bet');
$currentBet.text(player.currentBet);
console.log($currentBet);

var $betButton = $('.bet');
// console.log($betButton);

//establish the betting logic
$betButton.click(function() {
	var $betChoice = $(this).text().replace(/\$/g, '');
	var $betNum = parseInt($betChoice);
	player.money -= $betNum;
	console.log(player.money);
	$bankRoll.text(player.money);
	player.currentBet += $betNum;
	$currentBet.text(player.currentBet)
	console.log(typeof $currentBet);
})

// establish the game counter
var $winsTotal = $('#count');
$winsTotal.text("You've won " + player.wins + " out of " + gameCounter);
// deal cards will make a player place a bet before cards are dealt so IF current bet = 0, alert player
// set up to intially deal the cards - should give 2 cards to dealer, 2 to player
// both player cards will be visible but the dealer cards wtil only have the second one visible.

var $playerHand = $('#player-hand');
// console.log($playerHand)
var $dealCards = $('#deal-cards');
// console.log($dealCards);

var $dealerHand = $('#dealer-hand');
var $alertCenter = $('#alert-center');
// console.log($alertCenter.text);

// function getTotal(hand) {
//    var total = 0;
//    var ace = false;
//    for (var i = 1; i <= hand.count; i++) {
//        total += Math.min(10, hand[i].card.value); 
//        if (hand[i].card.value == 1)
//           ace = true;
//    }
//    if (total + 10 <= 21 && ace)
//       total += 10;
//   $alertCenter.text = 
//    return total;
// }

function getPlayerHandTotal() {
	total = 0
	for (var i = 0; i < player.currentHand.length; i++) {
		total += player.currentHand[i].cardValue
	}
	player.handTotal = total;
}

function getDealerHandTotal() {
	total = 0
	for (var i = 0; i < dealer.currentHand.length; i++) {
		total += dealer.currentHand[i].cardValue
	}
	dealer.handTotal = total;
}

function drawPlayerCard() {
	cards.shift(player.currentHand);
	player.currentHand.unshift(cards[0]);
}

function drawDealerCard() {
	cards.shift(dealer.currentHand);
	dealer.currentHand.unshift(cards[0]);
}	$currentBet.text(player.currentBet)

function lostCash() {
	player.currentBet = 0;
	$currentBet.text(player.currentBet)
}

function payOut() {
	var tempPay = player.currentBet * 2.2;
	player.money = (player.money + tempPay);
	$bankRoll.text(player.money);
	lostCash();
} //close payOut function

function blackJack() {
	if (player.handTotal == 21) {
		$alertCenter.html("Blackjack! You win!<br/><br/>Hit deal to start a new game!");
		player.wins += 1;
		payOut();
	} // close if for 21
	else if (dealer.handTotal == 21) {
		$alertCenter.html("Dealer has blackjack!<br/> You lose :(<br/><br/>Hit deal to start a new game!");
	}
	else {
		console.log("no blackjack... :(")
		return;
	}
}

function checkWinner() {
	if (player.handTotal > 21) {
		$alertCenter.html("BUST!")
		lostCash();
	} // closes else if BUST
	else if (dealer.handTotal > 21) {
		$alertCenter.html("Deaer BUST! You win!")
		player.wins += 1;
		payOut();
	}
	else if ((player.handTotal == dealer.handTotal)) {
		$alertCenter.html("This would be a tie");
		player.money = (player.currentBet + player.money);
		lostCash();
	} //closes else if tie
	else if (player.handTotal > dealer.handTotal) {
		$alertCenter.html("player wins!")
		player.wins += 1;
		payOut();
	} // closes else if player wins
	else if (player.handTotal < dealer.handTotal) {
		$alertCenter.html("dealer wins! :(")
		lostCash()
	}
} // closes checkWinner function

$dealCards.click(function() {
	if (gameInProgress == true) {
		return;
	}
	else if (player.currentBet == 0) {
		return $alertCenter.text("You must place bet before cards are dealt");
	} //closes if check for bet
	else {
	var $dealerHiddenCard = $('<div>');
	$dealerHiddenCard.addClass("face-down-card");
	$dealerHiddenCard.appendTo($('#dealer-hand'));
	drawDealerCard();
	// $dealerHiddenCard.text(dealer.currentHand[0].cardValue);
	$dealerHiddenCard.addClass(dealer.currentHand[0].suit);
	
	var $dealerCard = $('<div>')
	$dealerCard.attr("id", "current-card")
	$dealerCard.addClass("card");
	$dealerCard.appendTo($('#dealer-hand'));
	drawDealerCard();
	$dealerCard.text(dealer.currentHand[0].cardValue);
	$dealerCard.addClass(dealer.currentHand[0].suit);
	getDealerHandTotal();

	// var hand = $('cards[0]')
	// console.log(hand);
	var $initialPlayerCard = $('<div>');
	$initialPlayerCard.attr("id", "player-current-card");
	$initialPlayerCard.addClass("card");
	$initialPlayerCard.appendTo($('#player-hand'));
	drawPlayerCard();
	console.log(player.currentHand[0].cardValue);
	$initialPlayerCard.text(player.currentHand[0].cardValue);
	$initialPlayerCard.addClass(player.currentHand[0].suit);
	console.log(player.currentHand[0].suit);

var $PlayerCard = $('<div>');
	$PlayerCard.attr("id", "player-current-card");
	$PlayerCard.addClass("card");
	$PlayerCard.appendTo($('#player-hand'));
	drawPlayerCard();
	$PlayerCard.text(player.currentHand[0].cardValue);
	$PlayerCard.addClass(player.currentHand[0].suit);
	getPlayerHandTotal();
	// getVisibleDealerTotal();

	// console.log(dealer.handTotal - )
	$alertCenter.html("Your hand total is " + player.handTotal +" and dealer is showing " + dealer.currentHand[0].cardValue + "<br/>" + "<br/>" + "Would you like to raise your bet, hit, or stand?")

	blackJack();

	var $hitButton = $('#hit-me');
	$hitButton.click(function() {
	var $PlayerCard = $('<div>');
	$PlayerCard.attr("id", "player-current-card");
	$PlayerCard.addClass("card");
	$PlayerCard.appendTo($('#player-hand'));
	drawPlayerCard();
	$PlayerCard.text(player.currentHand[0].cardValue);
	$PlayerCard.addClass(player.currentHand[0].suit);
	getPlayerHandTotal();
	$alertCenter.html("Your hand total is " + player.handTotal +" and dealer is showing " + dealer.currentHand[0].cardValue + "<br/>" + "<br/>" + "Would you like to hit or stand?");
	blackJack();
	}) //close hit button

	 
} //close else
gameInProgress = true;
gameCounter += 1;
var $winsTotal = $('#count');
$winsTotal.text("You've won " + player.wins + " out of " + gameCounter);
}); //close deal cards

function killKids() {
	$playerHand.children().remove();
	$dealerHand.children().remove();
	console.log('killed the kids :)');
}

//write a function to reset the board
function nextGame() {
	gameInProgress = false;
	// empty the player and dealer hands 
	for (var i = -1; i < player.currentHand.length; i++) {
		player.currentHand[i].shift(usedCards);
		usedCards.unshift(player.currentHand[i]);
	} //empty the player hand

	for (var i = -1; i < dealer.currentHand.length; i++) {
		dealer.currentHand[i].shift(usedCards);
		usedCards.unshift(dealer.currentHand[i]);
	} //empty the dealer hand
	//reset the hand totals
	player.handTotal = 0;
	dealer.handTotal = 0;
	// get rid of the visuals by deleting all children of playerHand and DealersHand
	$playerHand.children().remove();
	$dealerHand.children().remove();
}




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


