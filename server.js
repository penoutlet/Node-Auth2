var express = require("express");
var bodyParser = require("body-parser");
// var methodOverride = require("method-override");

var PORT = process.env.PORT || 3000;
var jwt = require('jsonwebtoken');

var app = express();
var morgan = require("morgan");
var bcrypt = require('bcrypt');
app.set('secret', "basdlkfjasfa");
// bcrypt.genSalt(saltRounds) (err, salt) => {
// 	bcrypt.hash(req.body.password, salt, function(err,hash){
// 		app.post('/api/authenticate', (req,res)=> {

// 		});
// 	});
// }
// // Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static(process.cwd() + "/public"));

// app.use(bodyParser.urlencoded({ extended: true}));

// // Override with POST having ?_method=DELETE
// app.use(methodOverride("_method"));

// // Set Handlebars.
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// use morgan to log requests to the console
app.use(morgan('dev'));

var db = require("./Models");
// require('./routes/api-routes.js')(app);
// app.use("/", routes);
// routes.initialize(app);

// // Home page
app.get('/', (req,res) => {

	res.send('Hiya. The API is at http://localhost:' + port + '/api');
});

// // setup

app.post("/api/users", (req,res) =>{
	var saltRounds = 10;
	var Hash= "";
bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		var Hash = hash;
	
		db.User.create({ name: req.body.name, password: Hash})
	.then((response)=> {
		console.log(response.name + response.password);

	});
	});
	res.send('Success'); 
});
// api routes
var apiRoutes = express.Router();

app.use("/api", apiRoutes);



apiRoutes.get('/', (req,res)=> {
	res.send("Welcome to the API!");
});

apiRoutes.get('/users', (req,res)=> {
	db.User.findAll({}).then((response)=>
		res.json(response));
});

// // setup

// app.post("/api/users", (req,res) =>{
// 	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//   }).then((dbUser) => {
// 		console.log(dbUser);
// 	});
// 	res.json("Created!");
// });




// apiRoutes.post('/authenticate', (req,res) =>{
	

// 	db.User.create({where: {name: req.body.name, password: hash},
// 					raw: true
// 			// res.json("something");
// 			console.log(hash);


// 	res.send("res" + req.body.name);
// 	db.User.findOne({
// 		where: {
// 			name: req.body.name
// 		}
// 	}).then((response)=> {
// 		res.json({response});
// 	});
// 	res.end(); 
// }).then((response)=> {
// 	console.log(response);
// 	if (!response){
// 		res.json('no user found');
// 	}
	
// 	if (response.password !== req.body.password) {
// 		console.log(response.password);
// 		// console.log(response[0].User.dataValues.password + req.body.password);
// 		res.json('password does not match');

// 	}
// 	else {
// 		var token = jwt.sign(response, app.get("secret"), {
			
// 		});
// 		res.json({
// 			token: token,
// 			message: "token granted"
// 		});
// 	}
// 	console.log('response' + JSON.stringify(response));
// });

// });
		// console.log('r' + response);
			// if (err) throw err;

			// if (!response) {
			// 	res.json({message: "Auth failed."});
			// }

			// else if (response) {
			// 	if (user.password != req.body.password) {
			// 		res.json({message: "Password does not match."});
			// 	} 
			// 	else {
			// 		var token = jwt.sign(user, app.get("Secret"), {
			// 			expiresInMinutes: 1440 // expires in 24hrs
			// 		});
			// 		res.json({message: "Here's your token. Use it wisely.",
			// 		token: token });
			// 	}
			// }
	// 		res.send("Success!")
	// 	});
	// });

db.sequelize.sync({force: false }).then(function() {
	app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
});