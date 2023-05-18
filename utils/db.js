const AWS = require('aws-sdk');
const config = require('../config');

AWS.config.update(config.AWS.REMOTE_CONFIG);

class DbContext {
    constructor() {
        this.client = new AWS.DynamoDB.DocumentClient();
    }
}

module.exports = DbContext;
