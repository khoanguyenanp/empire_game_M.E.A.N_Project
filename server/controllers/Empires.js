var mongoose = require('mongoose');
var User = mongoose.model('User');
var Empire = mongoose.model('Empire');
var date = new Date();

module.exports = {
	createEmpire: function(req,res){
		var newEmpire = new Empire(req.body);
		newEmpire.save(function(err, empire){
			if (err){
				console.log("Error(s)", err);
			} else {
				User.find({_id : req.body.user_id}, function(err,user){
					if(err){
						console.log("Error(s)", err);
					} else {
						user[0].empire_id = empire._id;
						user[0].save(function(err){
							if(err){
								console.log("Error(s)", err);
							} else {
								res.json(empire);
							}
						})
					}
				})
			}
		})
	},

	viewEmpire: function(req,res){
		var currentDate = date.toDateString().split("").slice(4).join("");
		Empire.find({_id:req.params.id}, function(err,empire){
			if(err){
				console.log("Error(s)", err);
			} else {
				if(currentDate != empire[0].date) {
					empire[0].date = currentDate;
					empire[0].click= 0;
					empire[0].save(function(err, output){
						res.json(output);
					})
				} else {
					res.json(empire[0]);
				}
			}
		})
	},

	buyArmy: function(req,res){
		Empire.findOne({_id:req.body._id}, function(err,empire){
			if(err){
				console.log("Error(s)", err);
			} else {
				empire.worker += req.body.worker;
				empire.infantry += req.body.infantry;
				empire.archer += req.body.archer;
				empire.knight += req.body.knight;
				empire.warrior += req.body.warrior;
				empire.calvary += req.body.calvary;
				empire.hero += req.body.hero;
				empire.power += req.body.power;
				empire.gold -= req.body.cost;
				empire.save(function(err, output){
					if(err){
						console.log("Error(s)", err);
					} else {
						res.json(output);
					}
				})
			}
		})
	},

	makeGold: function(req,res){
		Empire.findOne({_id:req.body._id}, function(err,empire){
			if(err){
				console.log("Error(s)", err);
			} else {
				empire.worker = req.body.worker;
				empire.gold = req.body.gold;
				empire.click = req.body.click;
				empire.save(function(err, output){
					if(err){
						console.log("Error(s)", err);
					} else {
						console.log(output);
						res.json(output);
					}
				})
			}
		})
	},

	getEmpire: function(req,res){
		Empire.find({}, function(err, data){
			if(err){
				console.log("Error(s)", err);
			} else {
				res.json(data)
			}
		})
	},

	viewEnemy: function(req,res){
		Empire.findOne({_id: req.params.id}, function(err,data){
			if(err){
				console.log("Error(s)", err);
			} else {
				res.json(data);
			}
		})
	},

	updateEmpire: function(req,res){
		Empire.findOne({_id:req.body._id}, function(err,empire){
			if(err){
				console.log("Error(s)", err);
			} else {
				empire.worker = req.body.worker;
				empire.infantry = req.body.infantry;
				empire.archer = req.body.archer;
				empire.knight = req.body.knight;
				empire.warrior = req.body.warrior;
				empire.calvary = req.body.calvary;
				empire.hero = req.body.hero;
				empire.power = req.body.power;
				empire.gold = req.body.gold;
				empire.save(function(err, output){
					if(err){
						console.log("Error(s)", err);
					} else {
						res.json(output);
					}
				})
			}
		})
	},

	updateEnemy: function(req,res){
		Empire.findOne({_id:req.body._id}, function(err,empire){
			if(err){
				console.log("Error(s)", err);
			} else {
				empire.worker = req.body.worker;
				empire.infantry = req.body.infantry;
				empire.archer = req.body.archer;
				empire.knight = req.body.knight;
				empire.warrior = req.body.warrior;
				empire.calvary = req.body.calvary;
				empire.hero = req.body.hero;
				empire.power = req.body.power;
				empire.gold = req.body.gold;
				empire.save(function(err, output){
					if(err){
						console.log("Error(s)", err);
					} else {
						res.json(output);
					}
				})
			}
		})
	},














}