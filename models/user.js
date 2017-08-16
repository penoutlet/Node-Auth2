var sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
	var User = 	sequelize.define("User", { 
	name: {
		type: DataTypes.STRING
	},
	password: {
		type: DataTypes.STRING
	},
	// email: {
	// 	type: DataTypes.STRING
	// },	
	admin: {
	 type: DataTypes.BOOLEAN 
	}
	});
	return User;
};
