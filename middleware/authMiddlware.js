 const confirmAuth = (req,res,next) => {
    if(req.session && req.session.userId){
        next();
    }else {
        res.sendStatus(403);
    }
}

module.exports = confirmAuth;