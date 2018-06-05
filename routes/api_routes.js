const express = require('express');
const router = express.Router();
const Giphy = require('../models/Giphy');
const User = require('../models/User');



router.post('/api/giphy', (req, res) => {
  

  Giphy.create(req.body) // {url: 'https://giphyurl.com}
    .then(giphy => {
      res.send(giphy);
    }).catch(err => console.log(err));
});

module.exports = router;
