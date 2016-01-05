/**
 * index
 * Created by zhaohaochen on 15/12/10.
 */
(function (window, location, document) {
    define(['text!tpl/index_tpl.html', 'utiles/page', 'api/api', 'app/main', 'utiles/refresh', 'utiles/scroll', 'Swipe', 'Zepto', 'utiles/tplhelper'], function (tpl, page, api, app, refresh, scroll) {
        var $ = Zepto;
        var _index = page.extend({
            title:'一元购',
            tplHtml: tpl,
            scroll: undefined,
            page: 1,
            pageSize: 3,
            last: false,
            vStatus:undefined,
            vClass:undefined,
            vExamine:undefined,
            scope:[],
            clickStatus:function(){
                var _self=this;
                _self.el.find('.m-header-menu2 ul li').removeClass("current");
                _self.el.find('#clickStatus').addClass("current");
                _self.el.find('.ml-tag').hide();
                _self.el.find('#selStatus').show();

                _self.scroll.refresh();
            },
            clickClass:function(){
                var _self=this;
                _self.el.find('.m-header-menu2 ul li').removeClass("current");
                _self.el.find('#clickClass').addClass("current");
                _self.el.find('.ml-tag').hide();
                _self.el.find('#selClass').show();

                _self.scroll.refresh();
            },
            clickExamine:function(){
                var _self=this;
                _self.el.find('.m-header-menu2 ul li').removeClass("current");
                _self.el.find('#clickExamine').addClass("current");
                _self.el.find('.ml-tag').hide();
                _self.el.find('#selExamine').show();

                _self.scroll.refresh();
            },
            selClass:function(v,e){
                var _self=this;
                _self.el.find('#selClass span').removeClass("current");
                if(_self.vClass!=v){
                    _self.vClass=v;
                    $(e.target.parentElement).addClass("current");
                }else{
                    _self.vClass=undefined;
                }
                _self.select();
            },
            selStatus:function(v,e){
                var _self=this;
                _self.el.find('#selStatus span').removeClass("current");
                if(_self.vStatus!=v){
                    _self.vStatus=v;
                    $(e.target.parentElement).addClass("current");
                }else{
                    _self.vStatus=undefined;
                }

                _self.select();
            },
            selExamine:function(v,e){
                var _self=this;
                _self.el.find('#selExamine span').removeClass("current");
                if(_self.vExamine!=v){
                    _self.vExamine=v;
                    $(e.target.parentElement).addClass("current");
                }else{
                    _self.vExamine=undefined;
                }
                _self.select();
            },
            select:function(){
                var _self=this;
                api.product.getByPage({
                    procId:_self.vClass,
                    proOpenState:_self.vStatus,
                    proExamineType:_self.vExamine,
                    status: 1,
                    proState: 1,
                    proAuditState: 1,
                    page: 1,
                    pageSize: _self.pageSize
                }, function (data) {
                    if (data && data.data) {
                        var _d = {
                            list: []
                        };
                        for (var i in data.data.content) {
                            _d.list.push(data.data.content[i]);
                        }
                        _self.scope.list.html(_d)

                        if (_self.scroll) {
                            _self.scroll.destroy();
                            _self.page = 1;
                        }
                        _self.scroll = refresh(_self.el[0], 'pullUp', function () {
                            api.product.getByPage({
                                status: 1,
                                proState: 1,
                                proAuditState: 1,
                                page: _self.page,
                                pageSize: _self.pageSize
                            }, function (d) {
                                if (d && d.data) {
                                    var _d = {
                                        list: []
                                    };
                                    for (var i in d.data.content) {
                                        _d.list.push(d.data.content[i]);
                                    }
                                    _self.scope.list.append(_d);
                                    if (d.data.last) {
                                        _self.scroll.end();
                                    } else {
                                        _self.page += 1;
                                    }
                                    _self.scroll.refresh();
                                }
                            });
                        });
                        if (data.data.last) {
                            if(_self.scroll){
                                _self.scroll.end();
                            }

                        } else {
                            _self.page += 1;
                        }

                    }
                });
            },
            top: function (v) {
                app.go('orders');
                console.log(v);
            },
            go:function(v){
                app.go('details',{
                    id: v.id
                });
            },
            init: function (_$container) {
                var _self = this;
                _self.super(_$container);
                $('#footer ul li').removeClass('current');
                $('#footer_index').addClass('current');

                return _self;
            },
            refresh: function () {
                var _self = this;
                _self.super();
                api.adv.getByPage({
                    status: 1
                }, function (data) {
                    if (data && data.data) {
                        var _d = {
                            list: []
                        };
                        for (var i in data.data) {
                            _d.list.push(data.data[i]);
                        }
                        _self.scope.topList.html(_d)
                        _self.swipe = new Swipe(_self.el.find('#mfs-id')[0], {
                            speed: 300,
                            auto: 3000,
                            callback: function (index, elem) {
                                var lis = _self.el.find('#mfs-id ol').children();
                                lis.removeClass("on").eq(index).addClass("on");
                            }
                        });

                    }
                });
                _self.select();
                api.productClass.getByPage({
                    status:'1'
                },function(data){
                    if(data && data.data){
                        _self.scope.selQuery.html({
                            list:data.data
                        });
                    }

                });
                return _self;
            }
        });

        return _index;
    });
})(window, location, document)