const models = require("../schemas/schemas");

var path = "../views/admin";

exports.logout = (req,res) => {
    if(req.session){
        req.session.destroy((err) => {
            if(err){
                console.log(err);
            }else {
                return res.redirect("/admin/login")
            }
        })
    }
}
exports.login = (req,res) => {

     models.Users.authenticate(req.body.email,req.body.password,(err,user) => {
        if(err || !user){
            console.log("err or user not found.");
            console.log(err);
           res.render(path + "/login",{msg : "Invalid email or password"})

        }else {
            req.session.userId = user._id;
            return res.redirect("/admin")
        }
    }) 
}