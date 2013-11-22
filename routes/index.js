
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
.say('bem-vindo a ebopi. fale o que pensa de nos para que possamos atende-lo cada vez melhor', {voice:'woman', language:'pt-br'})
.dial({number:'+5511983600707'});


res.writeHead(200, {
'Content-Type':'text/xml'
});
res.end(resp.toString());

};
