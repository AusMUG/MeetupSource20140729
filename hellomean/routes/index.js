var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { model: {title: 'Express', docs:4 }});

  var mongoDb = req.db;

  mongoDb.close();

  mongoDb.open(function(err, theDb){
    if (err){
      res.send(500, 'error opening db');
      return;
    }

    theDb.collection('collection1', function(err, theCollection){
      theCollection.find().toArray(function(err, theDocs){
          res.render('index', {model:{title:"Hello Mean!", docs:theDocs}});
      });
    })

  });

});

module.exports = router;
