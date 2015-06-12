var express = require('express');
var router = express.Router();
var Chirpy = require('../models/');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


// create
router.post('/chirpy', function(req, res, next) {
  var chirpy = new Chirpy({
    name: req.body.name
  });

  chirpy.save(function() {
    res.json({
      status: 'success'
    });
  });

});

router.get('/chirpies', function(req, res, next) {
  Chirpy.find({},
    function(err, chirpies) {
      res.json(chirpies);
    });
});


router.get('/chirpy/:id', function(req, res, next) {
  console.log(req.params.id);
  Chirpy.find({
      _id: req.params.id
    },
    function(err, chirpy) {
      res.json(chirpy);
    });
});


router.post('/chirpy/:id/feed', function(req, res, next) {
  Chirpy.find({
      _id: req.params.id
    },
    function(err, chirpy) {
      chirpy.feed();
      res.josn(chirpy);
    }
  );
});

router.post('/chirpy/:id/walk', function(req, res, next) {
  Chirpy.find({
      _id: req.params.id
    },
    function(err, chirpy) {
      chirpy.walk();
      res.json(chirpy);
    }
  );
});


module.exports = router;