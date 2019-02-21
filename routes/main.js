const express = require('express')
const router = express.Router()

const mainController = require('../controllers/mainController.js')

router.get('/', mainController.index);
router.get('/users', mainController.users);
router.get('/friends', mainController.friends);

module.exports = router;
