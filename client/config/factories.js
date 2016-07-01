myApp.factory('userFactory', function($http, $location){
	var factory={};
	var currentUser= [];
	var user =[];
	var messages = [];

	factory.registerUser = function(data, callback){
		$http.post('/registerUser', data).success(function(output){
			if(output == "existed") {
				messages = [];
				messages.push('Email has been used, please try again or reset your password');
				callback(messages);
				$location.path('/');
			} else {
				currentUser = output;
				$location.path('/createEmpire');
			}
		})
	},

	factory.loginUser = function (data, callback){
		$http.post('/loginUser', data).success(function(output){
			if(output == "unmatched"){
				messages = [];
				messages.push("Email and Password don't matched, please try again or reset your password");
				callback(messages);
				$location.path('/');
			}
			if(output == "notexisted"){
				messages = [];
				messages.push("Email doesn't existed, please try again or register");
				callback(messages);
				$location.path('/');
			} else {
				currentUser = output;
				console.log(currentUser);
				$location.path('/viewEmpire');
			}
		})
	},
	// factory.empireId =function(data){
	// 	currentUser.empire_id = data;
	// }

	factory.getUser = function(callback){
		callback(currentUser);
	}
	factory.passingID = function(data){
		currentUser.empire_id =data;
		console.log(currentUser);
	}
	return factory;
})

myApp.factory('empireFactory', function($http, $location){
	var factory={};
	var empire = {};
	var empireList = [];
	var messages = [];

	factory.createEmpire = function(data,callback){
		$http.post('/createEmpire', data).success(function(output){
			empire = output;
			callback(output);
			$location.path('/viewEmpire');
		})
	}
	factory.viewEmpire = function(data, callback){
		if(empire._id != null){
			$http.get('/viewEmpire/'+ empire._id).success(function(output){
				callback(output);
			})
		} else {
			$http.get('/viewEmpire/'+data).success(function(output){
				callback(output);
			})
		}	
	}

	factory.buyArmy = function(data,callback){
		$http.post('/buyArmy', data).success(function(output){
			empire = output;
			callback();
			$location.path('/viewEmpire');
		})
	}

	factory.makeGold = function(data,callback){
		$http.post('/makeGold', data).success(function(output){
			empire = output;
			callback(output);
		})	
	}

	factory.getEmpire = function(callback){
		$http.get('/getEmpire').success(function(data){
			console.log(data);
			empireList =data;
			callback(empireList);
		})
	}

	factory.viewEnemy = function(data,callback){
		$http.get('/viewEnemy/'+data).success(function(output){
			callback(output);
		})
	}
	factory.updateEmpire = function(data,callback){
		$http.post('/updateEmpire', data).success(function(output){
			empire = output;
			callback(output);
		})
	}
	factory.updateEnemy = function(data,callback){
		$http.post('/updateEnemy', data).success(function(output){
			callback(output);
		})
	}

	return factory;
})








