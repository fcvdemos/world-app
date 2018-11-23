'use strict';
const appCtrl = {};

//GET "/"
appCtrl.helloCtrl = (req, res) => {
  res.render('index');
};

//GET "/error"
appCtrl.errorCtrl = (req, res) => {
  res.render('error');
};
module.exports = appCtrl;