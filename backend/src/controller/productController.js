const db = require("../models");

class Product {
	async create(req, res) {
		await db.database.product.create({
			product_name: req.body.product_name,
			product_description: req.body.product_description,
			product_price: req.body.product_price,
			product_detail: req.body.product_detail,
		});
		res.status(200).send({ message: "Product was registered successfully!" });
	}
	async findAll(req, res) {
		const data = await db.database.room.findAll();
		res
			.status(200)
			.send({ data: data, message: "Product was get successfully!" });
	}
	async findAllWs(ws, req) {
		const data = await db.database.room.findAll();
		const result = JSON.stringify({
			type: "product",
			data: data,
			message: "Product was get successfully!",
		});
		ws.send(result);
	}
	async findOne(req, res) {
		const data = await db.database.room.findOne({
			where: {
				product_name: req.body.product_name,
			},
		});
		res.send({ data: data, message: "Product was get successfully!" });
	}
}
module.exports = new Product();
