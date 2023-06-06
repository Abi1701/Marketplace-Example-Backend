module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"product",
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: sequelize.literal("uuid_generate_v4()"),
				primaryKey: true,
			},
			product_name: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			product_description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			product_price: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			product_detail: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "product",
			schema: "public",
			timestamps: false,
			indexes: [
				{
					name: "product_pkey",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
