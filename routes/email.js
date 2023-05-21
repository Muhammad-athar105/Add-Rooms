const express = require("express");
const { sign } = require("jsonwebtoken");
const router =  express.Router();

// import controller
const { activateAccount} = require('../app/controllers/MailControler');

router.post ("/email-activate", activateAccount); 


module.exports = router;