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