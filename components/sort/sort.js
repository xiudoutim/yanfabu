var app=angular.module('sortModule', []);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/sort',{
		templateUrl:'components/sort/sort.html',
		controller:'sortCtrl',
		css:'components/sort/sort.css'
	})
	.when('/sousuoPage',{
		templateUrl:'components/sort/sousuoPage/sousuoPage.html',
		controller:'sousuoPageCtrl',
		css:'components/sort/sousuoPage/sousuoPage.css'
	})
	.when('/productInfo',{
		templateUrl:'components/sort/productInfo/productInfo.html',
		controller:'productInfoCtrl',
		css:'components/sort/productInfo/productInfo.css'
	})
}]);

app.service('service4',['$http',function($http){
	this.get=function(){
		return $http.get('data/sort.json');
	}
}])

var index;
app.controller('sortCtrl', ['$scope','service4', function($scope,service){
	service.get().success(function(res){
		$scope.sortArr=res.list;
	})
	$scope.setId=function(id){
		index=id;
	}
}])


//搜索二级页面控制器及获取json数据
app.service('serviceSouSuo',['$http',function($http){
	this.get=function(){
		return $http.get('data/sort.json');
	}
}])

app.controller('sousuoPageCtrl',['$scope','serviceSouSuo',function($scope,service){
	service.get().success(function(res){
	$scope.sousuoPageArr=res.hot_list;
});
	
	$scope.backSort=function(){
		window.history.back();
	}

}])

//商品列表的详细信息页面
var pId;
app.service('serviceInfo',['$http',function($http){
	this.get=function(){
		return $http.get('data/sortNum'+index+'.json');
	}
}])

var moreProductArr=[];
app.controller('productInfoCtrl',['$scope','serviceInfo',function($scope,service){
	service.get().success(function(res){
		$scope.productSortName=res.category_info;
//		console.log(res.item_list.length);
		if(res.item_list.length/2<=8){
			$scope.getMore=false;
			$scope.productInfoArr=res.item_list;
			document.getElementById("productInfo").style.paddingBottom="2.6rem";
		}else{
			$scope.getMore=true;
			$scope.productInfoArr=res.item_list.slice(0,16);
			moreProductArr=res.item_list.slice(16,res.item_list.length);
			console.log(moreProductArr);
			
		}
	});
	$scope.backSort=function(){
		window.history.back();
	}
	$scope.getMoreProduct=function(){
		$scope.getMore=false;
		document.getElementById("productInfo").style.paddingBottom="2.6rem";
		$scope.productInfoArr2=moreProductArr;
	}
}])


