
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var engine = require('ejs-locals');
var app = express();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');

//mongoose
mongoose.connect('mongodb://localhost/ebopi');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  
});



//face
passport.use(new FacebookStrategy({
    clientID: '118027284957927',
    clientSecret: '353a15a3f448b3218d64455463a637ad',
    callbackURL: "http://www.ebopi.me/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({facebookId: profile.id},  function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));



//twilio
var accountSid = 'AC90b1a115228aae9f10c2f39653e6f7b8';
var authToken = '6f85775f3c570b2fa620fa496d065609';
var client = require('twilio')(accountSid, authToken);



// all environments
app.engine('ejs', engine);
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.session({secret:'ebopi'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/voice', routes.voice);
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect: '/', failureRedirect:'/voice'}));



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));

});

