'use strict';
const appCtrl = {};

//GET "/"
appCtrl.helloCtrl = (req, res) => {
  res.render('index', {title: 'World Test App'});
};

module.exports = appCtrl;