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





