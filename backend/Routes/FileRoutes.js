const express = require("express");
const router = express.Router();
const multer = require("multer");
const http = require("http");

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
		req.fileExtension = extension;
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
			extension: req.fileExtension,
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

//for duplicate files, to validate whether they actually exist or not
router.get("/integrity/:hash", async (req, res, next) => {
	try {
		let file = await FileModel.findOne({ hash: req.params.hash });
		if (file) {
			return res.status(200).send(file.hash);
		}
		res.status(200).send(false);
	} catch (err) {
		res.status(500).json({
			error: err,
			message: "Something went wrong",
		});
	}
});

//to register user as duplicate user
router.post("/upload/dup", async (req, res, next) => {
	try {
		let file = await FileModel.findOne({ hash: req.body.hash });
		let user = await UserModel.findOne({ key: req.body.owner });
		if (file && user) {
			let fileRegisteredUser = file.owners.find(iterOwner => {
				return iterOwner.owner.equals(user._id);
			});

			let UserRegisteredFile = user.files.find(iterFile => iterFile.file.equals(file._id));

			let userFileElement = {
				file: file._id,
				name: req.body.name,
			};

			if (!fileRegisteredUser && !UserRegisteredFile) {
				let ownerUpdated = await UserModel.findOneAndUpdate(
					{ key: req.body.owner },
					{ $push: { files: userFileElement } }
				);
				if (ownerUpdated) {
					let fileUpdated = await FileModel.findByIdAndUpdate(file._id, {
						$push: { owners: { owner: ownerUpdated._id } },
					});
					if (fileUpdated) {
						return res.status(201).json({
							user: ownerUpdated,
							file: fileUpdated,
						});
					}
				}
			}
		}
		res.status(200).send(false);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//for downloading a file
router.get("/download", async (req, res, next) => {
	// req.protocol + "://" + req.get("host");
	console.log(req.query.path);
	res.download("backend/" + req.query.path, "lmao.txt", err => {
		console.log(err);
	});
});

router.get("/lmao/lol/nigga/what/the/fuck", (req, res, next) => {});

module.exports = router;
