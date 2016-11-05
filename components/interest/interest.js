var app=angular.module('interestModule', ['me-lazyload']);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/interest',{
		templateUrl:'components/interest/interest.html',
		controller:'interestCtrl',
		css:'components/interest/interest.css'
	})
	.when('/getMorePage1',{
		templateUrl:'components/interest/getMorePage1/getMorePage1.html',
		controller:'getMorePageCtrl',
		css:'components/interest/getMorePage1/getMorePage1.css'
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
	        if(toTop>18.5){
		        $('#topPrice').css({
		        	display:'block',
		        })
	        }else{
				$('#topPrice').css({
			        display:'none'
			   })
	        }
	      })
}])

app.controller('Scrollcontroller',['$scope','$location','$anchorScroll',function($scope,$location,$anchorScroll){
//	$scope.click=function($event){
//		console.log($event);
//		$event.preventDefault();
//		$event.stopPropagation();
//	}
	$scope.scrollTo=function(num,$event){
		console.log(num);
		switch (num){
			case 1:$location.hash('interest_money_nine');
				break;
			case 2:$location.hash('interest_money_nineteen');
				break;
			case 3:$location.hash('interest_money_twentyNine');
				break;
		}
		$anchorScroll();
	};
}]);

<<<<<<< HEAD

=======
>>>>>>> xiudou
//获取更多的二级页面
var arrGetData=[];
app.service('serviceMore',['$http',function($http){
	this.get=function(){
		//解析出三个json数据存入到数组中，方便后面点击事件
		$http.get('data/interestproductMore2.json').success(function(res1){
			arrGetData.push(res1);
		});
		$http.get('data/interestproductMore3.json').success(function(res2){
			arrGetData.push(res2);
		});
		$http.get('data/interestproductMore4.json').success(function(res3){
			arrGetData.push(res3);
		});
		
		return $http.get('data/interestproductMore'+clickNumber+'.json');
	}
}])

app.controller('getMorePageCtrl',['$scope','serviceMore','swiper','$timeout',function($scope,service,swiper,$timeout){
	service.get().success(function(res){
		$scope.changePage=function(num){
			//进入到获取更多的页面之后，点击改变数据，由于存在异步的问题，所以出现这里的重复代码
			clickNumber=num;
			res=arrGetData[num-2];
			if(clickNumber!=1){
				document.getElementById("interestMoreclock").style.backgroundPositionX=0;
				$scope.interestGetMoreTitle=res.info;
				$scope.interestGetMoreBanner=res.banner_list;
				$scope.interestGetMoreProduct=res.item_list;
			}
			//控制跳转页面的title部分的class
			switch (clickNumber){
				case 2:$scope.isChoosed2=true;$scope.isChoosed3=false;$scope.isChoosed4=false;break;
				case 3:$scope.isChoosed3=true;$scope.isChoosed2=false;$scope.isChoosed4=false;break;
				case 4:$scope.isChoosed4=true;$scope.isChoosed2=false;$scope.isChoosed3=false;break;
				default:$scope.isChoosed2=true;break;
			}
		}
		
		//		获取更多的页面的数据
		if(clickNumber!=1){
			document.getElementById("interestMoreclock").style.backgroundPositionX=0;
			$scope.interestGetMoreTitle=res.info;
			$scope.interestGetMoreBanner=res.banner_list;
			$scope.interestGetMoreProduct=res.item_list;
		}
		//控制跳转页面的title部分的class
		switch (clickNumber){
			case 2:$scope.isChoosed2=true;break;
			case 3:$scope.isChoosed3=true;break;
			case 4:$scope.isChoosed4=true;break;
			default:$scope.isChoosed2=true;break;
		}
	})	
	
	//加载更多页面的轮播图
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

app.service('serviceMore1',['$http',function($http){
	this.get=function(){
		return $http.get('data/interestproductMore1.json');
	}
}])

app.controller('getMorePageCtrl1',['$scope','serviceMore1',function($scope,service){
	service.get().success(function(res){
		$scope.interestGetMoreTitle1=res.special_info;
		$scope.interestGetMoreProduct1=res.special_item_list;
	})
}])









