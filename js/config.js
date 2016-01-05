/**
 * Created by zhaohaochen on 15/12/9.
 */
requirejs.config({
    baseUrl: 'js',
    paths: {
        Zepto: 'lib/zepto/zepto',
        Swipe: 'lib/Swipe/swipe',
        jwx: 'lib/jweixin/jweixin-1.0.0',
        json: 'lib/json3/json3',
        css: 'lib/require-css/css',
        text: 'lib/text/text',
        template: 'lib/artTemplate/template.min',
        Iscroll: 'lib/iscroll/iscroll-probe',
        async: 'lib/async/async'

    },
    shim: {
        Zepto: [],
        Swipe: ['Zepto'],
        Iscroll: []
    },
    packages: {
        api: 'api',
        app: 'app',
        utiles: 'utiles',
        way: 'way'
    }
});
requirejs(['app/main', 'app/index'],
    function (app, index) {

        app.page('index', index);


        app.run();
        app.go('index');

    });