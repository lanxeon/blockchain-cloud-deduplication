const express = require("express");
const router = express.Router();

const FileModel = require("../Models/File");
const UserModel = require("../Models/User");

//to see if user exists
router.get("/:key", async (req, res, next) => {
	try {
		let user = await UserModel.findOne({ key: req.params.key });
		if (user) return res.status(200).send(user.alias);

		// res.send(404).json("false");
		return res.status(200).send("false");
	} catch (err) {
		res.status(400).json(err);
	}
});

//to create user entry in database
router.post("", async (req, res, next) => {
	try {
		let user = new UserModel({
			key: req.body.userKey,
			alias: req.body.userAlias,
			files: [],
		});

		let savedUser = await user.save();

		if (savedUser)
			return res.status(201).json({
				message: "User successfully created",
				user: savedUser,
			});

		res.status(400).send("Failed to create user");
	} catch (err) {
		res.status(400).json(err);
	}
});

//to retrieve user files
router.get("/files/:key", async (req, res, next) => {
	try {
		if (req.params.key) {
			let user = await UserModel.findOne({ key: req.params.key }).populate("files.file", "extension hash path size");
			if (user) {
				return res.status(200).json({
					message: "retrieved files from cloud",
					files: user.files,
				});
			}
		}
		res.status(404).send("User not found");
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: err,
			message: "Something went wrong receiving cloud files",
		});
	}
});

module.exports = router;
