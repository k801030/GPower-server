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

  chirpy.save(function() {
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
    function(err, chirpy) {
      res.json(chirpy);
    });
});


router.post('/chirpies/:id/feed', function(req, res, next) {

  var id = req.params.id;
  Chirpy.find({
      _id: id
    },
    function(err, chirpies) {
      var chirpy = chirpies[0];
      var random = parseInt(Math.random() * 3) + 1;
      var satistification = parseInt(chirpy.satistification) + random;

      Chirpy.update({
        _id: id
      }, {
        $inc: {
          satistification: random
        }
      }, {
        runValidators: true
      }, function(err, chirpy) {
        res.json({
          chirpy: chirpy,
          status: 'succeed'
        });
      });
    }
  );


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

      Chirpy.update({
        _id: id
      }, {
        $inc: {
          vitamin: vitamin
        }
      }, {
        runValidators: true
      }, function(err, chirpy) {
        res.json({
          chirpy: chirpy,
          status: 'succeed'
        });
      });
    }
  );
});


module.exports = router;