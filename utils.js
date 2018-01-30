'use strict';

const path = require('path'), fs = require('fs'), moment = require('moment');
var api = null, config = null, assets = [];

exports.asset = name => {
    if (!(name in assets)) {
        assets[name] = fs.readFileSync(path.join('assets', name), 'utf8');
    }
    return assets[name];
};

exports.config = () => {
    if (config == null) {
        config = JSON.parse(fs.readFileSync('config.json'));
    } return config;
};

exports.api = () => {
    if (api == null) {
        const apifcraftpl = require('api-fcraft.pl');
        api = new apifcraftpl(exports.config().key);
    } return api;
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
