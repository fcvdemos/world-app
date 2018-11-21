'use strict';
const apiCtrl = {};
const data = require('../../public/data/data');

//GET "/"
apiCtrl.getList = (req, res) => {
  res.json(data);
};

apiCtrl.query = (req,res) => {
  let query = req.query;
  if (!req.query) {res.json(data)}

  if(query.rating) {
    res.json(data.filter(hotel => hotel.stars == req.query.rating));
  }
  else {
    res.json(data.filter(hotel => hotel.name.toLowerCase().includes(req.query.name.toLowerCase())))
  }

};

module.exports = apiCtrl;