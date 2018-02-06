'use strict';

const apifcraftpl = require('api-fcraft.pl');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const rethinkdb = require('rethinkdb');
const moment = require('moment');

const icons = {
    'freedom': 'https://wiki.fcraft.pl/images/0/00/Wolność.png',
    'property': 'https://wiki.fcraft.pl/images/e/e3/Własność.png',
    'economy': 'https://wiki.fcraft.pl/images/5/52/Ekonomia.png',
    'survival': 'https://wiki.fcraft.pl/images/6/60/Survival.png'
};

const assets = {};
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
const api = new apifcraftpl(config.key);

rethinkdb.connect({
    host: config.database.host,
    port: config.database.port,
    db: config.database.database,
    user: config.database.user.name,
    password: config.database.user.password
}).then(connection => {
    exports.database = connection;
    console.log('Database is ready!');
});

exports.api = api;
exports.config = config;

exports.embed = (name, icon) => {
    const embed = new Discord.RichEmbed();
    embed.setAuthor(name, icons[icon]);
    embed.setColor('FFF000');

    return embed;
};

exports.asset = asset => {
    if(!assets[asset]) {
        assets[asset] = fs.readFileSync(path.join(__dirname, 'assets', asset), 'utf8');
    }

    return assets[asset];
};

exports.capitalize = text => {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
};

exports.escapeMarkdown = text => {
    return text.replace('_', '\\_');
};

exports.date = timestamp => {
    return moment(timestamp * 1000).format('DD.MM.YYYY');
};

exports.datetime = timestamp => {
    return moment(timestamp * 1000).format('DD.MM.YYYY HH:mm');
};

exports.isActive = timestamp => {
    return moment(timestamp * 1000).isSameOrAfter(moment().subtract(30, 'days'));
};

exports.pointsToLevels = points => {
    return Math.floor(Math.sqrt(points) / 5);
}
