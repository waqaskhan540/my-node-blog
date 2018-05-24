const models = require("../schemas/schemas")


var path = "../views/admin/"
exports.index = (req,res) => {
    
    if(req.session.userId){
       
        models.Articles.find({},(err,posts) => {
            if(err){
                console.log(err)
            }else {

                res.render(path+"/index",{"articles":posts});
            }
        })
       
    }else {
        console.log("redirecting to admin/login")
        res.redirect("/admin/login")
    }
    
  
    
}
exports.create_post_get = (req,res) => {
    res.render(path + "/create");
}
exports.create_post = (req,res) => {
    var post = {
        pubdate : new Date(),
        title : req.body.title,
        content  : req.body.content,
        tags :req.body.tags.split(",")
    }

    var newPost = new models.Articles(post)
    newPost.save((err,post) => {
        if(err){
            console.log(err);
        }else {
            res.redirect("/admin")
        }
    })
}

exports.login = (req,res) => {
    res.render(path+"/login");
}

exports.unpublish_article = (req,res) => {
    var postId = req.params.postId;

    if(!postId){
        res.json({success :false, message : "invalid post id."})
        return
    }

    models.Articles.findById(postId,(err,post) => {
        if(err){
            console.log(err)
            res.json({success:false,message : "request failed, try again."})
            return;
        }

        post.status = 0;
        post.save((err)=>{
            if(err){
                console.log(err)
                res.json({success : false, message : "could not update the status."})
                return
            }

            res.json({success : true,message : "article updated."})
        })
    })

}
exports.publish_article = (req,res) => {
    var postId = req.params.postId

    if(!postId){
        res.json({success :false, message : "invalid post id."})
        return
    }

    models.Articles.findById(postId,(err,post) => {
        if(err){
            console.log(err)
            res.json({success:false,message : "request failed, try again."})
            return;
        }

        post.status = 1;
        post.save((err)=>{
            if(err){
                console.log(err)
                res.json({success : false, message : "could not update the status."})
                return
            }

            res.json({success : true,message : "article updated."})
        })
    })
}

