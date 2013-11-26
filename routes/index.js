
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
resp.say('Obrigado por ligar para a ebÃ³pi' ,{ voice:'woman', language:'pt-BR'})
.pause({length:1})
.say('Fique na linha que sua ligaÃ§Ã£o serÃ¡ transferida para um de nossos atendentes', {voice:'woman', language:'pt-br'})
.dial('+5511983600707');


res.writeHead(200, {
'Content-Type':'text/xml'
});
res.end(resp.toString());

};
