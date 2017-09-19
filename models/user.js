module.exports = function(sequelize, DataTypes) {
	var User =  sequelize.define("User", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull:false,
			unique: true
		},
		lookingfor: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});
	return User;

};
