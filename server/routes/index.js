var express = require('express');
var router = express.Router();
var House = require('../controllers/houses.controller.js')
/* GET home page. */
router.get('/',House.showAll)
router.get('/:id',House.show)
router.post('/',House.create)
router.put('/:id',House.update)
router.delete('/:id',House.delete)

module.exports = router;
