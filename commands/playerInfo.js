'use strict';

const Discord = require('discord.js');
const moment = require('moment');

module.exports = async (obj) => {
    const message = obj.message, utils = obj.utils, args = obj.args;

    if(!args[0]) {
        message.reply('prawidłowe użycie: `!gracz <gracz>`!');
    } else {
        utils.api().globalPlayer(args[0]).then(async (player) => {
            const embed = new Discord.RichEmbed();
            embed.setAuthor('Informacje o graczu', 'https://wiki.fcraft.pl/images/e/e3/W%C5%82asno%C5%9B%C4%87.png');
            embed.setColor('FFF000');
            embed.setThumbnail(`https://api.fcraft.pl/player/${args[0]}/head?size=16`);
            embed.addField('Gracz', utils.escapeMarkdown(player.nick), true);
            embed.addField('Konto', (player.premium.last ? 'Oryginalne' : 'Pirackie'), true);
            embed.addField('Pierwsze wejście', moment(player.time.first * 1000).format('D.MM.YYYY H:mm'), true);
            embed.addField('Ostatnie wejście', moment(player.time.last * 1000).format('D.MM.YYYY H:mm'), true);

            const isActive = moment(player.time.last * 1000).isSameOrAfter(moment().subtract(30, 'days'));
            embed.addField('Aktywny', (isActive ? 'Tak' : 'Nie'), true);

            const bans = await utils.api().banList();

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
