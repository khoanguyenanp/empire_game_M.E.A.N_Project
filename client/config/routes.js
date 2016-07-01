var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/partials/login.html',
		controller: 'userController'
	})
	.when('/createEmpire', {
		templateUrl: '/partials/createEmpire.html',
		controller: 'createEmpireController'
	})
	.when('/viewEmpire', {
		templateUrl: '/partials/viewEmpire.html',
		controller: 'viewEmpireController'
	})
	.when('/blackMarket', {
		templateUrl: '/partials/blackMarket.html',
		controller: 'blackMarketController'
	})
	.when('/economy', {
		templateUrl: '/partials/economy.html',
		controller: 'economyController'
	})
	.when('/rank', {
		templateUrl: '/partials/rank.html',
		controller: 'rankController'
	})
	.when('/enemy/:id', {
		templateUrl: '/partials/enemy.html',
		controller: 'enemyController'
	})
})