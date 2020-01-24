/* eslint-disable prettier/prettier */
var express = require('express');
var reactViews = require('express-react-views');
var instagramUser = require('instagram-user');

var app = express();

app.set('view engine', 'js');
app.engine('js', reactViews.createEngine());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  
  instagramUser('meinfaahad').then(
    data => {
      res.render('Html', { data, });
    },
    err => {

    },
  );
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Dynamic react example listening on port ' + port);
});
