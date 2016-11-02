var app=angular.module('findModule', []);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/find',{
		templateUrl:'components/find/find.html',
		controller:'findCtrl',
		css:'components/find/find.css'
	})
	.when('/find_second_page_goodProduct',{
		templateUrl:'components/find/find_second_page_goodProduct/find_second_page_goodProduct.html',
		controller:'secPageGoodCtrl',
		css:'components/find/find_second_page_goodProduct/find_second_page_goodProduct.css'
	})
	.when('/findBuyView',{
		templateUrl:'components/find/find_buy/find_buy.html',
		controller:'findBuyCtrl',
		css:'components/find/find_buy/find_buy.css'
	})
}]);
//****************************一级页面部分数据
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
app.service("ser_find2",['$http',function($http){
	this.get = function(){
		return $http.get('data/findDataShaidan.json');
	}
}]);
app.service("ser_find3",['$http',function($http){
	this.get = function(){
		return $http.get('data/findDataNewProduct.json');
	}
}]);
app.service("ser_find4",['$http',function($http){
	this.get = function(){
		return $http.get('data/findMainData3.json');
	}
}]);
//**************************一级页面部分数据结束

//******************************二级页面数据，find_buy页面的数据
app.service('ser_find5',['$http',function($http){
	this.get = function(){
		return $http.get('data/findBuyData.json');
	}
}]);
//*************************************一级页面cotroller的操作
app.controller('findCtrl',['$scope','service2','ser_find1','ser_find2','ser_find3','ser_find4',function($scope,service2,ser_find1,ser_find2,ser_find3,ser_find4){

	$scope.find_changeFlag = false;
	$scope.yearTopFlag = false;
	service2.get().success(function(res){
		$scope.year = res;
	})
	//精选部分数据
	ser_find1.get().success(function(res){
		$scope.selections = res.discover_list;
	})
	//精选部分点击方法
	$scope.click_change = function(count){
		if(count==0){
			ser_find1.get().success(function(res){
				$scope.selections = res.discover_list;
			})
			$scope.yearTopFlag = false;
			
		}else if(count==1){
			ser_find2.get().success(function(res){
				$scope.selections = res.discover_list;
			})
			$scope.yearTopFlag = true;
		}else if(count==2){
			ser_find3.get().success(function(res){
				$scope.selections = res.discover_list;
			})
			$scope.yearTopFlag = true;
		}
	}
	//点击加载更多数据
	ser_find4.get().success(function(res){
		$scope.selections2 = res.discover_list;
	})

	
}])
//*******************************************一级页面cotroller的操作结束
//*******************************************find_second_page_goodProduct页面的操作
app.controller('secPageGoodCtrl',['$scope',function($scope){
	$scope.returnFind = function(){
		window.history.back();
	}
}])

//*************************************find_buy页面的操作
app.controller('findBuyCtrl',['$scope','ser_find5',function($scope,ser_find5){
	ser_find5.get().success(function(res){
		$scope.bigPicViewData = res.info;
		
	})
}])