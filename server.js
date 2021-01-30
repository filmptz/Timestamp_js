// server.js
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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//date now
app.get("/api/timestamp",function(req,res){
  res.json({unix: Date.now(), utc :Date()})
})

//input date
app.get("/api/timestamp/:date",function(req,res){
  var date_string = req.params.date

  if(/^\d{4}\-\d{2}\-\d{2}$/.test(date_string)){
    res.json({
      unix: new Date(date_string).getTime(), 
      utc : new Date(date_string).toUTCString()
    })
    if(req.params.date === 'Invalid Date'){
      res.json({ error : "Invalid Date" })
    }
  }
  else {
    var date_int = parseInt(req.params.date)
    res.json({
      unix: date_int, 
      utc : new Date(date_int).toUTCString()
    })
  }
})


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
