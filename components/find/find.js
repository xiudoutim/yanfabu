var app=angular.module('findModule', []);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/find',{
		templateUrl:'components/find/find.html',
		controller:'findCtrl',
		css:'components/find/find.css'
	})
}]);

app.service('service2',['$http',function($http){
	this.get=function(){
		return $http.get('data/data.json');
	}
}])

app.controller('findCtrl', ['$scope','service2', function($scope,service2){
	service2.get().success(function(res){
		$scope.person=res;
	})
}])