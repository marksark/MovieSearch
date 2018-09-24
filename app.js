const express = require('express'),
      app     = express(),
      request = require('request');

app.set("view engine", "ejs");

//set default view
app.get("/", (req, res) => {
  res.render('search');
});

//set up our results route
app.get("/results", (req,res) => {
  //define the search term
  const query = req.query.search;
  //request the Web API info with search term
  request('http://www.omdbapi.com/?s=' + query +'&apikey=thewdb', (error,response,body) => {
    //check for errors
    if(!error && response.statusCode == 200){
      //turn current data in string form into an object we can manipulate
      const data = JSON.parse(body);
      //render the results page if all above are met
      res.render("results", {data: data});
    } else {
      console.log(err, 'err');
    }
  })
});

app.listen(3000,process.env.IP, () => {
  console.log("Movie App Server has started");
});
