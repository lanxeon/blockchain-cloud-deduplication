const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");

const FileSchema = mongoose.Schema({
	hash: { type: String, unique: true, required: true },
	path: { type: String, required: true, unique: true },
	originalOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	originalName: { type: String, required: true },
	owners: [
		{
			owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
		},
	],
	dateAdded: { type: Date, required: true, default: Date.now },
	size: { type: Number, required: true },
	extension: { type: String, required: true, default: ".txt" },
});

FileSchema.plugin(unique);

module.exports = mongoose.model("File", FileSchema);
