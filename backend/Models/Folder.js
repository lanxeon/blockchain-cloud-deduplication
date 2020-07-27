const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");

const FolderSchema = mongoose.Schema({
	path: { type: String, required: true, unique: true },
	originalOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	originalName: { type: String, required: true },
	dateAdded: { type: Date, required: true, default: Date.now },
	size: { type: Number, required: true },
	files: { type: mongoose.Schema.Types.ObjectId },
});

FolderSchema.plugin(unique);

module.exports = mongoose.model("Folder", FolderSchema);
