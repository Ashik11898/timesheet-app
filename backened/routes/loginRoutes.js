const express = require('express');
const { handleLogin,addingEmployes,verifyToken } = require('../controllers/authController');
const router = express.Router()


//Post Method
router.post('/login', handleLogin);
router.post('/register',verifyToken, addingEmployes);

    

module.exports = router;