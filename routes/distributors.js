var express = require('express');
var router = express.Router();
var Distributor = require('../models/distributor');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Distributor.find((err, distributors) => {
    res.json(distributors);
  });
});

router.post('/', (req, res, next)=>{
  let newDistributor = new Distributor({
    first_name: req.body.first_name,
    last_name: req.body.last_name
  });

  newDistributor.save((err, distributor) => {
    if(err) {
      res.json(err);
    } else {
      res.json(distributor);
    }
  });
});

router.get('/:id', (req, res, next) => {
    Distributor.findById(req.body._id, (err, distributor) => {
      if(err) {
        res.json(err);
      } else {
        res.json(distributor);
      }
    })
});

router.delete('/:id', (req, res, next) => {
  Distributor.remove({_id: req.params.id}, (err, result) => {
    if(err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })
});

module.exports = router;
