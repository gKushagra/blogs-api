const express = require('express');
const config = require('./config');
const DbContext = require('./utils/db');
const Blog = require('./models/blog');

const router = express.Router();
const context = new DbContext();
const table = config.AWS.DYNAMO_DB.TABLE_NAME;

router.get('/blog', async (req, res) => {
    const params = {
        TableName: table
    };
    context.client.scan(params, (error, data) => {
        if (error) res.status(500).json({ error });
        else res.status(200).json({ blogs: data.Items });
    });
});

router.get('/blog/user/:userId', async (req, res) => {
    const params = {
        TableName: table,
        FilterExpression: "#author.#id = :authorId ",
        ExpressionAttributeNames: { "#author": "author", "#id": "id" },
        ExpressionAttributeValues: { ":authorId": req.params.userId }
    }
    context.client.scan(params, (error, data) => {
        if (error) res.status(500).json({ error });
        else res.status(200).json({ blogs: data.Items });
    });
});

router.post('/blog', async (req, res) => {
    const body = req.body;
    if (!body || body == null || body == undefined || body == {}) {
        return res.status(401).json({ message: 'Invalid Data' });
    }

    const blog = new Blog(body);
    if (!blog.isValid()) {
        return res.status(401).json({ message: 'Invalid Data' });
    }

    var params = {
        TableName: table,
        Item: blog
    };

    context.client.put(params, (error, data) => {
        if (error) res.status(500).json({ error });
        else res.status(200).json({ message: 'Blog Saved' });
    });
});

module.exports = router;
