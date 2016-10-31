var app=angular.module('findModule', []);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/find',{
		templateUrl:'components/find/find.html',
		controller:'findCtrl',
		css:'components/find/find.css'
	})
}]);

app.service('service',['$http',function($http){
	this.get=function(){
		return $http.get('data/data.json');
	}
}])

app.controller('findCtrl', ['$scope','service', function($scope,service){
	service.get().success(function(res){
		$scope.person=res;
	})
}])