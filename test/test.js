var db = 'mongodb://localhost/ebopi';
var mongoose = require ('mongoose');
var request = require('superagent');
var expect = require('expect.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var app = require('express');

mongoose.connect('mongodb://localhost/ebopi');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect: '/', failureRedirect:'/voice'}));



describe('users', function(){
	var Schema = mongoose.Schema;
	var UserSchema = new Schema({
		facebookId : String
	});
	


	var User = passport.use(new FacebookStrategy({
    	clientID: '118027284957927',
    	clientSecret: '353a15a3f448b3218d64455463a637ad',
    	callbackURL: "http://localhost:8080/auth/facebook/callback"
},
	function(accessToken, refreshToken, profile, done) {
    	User.findOrCreate({facebookId: profile.id},  function(err, user) {
      	if (err) { return done(err); }
      	done(null, user);
    	});
  	}
	));

	it('registers a new user', function(done){
    User.register('test2@test.com', 'password', function(doc){
      doc.email.should.eql('test2@test.com');
      done();
	});
	});
});
