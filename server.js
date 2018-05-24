const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session);
const PORT = process.env.PORT || 5000

mongoose.connect("mongodb://localhost/blogdb", (err) => {
    if (err)
        console.log("could not connect to the database")
})


const indexRoutes = require("./routes/index")
const postRoutes = require("./routes/posts")
const adminRoutes = require("./routes/admin")
const sessionRoutes = require("./routes/session")
const userRoutes = require("./routes/user")

app.set("view engine", "pug")
app.set("views",__dirname+"/views")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true ,limit:'50mb'}))
app.use(session({
    secret : "my-blog-secret",
    resave : true,
    saveUninitialized : false,
    store : new MongoStore({
       mongooseConnection : mongoose.connection
    })
}))

app.use("/",indexRoutes)
app.use("/posts",postRoutes)
app.use("/admin",adminRoutes)
app.use("/session",sessionRoutes)
app.use("/user",userRoutes)


app.listen(PORT, (err) => {
    if(err){
        console.log(err)
    }
    else {
        console.log("app running on port "+PORT)
    }
    
})