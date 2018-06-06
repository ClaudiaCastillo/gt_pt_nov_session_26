const express = require('express');
const router = express.Router();
const Giphy = require('../models/Giphy');
const User = require('../models/User');

User.remove({}).then();
Giphy.remove({}).then();

router.get('/api/favorites', (req, res) => {
  let email = req.query.email;

  User.findOne({email: email})
    .populate('gifs')
    .then(user => {
      if ( user ) {
        res.send(user.gifs);
      } else res.send(null);
    })
});

router.post('/api/giphy', (req, res) => {
  const saveFavorite = (user, gif) => {

    // Convert id array values into strings, so we can check them against the user/gif _id
    let user_gifs = user.gifs.map(gif_id => gif_id.toString());

    // Make sure gif has not already been associated with user
    if ( !user_gifs.includes(gif._id.toString()) ) {
      // Save One to Many association between user and gif
      user.gifs.push(gif._id);
      user.save();
    }
  }

  const processFavorite = user => {
    return Giphy.findOne({gif_id: req.body.gif_id})
      .then(gif => {
        // 2. Check if the Gif exists
        if ( !gif ) {
          Giphy.create({
            gif_id: req.body.gif_id,
            url: req.body.url
          }).then(new_gif => {
            saveFavorite(user, new_gif);
          });
        } else saveFavorite(user, gif);
      })
  }

  // 1. Check if the user exists
  User.findOne({email: req.body.email})
    .then(user => {


      // User doesn't exist
      if ( !user ) {

        User.create({
          email: req.body.email
        }).then(new_user => {
          processFavorite(new_user)
            .then(() => {
              res.send({message: 'User created and favorite saved successfully!'});
            })
        });

      }
      //  User does exist
      else {

        processFavorite(user)
          .then(() => res.send({message: 'Favorite saved to User successfully'}));

      }
      
    });

});

router.delete('/api/gif', (req, res) => {
  User.findOne({email: req.query.email})
    .then(user => {
      Giphy.findOne({gif_id: req.query.gif_id})
        .then(gif => {

          user.gifs.remove(gif._id);
          user.save().then(() => res.send({message: 'Favorite removed successfully!'}));
        });
    })

})

module.exports = router;
