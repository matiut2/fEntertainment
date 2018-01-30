'use strict';

const Discord = require('discord.js');
const Random = require('random-js');

module.exports = async (obj) => {
    const message = obj.message, utils = obj.utils, args = obj.args;

    let rolls = 1;
    let sides = 6;

    if(!isNaN(args[0])) {
        const userRolls = parseInt(args[0]);

        if(userRolls > 1) {
            if(userRolls < 100) {
                rolls = userRolls;
            } else {
                rolls = 99;
            }
        }
    }

    if(!isNaN(args[1])) {
        const userSides = parseInt(args[1]);

        if(userSides > 1) {
            if(userSides < 100) {
                sides = userSides;
            } else {
                sides = 99;
            }
        }
    }

    const results = [];

    for(let i = 0; i < rolls; i++) {
        results.push(Random.integer(1, sides)(Random.engines.nativeMath));
    }

    const embed = new Discord.RichEmbed();
    embed.setAuthor('Rzut kostką', 'https://wiki.fcraft.pl/images/0/00/Wolność.png');
    embed.setColor('FFF000');
    embed.addField('Rzuty', rolls, true);
    embed.addField('Strony', sides, true);
    embed.addField('Otrzymane wyniki', results.join(', '));

    const resultsSum = results.reduce((a, b) => a + b);

    embed.addField('Suma wyników', resultsSum);

    message.channel.send(embed);
};
