const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const connect = require('connect');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const csurf = require('csurf');

app = express(),
post = require('./routes/post');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(expressSession({secret: 'secret_key'}));
app.use(csurf());
app.use((req, res, next) => {
  res.locals.csrftoken = req.csrfToken();
  next();
})

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use((err, req, res, next) => {
  res.send(err.message)
});

app.get('/', post.index);
app.get('/posts/new', post.new);
app.post('/posts/create', post.create);
app.get('/posts/:id', post.show);
app.get('/posts/:id/edit', post.edit);
app.put('/posts/:id/', post.update);
app.delete('/posts/:id/', post.destroy);


app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/create', (req, res) => {
  res.send(req.body.name);
});

app.listen(3000);
console.log('node starting ...');
