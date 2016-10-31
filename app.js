var app =angular.module('qwp', ['ngRoute','angularCSS','specialModule','findModule','interestModule','sortModule','mineModule']);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.otherwise({redirectTo:'/special'});
}])