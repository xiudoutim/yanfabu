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
		return $http.get('data/findMainData1.json');
	}
}])
app.service("ser_find1",['$http',function($http){
	this.get = function(){
		return $http.get('data/findMainData2.json');
	}
}]);
app.controller('findCtrl',['$scope','service2','ser_find1',function($scope,service2,ser_find1){
	$scope.find_changeFlag = 0;
    $scope.bered = function(i) {
        $scope.find_changeFlag = i;
    };
	service2.get().success(function(res){
		$scope.year = res;
	})
	//精选部分数据
	ser_find1.get().success(function(res){
		$scope.selections = res.discover_list;
		console.log($scope.selections);
	})
}])
