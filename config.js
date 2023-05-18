require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    AWS: {
        REGION: process.env.AWS_REGION,
        REMOTE_CONFIG: {
            ACCESS_KET_ID: process.env.AWS_ACCESS_KEY_ID,
            SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
        },
        DYNAMO_DB: {
            TABLE_NAME: process.env.AWS_DYNAMO_DB_TABLE_NAME
        }
    }
};
