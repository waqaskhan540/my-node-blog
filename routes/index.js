var router = require("express").Router();

router.get("/",(req,res) => {
    res.redirect("/posts");
})

module.exports = router;