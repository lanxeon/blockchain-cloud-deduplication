const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
	key: { type: String, required: true, unique: true },
	alias: { type: String, unique: true },
	dateJoined: { type: Date, required: true, default: Date.now },
	files: [
		{
			file: { type: mongoose.Schema.Types.ObjectId, ref: "File", required: true },
			name: { type: String, required: true },
			dateAdded: { type: Date, required: true, default: Date.now },
		},
	],
	dp: { type: String, default: "/files/default.jpg" },
	bytesUploaded: { type: Number, required: true, default: 0 },
	bytesSaved: { type: Number, required: true, default: 0 },
});

UserSchema.plugin(unique);

module.exports = mongoose.model("User", UserSchema);
