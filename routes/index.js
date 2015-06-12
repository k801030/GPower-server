var express = require('express');
var router = express.Router();
var Chirpy = require('../models/');
var status = require('../config/status');

/* GET home page. */
router.get('/', function(req, res, next) {

  Chirpy.find({}, function(err, chirpies) {
    res.render('index', {
      title: 'Express',
      chirpies: chirpies
    });
  });
});



// create
router.post('/chirpies', function(req, res, next) {
  var chirpy = new Chirpy(req.body);

  chirpy.save(function(err, chirpy) {

    res.json({
      status: status.FULL,
      id: chirpy.id,
    });
  });

});

router.get('/chirpies', function(req, res, next) {
  Chirpy.find({}, function(err, chirpies) {
    res.json(chirpies);
  });
});


router.get('/chirpies/:id', function(req, res, next) {
  console.log(req.params.id);
  Chirpy.find({
      _id: req.params.id
    },
    function(err, chirpies) {
      res.json(chirpies[0]);
    });
});


router.post('/chirpies/:id/feed', function(req, res, next) {
  //var user_id = req.body.user_id;
  var chirpy_id = req.params.id;



  Chirpy.find({
    _id: chirpy_id
  }, function(err, chirpies) {

    var chirpy = chirpies[0];
    var random = parseInt(Math.random() * 3) + 1;
    var satistification = parseInt(chirpy.satistification) + random;

    /*// Feed by other
    if (user_id !== chirpy_id) {

      Chirpy.findOne({
        _id: user_id
      }, function(err, chirpy) {

        chirpy.vitamin -= 10;

      });

      chirpy.feedByOthers.push({
        id: user_id,
      });
    }*/

    chirpy.satistification = satistification;
    chirpy.save(function(err) {
      if (err) {
        chirpy.satistification = 10;
      }
      chirpy.save();
    });
  });


});

router.post('/chirpies/:id/walk', function(req, res, next) {
  var steps = req.body.steps;
  var id = req.params.id;
  var vitamin = steps / 5;

  Chirpy.find({
      _id: id
    },
    function(err, chirpies) {
      var chirpy = chirpies[0];

      chirpy.vitamin += vitamin;

      chirpy.save(function(err) {
        if (err) {
          chirpy.vitamin = 100;
        }
        chirpy.save(function() {
          res.json({
            status: 'success'
          });
        });
      });
    }
  );
});


module.exports = router;