var express = require('express');
var router = express.Router();
var request = require("request");

// va import code directly from file
var Posts = require('../db.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title:'Home', posts: Posts.posts });
});

// // contact PAGE
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', posts: Posts.posts });
});

// sign-in PAGE
router.get('/sign-in', function(req, res, next) {
  res.render('sign-in', { title: 'Sign-in', posts: Posts.posts });
});

// archives page
router.get('/archives', function(req, res, next) {
  res.render('archives', { title: 'Archives', posts: Posts.posts });
});

// create page
router.get('/create', function(req, res, next) {
  res.render('create', { title: 'Create', posts: Posts.posts });
});

// archives page
router.post('/create', function(req, res, next) {

let obj = {
  'title': req.body.title,
  'author': req.body.author,
  'time': req.body.time,
  'content': req.body.time,
  'image': req.body.image
}

console.log(obj);
request.post({
url: "http://localhost:8000/posts",
method: "POST",
body: obj,
json: true,
function(error, response, body){
  // res.render('/', posts: Posts.posts);
  res.redirect("/");
}



});
});

module.exports = router;
