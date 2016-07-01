var path = require('path');
var User = require(path.join(__dirname,'../controllers/Users.js'));
var Empire = require(path.join(__dirname,'../controllers/Empires.js'));

module.exports = function(app){
	app.post('/registerUser', User.registerUser),
	app.post('/loginUser', User.loginUser),

	app.post('/createEmpire', Empire.createEmpire),
	app.get('/viewEmpire/:id', Empire.viewEmpire),
	app.post('/buyArmy', Empire.buyArmy),
	app.post('/makeGold', Empire.makeGold),
	app.get('/getEmpire', Empire.getEmpire),
	app.get('/viewEnemy/:id', Empire.viewEnemy),
	app.post('/updateEmpire', Empire.updateEmpire),
	app.post('/updateEnemy', Empire.updateEnemy)
}