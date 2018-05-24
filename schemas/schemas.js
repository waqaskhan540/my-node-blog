

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

let postSchema = new mongoose.Schema({
    pubdate: { type: Date, default: Date.now },
    tags: { type: [String] },
    content: String,
    title: String,
    status : {type : Number, min:0,max:1,default:0}

});

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true
    }
})

userSchema.pre("save", function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            next(err);
        }
        user.password = hash;
        next();
    })
})



userSchema.statics.authenticate = (email, password, callback) => {

   models.Users.findOne({ "email": email })
        .exec((err, user) => {
            if (err) {
                return callback(err);
            } else {
                console.log(user);
                if (!user) {
                    var err = new Error("User not found.");
                    err.status = 401;
                    return callback(err);
                }
            }
    /*
            bcrypt.compare(password, user.password, function (err, result) {
                 if (result === true) {
                     return callback(null, user);
                 } else {
                     return callback();
                 }
             })*/
            if (password === user.password) {
                return callback(null, user);
            } else {
                return callback();
            }
        })
}


var models = {
    Articles: mongoose.model("Article", postSchema,"Articles"),
    Users: mongoose.model("User", userSchema,"Users")
}


module.exports = models;
