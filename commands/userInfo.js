'use strict';

const rethinkdb = require('rethinkdb');

module.exports = async (parameters) => {
    const message = parameters.message;
    const utils = parameters.utils;

    const mentionedUser = message.mentions.users.first()
    let user = message.author;

    if(mentionedUser) {
        user = mentionedUser;
    }

    const userInfo = await rethinkdb.table('users').get(message.author.id).run(utils.database);
    const points = (userInfo ? userInfo.points : 0);
    const levels = utils.pointsToLevels(points);

    const embed = utils.embed('Informacje o użytkowniku', 'economy');
    embed.setThumbnail(user.displayAvatarURL);
    embed.addField('Użytkownik', user.tag);
    embed.addField('Poziom', levels, true);
    embed.addField('Punkty', points - levels * 100, true);

    message.channel.send(embed);
};
