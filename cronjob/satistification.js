var Chirpy = require('../models');

module.exports = function() {

  Chirpy.find({}, function(err, chirpies) {

    chirpies.forEach(function(chirpy) {

      chirpy.satistification -= 1;
      chirpy.save(function(err) {
        if (err) {
          chirpy.satistification = 0;
        }
        chirpy.save();
      });
    });
  });



};