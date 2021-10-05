const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

//Routes
exports.createComment = async (req, res, next) => {
    const headerAuth = await req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    //constantes
    const messageId = req.params.id;

    if (messageId <= 0) {
        return res.status(400).json({ 'error': 'invalid param' });
    }

    const comment = req.body.comment;

    await models.User.findOne({
        where: {id: userId}
    })
    .then(async function(user) {
        if(user){
            let newComment = await models.Comment.create({ 
                userId: userId,
                messageId: req.params.messageId,
                username: user.username,
                comment: comment,
            });
            return res.status(201).json({ newComment : newComment });
        }else {
            return res.status(404).json({ 'error': 'User not found' })
        }
    }).catch(function(error) {
        return res.status(500).json({ error });
    });
}

exports.findAllComments = (req, res) => {
    models.Comment.findAll()
    .then(function(comments) {
        if (comments) {
            res.status(200).json({ comments : comments });
        }else {
            res.status(404).json({ 'error': 'message not found' });
        }
    }).catch(function(err) {
        res.status(500).json({ 'error': err });
    });
}

exports.deleteOneComment = async (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const isAdmin = jwtUtils.getAdmin(headerAuth);

    await models.User.findOne({
        where: { id: userId }
    }).then(async () => {
        try{
            const comment = await models.Comment.findOne({ where: { id: req.params.id }})
            if (userId == comment.userId || isAdmin === true){
                
                await comment.destroy()
                return res.json({ message : 'Comment deleted' })
                
            }else {
                res.status(404).json({ 'error': 'Authorization problem' });
            }
        }catch (err) {
            return res.status(500).json({ 'error': err })
        }
    }).catch(function(err) {
        return res.status(500).json({ 'error': err })
    });

}