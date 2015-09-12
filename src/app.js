/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

var formatShortDate = function(d) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  var dd = d.getDate();
  var mm = monthNames[d.getMonth()];
  var yy = d.getFullYear();

  return mm + ' ' + dd + ', '+yy;
};

var deadpoolDate = new Date(2016, 1, 12);
var todaysDate = new Date();
var isItOutYetSub = '';
var isItOutYetBody = '';

var options = {
  weekday: "long", year: "numeric", month: "short",
  day: "numeric", hour: "2-digit", minute: "2-digit"
};

if (todaysDate >= deadpoolDate) {
  isItOutYetSub = 'YES YES YES!';
  isItOutYetBody = 'Time to touch yourse... go see a movie!';
}
else {
  isItOutYetSub = 'No.';
  isItOutYetBody = "Counting seconds? Click a button!";
}


var main = new UI.Card({
  title: 'Is Deadpool Out Yet?',
  subtitle: isItOutYetSub,
  body: isItOutYetBody
});

main.show();

main.on('click', 'select', function(e) {
  var card = new UI.Card();
  var secondsLeft = Math.round((deadpoolDate - todaysDate) / 1000);

  card.title("There's Only");
  card.subtitle(secondsLeft);
  card.body("Seconds (that's " + Math.round(secondsLeft / 86400) + " days) until it is out. Don't worry, you will make it!");
  card.show();
  todaysDate = new Date();
  var interval = setInterval(function() {

    if (todaysDate <= deadpoolDate) {
      todaysDate = new Date();
      var timeleft = Math.round((deadpoolDate - todaysDate) / 1000 ); 
      card.subtitle(timeleft);
    }
  }, 1000);
});
