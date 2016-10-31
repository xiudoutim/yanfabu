var app=angular.module('mineModule', []);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/mine',{
		templateUrl:'components/mine/mine.html',
		controller:'mineCtrl',
		css:'components/mine/mine.css'
	})
}]);

app.service('service',['$http',function($http){
	this.get=function(){
		return $http.get('data/data.json');
	}
}])

app.controller('mineCtrl', ['$scope','service', function($scope,service){
	service.get().success(function(res){
		$scope.person=res;
	})
}])