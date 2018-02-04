'use strict';

const rethinkdb = require('rethinkdb');

module.exports = async (parameters) => {
    const message = parameters.message;
    const utils = parameters.utils;

    if(!message.guild) {
        message.reply('tej komendy można używać tylko w serwerach!');
    } else {
        const usersCursor = await rethinkdb.table('users').orderBy({index: 'points'}).run(utils.database);
        const users = await usersCursor.toArray();

        const embed = utils.embed('Ranking użytkowników', 'economy')

        for(let i = 0; i < 3; i++) {
            if(users[i]) {
                const member = message.guild.members.get(users[i].id);

                if(member) {
                    embed.addField(`Miejsce #${i + 1}`, `${member.displayName} (${utils.pointsToLevels(users[i].points)}. poziom)`);
                }
            }
        }

        message.channel.send(embed);
    }
};
