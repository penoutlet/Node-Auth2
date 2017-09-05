var bcrypt = require('bcrypt');
var saltRounds = 10;
bcrypt.genSalt(saltRounds, (err, salt) => {
	bcrypt.hash("Madi", salt, function(err,hash){
console.log(hash);
})
});