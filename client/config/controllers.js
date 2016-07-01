myApp.controller('userController', function($scope, userFactory){
	$scope.regUser = {};
	$scope.loginUser = {};
	$scope.messages=[];
	$scope.date = new Date();
	$scope.register= function(data){
		data.bday = data.dob.toDateString().split("").slice(4).join("");
		delete data.dob;
		$scope.messages=[];
		if (data.password.length>7 && data.password == data.confirmPassword){
			delete data.confirmPassword;
			userFactory.registerUser(data, function(messages){
				$scope.regUser={};
				$scope.messages = messages;
			})
		} else {
			$scope.messages.push('Password has to be at least 8 characters and Confirm Password has to match Password')
		}
	};

	$scope.login = function (data){
		userFactory.loginUser(data,function(messages){
			$scope.loginUser ={};
			$scope.messages = messages;
		})
	}
})

myApp.controller('createEmpireController', function($scope, userFactory,empireFactory, $location){
	$scope.newEmpire = {};
	$scope.user = {};
	$scope.messages=[];
	$scope.date = new Date();

	userFactory.getUser(function(data){
		$scope.user = data;
	})
	$scope.logout = function(){
		$scope.user=[];
		$location.path('/');
	}
	if($scope.user.length == 0 || $scope.user== "undefined"){
		$location.path('/');
	}
	if($scope.user.empire_id){
		$location.path('/viewEmpire');
	}
	$scope.worker = function(){
		if ($scope.newEmpire.worker == null) {
			$scope.newEmpire.worker = 0
		}
		return $scope.newEmpire.worker * 1;
	}
	$scope.infantry = function(){
		if ($scope.newEmpire.infantry == null) {
			$scope.newEmpire.infantry = 0
		}
		return $scope.newEmpire.infantry * 1;
	}
	$scope.archer = function(){
		if ($scope.newEmpire.archer == null) {
			$scope.newEmpire.archer = 0
		}
		return $scope.newEmpire.archer * 2;
	}
	$scope.knight = function(){
		if ($scope.newEmpire.knight == null) {
			$scope.newEmpire.knight = 0
		}
		return $scope.newEmpire.knight * 3;
	}
	$scope.warrior = function(){
		if ($scope.newEmpire.warrior == null) {
			$scope.newEmpire.warrior = 0
		}
		return $scope.newEmpire.warrior * 5;
	}
	$scope.calvary = function(){
		if ($scope.newEmpire.calvary == null) {
			$scope.newEmpire.calvary = 0
		}
		return $scope.newEmpire.calvary * 10;
	}
	$scope.hero = function(){
		if ($scope.newEmpire.hero == null) {
			$scope.newEmpire.hero = 0
		}
		return $scope.newEmpire.hero * 100;
	}
	$scope.currentGold = function(){
		return 10000 - $scope.worker() - $scope.infantry() - $scope.archer() - $scope.knight() - $scope.warrior() - $scope.calvary() - $scope.hero();
	}
	$scope.total = function(){
		return $scope.worker() + $scope.infantry() + $scope.archer() + $scope.knight() + $scope.warrior() + $scope.calvary() + $scope.hero();
	}

	$scope.error = function(){
		if($scope.currentGold() < 0){
			return("You don't have enough gold");
		}
	}
	$scope.createEmpire = function(data){
		$scope.messages = [];
		if($scope.currentGold() < 0){
			$scope.messages.push('You dont have enough gold, please try again');
		}
		if(data.name == null){
			$scope.messages = [];
			$scope.messages.push("Your empire's name cannot be empty! What would your army fight for?!");
		} else {
			data.gold = $scope.currentGold();
			$scope.infantryPower = data.infantry * (Math.floor(Math.random() * (10 - 1)) + 1);
			$scope.archerPower = data.archer * (Math.floor(Math.random() * (15 - 3)) + 3);
			$scope.knightPower = data.knight * (Math.floor(Math.random() * (20 - 5)) + 5);
			$scope.warriorPower = data.warrior * (Math.floor(Math.random() * (15 - 10)) + 10);
			$scope.calvaryPower = data.calvary * (Math.floor(Math.random() * (25 - 15)) + 15);
			$scope.heroPower = data.hero * (Math.floor(Math.random() * (150 - 10)) + 10);
			data.power = $scope.infantryPower + $scope.archerPower + $scope.knightPower + $scope.warriorPower + $scope.calvaryPower + $scope.heroPower;
			data.date = $scope.date.toDateString().split("").slice(4).join("");
			data.click = 0;
			data.user_name = $scope.user.firstName;
			data.user_id = $scope.user._id;
			empireFactory.createEmpire(data, function(){
				$scope.newEmpire = {};
			})
		}	
	}
})



myApp.controller('viewEmpireController', function($scope, userFactory,empireFactory, $location){
	$scope.empire = {};
	$scope.user = {};
	$scope.messages=[];
	$scope.date = new Date();

	userFactory.getUser(function(data){
		$scope.user = data;
	})
	$scope.logout = function(){
		$scope.user=[];
		$location.path('/');
	}
	if($scope.user.length == 0 || $scope.user== "undefined"){
		$location.path('/');
	}
	if($scope.user.empire_id){
		$location.path('/viewEmpire');
	}
	empireFactory.viewEmpire($scope.user.empire_id, function(data){
		console.log($scope.user.empire_id)
		$scope.empire = data;
		$scope.user.empire_id = $scope.empire._id;
		$scope.passingId = (function(){
			userFactory.passingID($scope.empire._id)
		})();
	})
	$scope.adviser = function(){
		if($scope.empire.power > 25000){
			return("Your majesty, we are strong enough to crush them like insects, lets attack them immediately!")
		}
		if($scope.empire.gold > 20000){
			return("Wow! We have a lot of gold! Why don't we go to Vegas?")
		}
		if($scope.empire.power < 2000 && $scope.empire.gold > 5000){
			return("Your majesty, why don't you buy some more units to build up the empire?")
		}
		if($scope.empire.gold < 500){
			return("Your majesty, we need more gold and units in order for our empire to survive. I don't want to die :(")
		}
		if($scope.empire.worker >2000){
			return("There are laborers everywhere! Let's send them to work and get some gold!")
		}
		if($scope.empire.hero >50){
			return("There are heroes everywhere! Anyone can become a hero! Where's Superman????")
		}
		if($scope.empire.calvary >1000){
			return("Does anyone else smell that? I think we have too many horses... It smells really bad!")
		} else {
			return("Your majesty, why don't you do something?")
		}
	}
	$scope.commander = function(){
		if($scope.empire.power>25000){
			if($scope.empire.gold <1000){
				return("We're ready to attack at your command!")
			}
			if($scope.empire.gold >5000){
				return("Your majesty, we need to buy more units before we attack!")
			} else {
				return("We're ready to attack at your command, your majesty!")
			}
		}
		if($scope.empire.power <2000){
			return("We need more units!")
		}
		if($scope.empire.power<25000){
			if($scope.empire.hero <10){
				return("We need more heroes! Where's Superman when you need him?!")
			}
			if($scope.empire.calvary <50){
				return("The calvary requests more horses!")
			}
			if($scope.empire.warrior <500){
				return("We need more warriors! But don't call on the 2016 Golden State Warriors...")
			}
			if($scope.empire.knight < 1000){
				return("We need more knights in the battlefield!")
			} else {
				return("We're going to need a bigger army...")
			}
		} else {
			return("We're ready for your orders, your majesty");
		}
	}
	$scope.chancellor = function(){
		if($scope.empire.gold<2000){
			if($scope.empire.worker<500){
				return("We need more laborers!")
			}
			if($scope.empire.worker>2000){
				return("Mo laborers, mo problems.")
			} else {
				return("We need to find more gold, your majesty")
			}
		}
		if($scope.empire.gold>2000){
			if($scope.empire.gold<10000){
				return("Hmm, we need more gold. Make the laborers do their damn job!")
			}
			if($scope.empire.gold>=10000){
				return("We have gold now, but we could always use more... MORE GOLD PLZ!")
			}
		} else {
			return("We desperately need GOLD, your majesty!!!")
		}
	}

})

myApp.controller('blackMarketController', function($scope, userFactory,empireFactory, $location){
	$scope.newArmy = {};
	$scope.empire = {};
	$scope.user = {};
	$scope.messages=[];
	$scope.date = new Date();

	userFactory.getUser(function(data){
		$scope.user = data;
	})
	$scope.logout = function(){
		$scope.user=[];
		$location.path('/');
	}
	if($scope.user.length == 0 || $scope.user== "undefined"){
		$location.path('/');
	}
	empireFactory.viewEmpire($scope.user.empire_id, function(data){
		$scope.empire = data;
	})
	$scope.worker = function(){
		if ($scope.newArmy.worker == null) {
			$scope.newArmy.worker = 0
		}
		return $scope.newArmy.worker * 1;
	}
	$scope.infantry = function(){
		if ($scope.newArmy.infantry == null) {
			$scope.newArmy.infantry = 0
		}
		return $scope.newArmy.infantry * 1;
	}
	$scope.archer = function(){
		if ($scope.newArmy.archer == null) {
			$scope.newArmy.archer = 0
		}
		return $scope.newArmy.archer * 2;
	}
	$scope.knight = function(){
		if ($scope.newArmy.knight == null) {
			$scope.newArmy.knight = 0
		}
		return $scope.newArmy.knight * 3;
	}
	$scope.warrior = function(){
		if ($scope.newArmy.warrior == null) {
			$scope.newArmy.warrior = 0
		}
		return $scope.newArmy.warrior * 5;
	}
	$scope.calvary = function(){
		if ($scope.newArmy.calvary == null) {
			$scope.newArmy.calvary = 0
		}
		return $scope.newArmy.calvary * 10;
	}
	$scope.hero = function(){
		if ($scope.newArmy.hero == null) {
			$scope.newArmy.hero = 0
		}
		return $scope.newArmy.hero * 100;
	}
	$scope.currentGold = function(){
		return $scope.empire.gold - $scope.worker() - $scope.infantry() - $scope.archer() - $scope.knight() - $scope.warrior() - $scope.calvary() - $scope.hero();
	}
	$scope.total = function(){
		return $scope.worker() + $scope.infantry() + $scope.archer() + $scope.knight() + $scope.warrior() + $scope.calvary() + $scope.hero();
	}
	$scope.error = function(){
		if($scope.currentGold() < 0){
			return("You don't have enough gold");
		}
	}
	$scope.buyArmy = function(data){
		$scope.messages = [];
		if($scope.currentGold() < 0){
			$scope.messages.push('You dont have enough gold, please try again');
		} else {
			data.cost = $scope.total();
			$scope.infantryPower = data.infantry * (Math.floor(Math.random() * (10 - 1)) + 1);
			$scope.archerPower = data.archer * (Math.floor(Math.random() * (15 - 3)) + 3);
			$scope.knightPower = data.knight * (Math.floor(Math.random() * (20 - 5)) + 5);
			$scope.warriorPower = data.warrior * (Math.floor(Math.random() * (15 - 10)) + 10);
			$scope.calvaryPower = data.calvary * (Math.floor(Math.random() * (25 - 15)) + 15);
			$scope.heroPower = data.hero * (Math.floor(Math.random() * (150 - 10)) + 10);
			data.power = $scope.infantryPower + $scope.archerPower + $scope.knightPower + $scope.warriorPower + $scope.calvaryPower + $scope.heroPower;
			data._id = $scope.user.empire_id;
			empireFactory.buyArmy(data, function(){
				$scope.newArmy = {};
			})
		}
	}
})

myApp.controller('economyController', function($scope, userFactory,empireFactory, $location){
	$scope.newArmy = {};
	$scope.empire = {};
	$scope.user = {};
	$scope.messages=[];
	$scope.date = new Date();

	userFactory.getUser(function(data){
		$scope.user = data;
	})
	$scope.logout = function(){
		$scope.user=[];
		$location.path('/');
	}
	if($scope.user.length == 0 || $scope.user== "undefined"){
		$location.path('/');
	}
	empireFactory.viewEmpire($scope.user.empire_id, function(data){
		$scope.empire = data;
	})
	$scope.click = function(){
		return 5 - $scope.empire.click
	}
	$scope.wood = function(){
		$scope.messages=[];
		var partialWorker = Math.floor($scope.empire.worker/20);
		var count =0;
		var totalGold =0;
		if ((Math.floor(Math.random() * 10)) < 2){
			$scope.empire.worker -= partialWorker * 2; 
			$scope.messages.push("You lost "+ partialWorker * 2 + " laborers");	
			count = 18;
		} else {
			count = 20;
		}
		for (var i =0; i<=count; i++){
			var makeGold = partialWorker * (Math.floor(Math.random() * (5 - 1)) + 1);
			$scope.empire.gold += makeGold
			totalGold += makeGold;	
		}
		$scope.messages.push("You made " + totalGold + " gold")
		$scope.empire.click += 1;
		empireFactory.makeGold($scope.empire, function(data){
			$scope.empire = data;
		})
	}
	$scope.sea = function(){
		$scope.messages=[];
		$scope.empire.gold -= $scope.empire.worker * 2
		var partialWorker = Math.floor($scope.empire.worker/40);
		var count =0;
		var totalGold =0;
		if ((Math.floor(Math.random() * 10)) < 5){
			$scope.empire.worker -= partialWorker * 10; 
			$scope.messages.push("You lost "+ partialWorker * 10 + " laborers");	
			count = 30;
		} else {
			count = 40;
		}
		for (var i =0; i<=count; i++){
			var makeGold = partialWorker * 3 * (Math.floor(Math.random() * (5 - 1)) + 1);
			$scope.empire.gold += makeGold
			totalGold += makeGold;	
		}
		$scope.messages.push("You made " + totalGold + " gold")
		$scope.empire.click += 1;
		empireFactory.makeGold($scope.empire, function(data){
			$scope.empire = data;
		})
	}
	$scope.currentGold = function(){
		if ($scope.betGold == null){
			$scope.betGold = 0;
		}
		if ($scope.betNum == null){
			$scope.betNum = 0;
		}
		return $scope.empire.gold - $scope.betGold;
	}
	$scope.gamble = function(){
		$scope.messages=[];
		if ($scope.betGold == 0){
			$scope.betGold = 1;
			$scope.messages.push("I see what you did... ;) You get 1 gold for trying, but don't cheat!");
		}
		var roll = Math.floor(Math.random() * (99 - 0));
		if(roll == $scope.betNum) {
			var winGold = $scope.betGold * 70;
			$scope.messages.push("The number is: " + roll + ", you win: " + winGold + " Gold(s)");
			$scope.empire.gold += winGold
		} else {
			$scope.messages.push("The number is: " + roll + ", you lose: " + $scope.betGold + " Gold(s)");
			$scope.empire.gold -= $scope.betGold;
		}
		empireFactory.makeGold($scope.empire, function(data){
			$scope.empire = data;
		})
	}
})

myApp.controller('rankController', function($scope, userFactory,empireFactory, $location){
	$scope.newArmy = {};
	$scope.empire = {};
	$scope.user = {};
	$scope.messages=[];
	$scope.empireList = [];
	$scope.date = new Date();

	userFactory.getUser(function(data){
		$scope.user = data;
	})
	$scope.logout = function(){
		$scope.user=[];
		$location.path('/');
	}
	if($scope.user.length == 0 || $scope.user== "undefined"){
		$location.path('/');
	}
	empireFactory.viewEmpire($scope.user.empire_id, function(data){
		$scope.empire = data;
	})
	empireFactory.getEmpire(function(data){
		$scope.empireList = data;
	})
})
myApp.controller('enemyController', function($scope, userFactory,empireFactory, $routeParams, $location){
	$scope.empire = {};
	$scope.user = {};
	$scope.messages=[];
	$scope.enemy = {};
	var id = $routeParams.id;

	userFactory.getUser(function(data){
		$scope.user = data;
	})
	$scope.logout = function(){
		$scope.user=[];
		$location.path('/');
	}
	if($scope.user.length == 0 || $scope.user== "undefined"){
		$location.path('/');
	}
	empireFactory.viewEmpire($scope.user.empire_id, function(data){
		$scope.empire = data;
	})
	empireFactory.viewEnemy(id, function(data){
		$scope.enemy = data;
		console.log($scope.enemy);
	})

})