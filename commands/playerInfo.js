'use strict';

module.exports = async (parameters) => {
    const message = parameters.message;
    const utils = parameters.utils;
    const args = parameters.args;

    if(!args[0]) {
        message.reply('prawidłowe użycie: `!gracz <gracz>`!');
    } else {
        utils.api.globalPlayer(args[0]).then(async (player) => {
            const embed = utils.embed('Informacje o graczu', 'property');
            embed.setThumbnail(`https://api.fcraft.pl/player/${args[0]}/head?size=16`);
            embed.addField('Gracz', utils.escapeMarkdown(player.nick), true);
            embed.addField('Konto', (player.premium.last ? 'Oryginalne' : 'Pirackie'), true);
            embed.addField('Pierwsze wejście', utils.datetime(player.time.first), true);
            embed.addField('Ostatnie wejście', utils.datetime(player.time.last), true);
            embed.addField('Aktywny', (utils.isActive(player.time.last) ? 'Tak' : 'Nie'), true);

            const bans = await utils.api.banList();

            if(bans.find(ban => ban.uuid === player.uuid)) {
                embed.addField('Zbanowany', 'Tak', true);
            } else {
                embed.addField('Zbanowany', 'Nie', true);
            }

            message.channel.send(embed);
        }).catch(error => {
            message.reply('nie można było uzyskać informacji nt. podanego gracza!');
        });
    }
};
