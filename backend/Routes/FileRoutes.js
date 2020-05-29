const express = require('express');
const router = express.Router();
const multer = require('multer');

const FileModel = require('../Models/File');
const UserModel = require('../Models/User');

//multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    var pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
    const extension = file.originalname.slice(file.originalname.indexOf('.'));
    const name = req.body.hash + file.originalname.replace(pattern, " ").toLowerCase().split(" ").join("-");
    cb(null, name + "-" + Date.now() + extension);
  }
});


router.post('/upload/new', multer({storage: storage}),
async(req, res, next) => {

  try {
    let ownerId = null;

    let owner = await UserModel.findOne({key: req.body.owner});
    if(owner)
      ownerId = owner._id
    else
      res.status(401).json({
        message: 'Not Authorized'
      });


    let file = new FileModel(
      {
        hash: req.body.hash,
        path: '/files/' + req.file.filename,
        originalOwner: req.body.owner,
        originalName: req.body.name,
        owners: [
            {owner: ownerId}
        ],
        size: 100
        // extension: 
      }
    );

    let result = file.save();

    if(result)
      res.status(201).json({
        message: 'File uploaded',
        file: result
      });
    
    else
      res.status(400).json({
        message: 'Could not upload file',
      });  
  }
  catch(err) {
    res.status(400).json({
      message: 'Something went wrong',
      error: err
    }); 
  }
});