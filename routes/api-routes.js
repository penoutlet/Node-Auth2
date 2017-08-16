// iss02 iss02
var express = require('express');
var app = express.Router();
var db = require('../models');

module.exports = function(app){
app.get('/', function(req,res){
	db.burger.findAll({}).then(function(results){
		var hbsburger = {
			burgers: results
		};
		// res.json(dbburger);
	res.render('index', hbsburger);
	});
});

// Routes ==========

// Home page
app.get('/', (req,res) => {

	res.send('Hiya. The API is at http://localhost:' + port + '/api');
});

// setup
app.get("/setup", (req,res) =>{
	console.log("db" + db);
	db.User.create({
		name: "Madisyn",
		password: "Madisynisrad",
		admin: true
	}).then((dbUser) => {
		console.log(dbUser);
	});
});




// app.post('/', function(req,res){
// 	console.log("req.body" + req.body);
		
// 	db.burger.create(req.body).then(function(results){
// 		console.log(res.json(results));
	
// 	});
// 	res.redirect("/");
// });

// app.delete('/:id', function(req,res){
// 	db.burger.destroy({
// 		where: {
// 			id: req.params.id
// 		}
		
// 	}).then(function(results){
// 		console.log(res.json(results));
		
// 	});
// 	res.redirect("/");
// });

// app.put('/:id', function(req,res){
// 	db.burger.update(
// 		req.body,
// 		{
// 		where: {
// 			id: req.params.id
// 		}
// 	}).then(function(results){
// 		console.log(res.json(results));
// 		});
// 		res.redirect("/");

// });
// };