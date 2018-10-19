$(document).ready(function() {
	preventZoom();

	$("form").submit(checkDoubleSubmit);

	$(document).keydown(disableBackspaceKey);

	$('#topback').click(function(){
		window.location.href = '../メニュー画面（共通メニュー）.html';
	});

	$('#help').click(function(){
		window.location.href = './ヘルプ画面.html';
	});

	//戻る
	$('.back').click(function() {
		history.back();
	});
//	$('.no').click(function() {
//		history.back();
//	});
});

// =============================================================================

var topURL;

function gotoTopPage() {
	var menuUrl = topURL + "menu?ownBranchCd=&terminalId=";
	debugLog("goto menu page: " + menuUrl);
	window.location.href = menuUrl;
}

var debugMode = true;

function debugLog(msg) {
	if (debugMode) {
		console.log(msg);
	}
}

// =============================================================================
// 画面ズームアウトを禁止する

var lastTouchEnd = 0;

function preventZoom() {
	document.documentElement.addEventListener('touchstart', function(event) {
		if (event.touches.length > 1) {
			event.preventDefault();
		}
	}, false);

	document.documentElement.addEventListener('touchend', function(event) {
		var now = (new Date()).getTime();
		if (now - lastTouchEnd <= 600) {
			event.preventDefault();
		}
		lastTouchEnd = now;
	}, false);
}

// =============================================================================
// マウスの右クリックを禁止する

if (window.Event) {
	document.captureEvents(Event.MOUSEUP);
}

function noContextMenu(event) {
	event.cancelBubble = true
	event.returnValue = false;
	return false;
}

function noRightClick(event) {
	if (window.Event) {
		if (event.which == 2 || event.which == 3)
			return false;
	} else if (event.button == 2 || event.button == 3) {
		event.cancelBubble = true
		event.returnValue = false;
		return false;
	}
}

// IE5+ 対応
document.oncontextmenu = noContextMenu;
// ほかのブラウザ対応
document.onmousedown = noRightClick; // for all others

// =============================================================================
// Backspace キーを禁止する

function disableBackspaceKey(event) {
	var doPrevent = false;

	if (event.keyCode === 8) {
		var d = event.target;

		var tagName = d.tagName.toUpperCase();

		var type = d.type;
		if (type) {
			type = type.toUpperCase();
		}

		if ((tagName === "INPUT" && type === "TEXT") || tagName === 'TEXTAREA') {
			doPrevent = d.readOnly || d.disabled;
		} else {
			doPrevent = true;
		}
	}

	debugLog("disableBackspaceKey: " + doPrevent);

	if (doPrevent) {
		event.preventDefault();
	}
}

// =============================================================================

function checkDoubleSubmit(event) {
	var submitFlag = $("#submitFlag");
	if (submitFlag.val() != "1") {
		// サブミットフラグを設定する
		submitFlag.val("1");
	} else {
		// 2重サブミットを禁止する
		debugLog("2重サブミット発生, 禁止する");
		event.preventDefault();
	}
}
