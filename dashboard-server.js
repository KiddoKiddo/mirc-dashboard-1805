var express = require('express');
var app = express();

//setting middleware
app.use(express.static(__dirname + '/public')); //Serves resources from public folder



const port = process.env.PORT || 3000;
var server = app.listen(port, () => {
  console.log(`Application is listening on port ${port}!`);
});
