const express = require('express');
const router = express.Router();
const Gif = require('../models/Gif');
const User = require('../models/User');

// User.remove({}).then(() => console.log('removed'));
// Gif.remove({}).then(() => console.log('removed'));

// User.findById('5b1077c26de1a513bc3ae5f3').then(user => console.log(user));
User.findById('5b1077c26de1a513bc3ae5f3').populate('gifs').exec((err, user) => {
  console.log(user);
});
// User.find({}).then(users => console.log(users));

router.post('/api/gif', (req, res) => {
  // console.log(req.body);  

  // User.findOne({email: req.body.email})
  //   .then(user => {
  //     console.log(user);
  //   })

  User.findOne({email: req.body.email})
    .then(user => { 
      const createAndAttachGif = (gif, user) => {
        if ( !gif ) {

          Gif.create({
            gif_id: req.body.gif_id, url: req.body.url
          }).then(new_gif => {

            user.gifs.push(new_gif._id);
            user.save().then(() => {
              new_gif.users.push(user._id);
              return new_gif.save();
            }).then(() => res.send('Added new gif'));
          
          }).catch(err => console.log(`Gif create error: ${err}`));


        }
         
        else {

          if ( !gif.users.includes(user._id) ) {
            gif.users.push(user._id);
            gif.save()
              .then(() => {
                if (!user.gifs.includes(gif._id)) {
                  user.gifs.push(gif._id);
                  return user.save();
                }
              })
              .then(() => res.send('Added to old gif'))
              .catch(err => console.log(err));
          }

        }
        
      }

      Gif.findOne({id: req.body.id})
        .then(gif => {
          if ( user ) {


            if ( gif ) {
              createAndAttachGif(gif, user);
            } else createAndAttachGif(null, user);        


          } else {

            console.log('fired');
            User.create({
              email: req.body.email
            }).then(new_user => {
              console.log(new_user);
              if ( gif ) {
                createAndAttachGif(gif, new_user);
              } else createAndAttachGif(null, new_user);
            }).catch(err => console.log(`User create error: ${err}`));


          }
        })
    });
});

module.exports = router;
