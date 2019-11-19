const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'ejs');

//middleware
app.use(express.static("./public"));

app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
      res.render('welcome', { name });
    } else {
      res.redirect('/singIn');
    }
});

app.get('/singIn', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('sing-in');
  }
});

app.post('/singIn', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

app.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/singIn');
});

app.get('/recipes', function (req, res) {
  res.render('recipes.ejs');
  
});
app.get('/forms', function (req, res) {
  res.render('forms.ejs');
});

app.listen(3000, () => {
   console.log('The application is running on localhost:3000!')
});