/**
 * Little app to let you know if the Deadpool movie is out yet!
 *
 */

/** Pebble API stuff **/
var UI = require('ui');
var Accel = require('ui/accel'); Accel.init();
var ajax = require('ajax');

/** The rest **/
var deadpoolDate = new Date(2016, 1, 12); // Just in case we can't get the release date from moviedb.
var isItOutYetSub = '';
var isItOutYetBody = '';
var url = 'http://api.themoviedb.org/3/movie/',
    movie = '293660',
    mode = '?',
    key = 'api_key=';

ajax({
  type: 'json',
  url: url + movie + mode + key,
  },
  function(data, status, request) {
    console.log("Got fresh relese date from themoviedb.org: " + data.release_date);
    deadpoolDate = new Date(data.release_date);
  },
  function(error, status, request) {
    console.log("AJAX error while attempting to get release date from themoviedb.org: " + error);
  }
);

var getSeconds = function() {
  var now = new Date();
  return Math.round((deadpoolDate - now) / 1000);
};

var showDetailsCard = function() {
  var detailsCard = new UI.Card();
  detailsCard.show();

  var secondTicker = setInterval(function() {
    if (getSeconds() <= 0) {
      clearInterval(secondTicker);
      detailsCard.title("Done Waitin'!");
      detailsCard.subtitle('Go to the movie,');
      detailsCard.body("but don't run into any walls, especially that 4th one.");
    }
    else {
      detailsCard.title("There's Only");
      detailsCard.subtitle(getSeconds());
      detailsCard.body("seconds (that's " + Math.round(getSeconds() / 86400) + " days) until it is out. Don't worry, you will make it!");
      detailsCard.subtitle(getSeconds());      
    }
  }, 1000);
};

if (getSeconds() <= 0) {
  isItOutYetSub = 'YES YES YES!';
  isItOutYetBody = 'Time to touch... go see a movie!';
}
else {
  isItOutYetSub = 'No.';
  isItOutYetBody = "Counting seconds? Shake it!";
}

var main = new UI.Card({
  title: 'Is Deadpool Out Yet?',
  icon: 'images/deadpool_icon_22.png',
  subtitle: isItOutYetSub,
  body: isItOutYetBody
});

main.show();

main.on('click', 'select', function(e) {
  showDetailsCard();
});

main.on('accelTap', function(e) {
  showDetailsCard();
});