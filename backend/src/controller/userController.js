const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class User {
	async registerUsername(req, res) {
		await db.database.user.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
		});
		res.status(200).send({ message: "User was registered successfully!" });
	}
	async registerDatauser(req, res) {
		const salt = bcrypt.genSaltSync(10);
		const hashPass = await bcrypt.hash(req.body.password, salt);
		await db.database.user.create({
			phone_number: req.body.phone_number,
			password: hashPass,
			confirm_password: hashPass,
		});
		res.status(200).send({ message: "User was registered successfully!" });
	}
	async login(req, res) {
		const salt = bcrypt.genSaltSync(10);
		const hashedPass = await bcrypt.hash(req.body.password, salt);
		console.log(hashedPass);
		const user = await db.database.user.findOne({
			where: {
				email: req.body.email,
				password: hashedPass,
			},
		});
		if (!user) {
			return res.status(404).send({ message: "User Not found." });
		}
		const passwordIsValid = bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return res.status(500).send({ message: "Error Occured" });
			} else {
				if (hash == hashedPass) {
					return res.status(200).send({ message: "login success" });
				}
			}
		});

		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: "Invalid Password!",
			});
		}
		const token = jwt.sign({ id: user.id }, "rahasia", {
			expiresIn: 86400, // 24 hours
		});
		res.status(200).send({
			id: user.id,
			email: user.email,
			last_name: user.last_name,
			accessToken: token,
		});
	}
	async findOne(req, res) {
		try {
			const user = await db.database.user.findOne({
				where: {
					id: req.user.id,
				},
			});
			res.status(200).send({
				id: user.id,
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
			});
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	}
}
module.exports = new User();
