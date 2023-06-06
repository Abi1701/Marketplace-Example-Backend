const DataTypes = require("sequelize").DataTypes;
const _user = require("./user.js");
const _product = require("./product.js");

function initModels(sequelize) {
	const user = _user(sequelize, DataTypes);
	const product = _product(sequelize, DataTypes);

	product.belongsTo(user, { as: "user", foreignKey: "id_user" });
	user.hasMany(product, { as: "product", foreignKey: "id_user" });
	return {
		product,
		user,
	};
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
