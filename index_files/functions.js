/*
 * http://love.hackerzhou.me
 */

// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(date){
	var seconds = (+ new Date() - date.getTime()) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = Math.floor(seconds % 60);
	seconds = (seconds + "").replace(/\.\d*/, "");
	var result = "第 <span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 小时 <span class=\"digit\">" + minutes + "</span> 分钟 <span class=\"digit\">" + seconds + "</span> 秒";
	$("#clock").html(result);
}
// 移动端屏幕适配
function adaptMobileScreen() {
    var $wrap = $("#wrap");
    var $main = $("#main");
    if (!$wrap.length) return;

    var screenW = window.innerWidth;
    var screenH = window.innerHeight;
    var baseW = 1100;  // 设计稿基准宽度
    var baseH = 680;   // 设计稿基准高度
    var isLandscape = screenW > screenH;

    if (isLandscape) {
        // 横屏模式：等比缩放 + 全屏居中
        var scale = Math.min(screenW / baseW, screenH / baseH);
        $main.css("transform", "none");
        $wrap.css({
            "transform": "scale(" + scale + ")",
            "transform-origin": "center center",
            "position": "absolute",
            "left": (screenW - baseW * scale) / 2 + "px",
            "top": (screenH - baseH * scale) / 2 + "px",
            "margin": 0
        });
    } else {
        // 竖屏模式：旋转90度 + 等比缩放
        var scale = Math.min(screenH / baseW, screenW / baseH);
        $main.css({
            "width": screenH + "px",
            "height": screenW + "px",
            "position": "absolute",
            "top": 0,
            "left": 0,
            "transform-origin": "left top",
            "transform": "rotate(90deg) translate(0, -" + screenW + "px)"
        });
        $wrap.css({
            "transform": "scale(" + scale + ")",
            "transform-origin": "center top",
            "position": "relative",
            "left": "auto",
            "top": "auto",
            "margin": "0 auto"
        });
    }
}

// 页面加载、尺寸变化、横竖屏切换时触发适配
$(window).on("load resize orientationchange", function() {
    // 延时100ms，等待微信浏览器视口尺寸更新
    setTimeout(adaptMobileScreen, 100);
});
