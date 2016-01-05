/**
 * Created by bm_zhc on 2015/10/14.
 */
(function (window, document, J, Jingle, $) {
    define(['App', 'api', 'user', 'utils'], function (App, api, gUser, utils) {
        //获得oauth——code------------------
        var outhLogin = function (val) {
            //var appid = 'wxa7fae2ebfbace98b',
            //    appSecret = '0af33083699d5d7a8f351e32dc3628d2',
            var appid = 'wxe62d1030949f894b',// 云创众商
                appSecret = 'ecdf10584fb9da2be2e2dac95652192f',// 云创众商
                redirect_uri = encodeURIComponent('http://oauth.beimingsmart.com/test/callback.html'),
                state_url = encodeURIComponent(window.location.origin + window.location.pathname),
                oauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_base&state=' + state_url + '#wechat_redirect';

            gUser.val.oauthCode = utils.getRequest().code;
            gUser.val.openId = utils.getRequest().openId;
            //localStorage
            //if(window.localStorage){
            //    if(gUser.val.openId){
            //        window.localStorage.openId = gUser.val.openId;
            //    }else{
            //        gUser.val.openId= window.localStorage.openId;
            //    }
            //
            //}
            if (!gUser.val.openId && !gUser.val.oauthCode) {

                window.location.replace(oauthUrl);
            }
            if (val) {
                window.location.replace(oauthUrl);
            }
        };
        outhLogin();

        return function (callback, val) {
            if (gUser.val.openId) {
                //只有有openId的时候才处理其他参数
                api.loginForOpenId({
                    openId: gUser.val.openId
                }, function (err, da) {
                    if (da && da.data) {
                        //2.如果登录成功进入index
                        var code = gUser.val.oauthCode;
                        var openId = gUser.val.openId;
                        if (da.data) {
                            gUser.val = da.data;
                        } else {
                            gUser.val = {};
                        }
                        gUser.val.oauthCode = code;
                        gUser.val.openId = openId;
                        if (!da.data) {
                            //J.confirm('提示', '您没有绑定账号，需要绑定!', function () {
                            //    Jingle.Router.goTo('#login_section');
                            //}, function () {
                            //
                            //});
                            J.confirm('提示', '您没有绑定账号，需要绑定!', function () {
                                if (val && typeof  val == 'function') {
                                    var v = val(function (vu) {
                                        App.goTo('login', vu);
                                    });
                                    if (v) {
                                        App.goTo('login', v);
                                    }

                                } else {

                                    App.goTo('login', val);
                                }
                            }, function () {
                                App.goTo('noAuthority');
                            });

                        } else {
                            //取商户
                            api.payMerchant.getById({mchId: gUser.val.partentId}, function (err, data) {
                                if (data.data) {
                                    gUser.val.payMerchant = data.data;
                                }
                                if (window.location.hash) {
                                    var u = window.location.hash;
                                    if (u.indexOf('_section') >= 0) {
                                        if (u.substr(1, u.indexOf('_section') - 1) != 'main') {
                                            callback();
                                            App.goTo(u.substr(1, u.indexOf('_section') - 1));
                                        } else {

                                            callback();
                                        }

                                    } else {
                                        App.goTo(u.substring(1, u.length));
                                    }

                                } else {
                                    callback();
                                }

                            });

                        }
                    }
                });
                return;
            }
            if (!gUser.val.openId && gUser.val.oauthCode) {
                //1.用code 登录
                api.loginForCode({
                    code: gUser.val.oauthCode
                }, function (err, da) {

                    if (da && da.data) {

                        //2.如果登录成功进入index
                        var code = gUser.val.oauthCode;
                        if (da.data.payUser) {
                            gUser.val = da.data.payUser;
                        } else {
                            gUser.val = {};
                        }
                        gUser.val.oauthCode = code;
                        gUser.val.openId = da.data.openId;
                        //localStorage
                        //if(window.localStorage){
                        //    if(gUser.val.openId){
                        //        window.localStorage.openId = gUser.val.openId;
                        //    }
                        //
                        //}
                        if (da.data.payUser) {

                            //取商户
                            api.payMerchant.getById({mchId: gUser.val.partentId}, function (err, data) {
                                if (data.data) {
                                    gUser.val.payMerchant = data.data;
                                }
                                callback();
                            });
                        } else {
                            J.confirm('提示', '您没有绑定账号，需要绑定!', function () {
                                if (val && typeof  val == 'function') {
                                    var v = val(function (vu) {
                                        App.goTo('login', vu);
                                    });
                                    if (v) {
                                        App.goTo('login', v);
                                    }

                                } else {

                                    App.goTo('login', val);
                                }
                            }, function () {
                                App.goTo('noAuthority');
                            });
                        }
                    } else {
                        outhLogin(1);

                    }
                });


            }

        }

    });

}(window, document, J, Jingle, $))