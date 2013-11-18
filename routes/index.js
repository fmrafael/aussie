
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Aussie-Ebopi || Agencia Digital' });
};



//twilio voice
exports.voice = function(req, res) {
        var twilio = require('twilio');
var resp = new twilio.TwimlResponse();
resp.say({voice:'woman'}, 'me encontre na esquina! Venha sozinho!');

res.writeHead(200, {
'Content-Type':'text/xml'
});
res.end(resp.toString());

};
