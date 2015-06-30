var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var validator = require('../public/javascripts/validator.js')
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/meal_planner_signup');
var userCollection = db.get('users');
var unirest = require('unirest');
var key = (process.env.bigOven_API);

//where do I create the users? --install monk db for users √
//  create my own users collection in monk √
//users only connect to api when searching for recipe
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {validator: []});
});
// {validator: []}

router.get('/planner/index', function(req,res,next){
  res.render('planner/index')
});

router.post('/planner/signup', function(req, res, next){
  var hash = bcrypt.hashSync(req.body.password, 10);
  var password = req.body.password;
  var pwdConf = req.body.pwdConf;
  var email = req.body.email;
  var errors = validator.passwordValidator(password, pwdConf, email, userCollection)
  if (errors.length != 0){
    res.render('planner/signup', {errors: errors})
  } else {
    userCollection.findOne({email: req.body.email}, function(err, record) {
      if(record) {
        res.render('planner/signin', { errors: "Email already exists" })
      } else {
        userCollection.insert({
             email: req.body.email,
             password: hash
           });
          res.redirect('/planner/index');  
      }
    })
  }
  // // userCollection.findOne({email: req.body.email}, function(err, record){
  // //   if (record){
  // //     res.redirect('/planner/signin')
  // //   }
  //
  //   else {
  //     userCollection.insert({
  //      email: req.body.email,
  //      password: hash
  //    });
});

router.get('/planner/signin', function(req, res, next){
  res.render('planner/signin', {validator: []});
});

router.post('/planner/signin', function(req, res, next){
  var email =  req.body.email;
  var password = req.body.password;
  var validation = validator.userValidator(password, email, userCollection);
  userCollection.findOne({email: req.body.email}, function(err, record){
    if (!record){
      res.render('/planner/signup')
    }
  if(bcrypt.compareSync(password, record.password)){
    res.redirect('/planner/index')
  } else {
    res.render('/planner/signin', {validation: validation})
  }
  });
});

router.get('/planner/signup', function(req, res, next){
  res.render('planner/signup', {validator: []})
});

router.get('/planner/days/mon', function(req, res, next){
  res.render('planner/days/mon')
});
router.get('/planner/days/tues', function(req, res, next){
  res.render('planner/days/tues')
});
router.get('/planner/days/wedns', function(req, res, next){
  res.render('planner/days/wedns')
});
router.get('/planner/days/thurs', function(req, res, next){
  res.render('planner/days/thurs')
});
router.get('/planner/days/fri', function(req, res, next){
  res.render('planner/days/fri')
});
router.get('/planner/days/sat', function(req, res, next){
  res.render('planner/days/sat')
});
router.get('/planner/days/sun', function(req, res, next){
  res.render('planner/days/sun')
});


module.exports = router;
