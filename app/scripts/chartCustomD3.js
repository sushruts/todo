// // http://fengyuanchen.github.io/cropper/#options
// toDoApp.directive('cropupload', function($parse, FileUploader, $timeout, $q) {
//     var $image = null;
//     var uploader = null;
//     var cropperModalId = "#cropperModal";
//     return {
//         restrict: "E",
//         replace: true,
//         scope: {
//             cropperEnabled: '=',
//             width: '=',
//             height: '=',
//             options: '=',
//             model: "@",
//             file: "@",
//             croppedImage: "@",
//             myImage: "@",
//             aggrId: "="
//         },
//         templateUrl: 'templates/chart-template.html',
//         controller: function($scope, $attrs) {

//         },
//         compile: function(element, attrs) {
//             return function(scope, element, attrs, controller) {

//             };
//         }
//     };
// });
// http://phloxblog.in/angulard3/start.html#.VONlOy7_Fdh
// http://bl.ocks.org/Caged/6476579
// http://bl.ocks.org/mbostock/3887051
// http://techslides.com/over-2000-d3-js-examples-and-demos
// https://github.com/mbostock/d3/wiki/Tutorials
toDoApp.directive('angulard3GroupbarChart', function() { // Angular Directive
    return {
        restrict: 'A',
        scope: {
            datajson: '=',
            xaxisName: '=',
            xaxisPos: '=',
            yaxisName: '=',
            yaxisPos: '=',
            d3Format: '='
                // All the Angular Directive Vaiables used as d3.js parameters
        },
        controller: function($scope, $attrs) {

            // properties are directly passed to `create` method
            $scope.GroupbarChart = function(datajson, yaxisName, yaxisPos) {
                this.datajson = datajson;
                this.yaxisName = yaxisName;
                this.yaxisPos = yaxisPos;
                this.workOnElement = function(element) {
                    this.element = element;
                };
                this.generateGraph = function() {

                    //d3 specific coding
                    var margin = {
                            top: 20,
                            right: 20,
                            bottom: 30,
                            left: 40
                        },
                        width = 960 - margin.left - margin.right,
                        height = 500 - margin.top - margin.bottom;

                    var x0 = d3.scale.ordinal()
                        .rangeRoundBands([0, width], .1);

                    var x1 = d3.scale.ordinal();

                    var y = d3.scale.linear()
                        .range([height, 0]);

                    var color = d3.scale.ordinal()
                        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

                    var xAxis = d3.svg.axis()
                        .scale(x0)
                        .orient("bottom");

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .tickFormat(d3.format(".2s"));

                    var svg = d3.select(this.element).append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    d3.json(this.datajson, function(error, data) {
                        var ageNames = d3.keys(data[0]).filter(function(key) {
                            return key !== "Year";
                        });

                        data.forEach(function(d) {
                            d.ages = ageNames.map(function(name) {
                                return {
                                    name: name,
                                    value: +d[name]
                                };
                            });
                        });

                        x0.domain(data.map(function(d) {
                            return d.Year;
                        }));
                        x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
                        y.domain([0, d3.max(data, function(d) {
                            return d3.max(d.ages, function(d) {
                                return d.value;
                            });
                        })]);

                         svg.selectAll(".state")
                            .data(data)
                            .enter().append("rect")
                            .attr("x", 0)
                            .attr("y", 0)
                            .attr("width", 16 * 7)
                            .attr("height", height)
                            .attr("class", "g")
                            .attr("transform", function(d,i) {                               
                                    return "translate(" + x0(d.Year) + ",0)";    
                            }).style("fill", function(d,i) {
                                if (i%2==0)
                                    return "#fff";
                                else
                                    return "#f8f8f8";
                            });


                        svg.append("g")
                            .attr("class", "x axis")
                            .attr("transform", "translate(0," + height + ")")
                            .call(xAxis)

                        svg.append("g")
                            .attr("class", "y axis")
                            .call(yAxis)
                            .append("text")
                            .attr("transform", "rotate(-90)")
                            .attr("y", this.yaxisPos)
                            .attr("dy", ".71em")
                            .style("text-anchor", "end")
                            .text(this.yaxisName);                      


                        var state = svg.selectAll(".state")
                            .data(data)
                            .enter().append("g")
                            .attr("class", "g")
                            .attr("transform", function(d) {
                                return "translate(" + x0(d.Year) + ",0)";
                            });

                       



                        state.selectAll("rect")
                            .data(function(d) {
                                return d.ages;
                            })
                            .enter().append("rect")
                            .attr("width", x1.rangeBand())
                            .attr("x", function(d) {
                                return x1(d.name);
                            })
                            .attr("y", function(d) {
                                return y(d.value);
                            })
                            .attr("height", function(d) {
                                return height - y(d.value);
                            })
                            .style("fill", function(d) {
                                return color(d.name);
                            })



                    }.bind(this));
                };
            }
        },
        link: function(scope, elem, attrs) {
            var ourGraph = new scope.GroupbarChart(scope.datajson, scope.yaxisName, scope.yaxisPos);
            //d3 related Variable initialisation
            ourGraph.workOnElement('#' + elem[0].id); // Work on particular element
            ourGraph.generateGraph(); // generate the actual bar graph
        }
    }
});