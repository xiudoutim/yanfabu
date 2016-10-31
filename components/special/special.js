var app=angular.module('specialModule', []);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/special',{
		templateUrl:'components/special/special.html',
		controller:'specialCtrl',
		css:'components/special/special.css'
	})
}]);

app.service('service',['$http',function($http){
	this.get=function(){
		return $http.get('data/data.json');
	}
}])

app.controller('specialCtrl', ['$scope','service', function($scope,service){
	service.get().success(function(res){
		$scope.person=res;
	})
}])

