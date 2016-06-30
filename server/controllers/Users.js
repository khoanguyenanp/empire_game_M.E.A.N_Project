var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
	registerUser: function(req,res){
		User.find({email: req.body.email}, function(err,data){
			if(err){
				console.log("Error(s)", err);
			}else{
				if(data.length != 0) {
					res.send('existed');
				} else {
					var salt = bcrypt.genSaltSync(saltRounds);
					var hash = bcrypt.hashSync(req.body.password, salt);
					req.body.password = hash;
					var newUser = new User(req.body);
					newUser.save(function(err,user){
						if(err){
							console.log("Error(s)", err);	
						} else {
							res.json({firstName: user.firstName, _id: user._id})
						}
					})		
				}
			}
		})
	},

	loginUser: function(req,res){
		User.find({email: req.body.email}, function(err,data){
			if(err){
				console.log("Error(s)", err);
			} else {
				if(data.length == 0){
					res.send('notexisted');
				} else {
					if(bcrypt.compareSync(req.body.password, data[0].password)){
						res.json({firstName: data[0].firstName, _id: data[0]._id, empire_id: data[0].empire_id})
					} else {
						res.send('unmatched');
					}
				}	
			}
		})
	}
}