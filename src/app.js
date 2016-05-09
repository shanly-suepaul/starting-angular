define([
    'angular'
], function (
    ng
) {
    'use strict';

    var app = ng.module('app', [
    ]);

    app.run([ '$rootScope', '$interval', function ($rootScope, $interval) {
        // update current time every minute
        $rootScope.now = new Date();

        $interval(function () {
            $rootScope.now = new Date();
        }, 60000);
    } ]);
});
