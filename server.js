var express = require("express");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;
var jwt = require('jsonwebtoken');
var app = express();
var morgan = require("morgan");
var bcrypt = require("bcrypt");
var methodOverride = require('method-override');
var axios = require('axios');
var helpers = require('./test/helpers')
app.set('secret', "basdlkfjasfa");
// // Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: true}));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));

var db = require("./models");

var apiRoutes = express.Router();

app.get('/', (req,res) => {

	res.render('index');
});


apiRoutes.post('/users', (req,res) =>{
	var signed= '';


	var saltRounds = 10;
		bcrypt.genSalt(saltRounds, (err,salt)=> {
			bcrypt.hash(req.body.password, salt, (err,hash)=> {
				db.User
		.create({username: req.body.username, password: hash, email: req.body.email, lookingfor: req.body.lookingfor})
		.then((response)=>{

			var token =
			jwt.sign(req.body, app.get("secret"), {});
			console.log('first token' + token);
			res.redirect('users?token=' + token);

		});
			});
		});
	});




 apiRoutes.use((req,res,next) => {
 	var token = req.body.token || req.query.token || req.header['x-access-token'];
 	 if (token ) {
 	 	jwt.verify(token, app.get('secret'), function(err,decoded) {
 	 		if (err) {
 	 			return res.json({ success: false, message: 'Failed to authenticate token.'})
 	 		}
 	 		else {
 	 			req.decoded = decoded;
 	 			next();
 	 		}
 	 	});
 	 }
 	 else {
 	 	return res.status(403).send({
 	 		success: false,
 	 		message: "No token provided.",
 	 		reqheader: req.header['x-access-token'],
 	 	});
 	 	}
 	 });

 apiRoutes.get('/', (req,res)=> {

});

 apiRoutes.get('/users',(req,res)=>{
 	db.User
 		.findAll({})
 		.then((users)=>{
 		res.render('users', {users});
 	});
 });


app.use("/api", apiRoutes);

db.sequelize.sync({force: false }).then(function() {
	app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
});
