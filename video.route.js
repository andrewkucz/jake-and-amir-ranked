const express = require('express');
const videoRoutes = express.Router();

let Video = require('./video.model');

// returns 2 videos with indexes passed in by query params index1 and index2 (does no checking to see if indices are valid 1-678)
//   /api/video/2vids?index1=1&index2=2
videoRoutes.route('/2vids').get(function (req, res) {

  let q = req.query;

  Video.find({ $or: [ { index: q.index1 }, { index: q.index2 } ] })
    .then(vids => { res.json(vids) })
    .catch(error => { console.log(error); })

});

//  Post an object with field videos that is an array with 2 objects to update their ratings
//    /api/video/update/2vids
videoRoutes.route('/update/2vids').post(function (req, res) {

  if(req.body.videos.length !== 2) {
    res.status(400).send("problem");
  }
  
  let in1 = req.body.videos[0].index;
  let in2 = req.body.videos[1].index;
  

  let callback = videos => {

    if (!videos) { res.status(404).send("data is not found"); }
    else {
        
        let len = videos.length;
        for(let i=0; i<len; i++)
        {
          videos[i].rating = req.body.videos[i].rating;
          videos[i].save().then(function(video) {
          });
        }
        res.status(200).send('Success.');
      }
    };

    Video.find({ $or: [ { index: in1 }, { index: in2 } ] })
    .then(callback)
    .catch(error => { console.log(error); })

});

//get the top (limit) in order by highest rating
//    /api/video/top/{limit}
videoRoutes.route('/top/:limit').get(function (req, res) {

  Video
  .find()
  .limit(parseInt(req.params.limit))
  .sort('-rating')
  .select('rating linkid title')
  .exec()
  .then(vids => { res.json(vids) })
  .catch(error => { console.log(error); });

});


module.exports = videoRoutes;