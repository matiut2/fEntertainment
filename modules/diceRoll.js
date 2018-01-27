'use strict';

const fs = require('fs');
const path = require('path');

const Discord = require('discord.js');
const Random = require('random-js');

module.exports = async (message) => {
    try {
        const args = message.content.split(/\s+/);

        let rolls = 1;
        let sides = 6;

        if(!isNaN(args[1])) {
            const userRolls = parseInt(args[1]);

            if(userRolls > 1) {
                if(userRolls < 100) {
                    rolls = userRolls;
                } else {
                    rolls = 99;
                }
            }
        }

        if(!isNaN(args[2])) {
            const userSides = parseInt(args[2]);

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
    } catch(error) {
        message.reply('wystąpił błąd!');
        console.error(error);
    } finally {
        message.channel.stopTyping();
    }
};
