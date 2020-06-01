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
});

UserSchema.plugin(unique);

module.exports = mongoose.model("User", UserSchema);

// //for downloading a file
// router.get("/download", async (req, res, next) => {
// 	// req.protocol + "://" + req.get("host");
// 	// http.get({ path: "/lmao/lol/nigga/what/the/fuck?path=" + req.query.path, hostname: "localhost", port: 3001 }, function (
// 	// 	resp
// 	// ) {
// 	// 	res.setHeader("content-disposition", resp.headers["content-disposition"]);
// 	// 	res.setHeader("Content-type", resp.headers["content-type"]);
// 	// 	resp.pipe(res);
// 	// });

// 	http.get("http://localhost:3001/cloud/lmao/lol/nigga/what/the/fuck?path=" + req.query.path, resp => {
// 		res.setHeader("content-disposition", resp.headers["content-disposition"]);
// 		res.setHeader("Content-type", resp.headers["content-type"]);
// 		resp.pipe(res);
// 	});
// });

// router.get("/lmao/lol/nigga/what/the/fuck", (req, res, next) => {
// 	console.log("reached actual download path with path: " + req.query.path);
// 	res.download("backend/" + req.query.path, "lmao.txt");
// });
