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

var $dealCards = $('#deal-cards')
console.log($dealCards)

$dealCards.click(function() {
	var $currentCards = $('<div>')
$currentCards.attr("id", "current-card")
$currentCards.appendTo($('#dealer-hand'));
	var hand = $('cards[0]')
	console.log(hand);
});
