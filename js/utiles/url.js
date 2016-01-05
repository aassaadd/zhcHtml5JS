/**
 * Created by zhaohaochen on 15/12/15.
 */
(function (location) {
    define(['json'],function (JSON) {

     return {
         setRequest: function (val) {
             var r='';
             if(val){
                var s='?';
                 for(var k in val){
                     if(s.length>1){
                         s+='&';
                     }
                     s+=k+'='+val[k];

                 }
                 if(s.length>1){
                     r=s;
                 }

             }
             return r;

         },
         getRequest: function () {

             var url = location.hash; //获取url中"?"符后的字串
             var theRequest = new Object();
             if (url.indexOf("?") != -1) {
                 var str = url.substr(url.indexOf('?') + 1);
                 strs = str.split("&");
                 for (var i = 0; i < strs.length; i++) {
                     theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                 }
             }
             return theRequest;
         }
     }
    });
})(location)
