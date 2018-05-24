var models = require("../schemas/schemas");

exports.create_user = (req, res) => {

    if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
        var user = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf : req.body.passwordConf
        }

        models.Users.create(user,(err,user) => {
            if(err){
                console.log(err);
            }else {
                res.redirect("/admin/login")
            }
        })
    }
}

