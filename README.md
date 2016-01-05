1.page 的基础设置:

var _index = page.extend({
            title:'页面标题',
            tplHtml: '模版',//参照tpl说明
            scroll: undefined,//滚动参数
            page: 1,//分页参数
            pageSize: 3,//分页参数
            last: false,//是否最后一样
            scope:[],//模版所在范围域配合zhc-scope
            clickXXX:function(){
               //自定义事件配合,zhc-click试用
            },
            init: function (_$container) {
            //初始化方法
                var _self = this;
                _self.super(_$container);
                return _self;
            },
            refresh: function () {
                var _self = this;
                _self.super();
                //这里写内容
                _self.scope.topList.html(_d);//模版数据导入

                if(_self.scroll ){//页面滚动
                    _self.scroll.refresh();
                }
                if (_self.scroll) {//销毁滚动
                    _self.scroll.destroy();

                }

                _self.scroll = scroll(_self.el[0]);

                return _self;
            }
        });
        
2.'utiles/refresh', 'utiles/scroll'
例子:
refresh(_self.el[0], 'pullUp', function () {
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
                                    _self.scope.list.append(_d);//填入数据
                                    if (d.data.last) {
                                        _self.scroll.end();//停止页面上拉操作
                                    } else {
                                        _self.page += 1;
                                    }
                                    _self.scroll.refresh();
                                }
                            });
                        });
                        
例子:
_self.scroll = scroll(_self.el[0]);
3.模版tpl 参照artTemplate
