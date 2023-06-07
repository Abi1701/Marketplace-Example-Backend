const express = require("express");
const app = express();
const router = require("./src/routes/index");
const db = require("./src/models");

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
db.sequelize
	.sync()
	.then(() => {
		console.log("Synced db.");
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});
app.listen(3008);
