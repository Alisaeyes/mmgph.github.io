;
(function($) {
	//详情页立即购买 弹窗
	$(".details-btn3").click(function() {
		$(".commodity-mask").fadeIn(0, function() {
			$(".commodity-details-select").css({
				"transform": "translate3d(0,0,0)"
			});
		});
	});

	$(".close-btn").click(function() {
		$(".commodity-details-select").css({
			"transform": "translate3d(0,100%,0)"
		});
		setTimeout(function() {
			$(".commodity-mask").fadeOut(0);
		}, 500);
	});

	//购买数量加减
	var n = 1;
	$(".plus").click(function() {
		++n;
		if (n > 1) {
			$(this).siblings(".reduce").css("color", "#333");
		};
		var onum = $(this).siblings(".num");
		onum.html(n);
	});
	$(".reduce").click(function() {
		--n;
		if (n < 1) {
			n = 1;
		} else {
			var onum = $(this).siblings(".num");
			onum.html(n);
		};
		if (n == 1) $(this).css("color", "#999");
	});

	//选择颜色&尺寸
	$(".colors span,.size-list span").click(function() {
		$(this).addClass("on").siblings().removeClass("on");
	});


	/***************************** 倒计时 start ***************************************/
	/*
		天，时，分，秒 封装函数

		elarr  :  数组，第一个是天，第二个是时，第三个是分，第四个是秒
		end    :  活动结束的时间
		callback :  活动结束后的回调函数
	 */
	function countDown(elarr, endTime, callback) {
		var endTime = formattingTime(endTime);

		init();
		var times = setInterval(function() {
			init();
		}, 500);

		//时间初始化函数
		function init() {
			var time = new Date();
			var newTime = new Date(endTime);
			var countdownTime = parseInt((newTime.getTime() - time.getTime()) / 1000);
			var tim = timeConversion(countdownTime);
			if (tim.day == 00 && tim.time == 00 && tim.branch == 00 && tim.second == 00) {
				callback && callback();
				clearInterval(times);
			};

			elarr[0].text(tim.day);
			elarr[1].text(tim.time);
			elarr[2].text(tim.branch);
			elarr[3].text(tim.second);
		};
	};

	//格式化时间
	function formattingTime(str) {
		return str.replace(/-/g, "/");
	};

	//时间转换
	function timeConversion(countdownTime) {
		return {
			day: timeZero(parseInt(countdownTime / 86400)), //转换为天
			time: timeZero(parseInt(countdownTime % 86400 / 3600)), //转换为时
			branch: timeZero(parseInt(countdownTime % 86400 % 3600 / 60)), //转换为分
			second: timeZero(parseInt(countdownTime % 60)) //转换为秒
		};
	};

	//时间补零
	function timeZero(time) {
		if (time < 0) {
			time = 0;
		};
		if (time < 10) {
			return "0" + time
		} else {
			return time;
		};
	};


	/*
		时，分，秒，毫秒 封装函数

		elarr  :  数组，第一个是时，第二个是分，第三个是秒，第四个毫秒
		end    :  活动结束的时间
		callback :  活动结束后的回调函数
	 */
	function flashSale(elarr, end, callback) {
		end = formattingTime(end);

		limit();
		var clearTime = setInterval(function() {
			limit();
		}, 30);

		//限时抢购时间函数
		function limit() {
			var currentTime = new Date();
			var endTime = new Date(end);

			var countDown = parseInt((endTime.getTime() - currentTime.getTime()) / 1000);
			var newTime = timeConversion(countDown);

			if (newTime.time == 00 && newTime.branch == 00 && newTime.second == 00) {
				callback && callback();
				clearInterval(clearTime);
			};

			elarr[0].text(newTime.time);
			elarr[1].text(newTime.branch);
			elarr[2].text(newTime.second);
			elarr[3] && elarr[3].text(newTime.millisecond);

			function timeConversion(countdownTime) {
				return {
					time: timeZero(parseInt(countdownTime / 3600)), //转换为时
					branch: timeZero(parseInt(countdownTime % 86400 % 3600 / 60)), //转换为分
					second: timeZero(parseInt(countdownTime % 60)), //转换为秒
					millisecond: timeZero(new Date().getMilliseconds()) //转换为毫秒秒
				};
			};
		};
	};
	window.countDown = countDown;
	window.flashSale = flashSale;
	/***************************** 倒计时 end ***************************************/
})(jQuery);

/***************************** 购物车编辑 start ***************************************/
/*
	edit_btn: 编辑按钮
	goods_msg：产品信息
	edit_msg： 编辑内容
*/
function edit_cart(edit_btn, goods_msg, edit_msg) {
	$(edit_btn).click(function() {
		obj_parents = $(this).parents(".cart-list").children("li");
		obj_goods_msg = $(obj_parents).find(goods_msg);
		if ($(obj_goods_msg).is(":visible")) {
			$(this).text("完成").css({
				"color": "#e3241a"
			});
			$(obj_goods_msg).css({
				"display": "none"
			}).parents(".edit-box").find(edit_msg).css({
				"display": "block"
			});
			$(obj_parents).css({
				"background-color": "#fbfbfb"
			});
		} else {
			$(obj_goods_msg).css({
				"display": "block"
			}).parents(".edit-box").find(edit_msg).css({
				"display": "none"
			});
			$(this).text("编辑").css({
				"color": "#333"
			});
			$(obj_parents).css({
				"background-color": "transparent"
			});
		}
	});
}
/***************************** 购物车编辑 end ***************************************/