const express = require('express');
const router = express.Router();

const FileModel = require('../Models/File');
const UserModel = require('../Models/User');


//to see if user exists
router.get('/:key', async(req, res, next) => {
    try
    {   
        let user = await UserModel.findOne({key: req.params.key});
        if(user)
            return res.status(200).send("true");
        
        res.send(404).json("false");
    }
    catch(err) {
        res.status(400).json(err);
    }
})


//to create user entry in database
router.post('', async(req, res, next) => {
    try {
        let user = new UserModel({
            key: req.body.userKey,
            alias: req.body.userKey,
            files: [],
        });

        let savedUser = await user.save();
        
        if(savedUser)
            return res.status(201).json({
                message: 'User successfully created',
                user: savedUser
            });
        
        res.status(400).send("Failed to create user");
    } catch(err) {
        res.status(400).json(err);
    }
})