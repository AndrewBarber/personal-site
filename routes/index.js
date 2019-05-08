let express = require('express');
let router = express.Router();
let request = require('request');


// GET /
router.get('/', (req, res, next) => {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', (req, res, next) => {
  // Just home for now
  return res.render('index', { title: 'Home' });
});

// GET /contact
router.get('/contact', (req, res, next) => {
    return res.render('contact', { title: 'Contact Me' });
});

// POST /contact
router.post('/contact', (req, res, next) => {
    //todo
});

// GET /work
router.get('/work', (req, res, next) => {
  return res.render('portfolio', { title: 'Work / Portfolio' });
});


module.exports = router;