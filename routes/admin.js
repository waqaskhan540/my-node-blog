var express = require("express")
var router = express.Router()

var adminController = require("../controllers/adminController")
var confirmAuth = require("../middleware/authMiddlware");


router.get("/login",adminController.login)


//Middleare which checks if request is from logged in user
router.use("/posts",confirmAuth);
router.get("/posts/create",adminController.create_post_get)
router.post("/posts/create",adminController.create_post)
router.get("/",adminController.index)

router.get("/post/publish/:postId",adminController.publish_article)
router.get("/post/unpublish/:postId",adminController.unpublish_article)
module.exports = router