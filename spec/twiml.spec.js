var twilio = require('twilio');

describe('The TwiML Response Object', function () {

    //lowercase the first character of a string
    function lowercaseFirst(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    it('should generate an empty response when just the constructor is used', function() {
        var response = new twilio.TwimlResponse(),
            xml = response.toString();

        expect(xml).toBe('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
    });

it('should support a flat document with say nodes, with attributes', function() {
        var response = new twilio.TwimlResponse();
        response.say('Obrigado por ligar para a ebopi. Sua ligacao e muito importante para nos. Fique na linha para que direcionamos sua ligacao para um de nossos colaboradores', {
            voice:'woman',
            language:'pt-BR'
        });
	response.dial(
	'+5511983600707');
        var xml = response.toString(),
            test = [
                '<?xml version="1.0" encoding="UTF-8"?>',
                '<Response>',
                '<Say voice="woman" language="pt-BR">Obrigado por ligar para a ebopi. Sua ligacao e muito importante para nos. Fique na linha para que direcionamos sua ligacao para um de nossos colaboradores</Say>',
		'<Dial>', 
			 '+5511983600707',
		'</Dial>',	
                '</Response>'
            ].join('');

        expect(xml).toBe(test);
    });
});


