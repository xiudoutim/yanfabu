var app=angular.module('interestModule', []);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/interest',{
		templateUrl:'components/interest/interest.html',
		controller:'interestCtrl',
		css:'components/interest/interest.css'
	})
}]);

app.service('service',['$http',function($http){
	this.get=function(){
		return $http.get('data/data.json');
	}
}])

app.controller('interestCtrl', ['$scope','service', function($scope,service){
	service.get().success(function(res){
		$scope.person=res;
	})
}])