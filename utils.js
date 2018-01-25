'use strict';

exports.capitalize = text => {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
};

exports.escapeMarkdown = text => {
    text = text.replace('_', '\\_');
    return text;
};
