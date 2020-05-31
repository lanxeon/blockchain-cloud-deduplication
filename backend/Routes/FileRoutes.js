const express = require("express");
const router = express.Router();
const multer = require("multer");

const FileModel = require("../Models/File");
const UserModel = require("../Models/User");

//multer config
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "backend/files");
	},
	filename: (req, file, cb) => {
		var pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
		const extension = file.originalname.slice(file.originalname.indexOf("."));
		const name = req.body.hash + file.originalname.replace(pattern, " ").toLowerCase().split(" ").join("-");
		cb(null, name + "-" + Date.now() + extension);
	},
});

//for new uploads, which involve actually uploading the files
router.post("/upload/new", multer({ storage: storage }).single("file"), async (req, res, next) => {
	try {
		let ownerId = null;

		//getting the owner of the file to store _id as owner of the file
		let owner = await UserModel.findOne({ key: req.body.owner });
		if (owner) ownerId = owner._id;
		else
			return res.status(401).json({
				message: "Not Authorized",
			});

		//making the file model
		let file = new FileModel({
			hash: req.body.hash,
			path: "/files/" + req.file.filename,
			originalOwner: ownerId,
			originalName: req.body.name,
			owners: [{ owner: ownerId }],
			size: req.body.fileSize,
			// extension:
		});

		let result = await file.save();

		//file has been successfully saved. let us now register the user as owner of the file
		if (result) {
			let newFile = {
				file: result._id,
				name: req.body.name,
			};

			let updatedUser = await UserModel.findByIdAndUpdate(ownerId, { $push: { files: newFile } });

			if (updatedUser)
				return res.status(201).json({
					message: "File uploaded",
					file: result,
				});
		}

		res.status(500).json({
			message: "Could not upload file",
		});
	} catch (err) {
		res.status(500).json({
			message: "Something went wrong",
			error: err,
		});
	}
});

module.exports = router;
