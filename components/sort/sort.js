var app=angular.module('sortModule', []);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/sort',{
		templateUrl:'components/sort/sort.html',
		controller:'sortCtrl',
		css:'components/sort/sort.css'
	})
}]);

app.service('service4',['$http',function($http){
	this.get=function(){
		return $http.get('data/sort.json');
	}
}])

app.controller('sortCtrl', ['$scope','service4', function($scope,service){
	service.get().success(function(res){
		$scope.sortArr=res.list;
	})
}])