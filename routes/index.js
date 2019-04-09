var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index')
})

router.get('/:template', function(req, res, next) {
  res.render(req.params.template)
})

module.exports = router
