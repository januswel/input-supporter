(function () {
    'use strict';

    var maxlengthAttrs = ['ngMaxlength', 'maxlength'];
    var getMaxlength = function (attrs) {
        var maxlength = null;
        maxlengthAttrs.forEach(function (key) {
            if (key in attrs) {
                maxlength = parseInt(attrs[key], 10);
            }
        });
        if (maxlength != null) {
            return maxlength;
        }
        throw new Error('Specify maxlength by using ng-maxlength or maxlength attr');
    };

    var module = angular.module('input-supporters', []);
    module.directive('remainingLetters', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                remainingLetters: '='
            },
            link: function ($scope, element, attrs, modelController) {
                var maxlength = getMaxlength(attrs);
                $scope.$watch(function () {
                    return modelController.$viewValue;
                }, function (newValue) {
                    $scope.remainingLetters = maxlength - (newValue || '').length;
                });
            }
        };
    });
})();
