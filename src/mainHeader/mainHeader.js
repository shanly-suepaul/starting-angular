define([
    'angular',

    'text!./mainHeader.html'
], function(
    ng,

    mainHeaderTemplate
) {
    'use strict';

    ng.module('app.mainHeader', []).directive('mainHeader', [function() {
        return {
            restrict: 'E',
            replace: true,
            template: mainHeaderTemplate,
            scope: {
            },
            link: function() {}
        };
    }]);
});