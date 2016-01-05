/**
 * Created by zhaohaochen on 15/12/9.
 */
(function (window, location, document) {
    define(['text!tpl/app_tooles_tpl.html','css!lib/weui/weui.css', 'Zepto','utiles/url'], function (tpl,_a,_b,_u) {
        var $ = Zepto;
        //采用微信样式做基础包
        var App = function (container) {
            var _app = this;
            var _$container = {};//页面变换容器
            if (typeof  container == 'string') {
                _$container = $(container);
            } else {
                _$container = container;
            }
            /*
            *
            *
            * */
            var _pages = {};
            var _addPage = function (id, factory) {
                _pages[id] = new factory();
            };
            var _getPage = function (id) {
                return _pages[id];
            }
            _app.page = function (id, factory) {
                return ((id && factory) ? _addPage : _getPage).call(this, id, factory);
            };//注册的页面
            /*
             *
             *
             * */
            // page stack
            var _stack = [];//页面历史记录
            /*
             *
             *
             * */
            // location.hash = '#hash1' 和点击后退都会触发`hashchange`，这个demo页面只关心后退
            $(window).on('hashchange', function (e) {
                if (/#.*/gi.test(location.href)) {
                    if(_app.initStatus ){
                        var l= location.hash.indexOf('?');
                        if(l>-1){
                            _app.go(location.hash.substring(1,l));
                        }else{
                            _app.go(location.hash.slice(1));
                        }

                    }


                }else{
                    var $top={};
                    for(var i in _stack){
                        $top=_stack.pop();
                        $top.destroy();
                    }
                    //_app.go();
                }
                //if (/#.+/gi.test(e.newURL)) {
                //    return;
                //}
                //var $top = _stack.pop();
                //if (!$top) {
                //    return;
                //}
                //
                //$top.el.addClass('slideOut').on('animationend', function () {
                //    $top.destroy();
                //}).on('webkitAnimationEnd', function () {
                //    $top.destroy();
                //});
            });
            /*
             * 页面插件要有
             * ()初始化函数和方法,不包括初始化数据
             * el $页面
             * remove()删除
             * init()页面以及功能初始化
             * refresh()刷新页面以及数据
             *
             *
             *
             * */
            _app.go = function (id,val) {
                //清楚所有的toast
                _app.hideToast();
                _app.hideLoadingToast();
                _app.hideAlert();
                //独绝原地刷新
                if(! _app.page(id).el || _app.page(id).el.css('display') =='none'){
                    //第一次进入
                    //隐藏其他页面
                    for(var i in _stack){
                        _stack[i].el.hide();

                    }
                    if(!val){
                        val={};
                        $.extend(val,_u.getRequest());
                    }

                    _stack.push(_app.page(id).init(_$container,val));
                    _app.page(id).refresh(val);
                    if(_app.page(id).title){
                        var $body = $('body');
                        $('title').html(_app.page(id).title);
                        document.title = _app.page(id).title;
                        // hack在微信等webview中无法修改document.title的情况
                        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
                        $iframe.on('load',function() {
                            setTimeout(function() {
                                $iframe.off('load').remove();
                            }, 0);
                        }).appendTo($body);
                    }
                    location.hash = '#' + id+_u.setRequest(val);
                    $(_app.page(id).el).addClass('slideIn').on('webkitAnimationEnd', function () {
                        $(this).removeClass('slideIn');
                    }).on('animationend', function () {
                        $(this).removeClass('slideIn');
                    });
                }

            }
            _app.initStatus=false;//是否已经初始化
            _app.run=function(){
                _app.initStatus=true;
                _$container.after(tpl)

            }
            //app的插件
            _app.showToast=function(){
                $('#toast').show();
                //setTimeout(function () {
                //    $('#toast').hide();
                //}, 5000);
            }
            _app.hideToast=function(){
                //$('#toast').show();
                //setTimeout(function () {
                    $('#toast').hide();
                //}, 5000);
            }
            _app.showLoadingToast=function(){
                $('#loadingToast').show();
                //setTimeout(function () {
                //    $('#loadingToast').hide();
                //}, 5000);
            }
            _app.hideLoadingToast=function(){

                //setTimeout(function () {
                $('#loadingToast').hide();
                //}, 5000);
            }
            _app.showAlert=function(title,content,callback){
                $('#dialog2').show();
                $('#dialog2').find('.weui_btn_dialog').off('click');
                $('#dialog2').find('.weui_btn_dialog').on('click', function () {
                    _app.hideAlert();
                    if(callback){
                        callback();
                    }

                });
                $('#dialog2').find('.weui_dialog_title').html(title);
                $('#dialog2').find('.weui_dialog_bd').html(content);

            }
            _app.hideAlert=function(){
                $('#dialog2').hide();
                $('#dialog2').find('.weui_dialog_title').html('');
                $('#dialog2').find('.weui_dialog_bd').html('');
            }
            _app.showConfirm=function(title,content,callback){
                $('#dialog1').show();
                $('#dialog1').find('.primary').off('click');
                $('#dialog1').find('.primary').on('click', function () {
                    _app.hideConfirm();
                    if(callback){
                        callback();
                    }

                });
                $('#dialog1').find('.default').off('click');
                $('#dialog1').find('.default').on('click', function () {
                    $('#dialog1').hide();

                });
                $('#dialog1').find('.weui_dialog_title').html(title);
                $('#dialog1').find('.weui_dialog_bd').html(content);

            }
            _app.hideConfirm=function(){
                $('#dialog1').hide();
                $('#dialog1').find('.weui_dialog_title').html('');
                $('#dialog1').find('.weui_dialog_bd').html('');
            }
            _app.showConfirmText=function(title,callback){
                $('#dialog3').show();
                $('#dialog3').find('.primary').off('click');
                $('#dialog3').find('.primary').on('click', function () {

                    if(callback){
                        callback($('#dialog3').find('.weui_dialog_bd input').val());
                    }
                    _app.hideConfirmText();
                });
                $('#dialog3').find('.default').off('click');
                $('#dialog3').find('.default').on('click', function () {
                    $('#dialog3').hide();

                });
                $('#dialog3').find('.weui_dialog_title').html(title);
                //$('#dialog3').find('.weui_dialog_bd input').html(content);

            }
            _app.hideConfirmText=function(){
                $('#dialog3').hide();
                $('#dialog3').find('.weui_dialog_title').html('');
                $('#dialog3').find('.weui_dialog_bd input').val('');
            }
            _app.getToken=function(){
                if(!window.localStorage){
                    return '';
                }
                return window.localStorage.token ;
            }
            //if (/#.*/gi.test(location.href)) {
            //    var w=function(){
            //        if(_app.initStatus){
            //            _app.go(location.hash.slice(1));
            //        }else{
            //            setTimeout(w,200);
            //        }
            //
            //    }
            //    w();
            //
            //
            //}
            //阻止href以'#'开头的的a元素的默认行为
            $(document).on('click', 'a', function (e) {
                var href = $(this).attr('href');
                if (!href || href.match(/^#/)) {
                    _app.go(href.slice(1));
                    e.preventDefault();
                    return false;
                }
            });
            //前进后退事件
            $(window).on('popstate', function (e) {

                return;

                //if (/#.+/gi.test(e.newURL)) {
                //    return;
                //}
                //var $top = _stack.pop();
                //if (!$top) {
                //    return;
                //}
                //
                //$top.el.addClass('slideOut').on('animationend', function () {
                //    $top.destroy();
                //}).on('webkitAnimationEnd', function () {
                //    $top.destroy();
                //});

            });

        }


        return App;
    });
})(window, location, document)

