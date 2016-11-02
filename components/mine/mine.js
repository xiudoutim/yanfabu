var app=angular.module('mineModule', []);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/mine',{
		templateUrl:'components/mine/mine.html',
		controller:'mineCtrl',
		css:'components/mine/mine.css'
	})
	.when('/regist',{
		templateUrl:'components/mine/regist/regist.html',
		controller:'registCtrl',
		css:'components/mine/regist/regist.css'
	})
}]);

app.controller('mineCtrl', ['$scope','$timeout', function($scope,$timeout){
	$scope.bounced_flag = true;
	$timeout(function(){
		$scope.bounced_flag = false;
	},1000);
	
}]);
app.controller('registCtrl',['$scope',function($scope){
	$scope.returnMine = function(){
		window.history.back();
	}
}])
