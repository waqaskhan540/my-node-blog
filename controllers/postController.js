


const models = require("../schemas/schemas");


exports.get_all_posts = (req, res) => {
   
    Promise.all([
        models.Articles.find({'status':1,"title":{$ne:null}}).sort({ 'pubdate': -1 }).exec(),
        models.Articles.find({'status':1,"title":{$ne:null}})
            .sort({ 'pubdate': 1 })
            .limit(5)
            .exec()
    ]).then(([allPosts, recentPosts]) => {       
        res.render("index", { articles: allPosts, recentPosts: recentPosts })
    })
}


exports.get_post_by_id = (req, res) => {
    var postId = req.params.postId;
    console.log("post id:" + postId);
    if (!postId) {
        res.redirect("/");
        return;
    }

    models.Articles.findById(postId, (err, art) => {
        if (!err) {

            res.render("post", { article: art })
        } else {
            console.log(err);
            res.redirect("/");
        }
    })
}


