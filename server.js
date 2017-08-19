var express = require("express");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;
var jwt = require('jsonwebtoken');
var app = express();
var morgan = require("morgan");
var bcrypt = require('bcrypt');
var methodOverride = require('method-override');
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
// use morgan to log requests to the console
app.use(morgan('dev'));

var db = require("./Models");
// require('./routes/api-routes.js')(app);
// app.use("/", routes);
// routes.initialize(app);

// // Home page
app.get('/', (req,res) => {

	res.send('Hiya. The API is at http://localhost:' + PORT + '/api');
});

// // setup


// api routes
var apiRoutes = express.Router();

app.use("/api", apiRoutes);



apiRoutes.get('/', (req,res)=> {
	res.render('index')

});

apiRoutes.get('/users', (req,res)=> {
	db.User.findAll({}).then((response)=> {
		res.json(response);
	});

});
apiRoutes.post("/users", (req,res) =>{
	var saltRounds = 10;
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		db.User.create({ name: req.body.name, password: hash, email: req.body.email})

	});

	res.send('You are now registered.'); 
});





apiRoutes.post('/authenticate', (req,res) =>{
	console.log(req.params)

	db.User.findOne({where: {name: req.body.name, password: req.body.password, email: req.body.email},
					raw: true
			
}).then((response)=> {
		
		
		var token = jwt.sign(req.body, app.get("secret"), {
			
		});

		res.json({
			token: token,
			message: "token granted"
		});
	});

});

		
db.sequelize.sync({force: false }).then(function() {
	app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
});