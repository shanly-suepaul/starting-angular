define([
    'angular',

    'ua-parser-js',

    './mainHeader/mainHeader'
], function (
    ng,

    UAParser
) {
    'use strict';

    var app = ng.module('app', [
        'app.mainHeader'
    ]);

    app.run([ '$rootScope', '$interval', function ($rootScope, $interval) {
        // update current time every minute
        $rootScope.now = new Date();

        $interval(function () {
            $rootScope.now = new Date();
        }, 60000);

        var parser = new UAParser();
        var browser = parser.getBrowser();

        $rootScope.isIE9 = browser.name === 'IE' && browser.version === '9.0';
    } ]);
});
