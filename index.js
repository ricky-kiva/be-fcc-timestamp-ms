// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let inParam = req.params.date;
  let date, unix;
  if ((/\d{13}/).test(inParam)) {
    unix = parseInt(inParam);
    date = new Date(unix);
    res.json({
      "unix": unix,
      "utc": date.toUTCString()
    })
  } else if ((/(197[0-9]|19[89][0-9]|[2-9][0-9]{3})-([1-9]|[12][0-9]|3[01])/).test(inParam)) {
    date = new Date(inParam);
    validDateCheck = date.getTime();
    if (isNaN(validDateCheck)) {
      res.json({
        "error": "Invalid Date"
      })
    } else {
        unix = date.getTime();
        res.json({
          "unix": unix,
          "utc": date.toUTCString()
        })
    }
  } else if ((/([1-9]|[12][0-9]|3[01])\s\w+\s(197[0-9]|19[89][0-9]|[2-9][0-9]{3})/).test(inParam)) {
    if (!((/GMT|UTC/).test(inParam))) {
      inParam = `${inParam} 00:00:00 GMT`;
    }
    unix = Date.parse(inParam);
    date = new Date(unix);
    res.json({
      "unix": unix,
      "date": date.toUTCString()
    })
  } else if (!(inParam)) {
    date = new Date();
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    })
  } else {
    res.json({
      "error": "Invalid Date"
    })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
