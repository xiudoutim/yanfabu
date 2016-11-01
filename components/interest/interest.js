var app=angular.module('interestModule', []);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/interest',{
		templateUrl:'components/interest/interest.html',
		controller:'interestCtrl',
		css:'components/interest/interest.css'
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

app.factory('scroll',function(){
	return{
		scrollToTop:function(){
			window.addEventlistener('scroll',function(){
				if(document.body.scrollBottom>18.52){
					$('#interest_listTop').css({
						position:'fixed',
						top:0
					})
				}
			})
		}
	}
})
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
	//var clicknumber;
//		$scope.interestGetMore=function(num){
//			clicknumber=num;
//			$scope.interestGo=false;
//			$scope.interestGetMore=true;
//		}
	
	$timeout(function(){
		var mySwiper=new Swiper('.swiper-container',{
			autoplay:2000,
			loop:true,
			autoplayDisableOnInteraction:false,
		    // 如果需要分页器
		    pagination: '.swiper-pagination'
		})
	},100)

	  $(window).on('scroll',function(){
	  	var toTop=$('body').scrollTop()/23;
        if(toTop>20){
          $('#interest_listTop').css({
            position:'fixed',
            top:0
          })
        }
      })
}])

//二级页面
//app.service('service3',['$http',function($http){
//	this.get=function(){
//		return $http.get('data/interest.json');
//	}
//}])















//var interestGetMoreArr1=[];
//var interestGetMoreArr2=[];
//var interestGetMoreArr3=[];
//var interestGetMoreArr4=[];
//
//app.service('serviceMore',['$http',function($http){
//	this.get=function(){
////		return $http.get('data/interestproductMore'+clicknumber+'.json');
//		return $http.get('data/interestproductMore1.json');
//	}
//}])
//app.controller('interestGetMoreCtrl',['$scope','serviceMore',function($scope,service){
//	service.get().success(function(res){		
////		获取更多的页面的数据
//		$scope.interestGetMoreTitle=res.info;
//	})
//		
//}])





