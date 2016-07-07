'use strict'
var express = require('express');
var app = express() ;
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var candies = [
  {
    "id": 1,
    "name": "Chewing Gum",
    "color": "Red"
  },
  {
    "id": 2,
    "name": "Pez",
    "color": "Green"
  },
  {
    "id": 3,
    "name": "Marshmallow",
    "color": "Pink"
  }
];

var nextID = 4;

app.get('/candies/:id', function(req, res){
  var foundCandy;
  var targetID = parseInt(req.params.id);
  for (var i=0; i<candies.length; i++){
    if (candies[i].id === targetID){
        foundCandy = candies[i];
}
  }
  res.send(foundCandy);
});

app.get('/candies/', function(req, res){
  res.send(candies);
});

app.post('/candies', function(req, res){
  var newCandy= req.body;
  if (newCandy.id === undefined){
    newCandy.id = nextID;
    nextID++;
  }
  candies.push(newCandy);
  console.log(newCandy);
  res.send(newCandy);
});

app.put('/candies/:id', function(req, res){
  var newCandy= req.body;
  newCandy.id = parseInt(req.params.id);
  candies.push(newCandy);
  console.log(newCandy);
  res.send(newCandy);
});

app.delete('/candies/:id', function(req, res){
  var deleteCandyID = parseInt(req.params.id);
  for (var i=0; i<candies.length; i++){
    if (candies[i].id === deleteCandyID){
        var foundCandy = candies[i];
        candies.splice(i, 1);
}
  res.send("candy " + req.params.id + " deleted");
}
});

app.listen(3000);
console.log("Server listening on port 3000");