toDoApp.directive('intt', ['$timeout',
    function($timeout) {
        var pattern, regexPattern;
        //function to create the pattern
        var createPattern = function(elem, scope) {
            var defaultPattern = "^\\d{0,11}(\\.\\d{0,0})?$",
                defaultErrorMessage = "Number range 0 to 99999999999.999999";
            if (elem.attr("required")) {
                elem.find("a").attr("e-required", "");
            }
            if (!scope.errormessage) {
                scope.errormessage = defaultErrorMessage;
            }
            if (!scope.min) {
                scope.min = 0;
            }
            //temporarily max value is considered as number and not decimal number 
            //because parse float is rounding off above 5 decimal places
            if (!scope.max) {
                scope.max = 99999999999999999;
            }
            //scope.uomPrecision:takes UOM type precion and set decimal precision accordingly
            //scope.min: sets what should be the minimum accepted value by field
            if (scope.uomType && scope.uomPrecision) {
                pattern = "^\\d{0,11}(\\.\\d{0," + scope.uomPrecision + "})?$";
            } else if (scope.patternValue) {
                var places = (scope.patternValue).split("|");
                if (places.length > 1) {
                    pattern = "^\\d{0," + places[0] + "}(\\.\\d{0," + places[1] + "})?$";
                } else {
                    pattern = defaultPattern; //default pattern
                }
            } else {
                pattern = defaultPattern; //default pattern
            }
            pattern = new RegExp(pattern);
            return pattern;
        };
        var removeTrailingZeros = function(val) {
            if (val && val.toString().indexOf(".") > 0) {
                val = val.replace(/[0]+$/, '');
                if (val.slice(-1) === ".") //check if last character is "."
                {
                    val = val.replace(/\.$/, "");
                }
            }
        };
       
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                style: '@',
                placeholder: '@',
                min: '@', //min is to define min value to be accepted by the field
                max: '@', //max is to define max value to be accepted by the field
                uomType: '=', //flag to check if UOMPrecision if applicable
                patternValue: '@', // pattern value is "number of digits before decimal|number of digits after decimal
                uomPrecision: '=', //contains UOMPrecision value if UOMPrecision is applicable for decimal places
                errorMessage: '@',
                showerror: '='
            },
            link: function(scope, elem, attr, ngModel) {
                scope.$watch('ngModel', function(newValue, oldValue) {
                    var arr = String(newValue).split("");
                    if (arr.length === 0) {
                        ngModel.$setValidity('intt', false);
                        return;
                    }
                    if (arr.length === 1 && (arr[0] === '.')) {
                        ngModel.$setValidity('intt', true);
                        return;
                    }
                   
                    removeTrailingZeros(newValue);
                    regexPattern = createPattern(elem, scope);
                    //logic to not allow to type leading zeros
                    if (isNaN(newValue) || !regexPattern.test(newValue)) {
                        if (oldValue != undefined) {
                            scope.ngModel = !isNaN(oldValue) ? oldValue : '';
                            console.log('dsd')
                        } else {
                            scope.ngModel = !isNaN(newValue) ? newValue : '';
                            console.log('sds')
                        }
                        ngModel.$setValidity('intt', true);
                        return;
                    } else if (parseFloat(newValue) === 0) {
                        if (arr[0] === '.')
                            scope.ngModel = newValue;
                        else
                            scope.ngModel = '';                        
                        return;
                    }
                   
                });
                ngModel.$parsers.unshift(function(value) {
                    if ((parseFloat(scope.max) < parseFloat(value)) || (parseFloat(value) < parseFloat(scope.min))) {
                        ngModel.$setValidity('intt', false);
                    } else {
                        ngModel.$setValidity('intt', true);
                    }
                    return value;
                });
            }
        };
    }
]);