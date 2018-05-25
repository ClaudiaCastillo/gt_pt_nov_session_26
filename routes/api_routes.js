const express = require('express');
const router = express.Router();
const Giphy = require('../models/Giphy');

/* GET home page. */
router.get('/api/test', function(req, res, next) {
  res.send({message: 'Worked'});
});

router.post('/api/giphy', (req, res) => {
  Giphy.create(req.body) // {url: 'https://giphyurl.com}
    .then(giphy => {
      res.send(giphy);
    }).catch(err => console.log(err));
});

module.exports = router;
