/**
 * Created by zhaohaochen on 15/12/11.
 */

(function () {
    define(['json','template'],function (JSON,template) {

        template.helper('dateFormat', function (date, format) {
            if(!date){

                return '';
            }

            date = new Date(date);

            var map = {
                "M": date.getMonth() + 1, //月份
                "d": date.getDate(), //日
                "h": date.getHours(), //小时
                "m": date.getMinutes(), //分
                "s": date.getSeconds(), //秒
                "q": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
                var v = map[t];
                if (v !== undefined) {
                    if (all.length > 1) {
                        v = '0' + v;
                        v = v.substr(v.length - 2);
                    }
                    return v;
                }
                else if (t === 'y') {
                    return (date.getFullYear() + '').substr(4 - all.length);
                }
                return all;
            });
            return format;
        });
        template.helper('obj2json', function (val) {

            return JSON.stringify(val);
        });

        template.helper('file2img', function (val) {


            return window.location.protocol + '//' + window.location.host + '/myt_wx/api/manage/mytFile/'+val+'?postMethod=image&token='+window.localStorage.token;
        });

        template.helper('proOpenStateString', function (val) {
            //1：可申请使用，2：使用中，3：报告回收中，4：已结束
            var r='';
            switch (val){
                case '1':
                    r='免费申请';
                    break;
                case '2':
                    r='试用中';
                    break;
                case '3':
                    r='报告回收中';
                    break;
                case '4':
                    r='已结束';
                    break;
            }

            return r;
        });
        template.helper('proOpenStateCss', function (val) {
            //1：可申请使用，2：使用中，3：报告回收中，4：已结束
            var r='';
            switch (val){
                case '1':
                    r='u-btn-success';
                    break;
                case '2':
                    r='u-btn-disable';
                    break;
                case '3':
                    r='u-btn-disable';
                    break;
                case '4':
                    r='u-btn-disable';
                    break;
            }

            return r;
        });
        template.helper('proOpenStateButton', function (val) {
            //1：可申请使用，2：使用中，3：报告回收中，4：已结束
            var r='';
            switch (val){
                case '1':
                    r='免费申请';
                    break;
                case '2':
                    r='试用中';
                    break;
                case '3':
                    r='报告回收中';
                    break;
                case '4':
                    r='已结束';
                    break;
            }

            return r;
        });
        template.helper('payStateString', function (val) {

            var r='';
            switch (val){
                case '0':
                    r='待付款';
                    break;
                case '1':
                    r='支付成功';
                    break;
                case '2':
                    r='收货中';
                    break;
                case '3':
                    r='确认收货';
                    break;
                case '4':
                    r='退回中';
                    break;
                case '5':
                    r='确认退回';
                    break;
                case '6':
                    r='订单完成';
                    break;
                case '7':
                    r='订单关闭';
                    break;
            }

            return r;
        });
        template.helper('orderStateButtonCss', function (val) {
            //0提交订单，1支付成功，2收货中，3,确认收货，4退回中，5确认退回，6订单完成，7订单关闭',
            var r='';
            switch (val){
                case '0':
                    r='u-btn-success';
                    break;
                case '1':
                    r='u-btn-disable';
                    break;
                case '2':
                    r='u-btn-success';
                    break;
                case '3':
                    r='u-btn-success';
                    break;
                case '4':
                case '5':
                case '6':
                case '7':
                    r='u-btn-disable';
                    break;
            }

            return r;
        });
        template.helper('orderStateButtonString', function (val) {
            //0提交订单，1支付成功，2收货中，3,确认收货，4退回中，5确认退回，6订单完成，7订单关闭',
            var r='';
            switch (val){
                case '0':
                    r='支付';
                    break;
                case '1':
                    r='等待发货';
                    break;
                case '2':
                    r='确认收货';
                    break;
                case '3':
                    r='退回';
                    break;
                case '4':
                    r='等待退回确认';
                    break;
                case '5':
                    r='等待完成';
                    break;
                case '6':
                    r='订单完成';
                    break;
                case '7':
                    r='订单关闭';
                    break;
            }

            return r;
        });
    });
})()