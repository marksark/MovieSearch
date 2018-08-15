const express = require('express');
const app = express();
const request = require('request');
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render('search');
})

//set up our route
app.get("/results", function(req,res){
  //define the search term
  const query = req.query.search;
  //request the Web API info with search term
  request('http://www.omdbapi.com/?s=' + query +'&apikey=thewdb', function(error,response,body){
    //check for errors
    if(!error && response.statusCode == 200){
      //turn current data in string form into an object we can manipulate
      const data = JSON.parse(body);
      //render the results page if all above are met
      res.render("results", {data: data});
      // console.log(typeof data + " is what 'data' is");
      // console.log(typeof body + " is what 'body' is");
    } else {
      console.log(err, 'err');
    }
  })
});

app.listen(3000,process.env.IP, function (){
  console.log("Movie App Server has started");
});
