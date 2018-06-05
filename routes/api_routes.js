const express = require('express');
const router = express.Router();
const Gif = require('../models/Gif');
const User = require('../models/User');

// User.remove({}).then(() => console.log('removed'));
// Gif.remove({}).then(() => console.log('removed'));

// User.findById('5b1077c26de1a513bc3ae5f3').then(user => console.log(user));
// User.findById('5b1077c26de1a513bc3ae5f3').populate('gifs').exec((err, user) => {
//   console.log(user);
// });
// User.find({}).populate('gifs').then(users => console.log(users));

// Get Favorites
router.get('/api/favorites', (req, res) => {
  let email = req.query.email;

  User.findOne({email: email})
    .populate('gifs')
    .then(user => {
      // console.log(user.gifs);
      if ( user )
        res.send(user.gifs);
      else res.send(null);
    });
});

// Save Favorite
router.post('/api/gif', (req, res) => {
  

  // 1. Check if user exists
  User.findOne({email: req.body.email})
    .then(user => {

      // Saves the gif to User gifs -- One to Many
        // Confirms the data is not already attached to Gif/User
      const saveFavorite = (user, gif) => {
        
        // Convert id array values into strings, so we can check them against the user/gif _id
        let user_gifs = user.gifs.map(gif_id => gif_id.toString());

        // Make sure gif has not already been associated with user
        if (!user_gifs.includes(gif._id.toString()) ) {
          // Save One to Many association between user and gif
          user.gifs.push(gif._id);
          user.save();
        }        
      };

      // Checks if gif exists before saving favorite
      const processFavorite = user => {

        // 2. Check if Gif exists
        return Gif.findOne({ gif_id: req.body.gif_id })
        .then(gif => {
            // Gif doesn't exist
            if (!gif) {
              console.log(req.body);
              // Create a new gif with data from the front end
              Gif.create({
                  gif_id: req.body.gif_id,
                  url: req.body.url
                }).then(new_gif => saveFavorite(user, new_gif));

            } else {
              // Gif exists
              saveFavorite(user, gif);
            }            
            
        });
      };



      /*** User doesn't exist ***/
      if ( !user ) {

        // Create a new user
        User.create({
          email: req.body.email
        }).then(new_user => {

          processFavorite(new_user)
            // 4. Send confirmation to front end that the favorite was saved successfully
            .then(() => {
              res.send({ message: 'User created and favorite saved successfully!' });
            });
        });

      }
      /*** User exists ***/
      else {

        processFavorite(user)
          // 4. Send confirmation to front end that the favorite was saved successfully
          .then(() => {
            res.send({ message: 'Favorite saved to User successfully!' });
          });
      }
    
    });
});

router.delete('/api/gif', (req, res) => {
  User.findOne({email: req.query.email})
    .then(user => {
      Gif.findOne({gif_id: req.query.gif_id})
        .then(gif => {

          user.gifs.remove(gif._id);
          user.save().then(() => res.send({ message: 'Favorite removed successfully!' }));
        });
    });

});

module.exports = router;