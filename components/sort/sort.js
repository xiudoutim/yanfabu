var app=angular.module('sortModule', []);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/sort',{
		templateUrl:'components/sort/sort.html',
		controller:'sortCtrl',
		css:'components/sort/sort.css'
	})
}]);

app.service('service',['$http',function($http){
	this.get=function(){
		return $http.get('data/data.json');
	}
}])

app.controller('sortCtrl', ['$scope','service', function($scope,service){
	service.get().success(function(res){
		$scope.person=res;
	})
}])