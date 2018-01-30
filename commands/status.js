'use strict';

const httpAsPromised = require('http-as-promised');

module.exports = async (parameters) => {
    const message = parameters.message;
    const utils = parameters.utils;
    
    const response = await httpAsPromised.get('https://api.skript.pl/server/mc.fcraft.pl/', { resolve: 'body' });
    const serverStatus = JSON.parse(response);

    if(serverStatus.online) {
        const embed = utils.embed('Status serwera', 'economy');
        embed.addField('Status', 'Online', true);

        if(serverStatus.players.list.length < 3) {
            embed.addField('Gracze', (serverStatus.players.list[0] ? utils.escapeMarkdown(serverStatus.players.list.join(', ')) : '_Brak_'), true);
        } else {
            embed.addField('Gracze', utils.escapeMarkdown(serverStatus.players.list.join(', ')));
        }

        embed.setFooter('Inne usługi: status.fDomain.pl');

        message.channel.send(embed);
    } else {
        const embed = utils.embed('Status serwera', 'economy');
        embed.setColor('FFF000');
        embed.addField('Status', 'Offline');
        embed.setFooter('Inne usługi: status.fDomain.pl');

        message.channel.send(embed);
    }
};
