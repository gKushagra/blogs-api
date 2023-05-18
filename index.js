const config = require('./config');
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(config.PORT, (error) => {
    if (error) { console.error(error); }
    console.info(`Blogs api listening on port ${config.PORT}`);
});
