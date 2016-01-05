/**
 * Created by zhaohaochen on 15/12/10.
 */
(function (window) {
    define(['utiles/base', 'template','json', 'Zepto'], function (Base, template,JSON) {
        var _bindZhcClick=function(el,_self){
            //不支持第一个元素点击事件
            var _em=el.find('[zhc-click]');
            _em.off('click');
            for (var i = 0; i < _em.length; i++) {
                (function(v,self){
                    var click = v.attr('zhc-click');
                    var val = click.substring(click.indexOf('(') + 1, click.indexOf(')'));
                    if (click.indexOf('(') >= 0) {
                        click = click.substring(0, click.indexOf('('));
                    }

                    if (self[click]) {
                        v.off('click');
                        if (val.length) {
                            v.on('click', (function (vl) {
                                var _v='';
                                try{
                                    _v=JSON.parse(vl);
                                }catch(e){

                                }
                                if(typeof _v != 'object'){
                                    _v=vl;
                                }
                                return function(e){
                                    self[click](_v,e);
                                };
                            })(val));

                        } else {
                            v.on('click', (function () {
                                return function(e){
                                    self[click](null,e);
                                };
                            })());
                        }
                    }
                })(_em.eq(i),_self);



            }
        };
        var page = Base.extend({
            tplHtml: '',
            initStatus: false,
            scope: [],
            init: function (_$container,val,type) {
                var _self = this;
                if (!_self.initStatus) {

                    _self.tpl = template.compile(_self.tplHtml);
                    if (!_self.el) {
                        //_self.el = $(_self.tplHtml);
                        _self.el = $(_self.tpl(_self));
                        ////绑定
                        _bindZhcClick(_self.el,_self);
                    }
                    //一个作用域只能有一个
                    var els = $( _self.tplHtml).find('[zhc-scope]');
                    if($(_self.tplHtml).length>1){
                        els = $('<scope>' + _self.tplHtml + '</scope>').find('[zhc-scope]');
                    }
                    for (var i = 0; i < els.length; i++) {
                        _self.scope[els.eq(i).attr('zhc-scope')] = {
                            name: els.eq(i).attr('zhc-scope'),
                            tpl: template.compile(els.eq(i)[0].innerHTML),
                            html: function (data,tplT) {

                                var _e = _self.el.find('[zhc-scope]');
                                var _el=data;
                                if(!tplT){
                                    //如果未true表示直接插入
                                    //false表示转换
                                    _el=$(this.tpl(data));
                                }
                                if (_e.length <= 0) {
                                    //绑定
                                    //var _el=$(this.tpl(data));
                                    _bindZhcClick(_el,_self);
                                    _self.el.html(_el);

                                } else {
                                    //绑定
                                    //var _el=$(this.tpl(data));
                                    _bindZhcClick(_el,_self);
                                    _self.el.find('[zhc-scope=' + this.name + ']').html(_el);
                                }
                            },
                            append:function(data,tplT){
                                var _e = _self.el.find('[zhc-scope]');
                                var _el=data;
                                if(!tplT){
                                    //如果未true表示直接插入
                                    //false表示转换
                                    _el=$(this.tpl(data));
                                }
                                if (_e.length <= 0) {
                                    //绑定
                                    //var _el=$(this.tpl(data));
                                    _bindZhcClick(_el,_self);
                                    _self.el.append(_el);
                                } else {
                                    //var _el=$(this.tpl(data));
                                    _bindZhcClick(_el,_self);
                                    _self.el.find('[zhc-scope=' + this.name + ']').append(_el);
                                }
                            }
                        };
                    }

                    //_self.el.width(window.screen.availWidth);
                    _self.el.css('overflow','hidden');
                    _$container.prepend(_self.el);
                }

                if(!type){
                    //如果为false表示要低栏
                    //_self.el.height(window.screen.availHeight-55);
                    _self.el.height($(window).height()-42);
                    $('#footer').show();
                }else{
                    _self.el.height($(window).height());
                    //_self.el.height(window.screen.availHeight-44);
                    $('#footer').hide();
                }


                return _self;

            },
            refresh: function (val) {
                var _self = this;
                _self.el.show();
                //_$container.append(_self.el);
                return _self;
            },
            destroy: function () {
                var _self = this;
                _self.el.remove();
                _self.initStatus = false;
                return _self;
            }
        });
        return page;
    });
})(window)