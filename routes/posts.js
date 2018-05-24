var express = require('express');
var router = express.Router();

var postController = require("../controllers/postController");

router.get("/",postController.get_all_posts);

router.get("/:postId/:title",postController.get_post_by_id);


module.exports = router;