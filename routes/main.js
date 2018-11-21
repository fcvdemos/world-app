const express = require('express');
const AppController = require('../client/controllers/app.controller');
const ApiController = require('../client/controllers/api.controller');
const app = express.Router();


/* GET home page. */
app.get('/', AppController.helloCtrl);
app.get('/hotels', ApiController.getList);
app.get('/hotels/search', ApiController.query);

module.exports = app;
