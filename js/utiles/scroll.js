/**
 * Created by zhaohaochen on 15/12/11.
 */
(function () {

    define(['Iscroll', 'Zepto'], function (Iscroll) {
        var _scroll = function (selector, opts) {
            var _options = {
                    probeType: 2,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
                    scrollbars: true,//有滚动条
                    mouseWheel: true,//允许滑轮滚动
                    fadeScrollbars: false,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
                    bounce: true,//边界反弹
                    interactiveScrollbars: true,//滚动条可以拖动
                    shrinkScrollbars: 'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
                    click: false,// 允许点击事件
                    keyBindings: false,//允许使用按键控制
                    momentum: true,// 允许有惯性滑动
                    preventDefault:true,//冒泡事件
                    preventDefaultException:{tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/ }
                },
                _self = this;
            if (typeof  selector == 'string') {
                _self.selector = $(selector)[0];
            } else {
                _self.selector = selector;
            }
            if(opts){
                $.extend(_options,opts);
            }

            _self.Iscroll=new IScroll(_self.selector, _options);
            if(_options.onRefresh){
                //滚动开始
                _self.Iscroll.on('scrollStart',_options.onRefresh);
            }
            if(_options.onScrollMove){
                //滚动中
                _self.Iscroll.on('scroll',_options.onScrollMove);
            }
            if(_options.onScrollEnd){
                //滚动结束
                _self.Iscroll.on('scrollEnd',_options.onScrollEnd);
            }
            //_self.Iscroll.on('beforeScrollStart',function(e){
            //    var target = this.target;
            //    while (target.nodeType != 1) target = target.parentNode;
            //    if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
            //        e.preventDefault();
            //});
            _self.options=_options;
            _self.Iscroll.refresh();

        }

        _scroll.prototype.refresh=function(){
            var _self=this;
            _self.Iscroll.refresh();
        }
        _scroll.prototype.destroy=function(){
            var _self=this;
            _self.Iscroll.destroy();
        }
        return function(selector,opts){
            return new _scroll(selector, opts);
        }
    });
})()