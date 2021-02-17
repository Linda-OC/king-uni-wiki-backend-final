var express = require('express');
var router = express.Router();

/* GET all-articles page. */
router.get('/', function (req, res, next) {
    res.render('all-articles-page', {
        title: 'All Articles'
    });
});

module.exports = router;