'use strict';

module.exports = async (parameters) => {
    const message = parameters.message;
    const utils = parameters.utils;
    const args = parameters.args;
    
    const serverName = (args[0] ? args[0].toLowerCase() : 'hard');
    
    utils.api.info(serverName).then(server => {
        const embed = utils.embed('Informacje o serwerze', 'survival');
        embed.setThumbnail(server.logo.large);
        embed.addField('Serwer', utils.capitalize(serverName), true);
        embed.addField('Wersja gry', server.version.minecraft.number, true);

        let version = `v${server.version.world.number}.${server.version.series.number}.${server.version.update.number}`;

        if(server.version.patch) {
            version += `.${server.version.patch.number}`;
        }

        embed.addField('Wersja serwera', `[${version}](https://wiki.fCraft.pl/${version})`, true);
        embed.addField('Nazwa aktualizacji', server.version.update.name, true);
        embed.addField('Ostatnia aktualizacja', utils.date(server.version.patch ? server.version.patch.time : server.version.update.time), true);
        embed.addField('Ostatnia zmiana mapy', utils.date(server.version.world.time), true);

        message.channel.send(embed);
    }).catch(error => {
        message.reply('nie można było uzyskać informacji nt. podanego serwera!');
    });
};
