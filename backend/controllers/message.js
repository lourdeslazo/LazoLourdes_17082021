const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs');

//Routes
exports.createMessage = async (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    //constantes
    const title = req.body.title;
    const content = req.body.content;
    const attachment = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";

    await models.User.findOne({
        where: { id: userId }
    })
    .then(async function(user) {
        if(user){
            let user = await models.User.findOne({ where: {id : userId} })
            let newMessage = await models.Message.create({
                title : title,
                content : content,
                attachment : attachment,
                UserId : user.id,
            });
            return res.status(201).json({ newMessage : newMessage });
        } else {
            res.status(404).json({ 'error': 'User not found' });
        }
    }).catch(function (err) {
        return res.status(500).json({ 'error': err });
    });
}

exports.findOneMessage = async (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    await models.Message.findOne({
        attributes: ['id', 'username', 'title', 'userId', 'content', 'attachment', 'createdAt'],
        where: { id: req.params.id },
    })
    .then(async function(message) {
        await models.User.findOne({
            attributes: ['username'],
            where: {id: userId}
        }).then(async function(user){
            await models.Comment.findAll({
                attributes: ['comment', 'username', 'id', 'userId'],
                where: { messageId: req.params.id },
            })
            .then(function (comments) {
                const getComment = { message, comments}
                res.status(200).json(getComment)
            }).catch(function(err) {
                res.status(500).json({ 'error': err });              
            });
        }).catch(function(err) {
            res.status(500).json({ 'error': err });
        });
    }).catch(function(err) {
        res.status(500).json({ 'error': err });
    });
}

exports.findAllMessage = (req, res) => {
    models.Message.findAll()
    .then(function(messages) {
        if (messages) {
            res.status(200).json({ messages : messages });
        } else {
            res.status(404).json({'error': 'message not found' });
        }
    }).catch(function(err) {
        res.status(500).json({'error': err });
    });
}

exports.deleteOneMessage = async (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const isAdmin = jwtUtils.getAdmin(headerAuth);

    await models.User.findOne({
        where: {id: userId}
    }).then(async () => {
        try{
            const message = await models.Message.findOne({ where: { id: req.params.id }})
            if (userId == message.UserId || isAdmin === true){
                const filename = message.attachment.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    message.destroy()
                    return res.json({ 'message': 'Message deleted' })
                });
            } else {
                res.status(404).json({ 'error': 'Authorization problem' });
            }
        }catch (err) {
            return res.status(500).json({err: 'not found'})
        }
    }).catch(function (err) {
        return res.status(500).json({ 'error': err })
    });

}











//constantes
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT = 50;

//Routes
module.exports = {
    createMessage: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        var title = req.body.title;
        var content = req.body.content;

        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'invalid parameters' });
        }

        asyncLib.waterfall([
            function (done) {
                models.User.findOne({
                    where: { id: userId }
                })
                    .then(function (userFound) {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function (userFound, done) {
                if (userFound) {
                    models.Message.create({
                        title: title,
                        content: content,
                        likes: 0,
                        UserId: userFound.id
                    })
                        .then(function (newMessage) {
                            done(newMessage);
                        });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], function (newMessage) {
            if (newMessage) {
                return res.status(201).json(newMessage);
            } else {
                return res.status(500).json({ 'error': 'cannot post message' });
            }
        });
    },

    listMessages: function (req, res) {
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT;
        }

        models.Message.findAll({
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: ['username']
            }]
        }).then(function (messages) {
            if (messages) {
                res.status(200).json(messages);
            } else {
                res.status(404).json({ "error": "no messages found" });
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({ "error": "invalid fields" });
        });
    }
}