module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"user",
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: sequelize.literal("uuid_generate_v4()"),
				primaryKey: true,
			},
			first_name: {
				type: DataTypes.TEXT,
				required: true,
			},
			last_name: {
				type: DataTypes.TEXT,
				required: true,
			},
			email: {
				type: DataTypes.TEXT,
				required: true,
			},
			password: {
				type: DataTypes.TEXT,
				required: true,
			},
			confirm_password: {
				type: DataTypes.TEXT,
				required: true,
			},
			phone_number: {
				type: DataTypes.INTEGER,
				required: true,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: sequelize.literal("timezone('utc'::text, now())"),
			},
		},
		{
			sequelize,
			tableName: "user",
			schema: "public",
			timestamps: false,
			indexes: [
				{
					name: "user_pkey",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
