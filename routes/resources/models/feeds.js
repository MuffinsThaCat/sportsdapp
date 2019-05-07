'use strict';
const RSSToMongo = require('rss-node-mongo');

const feedUrl = 'https://cointelegraph.com/editors_pick_rss';
const connectionString = 'mongodb://127.0.0.1:27017/db';
const collectionName = 'feeds';
const fallback = {
    useNewUrlParser: true,
};


function fetchRssXml(error, rss, fallback) {
    try {
        const rss = new RSSToMongo();
        rss.RSSToMongo(feedUrl, connectionString, collectionName, fallback.useNewUrlParser);
        return;

    } catch (error) {
        console.log(error);


    }

}

module.exports = fetchRssXml;