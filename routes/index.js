
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
resp.say('me encontre na esquina! Venha sozinho!', {voice:'woman', language:'pt-BR'})
.pause({length:3})
.say('estou te esperando, quero que voce esteja aqui presente. que seja esta noite, por favor, pela ultima vez');


res.writeHead(200, {
'Content-Type':'text/xml'
});
res.end(resp.toString());

};
