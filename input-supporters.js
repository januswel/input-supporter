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
            link: function ($scope, element, attrs, modelController) {
                var maxlength = getMaxlength(attrs);
                var propertyName = attrs.remainingLetters;
                if (!propertyName) {
                    throw new Error('Specify property name to store a number of remaining letters by "remaining-letters" attr');
                }
                $scope.$watch(function () {
                    return modelController.$viewValue;
                }, function (newValue) {
                    $scope[propertyName] = maxlength - (newValue || '').length;
                });
            }
        };
    });

    var lengthCriteria = 16;
    var characterKinds = [/[a-z]/g, /[A-Z]/g, /[0-9]/g];
    var evaluaters = [
        // length check
        function (password) {
            var length = password.length;
            if (length > lengthCriteria) {
                return 1;
            }
            var theta = (Math.PI * length) / (2 * lengthCriteria);
            // use squared sin to get strength
            return Math.pow(Math.sin(theta), 2);
        },
        // a number of character kinds check
        function (password) {
            var replaced = '';
            var numberOfKinds = 0;
            characterKinds.forEach(function (kind) {
                replaced = password.replace(kind, '', 'g');
                if (replaced.length != password.length) {
                    ++numberOfKinds;
                }
                password = replaced;
            });
            if (password.length > 0) {
                ++numberOfKinds;
            }
            return Math.pow(numberOfKinds / (characterKinds.length + 1), 3);
        }
    ];

    module.directive('passwordStrength', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, attrs, modelController) {
                var propertyName = attrs.passwordStrength;
                if (!propertyName) {
                    throw new Error('Specify property name to store password strength by "password-strength" attr');
                }

                $scope.$watch(function () {
                    return modelController.$viewValue;
                }, function (newValue) {
                    $scope[propertyName] = evaluaters.map(function (evaluater) {
                        return evaluater(newValue ? newValue : '');
                    }).reduce(function (prev, current) {
                        return prev + current;
                    }) / evaluaters.length;
                });
            }
        };
    });
})();
