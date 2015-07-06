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

router.get('/planner/index', function(req,res,next){
  var keyword = req.body.search;
  var userName = req.cookies.currentUser;
  unirest.get("http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
    + keyword + "&api_key=" + process.env.bigOven_API)
    .header('X-TrackerToken', process.env.bigOven_API)
    .end(function(response){
    res.render('planner/index', {response: res.body, currentUser: userName})
  });
});

router.post('/planner/signup', function(req, res, next){
  var hash = bcrypt.hashSync(req.body.password, 10);
  var password = req.body.password;
  var pwdConf = req.body.pwdConf;
  var email = req.body.email;
  var errors = validator.passwordValidator(password, pwdConf, email, userCollection)
  var errorArray = [];
  if (errors.length != 0){
    res.render('planner/signup', {errors: errors})
  } else {
    userCollection.findOne({email: req.body.email}, function(err, record) {
      if(record) {
        errorArray.push("Email already exists")
        res.render('planner/signin', { errors: errorArray })
      } else {
        userCollection.insert({
             email: req.body.email,
             password: hash
           });
          res.cookie('currentUser', req.body.email)
          res.redirect('/planner/index');
      }
    })
  }
});

router.get('/planner/signin', function(req, res, next){
  res.render('planner/signin', {validator: []});
});

router.post('/planner/signin', function(req, res, next){
  var email =  req.body.email;
  var password = req.body.password;
  var errors = validator.userValidator(password, email, userCollection);
  var errorArray = [];
  if (errors.length != 0){
    res.render('planner/signin', {errors: errors})
  } else {
    userCollection.findOne({email: req.body.email}, function(err, record){
      if (!record){
        errorArray.push("User doesn't exist")
        res.render('planner/signup', {errors: errorArray })
      }
      else {
        userCollection.findOne({email: req.body.email}, function(err, record){
          if(bcrypt.compareSync(password, record.password)){
            res.cookie('currentUser', req.body.email)
            res.redirect('/planner/index');
          } else {
            errorArray.push("Password incorrect!")
            res.render('planner/signin', { errors: errorArray })
          }
        })
      }
    })
    }
});


router.get('/planner/signup', function(req, res, next){
  res.render('planner/signup', {validator: []})
});

router.get('/planner/days/mon', function(req, res, next){
  res.render('planner/days/mon')
});

router.post('/planner/days/mon', function(req, res, next){
  var keyword = req.body.search;
  var results = [];
  unirest.get("http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
    + keyword + "&api_key=" + 'dvx70Lw0414QF05tDphpT9jq9dgU22Fr')
    .header({'X-TrackerToken': process.env.bigOven_API, 'Accept': 'application/json'})
    .end(function(response){
      console.log(response.body);
      // console.log(response.body.Results[0].Title);
      // console.log(response.body.Results[0].WebURL);
    res.render('planner/days/mon', response.body)
  });
});

router.get('/planner/days/tues', function(req, res, next){
  res.render('planner/days/tues')
});
router.post('/planner/days/tues', function(req, res, next){
  var keyword = req.body.search;
  var results = [];
  unirest.get("http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
    + keyword + "&api_key=" + 'dvx70Lw0414QF05tDphpT9jq9dgU22Fr')
    .header({'X-TrackerToken': process.env.bigOven_API, 'Accept': 'application/json'})
    .end(function(response){
    res.render('planner/days/tues', response.body)
  });
});

router.get('/planner/days/wedns', function(req, res, next){
  res.render('planner/days/wedns')
});
router.post('/planner/days/wedns', function(req, res, next){
  var keyword = req.body.search;
  var results = [];
  unirest.get("http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
    + keyword + "&api_key=" + 'dvx70Lw0414QF05tDphpT9jq9dgU22Fr')
    .header({'X-TrackerToken': process.env.bigOven_API, 'Accept': 'application/json'})
    .end(function(response){
    res.render('planner/days/wedns', response.body)
  });
});

router.get('/planner/days/thurs', function(req, res, next){
  res.render('planner/days/thurs')
});
router.post('/planner/days/thurs', function(req, res, next){
  var keyword = req.body.search;
  var results = [];
  unirest.get("http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
    + keyword + "&api_key=" + 'dvx70Lw0414QF05tDphpT9jq9dgU22Fr')
    .header({'X-TrackerToken': process.env.bigOven_API, 'Accept': 'application/json'})
    .end(function(response){
    res.render('planner/days/thurs', response.body)
  });
});

router.get('/planner/days/fri', function(req, res, next){
  res.render('planner/days/fri')
});
router.post('/planner/days/fri', function(req, res, next){
  var keyword = req.body.search;
  var results = [];
  unirest.get("http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
    + keyword + "&api_key=" + 'dvx70Lw0414QF05tDphpT9jq9dgU22Fr')
    .header({'X-TrackerToken': process.env.bigOven_API, 'Accept': 'application/json'})
    .end(function(response){
    res.render('planner/days/fri', response.body)
  });
});

router.get('/planner/days/sat', function(req, res, next){
  res.render('planner/days/sat')
});
router.post('/planner/days/sat', function(req, res, next){
  var keyword = req.body.search;
  var results = [];
  unirest.get("http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
    + keyword + "&api_key=" + 'dvx70Lw0414QF05tDphpT9jq9dgU22Fr')
    .header({'X-TrackerToken': process.env.bigOven_API, 'Accept': 'application/json'})
    .end(function(response){
    res.render('planner/days/sat', response.body)
  });
});

router.get('/planner/days/sun', function(req, res, next){
  res.render('planner/days/sun')
});
router.post('/planner/days/sun', function(req, res, next){
  var keyword = req.body.search;
  var results = [];
  unirest.get("http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
    + keyword + "&api_key=" + 'dvx70Lw0414QF05tDphpT9jq9dgU22Fr')
    .header({'X-TrackerToken': process.env.bigOven_API, 'Accept': 'application/json'})
    .end(function(response){
    res.render('planner/days/sun', response.body)
  });
});

router.get('/fake-logout', function(req, res, next){
  res.clearCookie('currentUser')
  res.redirect('../../');
});

router.get('/planner/saved', function(req, res, next){
  userCollection.findOne({email: req.cookies.currentUser}, function (err, record) {
  res.render('planner/saved', { user: record });
});
});

// router.get('/planner/days/mon/add', function (req, res){
//   res.render('planner/weeklyplan')
// });

router.get('/planner/days/mon/add', function (req, res, next) {
  var mealInfo = {
      name: req.query.title,
      recipeId: req.query.recipe_id,
      imageUrl: req.query.image,
      WebURL: req.query.url
  }
    userCollection.update({email: req.cookies.currentUser}, {$set: {mon: mealInfo}})
    res.redirect('/planner/weeklyplan')
});
router.get('/planner/days/tues/add', function (req, res, next) {
  var mealInfo = {
      name: req.query.title,
      recipeId: req.query.recipe_id,
      imageUrl: req.query.image,
      WebURL: req.query.url
  }
  userCollection.update({email: req.cookies.currentUser}, {$set: {tues: mealInfo}})
  res.redirect('/planner/weeklyplan')
});
router.get('/planner/days/wedns/add', function (req, res, next) {
  var mealInfo = {
      name: req.query.title,
      recipeId: req.query.recipe_id,
      imageUrl: req.query.image,
      WebURL: req.query.url
  }
  userCollection.update({email: req.cookies.currentUser}, {$set: {wedns: mealInfo}})
  res.redirect('/planner/weeklyplan')
});
router.get('/planner/days/thurs/add', function (req, res, next) {
  var mealInfo = {
      name: req.query.title,
      recipeId: req.query.recipe_id,
      imageUrl: req.query.image,
      WebURL: req.query.url
  }
  userCollection.update({email: req.cookies.currentUser}, {$set: {thurs: mealInfo}})
  res.redirect('/planner/weeklyplan')
});
router.get('/planner/days/fri/add', function (req, res, next) {
  var mealInfo = {
      name: req.query.title,
      recipeId: req.query.recipe_id,
      imageUrl: req.query.image,
      WebURL: req.query.url
  }
  userCollection.update({email: req.cookies.currentUser}, {$set: {fri: mealInfo}})
  res.redirect('/planner/weeklyplan')
});
router.get('/planner/days/sat/add', function (req, res, next) {
  var mealInfo = {
      name: req.query.title,
      recipeId: req.query.recipe_id,
      imageUrl: req.query.image,
      WebURL: req.query.url
  }
  userCollection.update({email: req.cookies.currentUser}, {$set: {sat: mealInfo}})
  res.redirect('/planner/weeklyplan')
});
router.get('/planner/days/sun/add', function (req, res, next) {
  var mealInfo = {
      name: req.query.title,
      recipeId: req.query.recipe_id,
      imageUrl: req.query.image,
      WebURL: req.query.url
  }
  userCollection.update({email: req.cookies.currentUser}, {$set: {sun: mealInfo}})
  res.redirect('/planner/weeklyplan')
});

router.get('/planner/weeklyplan', function(req, res, next){
  userCollection.findOne({email: req.cookies.currentUser}, function (err, record) {
    console.log(record);
  res.render('planner/weeklyplan', { user: record })
  })
});
module.exports = router;
