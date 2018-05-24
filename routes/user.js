var router = require('express').Router();

var userController = require("../controllers/userController");

router.post("/",userController.create_user);
module.exports = router;