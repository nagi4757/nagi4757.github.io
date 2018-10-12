$.keypad.addKeyDef("DEL", "del");

$.keypad.addKeyDef("BS", "backspace");

// =============================================================================

// 特別ボタン: [株式会社]
$.keypad.addKeyDef("KaBuShiKiKaiSya", "KaBuShiKiKaiSya", function(inst) {
//    debugLog("Button [KaBuShiKiKaiSya] clicked");
    $.keypad._selectValue(inst, "(ｶ)");
});

// 特別ボタン: [有限会社]
$.keypad.addKeyDef("YuuGenKaiSya", "YuuGenKaiSya", function(inst) {
//    debugLog("Button [YuuGenKaiSya] clicked");
    $.keypad._selectValue(inst, "(ﾕ)");
});

// 特別ボタン: [学校法人]
$.keypad.addKeyDef("GaKouHouJin", "GaKouHouJin", function(inst) {
//    debugLog("Button [GaKouHouJin] clicked");
    $.keypad._selectValue(inst, "(ｶﾞｸ)");
});

// 特別ボタン: [医療法人]
$.keypad.addKeyDef("IRyouHouJin", "IRyouHouJin", function(inst) {
//    debugLog("Button [IRyouHouJin] clicked");
    $.keypad._selectValue(inst, "(ｲ)");
});

// 特別ボタン: [財団法人]
$.keypad.addKeyDef("ZaiDanHouJin", "ZaiDanHouJin", function(inst) {
//    debugLog("Button [ZaiDanHouJin] clicked");
    $.keypad._selectValue(inst, "(ｻﾞｲ)");
});

$.extend($.keypad.defaultOptions, {
    KaBuShiKiKaiSyaStatus : "株式会社",
    KaBuShiKiKaiSyaText : "株式会社",
    YuuGenKaiSyaStatus : "有限会社",
    YuuGenKaiSyaText : "有限会社",
    GaKouHouJinStatus : "学校法人",
    GaKouHouJinText : "学校法人",
    IRyouHouJinStatus : "医療法人",
    IRyouHouJinText : "医療法人",
    ZaiDanHouJinStatus : "財団法人",
    ZaiDanHouJinText : "財団法人",
});

// =============================================================================

//金額(万)入力用
$.keypad.addKeyDef("MAN", "man", function(inst) {
    var val = inst._input.val() + "万";
    inst._input.val(val);
    amountMoneyKeypad_OnKeypress($.keypad.MAN, val, inst);
});

// 金額(円)入力用
$.keypad.addKeyDef("SEN", "sen", function(inst) {
    var val = inst._input.val() + "千";
    inst._input.val(val);
    amountMoneyKeypad_OnKeypress($.keypad.SEN, val, inst);
});

// 金額(円)入力用
$.keypad.addKeyDef("EN", "en", function(inst) {
    //TODO:実装は？？
});

// 電話番号:00入力用
$.keypad.addKeyDef("DEC", "dec", function(inst) {
    var formName = $("form").attr("action");
    if (formName == 'amount') {
        $(".num").focus();
        var keypad = $.keypad._getInst($("#amountKeypad"));
        var numValue = $(".num").val();
        var reg = new RegExp(",", "g");
        numValue = numValue.replace(reg, "");

        for (var i = 0; i < 2; i++) {
            if (numValue != "" && numValue.length < 8) {
                numValue = numValue + "0";
                $(".num").val(numValue);
                if (numValue.length > 4) {
                    var btnMan = findKeypadButton(keypad, "万");
                    setKeypadButtonEnable(btnMan, false);
                }
                if (numValue.length > 5) {
                    var btnSen = findKeypadButton(keypad, "千");
                    setKeypadButtonEnable(btnSen, false);
                }
            } else {
                continue;
            }
        }

    }

    if (formName == 'telephoneNumber' || formName == 'birthday'
            || formName == 'addressKanji') {
        var keypad = $("#acTelKeypad");
        var target = $("#acTelKeypad").keypad("option", "target");
        var targetId = $(target).attr("id");
        var targetMaxLength = $(target).attr("maxlength");
        var valueLength = $(target).val().length;
        var targetValue = $(target).val();
        telKeypad_OnKeypress($.keypad.DEC, targetValue, keypad);

    }
    if (formName == 'account') {
        var acNo = $("#acNo").val();
        if (acNo.length < 6) {
            $("#acNo").val(acNo + '00');
        }
    }
});

$.keypad.addKeyDef("SWITCH", "switch", function(inst) {
    var keypadInstant = $(".jqueryKeypad").filter(function(index) {
        return ($.keypad._getInst(this) == inst);
    });

    // 現在使用中レイアウト
    var currentLayout = keypadInstant.keypad("option", "layout");//qwert
    // これから使用すうるレイアウト
    var switchLayout = keypadInstant.keypad("option", "switchLayout");//kana
    if (!switchLayout) {
        // 指定されない場合: qwertyLayoutを使用する
        switchLayout = qwertyLayout;
    }

    if (currentLayout == kanaLayout02 || currentLayout == kanaLayout) {
        keypadInstant.keypad("option", "switchText", "カナ選択");
        keypadInstant.keypad("option", "shiftText", "SHIFT");
        $.keypad._shiftKeypad(inst);
    } else {
        keypadInstant.keypad("option", "switchText", "英数字選択");
        $.keypad._shiftKeypad(inst);
    }

    // レイアウトを切り替える
    keypadInstant.keypad("option", "layout", switchLayout);
    keypadInstant.keypad("option", "switchLayout", currentLayout);

})

var qwertyLayout02 = [ '1234567890'+ $.keypad.HALF_SPACE+'()',
        'abcdefghij'+ $.keypad.HALF_SPACE+'-/',
        'klmnopqrs'+ $.keypad.SPACE + $.keypad.HALF_SPACE+'￥,',
        'tuvwxyz' + $.keypad.SHIFT+$.keypad.SPACE+ $.keypad.HALF_SPACE+'｢｣',
        $.keypad.SPACE_BAR + $.keypad.BACK + $.keypad.CLEAR + $.keypad.SWITCH ];

var qwertyLayout = [ '1234567890',
        'abcdefghij',
        'klmnopqrs',
        'tuvwxyz' + $.keypad.SHIFT,
        $.keypad.SPACE_BAR + $.keypad.BACK + $.keypad.CLEAR + $.keypad.SWITCH ];

var qwertyLayout_bak = [ '1234567890', $.keypad.qwertyAlphabetic[0],
        $.keypad.qwertyAlphabetic[1],
        $.keypad.qwertyAlphabetic[2] + $.keypad.SHIFT,
        $.keypad.SPACE_BAR + $.keypad.BACK + $.keypad.CLEAR + $.keypad.SWITCH ];

var qwertyLayout03 = [ '1234567890' + $.keypad.SPACE + $.keypad.SPACE,
        $.keypad.qwertyAlphabetic[0],
        $.keypad.qwertyAlphabetic[1],
        $.keypad.qwertyAlphabetic[2] + $.keypad.SHIFT,
        $.keypad.SPACE_BAR + $.keypad.BACK + $.keypad.CLEAR + $.keypad.SWITCH ];

var kanaLayout = [ 'ｱｶｻﾀﾅﾊﾏﾔﾗﾜ', 'ｲｷｼﾁﾆﾋﾐﾕﾘｦ', 'ｳｸｽﾂﾇﾌﾑﾖﾙﾝ',
        'ｴｹｾﾃﾈﾍﾒ' + $.keypad.SPACE + 'ﾚﾞ', 'ｵｺｿﾄﾉﾎﾓｰﾛﾟ',
        $.keypad.SPACE_BAR + $.keypad.BACK + $.keypad.CLEAR + $.keypad.SWITCH ];
/*
var kanaLayout02 = [
        'ｱｶｻﾀﾅﾊﾏﾔﾗﾜ'  +  $.keypad.HALF_SPACE+ 'ｧｬ' +$.keypad.HALF_SPACE+$.keypad.KaBuShiKiKaiSya,
        'ｲｷｼﾁﾆﾋﾐﾕﾘｦ' +  $.keypad.HALF_SPACE+ 'ｨｭ' +$.keypad.HALF_SPACE+$.keypad.YuuGenKaiSya,
        'ｳｸｽﾂﾇﾌﾑﾖﾙﾝ'  +  $.keypad.HALF_SPACE+ 'ｩｮ'+$.keypad.HALF_SPACE+$.keypad.GaKouHouJin,
        'ｴｹｾﾃﾈﾍﾒ' + $.keypad.SPACE + 'ﾚﾞ'  +  $.keypad.HALF_SPACE+ 'ｪｯ'+ $.keypad.HALF_SPACE+ $.keypad.IRyouHouJin,
        'ｵｺｿﾄﾉﾎﾓｰﾛﾟ' +$.keypad.HALF_SPACE +'ｫ'+ $.keypad.SPACE + $.keypad.HALF_SPACE+ $.keypad.ZaiDanHouJin,
        $.keypad.SPACE_BAR + $.keypad.BACK + $.keypad.CLEAR + $.keypad.SWITCH ];
*/
var kanaLayout02 = [
        'ｱｶｻﾀﾅﾊﾏﾔﾗﾜ'  +  $.keypad.HALF_SPACE+ 'ｧｬ',
        'ｲｷｼﾁﾆﾋﾐﾕﾘｦ' +  $.keypad.HALF_SPACE+ 'ｨｭ',
        'ｳｸｽﾂﾇﾌﾑﾖﾙﾝ'  +  $.keypad.HALF_SPACE+ 'ｩｮ',
        'ｴｹｾﾃﾈﾍﾒ' + $.keypad.SPACE + 'ﾚﾞ'  +  $.keypad.HALF_SPACE+ 'ｪｯ',
        'ｵｺｿﾄﾉﾎﾓｰﾛﾟ' +$.keypad.HALF_SPACE +'ｫ',
        $.keypad.SPACE_BAR + $.keypad.BACK + $.keypad.CLEAR ];

var kanaLayout03 = [
        'ｱｶｻﾀﾅﾊﾏﾔﾗﾜ'  +  $.keypad.HALF_SPACE+ 'ｧｬ' +$.keypad.HALF_SPACE+'()' +$.keypad.HALF_SPACE+ $.keypad.KaBuShiKiKaiSya,
        'ｲｷｼﾁﾆﾋﾐﾕﾘｦ' +  $.keypad.HALF_SPACE+ 'ｨｭ' +$.keypad.HALF_SPACE+'｢｣' +$.keypad.HALF_SPACE+$.keypad.YuuGenKaiSya,
        'ｳｸｽﾂﾇﾌﾑﾖﾙﾝ'  +  $.keypad.HALF_SPACE+ 'ｩｮ'+$.keypad.HALF_SPACE+'｡､' +$.keypad.HALF_SPACE+$.keypad.GaKouHouJin,
        'ｴｹｾﾃﾈﾍﾒ' + $.keypad.SPACE + 'ﾚﾞ'  +  $.keypad.HALF_SPACE+ 'ｪｯ'+ $.keypad.HALF_SPACE+'ｰ/'+$.keypad.HALF_SPACE + $.keypad.IRyouHouJin,
        'ｵｺｿﾄﾉﾎﾓｰﾛﾟ' +$.keypad.HALF_SPACE +'ｫ'+ $.keypad.SPACE + $.keypad.HALF_SPACE+ $.keypad.SPACE + $.keypad.SPACE + $.keypad.HALF_SPACE+  $.keypad.ZaiDanHouJin,
        $.keypad.SPACE_BAR + $.keypad.BACK + $.keypad.CLEAR + $.keypad.SWITCH ];


var deleteLayout = [ $.keypad.BACK + $.keypad.CLEAR ];

var numLayout = [ '123' + $.keypad.SPACE, '456' + $.keypad.SPACE,
        '789' + $.keypad.CLEAR, '0' + $.keypad.DEC + $.keypad.BACK ];

var amtLayout = [ '123万', '456千', '789円' + $.keypad.CLEAR,
        '0' + $.keypad.DEC + $.keypad.SPACE + $.keypad.BACK ];

//金額入力用
var atmLayout = [ '123' + $.keypad.SPACE, '456' + $.keypad.SPACE,
        '789' + $.keypad.SPACE , '0' + $.keypad.CLEAR + $.keypad.MAN + $.keypad.SEN + $.keypad.EN ];

function amountKeypad_OnKeypress(key, value, keypad) {
    $(".num").focus();
//    debugLog("amountKeypadOnKeypress, key: " + key);
//    debugLog("amountKeypadOnKeypress, value: " + value);
//    debugLog("amountKeypadOnKeypress, keypad: " + keypad);

    amountKeypad_updateButtonState(keypad);
}

function amountKeypad_updateButtonState(keypad) {
    var value = keypad._input.val();// textInputの値が取る
    var reg = new RegExp(",", "g");
    value = value.replace(reg, "");

    var hasSen = (value.indexOf("千") > -1);// 千が含まる
    var hasMan = (value.indexOf("万") > -1);// 万が含まる
    var hasEn = (value.indexOf("円") > -1);// 円が含まる
    var notEmpty = (value.length > 0);
    var endWithNum = (value.match(/\d$/) != null);// 最後一位
    var endWithNotNum = (value.match(/\D$/) != null);// 最後一位

    // "万"の入力可否: "千"/"万"/"円"が入力されない場合のみ、可
    // 万：六位以後禁止
    if (value.length > 4) {
        var btnMan = findKeypadButton(keypad, "万");
        setKeypadButtonEnable(btnMan, false);
    } else {
        var enableMan = !(hasSen || hasMan || hasEn) && endWithNum;
        var btnMan = findKeypadButton(keypad, "万");
        setKeypadButtonEnable(btnMan, enableMan);
    }
    // "千"の入力可否: "千"/"円"が入力されない場合のみ、可
    // 千：7位以後禁止
    if (value.length > 5) {
        var btnSen = findKeypadButton(keypad, "千");
        setKeypadButtonEnable(btnSen, false);
    } else {
        var enableSen = !(hasSen || hasEn) && endWithNum;
        var btnSen = findKeypadButton(keypad, "千");
        setKeypadButtonEnable(btnSen, enableSen);
    }
    // "円"の入力可否: "円"が入力されない場合のみ、可
    var enableEn = !(hasEn) && notEmpty;
    var btnEn = findKeypadButton(keypad, "円");
    setKeypadButtonEnable(btnEn, enableEn);

    // "0"～"9"の入力可否: "円"が入力されない場合のみ、可
    var enableNum = !hasEn;
    for (var num = 0; num <= 9; num++) {
        var btnNum = findKeypadButton(keypad, num);
        setKeypadButtonEnable(btnNum, enableNum);
    }

    // 最後一位は漢字場合、０と００使えない
    var zeroUnable = !(endWithNotNum);
    var btnZero = findKeypadButton(keypad, 0);
    setKeypadButtonEnable(btnZero, zeroUnable);
    // 1文字削除ボタン使えるように操作する
    var delOneKey = findKeypadButton(keypad, "1文字削除");
    setKeypadButtonEnable(delOneKey, true);
}

function findKeypadButton(keypad, buttonText) {
    var selector = "button:contains('" + buttonText + "')"
    return keypad._mainDiv.find(selector);
}

function setKeypadButtonEnable(button, enable) {
//    debugLog("setKeypadButtonEnable, button: " + button);
//    debugLog("setKeypadButtonEnable, enable: " + enable);

    if (enable) {
        button.removeAttr("disabled");
        button.removeClass("keypad-key-disabled");
    } else {
        button.attr("disabled", true);
        button.addClass("keypad-key-disabled");
    }
}
