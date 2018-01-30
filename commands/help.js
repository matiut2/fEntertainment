'use strict';

module.exports = async (parameters) => {
    const message = parameters.message;
    const utils = parameters.utils;
    
    const embed = utils.embed('Pomoc bota', 'survival');
    embed.setDescription(utils.asset('help.md'));

    message.author.send(embed).then(privateMessage => {
        message.reply('wysłano pomoc poprzez wiadomość prywatną!');
    }).catch(error => {
        message.reply('nie można było wysłać pomocy poprzez wiadomość prywatną!');
    });
};
