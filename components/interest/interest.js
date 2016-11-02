var app=angular.module('interestModule', []);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/interest',{
		templateUrl:'components/interest/interest.html',
		controller:'interestCtrl',
		css:'components/interest/interest.css'
	})
	.when('/getMorePage1',{
		templateUrl:'components/interest/getMorePage/getMorePage.html',
		controller:'getMorePageCtrl',
		css:'components/interest/getMorePage/getMorePage.css'
	})
	.when('/getMorePage2',{
		templateUrl:'components/interest/getMorePage/getMorePage.html',
		controller:'getMorePageCtrl',
		css:'components/interest/getMorePage/getMorePage.css'
	})
	.when('/getMorePage3',{
		templateUrl:'components/interest/getMorePage/getMorePage.html',
		controller:'getMorePageCtrl',
		css:'components/interest/getMorePage/getMorePage.css'
	})
	.when('/getMorePage4',{
		templateUrl:'components/interest/getMorePage/getMorePage.html',
		controller:'getMorePageCtrl',
		css:'components/interest/getMorePage/getMorePage.css'
	})
}]);


app.service('service3',['$http',function($http){
	this.get=function(){
		return $http.get('data/interest.json');
	}
}])

//轮播图
app.factory('swiper', function(){
	var mySwiper=new Swiper('.swiper-container',{
		autoplay:2000,
		loop:true,
		autoplayDisableOnInteraction:false,
	    // 如果需要分页器
	    pagination: '.swiper-pagination'
	})
	return mySwiper;
})

var clickNumber;
app.controller('interestCtrl',['$scope','service3','swiper','$timeout',function($scope,service,swiper,$timeout){
	service.get().success(function(res){
		$scope.arr=res.banner_list;
		$scope.arr1Top=res.item_99_list.info;
		$scope.arr1=res.item_99_list.item_list;
		$scope.arr2Top=res.item_199_list.info;
		$scope.arr2=res.item_199_list.item_list;
		$scope.arr3Top=res.item_299_list.info;
		$scope.arr3=res.item_299_list.item_list;
	})
	
	//点击获取更多得到当前下标值
		$scope.interestGetMore=function(num){
			clickNumber=num;
			console.log(clickNumber);
		}
	
		$timeout(function(){
			var mySwiper=new Swiper('.swiper-container',{
				autoplay:2000,
				loop:true,
				autoplayDisableOnInteraction:false,
			    // 如果需要分页器
			    pagination: '.swiper-pagination'
			})
		},100)

	//当滑动滚动条时，滑动到一定的距离来控制topPrice的显示与隐藏
		$(window).on('scroll',function(){
		  	var toTop=$('body').scrollTop()/23;
	        if(toTop>16){
		        $('#topPrice').css({
		        	display:'block'
		        })
	        }else{
				$('#topPrice').css({
			        display:'none'
			    })
	        }
	      })
}])

//获取更多的二级页面
app.service('serviceMore',['$http',function($http){
	this.get=function(){
		return $http.get('data/interestproductMore'+clickNumber+'.json');

	}
}])

app.controller('getMorePageCtrl',['$scope','serviceMore','swiper','$timeout',function($scope,service,swiper,$timeout){
	service.get().success(function(res){		
//		获取更多的页面的数据
		if(clickNumber!=1){
			document.getElementById("interestMoreclock").style.backgroundPositionX=0;
			$scope.interestGetMoreTitle=res.info;
			$scope.interestGetMoreBanner=res.banner_list;
			$scope.interestGetMoreProduct=res.item_list;
		}else{
			console.log(res);
		}
	})	
	
	$timeout(function(){
		var mySwiper=new Swiper('.swiper-container',{
			autoplay:2000,
			loop:true,
			autoplayDisableOnInteraction:false,
		    // 如果需要分页器
		    pagination: '.swiper-pagination'
		})
	},100)
	
	//控制上方的返回键
	$scope.backSort=function(){
		window.history.back();
	}
	
}])









