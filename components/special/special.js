var app = angular.module('specialModule', []);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/special',{
		templateUrl:'components/special/special.html',
		controller:'specialCtrl',
		css:'components/special/special.css'
	})
}]);

app.service('service1',['$http',function($http){
	this.get=function(){
		return $http.get('data/special.json');
	}
}])
app.service('ser1',['$http',function($http){
	this.get = function(){
		return $http.get('data/special2.json');
	}
}])
app.factory('swiper1',function(){
	var mySwiper = new Swiper('#wrap_special .swiper-container',{
		autoplay:2000,
		loop:true,
		autoplayDisableOnInteraction:false,
	   // 如果需要分页器
	   pagination: '.swiper-pagination',
	});
	return mySwiper;

	
})
app.controller('specialCtrl', ['$scope','service1','ser1','$timeout', function($scope,service1,ser1,$timeout){
	$scope.special_flag = false;
	service1.get().success(function(res){
		$scope.special = res.special_list;
		$scope.banners = res.banner_list;
		for (var i = 0; i < $scope.special.length; i++) {
			$scope.special_flag = $scope.special[i].flag; 
			if($scope.special_flag == '1'){
				$scope.special[i].icon_url = 'img/icon1/new.png';
			}else if($scope.special_flag == '2'){
				$scope.special[i].icon_url = 'img/icon1/hot.png';
			}else if($scope.special_flag == '3'){
				$scope.special[i].icon_url = 'img/icon1/star.png';
			}
			
		}
		$scope.addFavors = function(index){
			res.special_list[index].favors += 1;
		}
	});
	ser1.get().success(function(res){
		$scope.special2 = res.special_list;
		for (var j = 0; j < $scope.special2.length; j++) {
			$scope.special_flag2 = $scope.special[j].flag; 
			if($scope.special_flag2 == '1'){
				$scope.special2[j].icon_url = 'img/icon1/new.png';
			}else if($scope.special_flag2 == '2'){
				$scope.special2[j].icon_url = 'img/icon1/hot.png';
			}else if($scope.special_flag2 == '3'){
				$scope.special2[j].icon_url = 'img/icon1/star.png';
			}
			
		}
		$scope.addFavors = function(index){
			res.special_list[index].favors += 1;
		}
	});
	//当轮播图不能动的时候，需要加一个延时，因为这个是异步的
	$timeout(function(){
		var mySwiper = new Swiper('#wrap_special .swiper-container',{
			autoplay:2000,
			loop:true,
			autoplayDisableOnInteraction:false,
		    // 如果需要分页器
		    pagination: '.swiper-pagination',
		});
	},100);
}])

