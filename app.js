var express = require('express');
const bodyParser = require("body-parser");
const axios = require('axios')

/*
/     Express Server Setup
*/
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var server = app.listen(3000, function () {
  console.log('Server up and running...🏃🏃🏻');
  console.log("Listening on port %s", server.address().port);
});

/*
/     Routes
*/
app.get("/", function (request, response) {
  console.log(`GET '/' 🤠 ${Date()}`);
  response.send("<h1>Oh, hello there!</h1>");
});

//header validations
app.get("/api/webhook", (req, res) => {
  console.log("received request on" + req.url);
  res.sendStatus(200);
}
);

//post from webhook
app.post("/api/webhook", (req, res) => {
  console.log("received request on " + req.url);
  let bodyJson = JSON.stringify(req.body);
  console.log("request body: " + bodyJson);
  
  let postBackUrl = 'http://localhost:3000/api/callback';
  
  axios.post(postBackUrl, bodyJson)
  .then((res) => {
    console.log(`statusCode: ${res.status}`);
    console.log(res);
    res.sendStatus(200);
  })
  .catch((error) => {
    console.error(error);
    res.sendStatus(500);
  })  
}
);

//post on callback
app.post("/api/callback", (req, res) => {
  console.log("received request on " + req.url);
  let bodyJson = JSON.stringify(req.body);
  console.log("request body: " + bodyJson);  
  res.sendStatus(200);
}
);