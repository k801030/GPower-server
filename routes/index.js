var express = require('express');
var router = express.Router();
var chirpy = require('../models/');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/chirpy', function(req, res, next) {
  var chirpy = new Chirpy({ name: req.body.name });
});

router.get('/chirpies', function(req, res, next) {
  Chirpy.find(
    {},
    function(err, chirpies){
      res.json(chirpies);
  });
})


router.get('/chirpy/:id', function(req, res, next) {
  Chirpy.update(
    {_id: req.param.id },
    function(err, chirpy){
      res.json(chirpy);
  });
})


router.post('chirpy/:id/feed', function(req, res, next) {
  Chirpy.find(
    {_id: req.param.id },
    function(err, chirpy){
      chirpy.feed();
      res.josn(chirpy);
    }
  );
})

router.post('chirpy/:id/walk', function(req, res, next) {
  Chirpy.find(
    {_id: req.param.id },
    function(err, chirpy){
      chirpy.walk();
      res.json(chirpy);
    }
  );
})


module.exports = router;
