var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Distributor = require('../models/distributor');
const AuthUser = require('../models/authuser');
const jwt = require('../util/jwt');
const { json } = require('express');

function getAllDistribution(res){
  Distributor.find().populate('user', 'email first_name last_name').then(v => res.json(v));
}

function getDistributorList(userId, res){
  Distributor.find()
    .populate('user', '_id')
    .where({user: userId}).then(v => {
      res.json(v);
  })
}

async function create(obj){
  return await Distributor.create(obj);
}



/* GET fetch distributors. */
router.get('/', function(req, res) {
  try {
    let user = jwt.getPayload(req.headers.authorization);
    if(user.role.toLowerCase() == 'manager'){
      getAllDistribution(res);
    } else if(user.role.toLowerCase() == 'supervisor'){
      getAllDistribution(res);
    } else if(user.role.toLowerCase() == 'distributor'){
      getDistributorList(user._id, res);
    }
  } catch (e) {
    res.json({error: e});
  }
});




/* POST save distributors. */
router.post('/', (req, res) => {
  try {
    if(req.headers.authorization) {
      let user = jwt.getPayload(req.headers.authorization);
      if(user && user.role.toLowerCase() === "distributor"){
        let distributor_id = req.body._id;
        if(!distributor_id) {
          distributor_id = new mongoose.Types.ObjectId();
        } 
        Distributor.findByIdAndUpdate(distributor_id, {
          distribution_type: req.body.distribution_type,
          phone_number: req.body.phone_number,
          reference_media: req.body.reference_media,
          zip_code: req.body.zip_code,
          need_covid_vaccine: req.body.need_covid_vaccine,
          covid_vaccine_brand: req.body.covid_vaccine_brand,
          covid_vaccinated: req.body.covid_vaccinated,
          need_additional_support: req.body.need_additional_support,
          number_of_children: req.body.number_of_children,
          any_one_above_65: req.body.any_one_above_65,
          is_veteran: req.body.is_veteran,
          what_describes_you: req.body.what_describes_you,
          user: user._id
        }, {
          upsert: true,
          new: true
        }, (err, d) => {
          if(err){
            res.json(err);
          } else {
            res.json(d);
          }
        });
      } else {
        res.json({error: 'Unauthroized access'});
      }
    } else{
      res.json({error: 'Unauthroized access'});
    }
  } catch(e){
    res.json({error: e});
  }
});

// GET distributor by Id
router.get('/:id', (req, res) => {
  try {
    const user = jwt.getPayload(req.headers.authorization);
    if(user && user.role){
      Distributor.findById(req.params.id, (err, distributor) => {
        if(err) {
          res.json(err);
        } else {
          if(distributor) {
            if(user.role.toLowerCase() != "distributor" || user._id == distributor.user) {
              res.json(distributor);
            } else {
              res.status(401).json({error: "Unauthorized access"});
            }
          } else {
            res.status(404).json({status: 'not found'})
          }
        }
      })
    } else {
      res.status(401).json({error: "Unauthorized access"});
    }
  } catch(e){
    res.json({error: e});
  }

});

// DELETE remove distributor by Id
router.delete('/:id', (req, res) => {
  try {
    Distributor.findByIdAndDelete(req.params.id, 
      // {
      //   rawResult: true
      // },
      (err, result) => {
        if(err) {
          res.json(err);
        } else {
          res.json(result);
        }
    })
  } catch(e){
    res.json({error: e});
  }

});

module.exports = router;
