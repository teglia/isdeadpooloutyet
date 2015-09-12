
window.onload = function() {
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
  var isItOutYetResult = '';
  var options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
  };

  if (todaysDate >= deadpoolDate) {
    document.querySelector('#greeting').innerText = "YES YES YES!";
    document.querySelector('#message').innerHTML = "HOLY CRAP YES IT IS! RUN to the nearest theater NOW NOW NOW!";
  }
  else {
    document.querySelector('#greeting').innerText = "No.";
    var todayShortDate = formatShortDate(todaysDate);
    var deadpoolShortDate = formatShortDate(deadpoolDate);
    var seconds_left = Math.round((deadpoolDate - todaysDate) / 1000);
    
    var interval = setInterval(function() {
      todaysDate = Date();
      isItOutYetResult = "Deadpool comes out " + deadpoolShortDate + ".<br>Today is only " + todayShortDate + ". <br>Don't worry, you will make it!<br><br>";  
      document.querySelector('#message').innerHTML = isItOutYetResult;
      document.querySelector('#timing').innerHTML = "Counting the seconds anyhow?<br><strong>" + (--seconds_left) + "</strong> seconds until Deadpool. (" + Math.round(seconds_left / 86400) + " days)";
    
        if (seconds_left <= 0)
        {
            document.querySelector('#message').innerText = 'You MADE it! Go see some DEADPOOL!';
            document.querySelector('#timing').innerText = '00:00:00';
            clearInterval(interval);
        }
    }, 1000);

  }
  

  
};







