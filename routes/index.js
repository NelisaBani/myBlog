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
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login', posts: Posts.posts });
});

router.get('/sign_up', function(req, res, next) {
  res.render('sign_up', { title: 'sign_up', posts: Posts.posts });
});

// archives page
router.get('/archives', function(req, res, next) {
  res.render('archives', { title: 'Archives', posts: Posts.posts });
});

// create page
router.get('/create', function(req, res, next) {
  res.render('create', { title: 'Create', posts: Posts.posts });
});
// edit post
router.get('/edit', function(req, res, next) {
  res.render('edit', { title: 'edit', posts: Posts.posts });
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

router.get('/edit/:id', function(req,res,next){

request({
  url: "http://localhost:8000/posts/" + req.params.id,
  method: "GET",
},function(error, response, body) {
  console.log(JSON.parse(body));
  // Send  aresponse message
  res.render('edit', {message: false, posts: JSON.parse(body)});
});

});

router.post('/edit/:id', function(req, res, next){
  request({
    url: "http://localhost:8000/posts/" + req.params.id,
    method:"PATCH",
    form:{
      title: req.body.title,
      content: req.body.content,
      authour: req.body.author,
  }
}, function(error, response, body) {


  res.render('edit',{message:'successfully changed.',posts: JSON.parse(body)});
});

});
/* GET subscribe page. */
router.post('/sign_up', function (req, res, next) {

// gets the last user id and adds 1 to giev a hiugher id
  // var id = posts.users[posts.users.length-1].id + 1;

// create variable to post
  var obj = {
    "id": req.body.id,
    "user": req.body.user,
    "email": req.body.email,
    "password": req.body.password,
  }
  //write logic that saves this data
  request.post({
    url:'http://localhost:8000/users',
    body:obj,
    json:true
  },
  function(error,responsive,body){
    res.redirect('/');
  });

});

// logging in page
router.post('/login',function(req,res,next){
  var users = posts.users;
  console.log(users);

  var username = req.body.username;
  var password = req.body.password;

  for (let i in users) {
    console.log(username);
    if (username == users[i].user && password == users[i].password) {
        res.render('index', { title: 'Sign up', posts: posts.posts, message: false, logged_in: true});
    }else{
        res.render('log_in', { title: 'Sign up', posts: posts.posts, message: "Login unsuccessful, username or password incorrect!"});
    }
  }
});
/* GET subscribe page. */
router.post('/subscribe', function (req, res, next) {

// create variable to post
  var obj = {
    "name":req.body.name,
    "email": req.body.email
  }
  //write logic that saves this data
  request.post({
    url:'http://localhost:8000/subscribe',
    body:obj,
    json:true
  },
  function(error,responsive,body){
    res.redirect('/');
  });

});



module.exports = router;
