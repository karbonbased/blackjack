// $( document ).ready(function() {
// ********************BUILDING THE DECK****************\\
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

// iterating through cards to change face cards to all have cardValue = 10
//Start with Jacks
function fixFaces() {
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

	// changing cardValue of A to 11, later ACE will be treated as 11 
	//until hand is over 21 and then it'll become 1
	for (var i = 0; i < cards.length; i += 13) {
		cards[i].cardValue = 11
	}
};

fixFaces();

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

// ********************ESTABLISHING GLOBAL VARIABLES****************\\
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

var gameInProgress = false;
var gameCounter = 0;
var usedCards = [];

var $betButton = $('.bet');
var $playerHand = $('#player-hand');
var $dealerHand = $('#dealer-hand');
var $dealCards = $('#deal-cards');
var $alertCenter = $('#alert-center');

var $bankRoll = $('#current-bankroll')
$bankRoll.text(player.money);

var $currentBet = $('#current-bet');
$currentBet.text(player.currentBet);

// establish the game counter
var $winsTotal = $('#count');
$winsTotal.text("You've won " + player.wins + " out of " + gameCounter);

// ****************************ESTABLISHING GLOBAL FUNCTIONS**********************\\
//establish the betting logic
$betButton.click(function() {
	var $betChoice = $(this).text().replace(/\$/g, '');
	var $betNum = parseInt($betChoice);
	player.money -= $betNum;
	$bankRoll.text(player.money);
	player.currentBet += $betNum;
	$currentBet.text(player.currentBet)
	console.log(typeof $currentBet);
})

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
}

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

function checkDeck() {
	if (cards.length < 10) {
		var $restart = $('<div>');
		var $placeholder = $('#placeholder')
		$placeholder.css ("display", "inherit")
		$restart.appendTo('#placeholder');
		$restart.html("CLICK TO RESTART");
		$restart.click(function() {
    	location.reload();
		});
		}
}

function checkWinner() {
	if ((player.handTotal == dealer.handTotal)) {
		$alertCenter.html("It's a tie!<br/>You get your money back :)<br/><br/>Next game will begin in 4 seconds.");
		player.money = (player.currentBet + player.money);
		$bankRoll.text(player.money);
		lostCash();
		setTimeout(function() {
			nextGame()}, 4000
		) 
	} //closes else if tie
	else if (player.handTotal > dealer.handTotal) {
		$alertCenter.html("Player wins!<br/><br/>Next game will begin in 4 seconds.")
		player.wins += 1;
		$winsTotal.text("You've won " + player.wins + " out of " + gameCounter);
		payOut();
		setTimeout(function() {
			nextGame()}, 4000
		) 
	} // closes else if player wins
	else if (player.handTotal < dealer.handTotal) {
		$alertCenter.html("Dealer wins! :(<br/><br/>Next game will begin in 4 seconds.")
		lostCash()
		setTimeout(function() {
			nextGame()}, 4000
		) 
	}
	else {
		alert("no winner yet, dealer will take turn");
	}
} // closes checkWinner function
// ******************************START GAME******************************\\
$dealCards.click(function() {
	if (gameInProgress == true) {
		
		;
	}
	else if (player.currentBet == 0) {
		return $alertCenter.text("You must place bet before cards are dealt");
	} //closes if check for bet
	else {
			function blackJack() {
				if (player.handTotal == 21) {
					$alertCenter.html("Blackjack! You win!");
					player.wins += 1;
					$winsTotal.text("You've won " + player.wins + " out of " + gameCounter);
					payOut();
					setTimeout(function() {
						nextGame()}, 4000
					)
				} // close if for 21
				else if (dealer.handTotal == 21) {
					setTimeout(function() {
					$dealerHiddenCard.addClass("card");
					$dealerHiddenCard.removeClass("face-down-card");
					$dealerHiddenCard.text(dealer.currentHand[1].cardName);
					$alertCenter.html("Dealer has blackjack!<br/> You lose :(<br/><br/>Hit deal to start a new game!");}, 2000
						) //closes set timeout for dealer showing his hidden card if he has blackjack 2 seconds
					lostCash();
					setTimeout(function() {
						nextGame()}, 4000
					)
				} // closes else if fir dealer 
				else {
					return;
				}
			} // closes blackjack function

			function checkBust() {
				for (var i = 0; i <= player.currentHand.length; i++) {
					if ((player.handTotal > 21) && (player.currentHand[i].cardName == "A")) {
						player.handTotal -= 10;
						$alertCenter.html("Ace is now being treated as a 1<br/><br/>Your hand total is " + player.handTotal +" and dealer is showing " + dealer.currentHand[0].cardValue + "<br/>" + "<br/>" + "Would you like to hit or stand?");
						return;
					} // closes if player has an Ace in their hand and is over 21
					else if (player.handTotal > 21) {
							$alertCenter.html("BUST!<br/><br/>Next game will be ready in 4 seconds.");
							lostCash();
							setTimeout(function() {
							nextGame()}, 4000 //COMMENTING OUT WHILE I TEST
							) //closes set timeout function for restarting the next game
					} //closes else when there is not an A
				} //closes for loop checking player current hand
				for (var i = 0; i <= dealer.currentHand.length; i++) {
					if ((dealer.handTotal > 21) && (dealer.currentHand[i].cardName == "A")) {
						dealer.handTotal -= 10;
						$alertCenter.html("Ace is now being treated as a 1<br/><br/>Dealer now showing " + dealer.handTotal);
						return;
					} // closes if dealer has an ace and is over 21
					else if (dealer.handTotal > 21) {
						$alertCenter.html("Dealer BUST!<br/>You win!<br/><br/>Next game will be ready in 4 seconds.");
						payOut();
						$winsTotal.text("You've won " + player.wins + " out of " + gameCounter);
						setTimeout(function() {
							nextGame();}, 4000 //COMMENTING OUT WHILE I TEST
						) // closes set timeout function for next game to begin in 4 seconds
					} // closes else bust for dealer
				} //closes for loop for dealer
			} // closes checkbust function
		
	var $dealerHiddenCard = $('<div>');
	$dealerHiddenCard.addClass("face-down-card");
	$dealerHiddenCard.appendTo($('#dealer-hand'));
	drawDealerCard();
	$dealerHiddenCard.addClass(dealer.currentHand[0].suit);
	
	var $dealerCard = $('<div>')
	$dealerCard.attr("id", "current-card")
	$dealerCard.addClass("card");
	$dealerCard.appendTo($('#dealer-hand'));
	drawDealerCard();
	$dealerCard.text(dealer.currentHand[0].cardName);
	$dealerCard.addClass(dealer.currentHand[0].suit);
	getDealerHandTotal();

	var $initialPlayerCard = $('<div>');
	$initialPlayerCard.attr("id", "player-current-card");
	$initialPlayerCard.addClass("card");
	$initialPlayerCard.appendTo($('#player-hand'));
	drawPlayerCard();
	$initialPlayerCard.text(player.currentHand[0].cardName);
	$initialPlayerCard.addClass(player.currentHand[0].suit);

var $PlayerCard = $('<div>');
	$PlayerCard.attr("id", "player-current-card");
	$PlayerCard.addClass("card");
	$PlayerCard.appendTo($('#player-hand'));
	drawPlayerCard();
	$PlayerCard.text(player.currentHand[0].cardName);
	$PlayerCard.addClass(player.currentHand[0].suit);
	getPlayerHandTotal();

	$alertCenter.html("Your hand total is " + player.handTotal +" and dealer is showing " + dealer.currentHand[0].cardValue + "<br/>" + "<br/>" + "Would you like to raise your bet, hit, or stand?")

	blackJack();

	var $hitButton = $('#hit-me');
	$hitButton.off().on('click', function() {
			var $NewPlayerCard = $('<div>');
			$NewPlayerCard.attr("id", "player-current-card");
			$NewPlayerCard.addClass("card");
			$NewPlayerCard.appendTo($('#player-hand'));
			drawPlayerCard();
			$NewPlayerCard.text(player.currentHand[0].cardName);
			$NewPlayerCard.addClass(player.currentHand[0].suit);
			getPlayerHandTotal();
			$alertCenter.html("Your hand total is " + player.handTotal +" and dealer is showing " + dealer.currentHand[0].cardValue + "<br/>" + "<br/>" + "Would you like to hit or stand?");
			blackJack();
			checkBust();
	}) //close hit button

	var $standButton = $('#stand');
	$standButton.off().on('click', function() {
		$dealerHiddenCard.addClass("card");
		$dealerHiddenCard.removeClass("face-down-card");
		$dealerHiddenCard.text(dealer.currentHand[1].cardName);
		$alertCenter.html("Dealer will now take his turn, showing " + dealer.handTotal);

		if ((player.handTotal == dealer.handTotal)) {
			checkWinner();
		} //closes if for tie

		else if (dealer.handTotal > player.handTotal) {
			checkWinner();
		} // close if for dealer wins

		else if (dealer.handTotal >= 17) {
			checkWinner();
		}

		else if ((dealer.handTotal <= player.handTotal) && (dealer.handTotal <= 17)) {
			while (dealer.handTotal <= 17) {
				// setTimeout(function() {
				var $newDealerCard = $('<div>')
				$newDealerCard.attr("id", "new-card")
				$newDealerCard.addClass("card");
				$newDealerCard.appendTo($dealerHand);
				drawDealerCard();
				$newDealerCard.text(dealer.currentHand[0].cardName);
				$newDealerCard.addClass(dealer.currentHand[0].suit);
				getDealerHandTotal();
				$alertCenter.html("Dealer has hit, now showing " + dealer.handTotal); //}, 1000
				// ) //closes set timeout 
				checkBust();
			} // closes while loop under 17
			checkWinner();
		} // closes else if dealer HITS for under 17
	}) // close clicking on stand button


} //close else
gameInProgress = true;
gameCounter += 1;
$winsTotal.text("You've won " + player.wins + " out of " + gameCounter);
checkDeck();
}); //close deal cards



//write a function to reset the board
function nextGame() {
	// empty the player and dealer hands 
	for (var i = -11; i <= player.currentHand.length; i++) {
		player.currentHand.shift(usedCards);
		usedCards.unshift(player.currentHand);
	} //empty the player hand

	for (var i = -11; i < dealer.currentHand.length; i++) {
		dealer.currentHand.shift(usedCards);
		usedCards.unshift(dealer.currentHand);
	} //empty the dealer hand
	//reset the hand totals
	player.handTotal = 0;
	dealer.handTotal = 0;
	// get rid of the visuals by deleting all children of playerHand and DealersHand
	$playerHand.children().remove();
	$dealerHand.children().remove();

	$alertCenter.html("Place a new bet and press deal to start a another game!")

	gameInProgress = false
}

// });