module.exports = {
    development: {
        string: 'mongodb://127.0.0.1:27017/feeds',

    },
    production: {
        // dns 
        username: '',
        prefix: 'mongodb://',
        host: '127.0.0.1',
        port: '27017'

    }
};