 <style>
        article.indexArticle {
          min-height: 800px;
          padding-left: 10px;
          padding-right: 10px;
        }

        #inputArea {
          position: relative;
          left:25px;
        }

        article {
          min-height: 800px;
        }

        article .input {
          height: 600px;
          width: 1366px;
          position: absolute;
          top: 290px;
          left: 0px;
        }

        article #kanaKey {
          background: initial;
        }
        article #okBtn {
          background: initial;
        }
        input[type="radio"] {
          height:30px;
          width:30px;
          margin:10px 10px 10px 10px;
        }

        #wrapperTest{
            position: relative;
            width: 100%;
            height: 100%;
        }
      </style>

      <script>
        var who;
        $( document ).ready(function() {

          $("#nameKeypad").keypad({
            target: $('#kanaKey'),
            clearText: '全削除',
            backText: '1文字削除',
            spacebarText: 'ｽﾍﾟｰｽ',
            switchText:'英数字選択',
            layout: kanaLayout02,
            switchLayout: qwertyLayout02,
            onKeypress : keypad_OnKeypress,
            keypadOnly: false
          });

          $("#okBtn").click(function(){
             if($("#modal").css("display")=="none"){
                $('#modal').fadeIn({queue: false, duration: 500}); 
                $('#modal').animate({ top:100 }, 500);
            }else{
                $('#modal').fadeOut({queue: false, duration: 500}); 
                $('#modal').animate({ top:500 }, 500);
            }
            
            // 下の画面スクロール禁止解除 ↓↓
            $('html, body').css({'overflow': 'visible', 'height': '100%'});
            $('#element').off('scroll touchmove mousewheel');
            // 下の画面スクロール禁止解除 ↑↑
            
            $("#"+who).val($("#kanaKey").val());
            $("#kanaKey").val("");
          });

          var vars = {}; 
          var param = location.search.substring(1).split('&');
          for(var i = 0; i < param.length; i++) {
            var keySearch = param[i].search(/=/);
            var key = '';
            if(keySearch != -1) key = param[i].slice(0, keySearch);
            var val = param[i].slice(param[i].indexOf('=', 0) + 1);
            if(key != '') vars[key] = decodeURI(val);
          }

          $(".kou").hide();
          if (vars['kou']=='1') {
            $(".kou").show();     //口座番号入力画面から遷移
          }

          $(".next").click(function() {
           if (vars['kou']=='1') {
              if ($($("input[type='radio']")[0]).prop("checked")) {
                window.location.href="今後の手続きのご案内画面(受付).html?scan=0&kana1=1";
              } else
              if ($($("input[type='radio']")[1]).prop("checked")) {
                window.location.href="反社会的勢力でないことの同意画面(受付).html";
              } else
              if ($($("input[type='radio']")[2]).prop("checked")) {
                window.location.href="受付番号発券中画面.html";
              } else
              if ($($("input[type='radio']")[3]).prop("checked")) {
                window.location.href="基本項目照会エラー画面(受付).html";
              }
            } else
            if (vars['kanji']=='1') {
              window.location.href="生年月日入力画面(受付).html";
            } else
            if (vars['tei']=='1') {
              window.location.href="漢字氏名・カナ氏名・生年月日の確認／訂正画面(受付).html";
            }
          });
          
        });

        function keypad_OnKeypress() {
          alert("1111111111111111111");
          $("#nameKeypad").keypad("option", "target").focus();
        }
      </script>
          <div id="wrapperTest">
            <!-- メイン／フッター -->
            <div style="display:block;height:90%;overflow-x:hidden;overflow-y:hidden;">
                <div id="mainContents">
                <input type="text" style="height:35px;width:450px;font-size:20pt;" value="" id="kanaKey" maxlength="28">
                <button style="height:50px;width:150px;font-size:25px;" id="okBtn">確定</button>
                    <article>
                        <div id="nameKeypad" class="jqueryKeypad"></div>
                    </article>
                </div>
            </div>
          </div>
